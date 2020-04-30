import React, { useEffect, useState } from "react"
import axios from "axios"
import { withRouter } from "react-router-dom"
//history.push를 쓰려면 요거랑 아래 를 export할 때 감싸주어야함

function LandingPage(props) {
  useEffect(() => {
    axios.get("/api/hello").then((res) => console.log(res))
  }, [])

  const onClickHandler = () => {
    axios.get("/api/users/logout").then((res) => {
      if (res.data.success) {
        props.history.push("/login")
      } else {
        alert("로그아웃 실패")
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
      <h2>시작페이지</h2>
      <button onClick={onClickHandler}>로그아웃</button>
    </div>
  )
}

export default withRouter(LandingPage)
