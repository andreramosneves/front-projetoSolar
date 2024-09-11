'use client'; // Essa diretiva transforma o componente em um Client Component
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const ClientePost = () => {
    //Para Navegação
    const navigate = useNavigate();  
    // Definir o estado para os inputs do formulário
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [document, setDocument] = useState('');
    const [type_document, setTypeDocument] = useState('');
    const [resposta, setResposta] = useState<string | null>(null);

    // Função para lidar com a submissão do formulário
    const handleSubmit = async  (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault(); // Evitar reload da página
      
      // Criar o objeto com os dados do formulário
      const dadosFormulario = {
        name,
        email,
        phone,
        document,
        type_document
      };

      try {
        // Fazer uma requisição POST para a API
        const response = await fetch(apiUrl + '/api/client', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dadosFormulario),
        });
        console.log(dadosFormulario);
        // Verificar se a requisição foi bem-sucedida
        if (response.ok) {
          const dadosResposta = await response.json();
          setResposta(`Sucesso: ${dadosResposta.mensagem}`);
        } else {
          if (response.status === 422) {
            const errorData = await response.json();
            setResposta(`Erro 422: ${JSON.stringify(errorData.errors) || 'Dados inválidos'}`);
          } else {
            setResposta('Erro ao enviar o formulário.');
          }
        }
      } catch (error) {
          if (error instanceof Error) {
            setResposta(`Erro: ${error.message}`);
          } else {
            setResposta('Ocorreu um erro desconhecido');
          }
        }
    };

    const handleRedirect = () => {
      // Redireciona para a página "About"
      navigate('/client_list');
    };

  
  return (
    <main className="flex flex-col items-center justify-between p-24">
     <h1>Formulário de Cliente</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name">Nome:</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="phone">Phone:</label>
              <input
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="document">Document:</label>
              <input
                id="document"
                value={document}
                onChange={(e) => setDocument(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="type_document">Type Document:</label>
              <select id="type_document" onChange={(e) => setTypeDocument(e.target.value)}>
                <option value="">Selecione uma opção</option>
                  <option key="cpf" value="cpf">CPF</option>
                  <option key="cnpj" value="cnpj">CNPJ</option>
              </select>
            </div>

            <button type="submit">Enviar</button>
          </form>
           
          {resposta && <p>{resposta}</p>}
          <button onClick={handleRedirect}>Listar Clientes</button>
    </main>
  );
}
export default ClientePost;
