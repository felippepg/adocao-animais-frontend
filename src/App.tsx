import { Login } from "./pages/Login/Login"
import { Home } from "./pages/Home"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import { PrivateRoute } from "./components/PrivateRouter"
import { Adocao } from "./pages/Adocao"
import { Add } from "./pages/Pet/Add"
import { SignUp } from "./pages/SignUp/SignUp"
export const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/signin">
          <Login/>
        </Route>
        <Route exact path="/signup">
          <SignUp/>
        </Route>
        <PrivateRoute exact path="/" component={Home}/>
        <PrivateRoute exact path="/adocao" component={Adocao}/>
        <PrivateRoute exact path="/pet/add" component={Add} />
      </Switch>
    </BrowserRouter>
  )
}