import express from 'express';
import cors from 'cors';
import multer from 'multer';
import { Document } from 'docxyz';
import cleanChart from './utils/cleanChart.js';
import convertChart from './utils/convertChart.js';
import createNewScale from './utils/createNewScale.js';
import saveResult from './utils/saveResult.js';
import fs from 'fs'
import { v4 as uuidv4 } from "uuid";

const app = express();
const upload = multer(
    { 
      dest: 'src/uploads'
    }
);
const scaleDict = {
    numerical_scale: "1 2b 2 3b 3 4 5b 5 6b 6 7b 7".split(' '),
    numerical_scale_2: "1 1# 2 2# 3 4 4# 5 5# 6 6# 7".split(' '),
    scale: "A Bb B C Db D Eb E F Gb G Ab".split(' '),
    scale_2: "A A# B C C# D D# E F F# G G#".split(' ')
};

app.use(cors());

app.use(express.json());

app.get('/api', (req, res) =>
    res.send({ info: 'Chord Translator API' }))

app.post('/api/chord-translator/convert/:type/accidental/:assignedKey/', upload.single('file'), (req, res) => {
    if (req.file) {
        try {
            // Create unique directory name inside downloads directory for each request to prevent filename collisions.
            // Filename collisions for the uploads directory is handled automatically by Multer
            const requestId = uuidv4();
            const downloadDir = path.join('src', 'downloads', requestId);
            fs.mkdirSync(downloadDir, { recursive: true });
            
            const { type, accidental, assignedKey } = req.params;

            const filePath = req.file.path;
            const fileName = req.file.originalname;
            const baseName = fileName.replace(/\.[^/.]+$/, '')
            const downloadPath = path.join(downloadDir, `${baseName}-converted.docx`);
            
            const document = new Document(filePath);
            let isNumerical = type === 'number';
            let newScale = createNewScale(accidental, scaleDict, assignedKey) 
            let cleanedDocument = cleanChart(document, scaleDict, isNumerical)
            let convertedDocument = convertChart(cleanedDocument, scaleDict, newScale, isNumerical)
            saveResult(convertedDocument, downloadPath)
            
            res.download(downloadPath, function (err) {
                if (err) {
                    console.error(err);
                } else {
                    // Delete uploaded file
                    fs.unlink(filePath, (err) => {
                        if (err) {
                            console.error(err);
                        } else {
                            console.log('Upload directory cleaned successfully');
                        }
                    });
                    // Delete downloaded file + unique directory
                    fs.rmSync(downloadDir, { recursive: true, force: true });
                }
            });
        } catch (error) {
            console.error(error);
            res.status(500).send('Error processing document');
        }
    } else {
        res.status(400).send('No file uploaded');
    }
});

//Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});