import { Redirect, Route } from "react-router"
import { isLogged } from "../helpers/auth"
export const PrivateRoute = ({component: Component, ...rest}: any) => {
  return(
    <Route
      {...rest}
      render={ 
        props => isLogged() ? (<Component {...props} />) :
        (<Redirect to={{ pathname:"/signin", state: { from: props.location}}}/>)
      }
    />
  )
}