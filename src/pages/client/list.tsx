import React, { useState, useEffect } from 'react';
import axios from 'axios';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
import HomePage from '../../app/page';

interface ApiResponse<T> {
  data: T[];
}

interface ClientList {
  id: number;
  name: string;
  document: string;
}


const ClientList: React.FC = () => {
  const [data, setData] = useState<ClientList[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<ApiResponse<ClientList>>(apiUrl + '/api/client');
        setData(response.data.data);
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
      await axios.delete(`${apiUrl}/api/client/${id}`);
      // Remove o item excluído da lista
      setData(data.filter(item => item.id !== id));
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
      <table className="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Nome</th>
              <th scope="col">Document</th>
              <th scope="col">Excluir?</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.document}</td>
                <td><button className="btn btn-danger btnMenu"  onClick={() => handleDelete(item.id)}>
                <i className="bi bi-trash"></i>  
                </button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </section>
  );
};

export default ClientList;