import { Login } from "./pages/Login/Login"
import { Home } from "./pages/Home"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import { PrivateRoute } from "./components/PrivateRouter"
import { Adocao } from "./pages/Adocao"
export const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/signin">
          <Login/>
        </Route>
        <PrivateRoute exact path="/" component={Home}/>
        <PrivateRoute exact path="/adocao" component={Adocao}/>
      </Switch>
    </BrowserRouter>
  )
}