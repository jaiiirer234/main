const express = require('express')
const router = require('./routes/route')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.json())
app.use('/' , router)

const port = process.env.PORT || 3000

app.listen(port,()=>{
    console.log(`Sever is listening on port ${port}`)
})