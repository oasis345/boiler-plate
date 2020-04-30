import React, { useEffect } from "react"
import Axios from "axios"
import { useDispatch } from "react-redux"
import { auth } from "../_action/user_action"

export default function (SpecificComponent, option, adminRoute = null) {
  // SpecificComponent 랜딩페이지를 말함
  // null => 아무나 출입이 가능한 페이지
  // true => 로그인한 유저만 출입이 가능한 페이지
  // false => 로그인한 유저는 출입 불가능한 페이지

  //app.js 에서 권한 줄 때 3번째의 아무 파라매터를 안 넣을시 null 즉 아무나 이용가능

  function AuthenticationCheck(props) {
    const dispatch = useDispatch()
    useEffect(() => {
      dispatch(auth()).then((res) => {
        console.log(res)

        //로그인 하지 않은 상태
        if (!res.payload.isAuth) {
          if (option) {
            //option 이랑 option === true 랑 같다
            props.history.push("/login")
          }
        } else {
          //로그인 한 상태
          if (adminRoute && !res.payload.isAdmin) {
            props.history.push("/") //관리자가 아닌경우
          } else {
            if (option === false) props.history.push("/")
          }
        }
      })
    }, [])

    return <SpecificComponent />
  }
  return AuthenticationCheck
}
