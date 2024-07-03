import express from 'express';
import cors from 'cors';
import multer from 'multer';
import { Document } from 'docxyz';
import cleanChart from './utils/cleanChart.js';
import convertChart from './utils/convertChart.js';
import createNewScale from './utils/createNewScale.js';
import saveResult from './utils/saveResult.js';
import fs from 'fs'

const app = express();
const upload = multer(
    { 
      dest: './src/uploads'
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

app.post('/api/convert/:accidental/:assignedKey/', upload.single('file'), (req, res) => {
    if (req.file) {
        try {
            const accidental = req.params.accidental;
            const assignedKey = req.params.assignedKey;

            const filePath = req.file.path;
            const fileName = req.file.originalname;
            const baseName = fileName.replace(/\.[^/.]+$/, '')
            const downloadPath = `.src/downloads/${baseName}-converted.docx`
            const document = new Document(filePath);
            let newScale = createNewScale(accidental, scaleDict, assignedKey) 
            let cleanedDocument = cleanChart(document, scaleDict)
            let convertedDocument = convertChart(cleanedDocument, scaleDict, newScale)
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
                      console.log('Upload directory deleted successfully');
                    }
                  });
              
                  // Delete downloaded file
                  fs.unlink(downloadPath, (err) => {
                    if (err) {
                      console.error(err);
                    } else {
                      console.log('Download directory deleted successfully');
                    }
                  });
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