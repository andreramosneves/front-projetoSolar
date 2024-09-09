'use client'; // Essa diretiva transforma o componente em um Client Component
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const EquipamentForm = () => {
    //Para Navegação
    const navigate = useNavigate();  
    // Definir o estado para os inputs do formulário
    const [name, setName] = useState('');
    const [resposta, setResposta] = useState<string | null>(null);

    // Função para lidar com a submissão do formulário
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault(); // Evitar reload da página
      
      // Criar o objeto com os dados do formulário
      const dadosFormulario = {
        name
      };

      try {
        // Fazer uma requisição POST para a API
        const response = await fetch(apiUrl + '/api/equipament', {
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
      navigate('/equipament_list');
    };

  
  return (
    <main className="flex flex-col items-center justify-between p-24">
     <h1>Formulário de Equipamento</h1>
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
            <button type="submit">Enviar</button>
          </form>
           
          {resposta && <p>{resposta}</p>}
          <button onClick={handleRedirect}>Listar Equipamentos</button>
    </main>
  );
}
export default EquipamentForm;
