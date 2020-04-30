import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { loginUser } from "../../../_action/user_action"
import { withRouter } from "react-router-dom"
function LoginPage(props) {
  const dispatch = useDispatch()

  const [Email, setEmail] = useState("")
  const [Password, setPassword] = useState("")

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value)
  }
  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value)
  }
  const onSubmitHandler = (event) => {
    event.preventDefault() //page 리프레시 방지

    let body = {
      email: Email,
      password: Password,
    }

    dispatch(loginUser(body)).then((res) => {
      if (res.payload.loginSuccess) {
        props.history.push("/")
      } else {
        alert("error")
      }
    })
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center", //가로순서
        alignItems: "center", // 세로순서
        width: "100%",
        height: "100vh",
      }}
    >
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={onSubmitHandler}
      >
        <label>Email</label>
        <input type="email" value={Email} onChange={onEmailHandler} />
        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />
        <br />
        <button>login</button>
      </form>
    </div>
  )
}

export default withRouter(LoginPage)
