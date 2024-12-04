const express = require('express')
const bodyParser = require('body-parser')
const { getpdfBuffer } = require('../service/pdfService')
const fs = require('fs')
const router = express.Router()


router.get('/get', (req,res)=>{
    console.log('hi');
    
    res.send('Ok')
})


router.post('/generate-pdf', async (req,res)=>{
    try {
        const data = req.body

        const getPdfBuffer = await getpdfBuffer(data)

        const outputFilePath = 'C:/Users/user/Desktop/Machine Test/PdfOutput.pdf'
        fs.writeFileSync(outputFilePath,getPdfBuffer)

        res.status(201).sendFile(outputFilePath,(error)=>{
            if(!error){
                res.status(200).send('Generated Successfully')
            }else{
                console.log('Error creating the file',error)
                res.status(500).send({error:"Failed to create PDF."})
            }
        })
    } catch (error) {
        console.log("error===========>",error)
        res.status(500).send({Error:'Failed to generate PDF'})
    }
})
module.exports = router