'use client'; // Essa diretiva transforma o componente em um Client Component
import React, { useState } from 'react';

import Link from 'next/link';
import HomePage from '../app/page';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const TypeIntallationForm = () => {
    // Definir o estado para os inputs do formulário
    const [name, setName] = useState('');
    const [resposta, setResposta] =  useState<string | null>(null);

    // Função para lidar com a submissão do formulário
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault(); // Evitar reload da página
      
      // Criar o objeto com os dados do formulário
      const dadosFormulario = {
        name
      };

      try {
        // Fazer uma requisição POST para a API
        const response = await fetch(apiUrl + '/api/type_installation', {
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
  
  return (
    <section>
      <HomePage/>
      <section className="form flex flex-col items-center justify-between">
       <h1>Formulário de Instalação</h1>
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
            <Link href="/type_installation/list">Listagem</Link>
      </section>
    </section>
  );
}
export default TypeIntallationForm;
