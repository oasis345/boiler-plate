const express = require('express')
const app = express()
const port = 3000

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://oasis345:abcd1234@boilerplate-2zdvh.mongodb.net/test?retryWrites=true&w=majority',{
    useNewUrlParser:true , useUnifiedTopology:true , useCreateIndex:true , useFindAndModify : false
}).then(()=>   console.log('mongoDB Connected...'))
.catch(err => console.log(err))



app.get('/', (req, res) => res.send('안녕하세요~~!'))

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))