import { combineReducers } from "redux"
import user from "./user_reducer"

//콤바인리듀서는 여러가지의 리듀서를 하나로 합쳐준다.

const rootReducer = combineReducers({
  user,
})

export default rootReducer
