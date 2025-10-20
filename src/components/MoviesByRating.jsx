import { useState, useEffect } from 'react';
import { carregarFilmesPorClassificacaoAPI } from '../services/api';

export default function VerFilmesPorClassificacao() {
  const [filmesPorClassificacao, setFilmesPorClassificacao] = useState([]);

  async function carregarFilmesPorClassificacao() {
    try {
      const data = await carregarFilmesPorClassificacaoAPI();
      setFilmesPorClassificacao(data);
    } catch (error) {
      console.error('Erro ao carregar filmes:', error);
    }
  }

  useEffect(() => {
    carregarFilmesPorClassificacao();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-md p-4 min-w-72 h-fit">
      <h2 className="text-lg font-semibold mb-3">Filmes por Classificação</h2>

      <div>
        {filmesPorClassificacao.map((item) => (
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