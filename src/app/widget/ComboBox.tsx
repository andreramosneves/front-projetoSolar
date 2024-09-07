import React, { useState, useEffect } from 'react';

const ComboBox = ({ apiUrl, labelKey = 'name', id, onOptionChange }) => {
  // Estado para armazenar as opções e o valor selecionado
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        setError(err.message);
        setLoading(false);
      }
    };

    fetchOptions();
  }, [apiUrl]);

  // Função para lidar com a mudança de seleção
  const handleChange = (event) => {
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
    <div>
      <select id={id} value={selectedOption} onChange={handleChange}>
        <option value="">Selecione uma opção</option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option[labelKey]} {/* Usa a chave personalizada */}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ComboBox;
