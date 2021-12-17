import style from './style.module.scss'
export const Home = () => {

  const handleLogout = () => {
    localStorage.removeItem('TOKEN')
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
                  <li><a href="/add-pet">Cadastrar Pet</a></li>
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
            <a href="#">Adotar um Pet</a>
            <a href="#">Sobre Nós</a>
          </div>
        </div>
      </div>
    </div>
  )
}
