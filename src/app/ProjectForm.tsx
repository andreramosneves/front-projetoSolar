'use client'; // Essa diretiva transforma o componente em um Client Component
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ComboBox from './widget/ComboBox';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

interface Equipamento{
  id: string;
  quantity: string;
}


const ProjectForm = () => {
    //Para Navegação
    const navigate = useNavigate();  
    // Definir o estado para os inputs do formulário
    const [client_id, setClientId] = useState('');
    const [type_installation_id, setTypeInstallationId] = useState('');
    const [uf_id, setUfId] = useState('');
    const [equipament_id, setEquipament] = useState('');
    const [equipament, setEquipaments] = useState<Equipamento[]>([]);
    const [newItem, setNewItem] = useState(''); // Estado para armazenar o valor do novo item
    const [quantity, setQuantity] = useState('');
    const [resposta, setResposta] =  useState<string | null>(null);

    // Função para lidar com a submissão do formulário
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault(); // Evitar reload da página
      
      // Criar o objeto com os dados do formulário
      const dadosFormulario = {
        client_id,
        type_installation_id,
        uf_id,
        equipament
      };


      try {
        // Fazer uma requisição POST para a API
        const response = await fetch(apiUrl + '/api/project', {
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
          if (error instanceof Error) {
            setResposta(`Erro: ${error.message}`);
          } else {
            setResposta('Ocorreu um erro desconhecido');
          }
      }
    };

    const handleRedirect = () => {
      // Redireciona para a página "Projetos"
      navigate('/project_list');
    };



    const handleAddItem = (event: React.MouseEvent<HTMLButtonElement>): void => {
      event.preventDefault();
      
      if (quantity.trim() !== '' && equipament_id.trim() != '') {
        const my_equipament: Equipamento  = {
          id:equipament_id,
          quantity:quantity
        };
        //setEquipaments([...equipaments, my_equipament]); // Adiciona o novo item à lista de itens
        equipament.push(my_equipament);
        setQuantity('');
        setEquipament('');
      }
    }



    /* Combobox que quero carregar*/
    const apiUrlUf = apiUrl + '/api/uf'; 
    const apiUrlClient = apiUrl + '/api/client'; 
    const apiUrlType = apiUrl + '/api/type_installation'; 
    const apiUrlEquipaments = apiUrl + '/api/equipament';
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
               onOptionChange={setUfId}
               />
            </div>
            <div>
              <label htmlFor="client_id">Cliente:</label>
              <ComboBox
               id='client_id' 
               apiUrl={apiUrlClient} 
               onOptionChange={setClientId}
               />
            </div>
            <div>
              <label htmlFor="uftype_installation_id">Tipo de Instalação:</label>
              <ComboBox
               id='type_installation_id' 
               apiUrl={apiUrlType} 
               onOptionChange={setTypeInstallationId}
               />
            </div>
            <div style={{display: "flex"}} >
              <label htmlFor="equipaments_id">Equipamentos</label>
              <ComboBox
               id='equipaments_id' 
               apiUrl={apiUrlEquipaments} 
               onOptionChange={setEquipament}
               />

              <label htmlFor="quantity">Quantidade:</label>
              <input
                type="number"
                id="quantity"
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
