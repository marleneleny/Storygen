import Logo from "../assets/Logo.png";
import styles from "./styles/Apresentacao.module.css";
import line from "../assets/curve-line.png";
import prompt from "../assets/prompt.jpg";
import darkPrompt from "../assets/Dark-prompt.jpeg";
import lapPrompt from "../assets/lap-prompt.jpeg";
import { Link } from "react-router-dom";
export default function Apresentacao() {
  return (
    <>
      <img className={styles.logo} src={Logo} alt="logo" />
      <h2>
        Crie agora. Imagine sempre. <br />
        Faça <span style={{ color: "#7663F2" }}>história!</span>{" "}
      </h2>
      <img src={line} alt="" className={styles.curveLine} />

      <p className={styles.pg}>
        Bem-vindo ao nosso gerador de histórias! Somos apaixonados por
        criatividade e acreditamos que todos têm uma história incrível para
        contar. Nosso objetivo é tornar o processo de criar histórias divertido,
        fácil e acessível para todos.
      </p>
      <button className={styles.btn1}> Saber mais</button>
      <Link to="/gerar">
        <button className={styles.btn2}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          Começar
        </button>
      </Link>

      <div className={styles.containerIlust}>
        <img
          style={{ position: "relative", top: "5rem" }}
          className={styles.ilustracoes}
          src={lapPrompt}
          alt=""
        />
        <img
          style={{
            transform: "rotate(15deg",
            position: "relative",
            top: "7rem",
            marginLeft: "2.5rem",
          }}
          className={styles.ilustracoes}
          src={prompt}
          alt=""
        />
        <img
          style={{
            transform: "rotate(-40deg)",
            position: "relative",
            marginLeft: "5rem",
          }}
          className={styles.ilustracoes}
          src={darkPrompt}
          alt=""
        />
      </div>
    </>
  );
}
