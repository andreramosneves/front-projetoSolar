import React, { useState, useEffect } from 'react';
import axios from 'axios';

import ComboBox from '../../app/widget/ComboBox';
import Link from 'next/link';
import HomePage from '../../app/page';

import {useRouter} from 'next/dist/client/router';


const apiUrl = process.env.NEXT_PUBLIC_API_URL;

interface ApiResponse<T> {
  data: T;
}


interface pivot{
  project_id: number;
  equipament_id: number;
  quantity: number;
}

interface Equipament{
  id: number;
  name: string;
  pivot: pivot;
}


interface Project {
  id: number;
  name: string;
  instalacao: string;
  uf: string;
  equipaments: Equipament[];
}


const ProjectDetail: React.FC = () => {
  const router = useRouter();
  const id = router.query.id;   

  const [equipament_id, setEquipament] = useState('');
  const [quantity, setQuantity] = useState('');

  const [data, setData] = useState<Equipament[]>([]);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [resposta, setResposta] =  useState<string | null>(null);

  // Variavel somente para controlar a atualização do meu estado
  const [dadosAtualizados, setDadosAtualizados] = useState(0);

  useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get<ApiResponse<Project>>(`${apiUrl}/api/project/${id}`);
          //setData(response.data.data.uf);
          setData(response.data.data.equipaments);
        } catch (err) {
          setError('Erro ao carregar os dados');
        } finally {
          setLoading(false);
        }
      };
      fetchData();
  }, [dadosAtualizados]); 

const handleSubmitPut = async (id: number, id2:number) =>  {
      //event.preventDefault(); // Evitar reload da página
      
      // Criar o objeto com os dados do formulário
      const dadosFormulario = {
        quantity
      };

      console.log(dadosFormulario);

      try {
        // Fazer uma requisição POST para a API
        const response = await fetch(`${apiUrl}/api/project_equipament/${id}/${id2}`, {
          method: 'PUT',
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
          /*Forço alteração na minha variavel que executa a rederização*/
          atualizarTabela();          
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


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault(); // Evitar reload da página
      
      // Criar o objeto com os dados do formulário
      const dadosFormulario = {
        quantity
      };

      console.log(dadosFormulario);

      try {
        // Fazer uma requisição POST para a API
        const response = await fetch(`${apiUrl}/api/project_equipament/${id}/${equipament_id}`, {
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
          /*Forço alteração na minha variavel que executa a rederização*/
          atualizarTabela();          
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

  function atualizarTabela(){
    setDadosAtualizados(dadosAtualizados + 1);    
  }

  const handleDelete = async (id: number, id2:number) => {
    try {
      await axios.delete(`${apiUrl}/api/project_equipament/${id}/${id2}`);
      // Remove o item excluído da lista
      setData(data.filter(item => item.pivot.equipament_id !== id2));
    } catch (err) {
      setError('Erro ao excluir o item');
    }finally{

    }
  };

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  const apiUrlEquipaments = apiUrl + '/api/equipament';

  return (
    <section>
      <HomePage />
      <section className="flex flex-col items-center justify-between">
            <form onSubmit={handleSubmit}>
              <div>
                  <label htmlFor="equipament_id">Equipamentos</label>
                  <ComboBox
                   id='equipament_id' 
                   apiUrl={apiUrlEquipaments} 
                   onOptionChange={setEquipament}
                  />
              </div>
              <div>
                  <label htmlFor="quantity">Quantidade:</label>
                  <input
                    type="number"
                    id="quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
              </div>
              <button type="submit">Adicionar Item</button>
          </form>
          {resposta && <p>{resposta}</p>}


        <div>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Instalação</th>
                <th>Quantidade</th>
                <th>Excluir?</th>
              </tr>
            </thead>
            <tbody>          
              {data.map((item) => (
                <tr key={item.pivot.equipament_id}>
                  <td>{item.pivot.equipament_id}</td>
                  <td>{item.name}</td>
                  <td>{item.pivot.quantity}<button onClick={() => handleSubmitPut(item.pivot.project_id,item.pivot.equipament_id)}>Alterar Qtd</button>
                  
                  </td>
                  <td><button className="btn btn-danger btnMenu"  onClick={() => handleDelete(item.pivot.project_id,item.pivot.equipament_id)}>
                  <i className="bi bi-trash"></i>  
                  </button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </section>

  );
};

export default ProjectDetail;