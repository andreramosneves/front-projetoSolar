import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ComboBox from './widget/ComboBox';

interface ProjectDetail {
  id: number;
  name: string;
  instalacao: string;
  uf: string;
}


const ProjectDetail: React.FC = () => {
  const { id } = useParams();   
  const navigate = useNavigate();  
  
  const [equipament_id, setEquipament] = useState('');
  const [quantity, setQuantity] = useState('');

  const [data, setData] = useState<TypeInstallationList[]>([]);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [resposta, setResposta] = useState(null);

  // Variavel somente para controlar a atualização do meu estado
  const [dadosAtualizados, setDadosAtualizados] = useState(0);

  useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get<ProjectDetail[]>(`http://localhost:8000/api/project/${id}`);
          setData(response.data.data.equipaments);
          console.log('chamou consulta');
        } catch (err) {
          setError('Erro ao carregar os dados');
        } finally {
          setLoading(false);
        }
      };
      fetchData();
  }, [dadosAtualizados]); 

const handleSubmitPut = async (id: number, id2:number) =>  {
      event.preventDefault(); // Evitar reload da página
      
      // Criar o objeto com os dados do formulário
      const dadosFormulario = {
        quantity
      };

      console.log(dadosFormulario);

      try {
        // Fazer uma requisição POST para a API
        const response = await fetch(`http://localhost:8000/api/project_equipament/${id}/${id2}`, {
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
        setResposta(`Erro: ${error.message}`);
      }
    };


  const handleSubmit = async (event) => {
      event.preventDefault(); // Evitar reload da página
      
      // Criar o objeto com os dados do formulário
      const dadosFormulario = {
        quantity
      };

      console.log(dadosFormulario);

      try {
        // Fazer uma requisição POST para a API
        const response = await fetch(`http://localhost:8000/api/project_equipament/${id}/${equipament_id}`, {
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
        setResposta(`Erro: ${error.message}`);
      }
    };

  function atualizarTabela(){
    setDadosAtualizados(dadosAtualizados + 1);    
  }

  const handleDelete = async (id: number, id2:number) => {
    try {
      await axios.delete(`http://localhost:8000/api/project_equipament/${id}/${id2}`);
      // Remove o item excluído da lista
      setData(data.filter(item => item.pivot.equipament_id !== id2));
    } catch (err) {
      setError('Erro ao excluir o item');
    }finally{

    }
  };

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  const apiUrlEquipaments = 'http://localhost:8000/api/equipament';

  return (
    <div>
          <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="equipament_id">Equipamentos</label>
                <ComboBox
                 id='equipament_id' 
                 apiUrl={apiUrlEquipaments} 
                 value={equipament_id} 
                 required 
                 onOptionChange={setEquipament}
                 />
                <ComboBox />              
            </div>
            <div>
                <label htmlFor="quantity">Quantidade:</label>
                <input
                  type="number"
                  id="quantity"
                  default="1"
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
                <td><button onClick={() => handleDelete(item.pivot.project_id,item.pivot.equipament_id)}>Excluir</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectDetail;