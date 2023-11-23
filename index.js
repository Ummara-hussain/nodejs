const express = require ('express')
const db = require('./config/db')
const app = express()
const cors = require('cors')

app.use(cors())

app.listen(process.env.port || 3000, function(){
    console.log('listening on 3000')
})

db.connection.once('open' ,() => {
    console.log('db connected sucessfully')
}).on("error", (e) =>{
    console.log('error: ' , e)
})

// const data =[{title: 'goat', price: 30000},
// {title: 'cow', price: 130000}]

// app.use('/ads' , (red, res) =>{
//     // database se data get krna
//     res.send({
//         message: 'data fetch sucessfully',
//         data
//     })
// })
console.log('hello backend!')

app.use(express.json())

app.use('/', require('./routes/index'))