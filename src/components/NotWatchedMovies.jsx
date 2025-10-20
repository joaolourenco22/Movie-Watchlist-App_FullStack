import { useState, useEffect } from 'react';
import { carregarFilmesPorVerAPI } from '../services/api';

export default function VerFilmesPorVer() {
  const [filmesPorVer, setFilmesPorVer] = useState([]);

  async function carregarFilmesPorVer() {
    try {
      const data = await carregarFilmesPorVerAPI();
      setFilmesPorVer(data);
    } catch (error) {
      console.error('Erro ao carregar filmes por ver:', error);
    }
  }

  useEffect(() => {
    carregarFilmesPorVer();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-md p-4 min-w-72 h-fit">
      <h2 className="text-lg font-semibold mb-3">Filmes por Ver</h2>

      <div>
        {filmesPorVer.map((item) => (
          <div key={item._id}>
            {item.title} ({item.year}) - {item.genre} -{' '}
            {item.watched ? 'Visto' : 'Por ver'} - Classificação: {item.rating} - Adicionado em:{' '}
            {new Date(item.createdAt).toLocaleDateString()}
          </div>
        ))}
      </div>
    </div>
  );
}