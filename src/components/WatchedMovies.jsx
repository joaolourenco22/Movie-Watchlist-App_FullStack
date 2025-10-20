import { useState, useEffect } from 'react';
import { carregarFilmesVistosAPI } from '../services/api';

export default function VerFilmesVistos() {
  const [filmesVistos, setFilmesVistos] = useState([]);

  async function carregarFilmesVistos() {
    try {
      const data = await carregarFilmesVistosAPI();
      setFilmesVistos(data);
    } catch (error) {
      console.error('Erro ao carregar filmes vistos:', error);
    }
  }

  useEffect(() => {
    carregarFilmesVistos();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-md p-4 min-w-72 h-fit">
      <h2 className="text-lg font-semibold mb-3">Filmes Vistos</h2>

      <div>
        {filmesVistos.map((item) => (
          <div key={item._id}>
            {item.nome}
          </div>
        ))}
      </div>
    </div>
  );
}