import React, { useState, useEffect } from 'react';




interface ComboBoxProps {
  apiUrl: string;               
  labelKey?: string;             
  id: string;           
  onOptionChange: (value: any) => void; 
}

const ComboBox: React.FC<ComboBoxProps> = ({ apiUrl, labelKey = 'name', id, onOptionChange }) => {
  // Estado para armazenar as opções e o valor selecionado
  const [options, setOptions] = useState<any[]>([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Hook de efeito para buscar os dados da API
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Erro ao buscar dados da API');
        }
        const data = await response.json();
        setOptions(data.data); // Armazena as opções
        setLoading(false);
      } catch (err) {
          if (err instanceof Error) {
            setError(`Erro: ${err.message}`);
          } else {
            setError('Ocorreu um erro desconhecido');
          }        
        setLoading(false);
      }
    };

    fetchOptions();
  }, [apiUrl]);

  // Função para lidar com a mudança de seleção
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
    if (onOptionChange) {
      onOptionChange(event.target.value); // Passa o ID selecionado para a função callback
    }
  };

  // Renderizando o componente
  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return "";
  }

  return (
      <select className='form-control select-white' id={id} onChange={(e) => onOptionChange(e.target.value)}>
        <option value="">Selecione uma opção</option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option[labelKey]} 
          </option>
        ))}
      </select>
  );
};

export default ComboBox;
