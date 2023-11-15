import axios, { AxiosError } from 'axios'; 
import { parseCookies } from 'nookies'; 
import { AuthTokenError } from './errors/AuthTokenError'; 
import { signOut } from '../contexts/AuthContext'; 

// A função setupAPIClient aceita um contexto 'ctx' como argumento, que é opcional.
export function setupAPIClient(ctx = undefined) {
  // Parseia os cookies do contexto fornecido (ou do navegador, se ctx for undefined).
  let cookies = parseCookies(ctx);

  const api = axios.create({
    baseURL: 'http://localhost:3333', // URL base para as requisições
    headers: {
      Authorization: `Bearer ${cookies['@nextauth.token']}` // Define o cabeçalho de autorização com o token de autenticação presente nos cookies
    }
  });

  // Adiciona um interceptor de resposta para tratar erros.
  api.interceptors.response.use(
    response => {
      return response; // Retorna a resposta sem alterações se não houver erros.
    },
    (error: AxiosError) => {
      if (error.response.status === 401) {
        // Se a resposta tiver o código de status 401 (não autorizado), lidamos com isso:
        if (typeof window !== undefined) {
          // Se o código estiver sendo executado no navegador (client-side), chama a função signOut() para desconectar o usuário.
          signOut();
        } else {
          // Se não estiver no navegador (server-side), retorna uma promessa rejeitada com um erro de autenticação personalizado (AuthTokenError).
          return Promise.reject(new AuthTokenError());
        }
      }

      // Retorna a Promise rejeitada com o erro original se não for um erro de autenticação.
      return Promise.reject(error);
    }
  );

  return api; // Retorna a instância do Axios configurada com os interceptores.
}
