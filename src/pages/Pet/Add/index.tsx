import { useEffect, useState } from "react"
import { NavBar } from "../../../components/NavBar"
import { api } from "../../../helpers/api"
import global from "../../../styles/global.module.scss"
import { Home } from "../../Home"
import style from './style.module.scss'
interface Situation {
  result: [{
    id:number,
    name: string
  }]
}
interface Type {
  result: [{
    id:number,
    name: string
  }]
}
interface Sex {
  result: [{
    id:number,
    name: string
  }]
}
export const Add = () => {
  const [situation, setSituations] = useState<Situation>()
  const [situationForm, setSituationForm] = useState('1')

  const [type, setType] = useState<Type>()
  const [typeForm, setTypeForm] = useState('1')

  const [sex, setSex] = useState<Sex>()
  const [sexForm, setSexForm] = useState('')

  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [bio, setBio] = useState('')
  const [error, setError] = useState('')

  const token = localStorage.getItem('TOKEN')

  let config = {
    headers: {
      'Authorization': 'Bearer ' + token
    }
  }
  useEffect(() => {

    api.get<Situation>('/situations', config).then(response => setSituations(response.data))
      .catch(error => console.log(error))
    
    api.get('/types', config).then(response => setType(response.data))
      .catch(error => console.log(error))

    api.get('/sexs', config).then(response => setSex(response.data))
      .catch(error => console.log(error))
  }, [])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault()
    setError('')
    if(!name) {
      setError('Preencha os campos corretamente')
      return
    }

    api.post('/pet/add', {
      name,
      sexId: parseInt(sexForm),
      age,
      bio, 
      situationId: parseInt(situationForm),
      typeId: parseInt(typeForm)
    }, config ).then(response => response.data.warning ? setError(response.data.warning): console.log(response.data))
      .catch(error  => console.log(error))

    return window.location.href="/"
  }
  return (
    <div className={global.container}>
      <NavBar/>
      <div className={style.title}>
        <p>PREENCHA AS INFORMAÇÕES DE CADASTRO DO PET</p>
      </div>
      <form className={style.animalForm} method="post" onSubmit={handleSubmit}>
        <input 
          type="text" 
          name="name" 
          placeholder="Nome do animal"
          onChange={(e) => setName(e.target.value)}
          className={style.animalInput}
        />
        <div className={style.inputFields}>
          <select 
            name="situation" 
            onChange={(e) => setSituationForm(e.target.value)}
          >
            {situation?.result.map((item) => {
              return(
                <option 
                  key={item.id} 
                  value={item.id} 
                >{item.name}</option>
              )
            })}
          </select>
          <select name="type"  onChange={(e) => setTypeForm(e.target.value)}>
            {type?.result.map((item) => {
              return(
                <option key={item.id} value={item.id}>{item.name}</option>
              )
            })}
          </select>
          <div className={style.inputRadio}>
            {sex?.result.map((item) => {
              return(
                <div key={item.id}>
                  {item.name} <input type="radio" 
                    name="sexId" 
                    value={item.id} 
                    onChange={(e) => setSexForm(e.target.value)}/>
                </div>
              )
            })}
          </div>
          <input 
            type="number" 
            name="age" 
            placeholder="Idade em meses"
            onChange={(e) => setAge(e.target.value)}
            className={style.animalRadioInput}
            min="0"
          />
        </div>
        <textarea 
          name="bio" 
          placeholder="Biografia do Pet"
          onChange={(e) => setBio(e.target.value)}
        />
        {error && <div className={style.errorMessage}>{error}</div>}
        <input className={style.inputSubmit} type="submit" value="Cadastrar"/>
      </form>
    </div>
  )
}