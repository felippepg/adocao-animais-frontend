import { useEffect, useState } from "react"
import { NavBar } from "../../components/NavBar"
import { api } from "../../helpers/api"
import global from "../../styles/global.module.scss"
import style from './style.module.scss'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from "@mui/material"

const token = localStorage.getItem('TOKEN')
const userId = localStorage.getItem('USER_ID') as string

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

interface Adoption { 
  adoption:[
    {
      adoption:[{
        id: number
        dateAdoption: string
        pet:{
          name: string,
          age: string,
          type: {
            name: string
          }
        }
      }]
    }
  ]
}

export const MyPets = () => {
  const [pet, setPet ] = useState<Adoption>()

  let config = {
    headers: {
      'Authorization': 'Bearer ' + token
    },
  }

  useEffect(() => {
    api.post<Adoption>('/adoption/my-pets', {userId}, config)
      .then(response => setPet(response.data))
    
  },[])

  const formatData = (data: string, id: number) => {
    const dataFormatada = new Date(data).toLocaleDateString('pt-BR', {timeZone: 'UTC'})
    console.log(pet)
    return (
      <TableCell key={id} align="right">{dataFormatada}</TableCell>
    )
  }
  return(
    <div className={global.container}>
      <NavBar/>
      <ThemeProvider theme={darkTheme}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Nome do Animal</TableCell>
                <TableCell align="right">Idade</TableCell>
                <TableCell align="right">Tipo</TableCell>
                <TableCell align="right">Data de adoção</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pet?.adoption[0].adoption.map((item, index) => {
                return (
                  <TableRow
                    key={index}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {item.pet.name}
                    </TableCell>
                    <TableCell align="right">{item.pet.age} meses</TableCell>
                    <TableCell align="right">{item.pet.type.name}</TableCell>
                    {formatData(item.dateAdoption, item.id)}
                  </TableRow>
                )
              })}
          </TableBody>
          </Table>
        </TableContainer>
      </ThemeProvider>
      
    </div>
  )
}

{/* <TableBody>
{pet?.adoption[0].adoption.map((item, index) => {
  <TableRow
    key={item.id}
    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
  >
  <TableCell component="th" scope="row">
  {item.pet.name}
  </TableCell>
  <TableCell align="right">{item.pet.age}</TableCell>
  <TableCell align="right">{item.pet.type.name}</TableCell>
  <TableCell align="right">{formatData(item.dateAdoption, item.id)}</TableCell>
  </TableRow>
})}
</TableBody> */}