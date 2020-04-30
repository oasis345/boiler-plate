import React from "react"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import LandingPage from "./components/views/LandingPage/LandingPage"
import LoginPage from "./components/views/LoginPage/LoginPage"
import RegisterPage from "./components/views/RegisterPage/RegisterPage"
import Auth from "./HOC/auth"

// HOC는 다른 컴포넌트를 감싸준다 구조 이해하기 null ,true ,false 등 권한에 따른 페이지 이동가능여부 넣기
//3번쨰 인자로 true를 주면 관리자만 이용가능
function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
        </Switch>
      </div>
    </Router>
  )
}

export default App
