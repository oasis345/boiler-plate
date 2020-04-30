const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const { User } = require("./models/User")
const config = require("./config/key")
const cookieParser = require(`cookie-parser`)
const { auth } = require("./middleware/auth")
//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

//application/json
app.use(bodyParser.json())
app.use(cookieParser())

const mongoose = require("mongoose")
mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("mongoDB Connected..."))
  .catch((err) => console.log(err))

app.get("/", (req, res) => res.send("안녕하세요131~1~1212!"))

app.get("/api/hello", (req, res) => {
  res.send("안녕하세요")
})

//회원 가입
app.post("/api/users/register", (req, res) => {
  //회원 가입 할 때 필요한 정보들을 client에서 가져오면 그것들을 데이터 베이스에 넣어준다.

  const user = new User(req.body) //req.body를 통해 클라이언트의 정보를 받아온다

  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err })
    return res.status(200).json({
      success: true,
    })
  })
})

//로그인
app.post("/api/users/login", (req, res) => {
  //1. 요청된 이메일을 데이터베이스에서 있는지 찾아본다  -> User.findOne()
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "해당 이메일에 해당하는 유저가 없습니다",
      })
    }

    //2.데이터 베이스에서 요청한 E-mail이 있다면 비밀번호가 같은지 확인
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({
          loginSuccess: false,
          message: "비밀번호가 틀렸습니다.",
        })

      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err)

        res
          .cookie("x_auth", user.token)
          .status(200)
          .json({ loginSuccess: true, userId: user._id })
      })
    })
  })
})

// role 1 어드민    role 2 특정 부서 어드민
// role 0 -> 일반유저   role 0이 아니면  관리자
app.get("/api/users/auth", auth, (req, res) => {
  //여기 까지 미들웨어를 통과해 왔다는 얘기는  Authentication 이 True 라는 말.
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image,
  })
})

app.get("/api/users/logout", auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
    if (err) return res.json({ success: false, err })
    return res.status(200).send({
      success: true,
    })
  })
})
const port = 5000

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
)
