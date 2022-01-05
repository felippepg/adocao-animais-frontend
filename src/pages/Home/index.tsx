import style from './style.module.scss'
export const Home = () => {

  const handleLogout = () => {
    localStorage.removeItem('TOKEN')
    localStorage.removeItem('USER_ID')
    location.reload()
  }

  return(
    <div className={style.backgroundContent}>
      <div className={style.shadowImage}>
        <div className={style.shadowNavbar}>

          <div className={style.container}>
            <div className={style.menu}>
              <nav>
                <ul>
                  <li><a href="/adocao">Adotar</a></li>
                  <li><a href="#">Encontrados</a></li>
                  <li><a href="/pet/add">Cadastrar Pet</a></li>
                  <li><a href="#">Meus Pets</a></li>
                </ul>
              </nav>
              <div>
                <ul>
                <li><a onClick={handleLogout} href="#">Sair</a></li>
                </ul>
              </div>
            </div>
          </div>

        </div>

        <div className={style.container}>
          <div className={style.footerContainer}>
            <a href="/adocao">Adotar um Pet</a>
            <a href="#">Sobre Nós</a>
          </div>
        </div>
      </div>
    </div>
  )
}
