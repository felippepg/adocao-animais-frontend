import { Login } from "./pages/Login"
import { Home } from "./pages/Home"
import { BrowserRouter, Route, Switch } from "react-router-dom"

export const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login">
          <Login/>
        </Route>
        <Route exact path="/">
          <Home/>
        </Route>
      </Switch>
    </BrowserRouter>
  )
}