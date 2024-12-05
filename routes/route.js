const express = require('express')
const bodyParser = require('body-parser')
const { getpdfBuffer } = require('../service/pdfService')
const fs = require('fs')
const router = express.Router()


router.get('/get', (req,res)=>{
    console.log('hi');
    
    res.send('Ok')
})


router.post('/generate-pdf', async (req, res) => {
    try {
        const data = req.body;

        // Generate the PDF buffer
        const getPdfBuffer = await getpdfBuffer(data);

        // Define the output file path
        const outputFilePath = 'C:/Users/user/Desktop/New-Test/PdfOutput.pdf';
        
        // Write the buffer to the file
        fs.writeFileSync(outputFilePath, getPdfBuffer);

        // Send the file to the client
        res.sendFile(outputFilePath, (error) => {
            if (error) {
                console.error('Error sending the file:', error);
                // Only log the error; the response is already sent or cannot be modified.
            } else {
                console.log('PDF sent successfully');
            }
        });
    } catch (error) {
        console.error('Error generating PDF:', error);
        // Ensure this error handler is not called after res.sendFile to avoid conflicts
        if (!res.headersSent) {
            res.status(500).send({ error: 'Failed to generate PDF.' });
        }
    }
});

module.exports = router