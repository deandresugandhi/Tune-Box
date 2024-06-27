import express from 'express';
import cors from 'cors';
import multer from 'multer';
import docx from 'docx';
import { cleanChart } from './utils'

const app = express();
const upload = multer(
    { 
      storage: multer.memoryStorage(), 
      limits: { fileSize: 5242880 }  //5mb limit
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

app.get



app.post('/api/upload', upload.single('document'), async (req, res) => {
    if (req.file) {
        try {
            const buffer = req.file.buffer;
            const document = new docx.Document();
            const packer = new docx.Packer();
            const unpackedDocument = await packer.unpack(buffer);
            document.setBody(unpackedDocument.getBody());

            // Manipulation logic

            const modifiedDocument = await packer.pack(document);
            const downloadUrl = '/download'
            res.json({ downloadUrl });
        
        } catch (error) {
            console.error(error);
            res.status(500).send('Error processing document');
        }
    } else {
        res.status(400).send('No file uploaded');
    }
});

document.body.each