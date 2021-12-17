import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import { api } from "../../helpers/api"
import style from './style.module.scss'
export const Login = () => {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const history = useHistory()
  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault()
    setError('')

    if(!login || !password) {
      setError('Preencha os campos corretamente')
      return
    }

    api.post('/login', { login, password }).then((response) => {

      if(response.data.error) {
        return setError(response.data.error)
      } else {
        localStorage.setItem('TOKEN', response.data.token)
        console.log(response.data)
        window.location.href="/"
        return
      }
    }).catch((error) => console.log(error)

  )}

  return(
    <div className={style.loginWrapper}>
      <h1>Acesse com a sua conta</h1>
      <form onSubmit={handleLogin}>
        <input 
          type="text" 
          name="login" 
          id="login"
          placeholder="Login" 
          value={login} onChange={(event) => setLogin(event.target.value)} 
        />
        <br/>
        <input 
          type="password" 
          name="password" 
          id="password" 
          placeholder="Password"
          value={password} onChange={(event) => setPassword(event.target.value)}
          />
        <br/>
        <input className={style.button} type="submit" value="Entrar" />
        <div className={style.errorMessage}>{error}</div>
        <a href="/signup">Não possui cadastro? Crie a sua conta agora</a>
      </form>
    </div>
  )
}