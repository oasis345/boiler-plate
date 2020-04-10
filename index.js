const express = require('express')
const app = express()
const port = 3000
const bodyParse = require("body-parser")
const { User } = require("./models/User")
const config = require("./config/key")

//application/x-www-form-urlencoded
app.use(bodyParse.urlencoded({extended: true}))

//application/json
app.use(bodyParse.json())

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI,{
    useNewUrlParser:true , useUnifiedTopology:true , useCreateIndex:true , useFindAndModify : false
}).then(()=>   console.log('mongoDB Connected...'))
.catch(err => console.log(err))



app.get('/', (req, res) => res.send('안녕하세요131~~1212!'))

app.post(`/register`,(req,res)=>{
    //회원 가입 할 때 필요한 정보들을 client에서 가져오면 그것들을 데이터 베이스에 넣어준다.

    const user = new User(req.body) //req.body를 통해 클라이언트의 정보를 받아온다

    user.save((err,userInfo)=>{
        if(err) return res.json({success: false,err})
        return res.status(200).json({
            success: true
        })
    })
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

