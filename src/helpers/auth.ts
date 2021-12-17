import jwtDecode from "jwt-decode"

export const isLogged = () => {
  const token = localStorage.getItem('TOKEN')
  try {
    jwtDecode(token as string)
    return true
  } catch (error) {
    return false
  }
}