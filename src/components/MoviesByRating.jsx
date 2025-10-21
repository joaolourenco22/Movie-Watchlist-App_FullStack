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
    <div className="p-4 min-w-72 h-fit">
      <h2 className="text-3xl text-orange-900 font-bold mb-3">FILMES POR CLASSIFICAÇÃO</h2>

      <div>
        {filmesPorClassificacao.filter(item => item.rating > 0).map((item) => (
          <div
            key={item._id}
            className="bg-orange-300 text-orange-950 m-2 p-4 rounded-lg shadow-sm flex flex-col md:flex-row justify-between hover:bg-orange-200 transition "
          >
            <div className="flex flex-col text-left">
              <p className="font-bold text-xl mb-2">{item.title}</p>
              <p className="text-sm"><span className='font-bold'>Ano:</span> {item.year}</p>
              <p className="text-sm"><span className='font-bold'>Gênero:</span> {item.genre}</p>
              <p className="text-sm"><span className='font-bold'>Status:</span> {item.watched ? 'Visto' : 'Por ver'}</p>
              <p className="text-sm"><span className='font-bold'>Classificação:</span> {item.rating}</p>
              <p className="text-xs text-gray-700">
                <span className='font-bold'>Adicionado em:</span> {new Date(item.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}