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
  current_page: number;
  last_page:number;
  total:number;
}


interface ProjectList {
  id: number;
  client_name: string;
  type_installation_name: string;
  uf_name: string;
}


const ProjectList: React.FC = () => {
  const [data, setData] = useState<Pagination>(({ current_page: 1, last_page: 1, total : 0 ,data: [] }));
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<integer>(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<ApiResponse<Pagination>>(apiUrl + '/api/project/?page=' + page);
        setData(response.data.data);
      } catch (err) {
        setError('Erro ao carregar os dados' + err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();

  }, [page]); // O array vazio garante que o efeito só execute uma vez, após o primeiro render

  const handlePage = (pg: number) => {
      if(pg >= 1 && data.last_page >= pg){
       setPage(pg);
      }
  }

  /*
  const enableButtonsPagination = () => {
      const sel = document.getElementById("pg_anterior");
        console.log("passou aqui");
      if(sel){
        console.log("passou aqui");
        sel.classList.add('disabled');
      }
  }
*/

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

      <table className="table table-50">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Nome</th>
              <th scope="col">Instalação</th>
              <th scope="col">UF</th>
              <th scope="col">Excluir?</th>
              <th scope="col">Itens</th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.client_name}</td>
                <td>{item.type_installation_name}</td>
                <td>{item.uf_name}</td>
                <td><button className="btn btn-danger btnMenu" onClick={() => handleDelete(item.id)}>
                  <i className="bi bi-trash"></i>  
                </button></td>
                <td><Link className="btn btn-warning btnMenu" href={"/project/" + item.id}><i className="bi-info-square-fill"></i> </Link></td>
              </tr>
            ))}
          </tbody>
        </table>
        <nav aria-label="...">
          Página: {page}
          <ul className="pagination">
            <li className={((page > 1) ? 'page-item' : 'page-item disabled')} >
              <a className="page-link" onClick={() => handlePage(page-1)}>Anterior</a>
            </li>
            <li className={'page-item'}>
            <a className="page-link" onClick={() => handlePage(1)} >1</a></li>
            <li className={((page+1 >= 1 && data.last_page >= page+1) ? 'page-item' : 'page-item disabled')} aria-current="page">
              <a className="page-link" onClick={() => handlePage(page+1)} >{page+1}</a>
            </li>
            <li className="page-item disabled">
              <span className="page-link">...</span>
            </li>
            <li className={((data.last_page >= page && data.last_page != 1) ? 'page-item' : 'page-item disabled')}>
            <a className="page-link"  onClick={() => handlePage(data.last_page)}>Final</a></li>
          </ul>
        </nav>


      </section>
    </section>
  );
};

export default ProjectList;