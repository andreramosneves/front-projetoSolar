import React, { useState, useEffect } from 'react';
import axios from 'axios';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;


interface ApiResponse<T> {
  data: T[];
}

interface EquipamentList {
  id: number;
  name: string;
}


const EquipamentList: React.FC = () => {
  const [data, setData] = useState<EquipamentList[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<ApiResponse<EquipamentList>>(apiUrl + '/api/equipament');
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
      await axios.delete(`${apiUrl}/api/equipament/${id}`);
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
          <th>Excluir?</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td><button onClick={() => handleDelete(item.id)}>Excluir</button></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EquipamentList;