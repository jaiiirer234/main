const { generateKey } = require('crypto')
const fs = require('fs')
const html_to_pdf = require('html-pdf-node')
const { format } = require('path')


const getpdfBuffer = (data)=>{
    const msmeLogo = fs.readFileSync('log.png',{encoding:'base64'})
    const certificateLogo = fs.readFileSync('Sc.png',{encoding:'base64'})

    let options = {format:'A4'}

    let file = {
        content:`
        <!DOCTYPE html>
<html lang="en">
<head>
</head>
<body style="font-family: Arial, Helvetica, sans-serif; margin: 0; padding: 0;display: flex; justify-content: center;align-items: center;height: 100vh;background-color: f4f4f4;">
    <div style="width: 800px; border: 24px solid #008cba; padding: 20px; background: #fff; text-align: center;box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); ">
        <div style="display: flex; justify-content: space-between; margin-bottom: 20px;">
            <div style="text-align: left; font-size: 14px;">
                <p style="font-weight: bold;"> RegisterId:${data.registerId}</p>
                <p style="font-weight: bold;"> E-Mail:${data.email}</p>
                <p style="font-weight: bold;"> phone:${data.phone}</p>
            </div>
            <div style="text-align: center;">
                <img src="data:img/png;base64,${msmeLogo}" alt="Logo" style="width: 60%; margin-bottom: 5px;">
                <p style="font-weight: bold;">MSME</p>
            </div>
            <div style="text-align: left; font-size: 14px;">
                <p style="font-weight: bold;">Anand Farm, Sector 22</p>
                <p style="font-weight: bold;">Gurugram (122016)</p>
                <p style="font-weight: bold;">(Haryana) India</p>
            </div>
        </div>
        <h1 style="font-family: 'Palatino Linotype', serif; color: #0072ce; margin-bottom: 10px;"> Certificate of Half Marathon</h1>
        <p style="margin: 20px 0 10px; font-family: italic; "> This Certificate presented to</p>
        <h2 style="color: #a67c52; margin-bottom: 10px; ">${data.name}</h2>
        <p style="font-size: 14px; color: #555; margin-bottom: 30px;">The certificate of achivement is awarded to individuals who have demonstrated outstanding performance in their field</p>

        <div style="display: flex; justify-content: space-between; margin: 20px 0; font-size: 14px;">
            <p style="font-weight: bold;">Date of birth:${data.dob}</p>
            <p style="font-weight: bold;">Gender:${data.gender}</p>
            <p style="font-weight: bold;">Blood Group:${data.bloodgroup}</p>
        </div>
        <div style="display: flex; align-items: center; text-align: center; margin-top: 20px;">
            <div>
                <p style="margin: 0; font-weight: bold;">${data.datetime}</p>
                <p style="margin: 0; font-weight: bold;">__________________________</p>
                <p style="margin: 0; font-weight: bold;">DATE-TIME</p>
            </div>
            <div>
                <img src="data:img/png;base64, ${certificateLogo}" alt="Seal" style="width: 65%; margin: 10px 0;">
            </div>
            <div>
                <p style="font-weight: bold;">__________________________</p>
                <p style="font-weight: bold;">SIGNATURE</p>
            </div>
        </div>
    </div>
    
</body>
</html>

        `
    }

    return new Promise((resolve,reject)=>{
        html_to_pdf.generatePdf(file,options).then(pdfBuffer =>{
            resolve(pdfBuffer);
        }).catch(err =>{
            reject(err)
        })
    })
}

module.exports = {getpdfBuffer}