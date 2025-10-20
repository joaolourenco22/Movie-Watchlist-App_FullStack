import { useState, useEffect } from 'react';
import { carregarFilmesAPI } from '../services/api';

export default function CarregarFilmes() {
  const [filmes, setFilmes] = useState([]);

  async function carregarFilmes() {
    try {
      const data = await carregarFilmesAPI();
      setFilmes(data);
    } catch (error) {
      console.error('Erro ao carregar filmes:', error);
    }
  }

  useEffect(() => {
    carregarFilmes();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-md p-4 min-w-72 h-fit">
      <h2 className="text-lg font-semibold mb-3">Filmes</h2>

      <div>
        {filmes.map((item) => (
          <div key={item._id}>
            {item.nome}
          </div>
        ))}
      </div>
    </div>
  );
}