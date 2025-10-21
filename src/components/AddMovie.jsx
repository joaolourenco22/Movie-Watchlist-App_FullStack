import { useState } from 'react';
import { adicionarFilmeAPI } from '../services/api';

export default function AdicionarFilme({ onSuccess, onClose }) {
  const [nome, setNome] = useState('');
  const [ano, setAno] = useState('');
  const [genero, setGenero] = useState('');
  const [assistido, setAssistido] = useState(false);
  const [rating, setRating] = useState(0);

  async function adicionarFilme(e) {
    e.preventDefault();

    const novoFilme = {
      title: nome,
      year: parseInt(ano),
      genre: genero,
      watched: assistido,
      rating: parseInt(rating),
    };

    try {
      await adicionarFilmeAPI(novoFilme);

      setNome('');
      setAno('');
      setGenero('');
      setAssistido(false);
      setRating(0);

      if (onSuccess) onSuccess();
      if (onClose) onClose();

    } catch (error) {
      console.error('Erro ao adicionar filme:', error);
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 min-w-72 h-fit">
      <form onSubmit={adicionarFilme} className="flex flex-col gap-3 mt-6">
        <label>
          Nome do filme
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Nome"
            className="w-full border border-gray-300 ps-3 py-2 rounded"
            required
          />
        </label>

        <label>
          Ano de lançamento
          <input
            type="number"
            value={ano}
            onChange={(e) => setAno(e.target.value)}
            placeholder="Ano"
            className="w-full border border-gray-300 ps-3 py-2 rounded"
            required
          />
        </label>

        <label>
          Género
          <input
            type="text"
            value={genero}
            onChange={(e) => setGenero(e.target.value)}
            placeholder="Género"
            className="w-full border border-gray-300 ps-3 py-2 rounded"
            required
          />
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={assistido}
            onChange={() => setAssistido(!assistido)}
          />
          Assistido?
        </label>

        <label>
          Avaliação (0–10)
          <input
            type="number"
            min="0"
            max="10"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="w-full border border-gray-300 ps-3 py-2 rounded"
          />
        </label>

        <button
          type="submit"
          disabled={!nome || !ano || !genero}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
        >
          Adicionar
        </button>
      </form>
    </div>
  );
}
