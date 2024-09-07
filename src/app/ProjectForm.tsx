'use client'; // Essa diretiva transforma o componente em um Client Component
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ComboBox from './widget/ComboBox';

const ProjectForm = () => {
    //Para Navegação
    const navigate = useNavigate();  
    // Definir o estado para os inputs do formulário
    const [client_id, setClientId] = useState('');
    const [type_installation_id, setTypeInstallationId] = useState('');
    const [uf_id, setUfId] = useState('');
    const [equipament_id, setEquipament] = useState('');
    const [equipament, setEquipaments] = useState([]);
    const [newItem, setNewItem] = useState(''); // Estado para armazenar o valor do novo item
    const [quantity, setQuantity] = useState('');
    const [resposta, setResposta] = useState(null);

    // Função para lidar com a submissão do formulário
    const handleSubmit = async (event) => {
      event.preventDefault(); // Evitar reload da página
      
      // Criar o objeto com os dados do formulário
      const dadosFormulario = {
        client_id,
        type_installation_id,
        uf_id,
        equipament
      };

      console.log(dadosFormulario);

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
          //Limpa memória, Poderia chamar uma função para limpar os dados, mas como é projeto de teste;
          setEquipaments([]);
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

    const handleAddItem = (event) => {
      // Redireciona para a página "Projetos"
      event.preventDefault();     
      if (quantity.trim() !== '' && equipament_id.trim() != '') {
        const my_equipament = {
          id:equipament_id,
          quantity:quantity
        };
        //setEquipaments([...equipaments, my_equipament]); // Adiciona o novo item à lista de itens
        equipament.push(my_equipament);
        setQuantity('');
        setEquipament('');
      }
      
    };



    /* Combobox que quero carregar*/
    const apiUrlUf = 'http://localhost:8000/api/uf'; // URL da sua API
    const apiUrlClient = 'http://localhost:8000/api/client'; // URL da sua API
    const apiUrlType = 'http://localhost:8000/api/type_installation'; // URL da sua API
    const apiUrlEquipaments = 'http://localhost:8000/api/equipament';
  return (
    <main className="flex flex-col items-center justify-between p-24">
     <h1>Formulário de Projeto</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="uf_id">Uf:</label>
              <ComboBox
               id='uf_id' 
               apiUrl={apiUrlUf} 
               labelKey="uf"
               value={uf_id} 
               required 
               onOptionChange={setUfId}
               />
              <ComboBox 
              />              
            </div>
            <div>
              <label htmlFor="client_id">Cliente:</label>
              <ComboBox
               id='client_id' 
               apiUrl={apiUrlClient} 
               value={client_id} 
               required 
               onOptionChange={setClientId}
               />
              <ComboBox 
              />              
            </div>
            <div>
              <label htmlFor="uftype_installation_id">Tipo de Instalação:</label>
              <ComboBox
               id='type_installation_id' 
               apiUrl={apiUrlType} 
               value={type_installation_id} 
               required 
               onOptionChange={setTypeInstallationId}
               />
              <ComboBox 
              />              
            </div>
            <div style={{display: "flex"}} >
              <label htmlFor="equipaments_id">Equipamentos</label>
              <ComboBox
               id='equipaments_id' 
               apiUrl={apiUrlEquipaments} 
               value={equipament_id} 
               required 
               onOptionChange={setEquipament}
               />
              <ComboBox />              

              <label htmlFor="quantity">Quantidade:</label>
              <input
                type="number"
                id="quantity"
                default="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
              <button onClick={handleAddItem}>Adicionar Equipamento</button>
            </div>
            <div>
              <p id="equip_id">Equipamentos Adicionados:</p>
              {/* Exibe os itens adicionados em memória */}
              <ul>
                {equipament.map((item) => (
                  <li>Id Adicionado:{item.id}</li>
                ))}
              </ul>
            </div>

            <button type="submit">Criar Projeto</button>
          </form>
           
          {resposta && <p>{resposta}</p>}
          <button onClick={handleRedirect}>Listar Projetos</button>
    </main>
  );
}
export default ProjectForm;
