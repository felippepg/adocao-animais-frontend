import { useEffect, useState } from "react"
import { NavBar } from "../../../components/NavBar"
import { Pagination } from "../../../components/Pagination"

import { api } from "../../../helpers/api"
import global from "../../../styles/global.module.scss"
import styles from "./style.module.scss"

const token = localStorage.getItem('TOKEN')

interface Animal {
  result: [{
    id: number,
    name: string,
    age: string,
    bio: string,
    typeId: number
    situationId: number
  }]
  total: {
    _count: {
      id: number
    }
  }
}

export const All = () => {
  const [animals, setAnimals] = useState<Animal>()
  const [offSet, setOffset] = useState(0)
  const [info, setInfo] = useState('')

  let config = {
    headers: {
      'Authorization': 'Bearer ' + token
    },
  }

  useEffect(() => {
    api.get<Animal>('/pets/all/pagination?skip='+offSet+'&take=3', config)
    .then(response => setAnimals(response.data))
    .catch(error => console.log(error))

  },[offSet])

  return(
    <div className={global.container}>
      <NavBar />
      {animals?.result.length ? 
        <div className={styles.title}>
          <p>TODOS OS ANIMAIS JÁ CADASTRADOS</p>
        </div> : 
        <div className={styles.title}>
          <p>NENHUM ANIMAL FOI CADASTRADO</p>
        </div>
      }
      <div className={styles.animalWrapper} >
        {animals?.result.map((item, index) => {
          return(
            <div className={styles.animalItem} key={index}>
              <div className={styles.animalItemImg}>
                {item.typeId === 1 && (
                  <img src="../../../src/assets/dog.png" alt="cachorro" />
                )}
                {item.typeId === 2 && (
                  <img src="../../../src/assets/cat.png" alt="gato" />
                )}
                {item.typeId === 3 && (
                  <img src="../../../src/assets/bird.png" alt="passaro" />
                )}
              </div>
              <div className={styles.animalItemInfo}>
                <h2>{item.name}</h2>
                <div className={ item.situationId === 1 ? styles['disponivel'] : styles['adotado']} >{item.situationId === 1 ? 'Adotado' : 'Disponível'} </div>
                <h4>Idade - {item.age} Meses </h4>
                <p>{item.bio}</p>
              </div>
            </div>
          )
        })}
      </div>
      <br />

      {info && <div className={styles.successMessage}><div>{info}</div></div>}
      <div className={styles.paginationWrapper}>
        {animals?.total._count && (
          <Pagination 
            limit={3} 
            total={animals?.total._count.id} 
            offset={offSet}
            setOffset={setOffset}
          />
        )}
      </div>
    </div>
  )
}