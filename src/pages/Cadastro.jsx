import styles from './styles/App.module.css'
import Logo from '../assets/Logo.png'
import livro from '../assets/abra-o-livro.png'
import Formulario from '../components/Formulario'


export default function Cadastro() {

  return (
    <>
      <img className={styles.logo}  src={Logo} alt="logo" />
      <h1 className={styles.Title}>Entrar no storygen</h1>
      <p className={styles.pg}>Cadastre-se e Torne-se um Criador de Mundos!</p>

      <img className={styles.livro} src={livro} alt="livro" />
      <Formulario/>
    </>
  )
}

