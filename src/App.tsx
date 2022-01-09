import { Login } from "./pages/Login/Login"
import { Home } from "./pages/Home"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import { PrivateRoute } from "./components/PrivateRouter"
import { Adocao } from "./pages/Adocao"
import { Add } from "./pages/Pet/Add"
import { All } from "./pages/Pet/All"
import { SignUp } from "./pages/SignUp/SignUp"
import { MyPets } from "./pages/MyPets"
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
        <PrivateRoute exact path="/pet/all" component={All} />
        <PrivateRoute exact path="/pet/my-pets" component={MyPets} />
      </Switch>
    </BrowserRouter>
  )
}