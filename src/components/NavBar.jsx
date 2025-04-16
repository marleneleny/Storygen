import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { firestore } from "../services/firebase";
import styles from "./styles/NavBar.module.css";
import Logo from "../assets/Logo.png";
import Home from "../assets/casa.png";
import Estante from "../assets/estante.png";
import Escrevendo from "../assets/escrevendo.png";
import lapis from "../assets/lapis.png";

function Navbar() {
  const { User } = useAuth(); 
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (User) {
      if (User.type === "google") {
        setUserData(User);
      } else if (User.email) {
        firestore
          .collection("users")
          .doc(User.email)
          .get()
          .then((doc) => {
            if (doc.exists) {
              setUserData(doc.data());
            }
          })
          .catch((error) =>
            console.error("Erro ao buscar dados no Firestore:", error)
          );
      }
    }
  }, [User]);

  // Função local para obter o avatar válido
  const getValidAvatar = (photoURL) => {
    const defaultAvatar = "https://via.placeholder.com/150"; // Avatar padrão
    return photoURL?.startsWith("http") ? photoURL : defaultAvatar;
  };

  return (
    <>
      <nav>
        <img className={styles.logo} src={Logo} alt="" />
        <hr className={styles.barra}/>
        <img
          src={getValidAvatar(userData?.avatar)} // Usando a função local
          alt="Avatar do usuário"
          style={{ width: "58px", height: "57px", borderRadius: "50%", margin:'1.5rem 0rem 0rem 3rem' }}
        />
        <div className={styles.Li}>
          <div className={styles.IconContainer}>
            <img className={styles.icon} src={Home} alt="Home" />
            <p>Home</p>
          </div>

          <div className={styles.IconContainer}>
            <img className={styles.icon} src={Escrevendo} alt="Criações" />
            <p>Criações</p>
          </div>

          <div className={styles.IconContainer}>
            <img className={styles.icon} src={Estante} alt="Gerar" />
            <p>Gerar</p>
          </div>
        </div>
      </nav>
      <div className={styles.circle}></div>
      <img className={styles.contentCircle} src={lapis} alt="" />
    </>
  );
}

export default Navbar;
