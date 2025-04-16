import { useState } from "react";
import Navbar from "../components/NavBar";
import styles from "./styles/Gerar.module.css";
import microfone from "../assets/microfone.png";
import send from "../assets/enviar-mensagem.png";
import mascaras from "../assets/mascaras.png";
import img from "../assets/carregar.png";
import axios from "axios";

export default function Gerar() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [story, setStory] = useState("");
  const [error, setError] = useState(null);

  const API_KEY ="AIzaSyBpuzyor1zOBRf5eXqI7FGtAndOUVNS5cg";
  const API_URL =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent";

  const handleSend = async (e) => {
    e.preventDefault();

    if (!prompt.trim()) {
      alert("Por favor, descreva a história que deseja gerar.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        API_URL,
        {
          contents: [
            {
              role: "user",
              parts: [{ text: prompt }],
            },
          ],
        },
        {
          params: { key: API_KEY },
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log("Resposta da API:", response.data);

  
      const generatedText =
        response.data.candidates?.[0]?.content?.parts?.[0]?.text || "História não encontrada.";

      setStory(generatedText);
    } catch (err) {
      console.error("Erro ao gerar a história:", err);

      setError(
        err.response?.data?.error?.message || "Erro desconhecido. Tente novamente."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <h1 className={styles.Titlle}>O quê deseja Criar?</h1>
      <form onSubmit={handleSend} className={styles.formGerar}>
        <textarea
          wrap="hard"
          className={styles.inpGerar}
          placeholder="Descreva a história que deseja gerar"
          maxLength="400"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <div className={styles.containerBtnIcon}>
          <button className={styles.btnMicrofone} type="button">
            <img className={styles.microfone} src={microfone} alt="Microfone" />
          </button>
          <button className={styles.btnSend} type="submit" disabled={loading}>
            <img className={styles.send} src={send} alt="Enviar" />
            {loading && <span>Carregando...</span>}
          </button>
        </div>
        <div className={styles.containerInputTitle}>
          <p
            style={{
              position: "absolute",
              left: "1.5rem",
              top: "0.5rem",
              fontWeight: "300",
              opacity: "30%",
            }}
          >
            (opcional)
          </p>
          <input
            className={styles.inputTitle}
            type="text"
            placeholder="Escreva o título da história"
          />
          <div style={{ display: "flex" }}>
            <button className={styles.btnImg} type="button">
              <img src={img} alt="Capa" />
              Capa
            </button>
            <button className={styles.btnMascaras} type="button">
              <img src={mascaras} alt="Atores" />
              Actores
            </button>
          </div>
        </div>
      </form>

      {story && (
        <div className={styles.storyContainer}>
          <h2>História Gerada:</h2>
          <p>{story}</p>
        </div>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}
    </>
  );
}
