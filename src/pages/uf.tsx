'use client'; // Essa diretiva transforma o componente em um Client Component
import React, { useState } from 'react';
import Link from 'next/link';
import HomePage from '../app/page';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const UFPost = () => {
    // Definir o estado para os inputs do formulário
    const [uf, setUf] = useState('');
    const [resposta, setResposta] = useState<string | null>(null);

    // Função para lidar com a submissão do formulário
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault(); // Evitar reload da página
      
      // Criar o objeto com os dados do formulário
      const dadosFormulario = {
        uf
      };

      try {
        // Fazer uma requisição POST para a API
        const response = await fetch(apiUrl + '/api/uf', {
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
       <h1>Formulário de UF</h1>
            <form onSubmit={handleSubmit}>
              <div className="form_flex">
                <label className="label_inline" htmlFor="uf">UF:</label>
                <input
                  className="form-control"
                  type="text"
                  id="uf"
                  value={uf}
                  onChange={(e) => setUf(e.target.value)}
                  required
                />
              </div>

              <button className="btn btn-primary btnMenu" type="submit">Enviar</button>
            </form>
            <Link href="/uf/list" className="ls_l">Listagem</Link>
            {resposta && <p>{resposta}</p>}
      </section>
    </section>
  );
}
export default UFPost;
