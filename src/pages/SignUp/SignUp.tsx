import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import { api } from "../../helpers/api"
import style from './style.module.scss'

export const SignUp = () => {
  const [name, setName] = useState('')
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [error, setError] = useState('')
  // const history = useHistory()
  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault()
    setError('')

    if(!login || !password || !name) {
      setError('Preencha os campos corretamente')
      return
    }

    if(password !== repeatPassword) {
      setError('As senhas não coincidem, favor tente novamente')
      return
    }

    api.post('/register', { name, login, password }).then((response) => {

      if(response.data.error) {
        return setError(response.data.error)
      } else {
        window.location.href="/signin"
        return
      }
    }).catch((error) => console.log(error)

  )}

  return(
    <div className={style.loginWrapper}>
      <h1>Cadastro de Usuário</h1>
      <form onSubmit={handleLogin}>
        <input 
          type="text" 
          name="name" 
          id="name"
          placeholder="Insira o seu nome" 
          value={name} onChange={(event) => setName(event.target.value)} 
        />
        <br/>
        <input 
          type="text" 
          name="login" 
          id="login"
          placeholder="Digite o login de sua preferencia" 
          value={login} onChange={(event) => setLogin(event.target.value)} 
        />
        <br/>
        <input 
          type="password" 
          name="password" 
          id="password" 
          placeholder="Insira a sua senha"
          value={password} onChange={(event) => setPassword(event.target.value)}
          />
        <br/>
        <input 
          type="password" 
          name="password" 
          id="password" 
          placeholder="Repita a sua senha"
          value={repeatPassword} onChange={(event) => setRepeatPassword(event.target.value)}
          />
        <br/>
        <input className={style.button} type="submit" value="Registrar-se" />
        {error && <div className={style.errorMessage}>{error}</div>}
        <a href="/signin">Já possui cadastro? Faça seu login agora</a>
      </form>
    </div>
  )
}