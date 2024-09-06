'use client'; // Essa diretiva transforma o componente em um Client Component
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const ProjectForm = () => {
    //Para Navegação
    const navigate = useNavigate();  
    // Definir o estado para os inputs do formulário
    const [client_id, setClientId] = useState('');
    const [type_installation_id, setTypeInstallationId] = useState('');
    const [uf_id, setUfId] = useState('');
    const [equipaments, setEquipaments] = useState('');
    const [resposta, setResposta] = useState(null);

    // Função para lidar com a submissão do formulário
    const handleSubmit = async (event) => {
      event.preventDefault(); // Evitar reload da página
      
      // Criar o objeto com os dados do formulário
      const dadosFormulario = {
        client_id,
        type_installation_id,
        uf_id,
        equipaments
      };

      try {
        // Fazer uma requisição POST para a API
        const response = await fetch('http://localhost:8000/api/project', {
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
        setResposta(`Erro: ${error.message}`);
      }
    };

    const handleRedirect = () => {
      // Redireciona para a página "Projetos"
      navigate('/project_list');
    };

  
  return (
    <main className="flex flex-col items-center justify-between p-24">
     <h1>Formulário de Projeto</h1>
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
              <input
                id="type_document"
                value={type_document}
                onChange={(e) => setTypeDocument(e.target.value)}
                required
              />
            </div>

            <button type="submit">Criar Projeto</button>
          </form>
           
          {resposta && <p>{resposta}</p>}
          <button onClick={handleRedirect}>Listar Projetos</button>
    </main>
  );
}
export default ProjectForm;
