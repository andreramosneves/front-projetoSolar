import React, { useState, useEffect } from 'react';

import axios from 'axios';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

import Link from 'next/link';
import HomePage from '../../app/page';

interface ApiResponse<T> {
  data: T;
}

interface Pagination {
  data: ProjectList[];
  current_page: string;
  next_page:string;
  last_page:string;
  total:string;
}


interface ProjectList {
  id: number;
  client_name: string;
  type_installation_name: string;
  uf_name: string;
}


const ProjectList: React.FC = () => {
  const [data, setData] = useState<Pagination>(({ current_page: "1", next_page: "1", last_page: "1", total : "0" ,data: [] }));
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<ApiResponse<Pagination>>(apiUrl + '/api/project');
        
        setData(response.data.data);
        //setData(response.data.data.data);
      } catch (err) {
        setError('Erro ao carregar os dados');
      } finally {
        setLoading(false);
      }
    };
    fetchData();

  }, []); // O array vazio garante que o efeito só execute uma vez, após o primeiro render

  
  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${apiUrl}/api/project/${id}`);
      setData(data => ({
        ...data, // Gera uma cópia do meu dado antigo
        data: data.data.filter(item => item.id !== id), 
      }));

    } catch (err) {
      setError('Erro ao excluir o item');
    }
  };
  

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section>
      <HomePage />
      <section className="flex flex-col items-center justify-between">

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
            {data?.data?.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.client_name}</td>
                <td>{item.type_installation_name}</td>
                <td>{item.uf_name}</td>
                <td><button onClick={() => handleDelete(item.id)}>Excluir</button></td>
                <td><Link href={"/project/" + item.id}>Detalhes</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </section>
  );
};

export default ProjectList;