import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { registerUser } from "../../../_action/user_action"
import { withRouter } from "react-router-dom"

function RegisterPage(props) {
  const dispatch = useDispatch()

  const [Email, setEmail] = useState("")
  const [Name, setName] = useState("")
  const [Password, setPassword] = useState("")
  const [ConfirmPassword, setConfirmPassword] = useState("")

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value)
  }

  const onNameHandler = (event) => {
    setName(event.currentTarget.value)
  }

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value)
  }

  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.currentTarget.value)
  }
  const onSubmitHandler = (event) => {
    event.preventDefault() //page 리프레시 방지

    if (Password !== ConfirmPassword) {
      return alert("비밀번호와 비밀번호 확인은 같아야 합니다.")
    }

    let body = {
      email: Email,
      name: Name,
      password: Password,
    }

    dispatch(registerUser(body)).then((res) => {
      if (res.payload.success) {
        props.history.push("/login")
      } else {
        alert("Failed to sign up")
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

        <label>Name</label>
        <input type="text" value={Name} onChange={onNameHandler} />

        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />

        <label>Confirm Password</label>
        <input
          type="password"
          value={ConfirmPassword}
          onChange={onConfirmPasswordHandler}
        />
        <br />
        <button>회원 가입</button>
      </form>
    </div>
  )
}

export default withRouter(RegisterPage)
