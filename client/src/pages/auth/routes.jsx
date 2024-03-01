import {Route} from "react-router-dom"
import Login from "./Login"
import Register from "./Register"


export const loginRoutes = <Route path="/login" element={<Login />} />
export const registerRoutes = <Route path="/register" element={<Register />} />
  