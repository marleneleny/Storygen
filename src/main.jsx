import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext"; // Importando o provider do contexto
import App from "./App";
import Cadastro from "./pages/Cadastro";
import Apresentacao from "./pages/Apresentacao";
import Gerar from "./pages/Gerar";

// Configurando as rotas
const router = createBrowserRouter([
  {
    path: "/", // Rota principal
    element: <App />, // Página principal com redirecionamento
    children: [
      {
        path: "cadastro", // Página de cadastro
        element: <Cadastro />,
      },
      {
        path: "apresentacao", // Página de apresentação
        element: <Apresentacao />,
      },
      {
        path: "gerar", // Página da geração da historia
        element: <Gerar />,
      },
    ],
  },
]);

// Renderizando a aplicação
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContextProvider>
      {" "}
      {/* Envolvendo a aplicação com o Provider */}
      <RouterProvider router={router} />
    </AuthContextProvider>
  </StrictMode>
);
