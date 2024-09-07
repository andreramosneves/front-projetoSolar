import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface ProjectList {
  id: number;
  name: string;
  instalacao: string;
  uf: string;
}


const ProjectList: React.FC = () => {
  //Para Navegação
  const navigate = useNavigate();  

  const [data, setData] = useState<TypeInstallationList[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<ProjectList[]>('http://localhost:8000/api/project');
        setData(response.data.data.data);
      } catch (err) {
        setError('Erro ao carregar os dados');
      } finally {
        setLoading(false);
      }
    };
    fetchData();

  }, []); // O array vazio garante que o efeito só execute uma vez, após o primeiro render
  const handleDetails = async (id: number) => {

      navigate('/project_detail/' + id);

  }

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8000/api/project/${id}`);
      // Remove o item excluído da lista
      setData(data.filter(item => item.id !== id));
    } catch (err) {
      setError('Erro ao excluir o item');
    }
  };

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Instalação</th>
          <th>UF</th>
          <th>Excluir?</th>
          <th>Itens</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.client_name}</td>
            <td>{item.type_installation_name}</td>
            <td>{item.uf_name}</td>
            <td><button onClick={() => handleDelete(item.id)}>Excluir</button></td>
            <td><button onClick={() => handleDetails(item.id)}>Detalhes</button></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProjectList;