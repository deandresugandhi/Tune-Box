import { Document, Paragraph, TextRun, patchDocument, Packer } from 'docx';
import * as fs from "fs";

const document = await new Document({
    sections: [{
        children: [
            new Paragraph({
                children: [new TextRun("Lorem Ipsum Foo Bar"), new TextRun("Hello World")],
            }),
        ],
    }],
});

// Packer.toBuffer(document).then((buffer) => {
//     fs.writeFileSync("My Document.docx", buffer);
// });