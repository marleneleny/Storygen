import { useState, useEffect } from "react";  // Importando o useState e useEffect para gerenciar estado e ciclo de vida
import { useNavigate } from "react-router-dom";
import styles from '../pages/styles/App.module.css';
import cadeado from '../assets/cadeado.png';
import correspondencia from '../assets/correspondencia.png';
import google from '../assets/pesquisa.png';
import { firebase, auth, firestore } from '../services/firebase';
import useAuth from '../hooks/useAuth';
  
function Formulario() {
  const { User, SetUser } = useAuth();  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Controle de autenticação com Google
  useEffect(() => {
    if (User) {
      console.log(User)
      navigate("/apresentacao");
    }
  }, [User, navigate]);  // A navegação depende do estado do usuário

  // Função para login com Google
  const handleClickbtnLogin = async () => {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const result = await auth.signInWithPopup(provider);
  
      if (result.user) {
        const { uid, displayName, photoURL, email } = result.user;
        
  
        if (!displayName || !photoURL) {
          throw new Error('O usuário não tem foto ou nome.');
        }
  
        // Atualize o contexto com todas as informações
        SetUser({
          id: uid,
          avatar: photoURL,
          name: displayName,
          email, // Inclui o e-mail do usuário
          type: "google",
        });
  
        console.log('Usuário autenticado com sucesso:', result.user);
      }
    } catch (error) {
      console.error('Erro ao autenticar com Google:', error);
    }
  };
  
  
  // Função para salvar os dados do formulário
  const handleSave = async (e) => {
  e.preventDefault();

  const data = {
    email,
    password,
  };

  try {
    const ref = firestore.collection('users').doc(email); 
    await ref.set(data);
    SetUser({ email, ...data }); 
    console.log('Dados salvos com sucesso!');
    navigate("/apresentacao");
  } catch (e) {
    console.error('Erro ao salvar os dados:', e);
  }
};

  return (
    <>
      <div className={styles.inputContainer}>
        <img src={google} alt="" className={styles.Icongoogle} />
        <button onClick={handleClickbtnLogin} className={styles.btnGoogle}>
          Continuar com o Google
        </button>
        <hr className={styles.hr1} />
        <p className={styles.or}>or</p>
        <hr className={styles.hr2} />
      </div>

      <form onSubmit={handleSave}>
        <div className={styles.inputContainer}>
          <img src={correspondencia} alt="" className={styles.Iconemail} />
          <input
            className={styles.inpEmail}
            type="email"
            placeholder="Email"
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className={styles.inputContainer}>
          <img src={cadeado} alt="" className={styles.Iconsenha} />
          <input
            className={styles.inpSenha}
            type="password"
            placeholder="Senha"
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <p className={styles.pg2}>
          Já tens uma conta? <span style={{ color: '#7663F2' }}>Entrar</span>
        </p>

        <button type="submit" className={styles.btn}>
          Cadastrar
        </button>
      </form>
    </>
  );
}

export default Formulario;
