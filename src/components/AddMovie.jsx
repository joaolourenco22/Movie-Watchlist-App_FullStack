import { useState } from 'react';
import { adicionarFilmeAPI } from '../services/api';

export default function AdicionarFilme() {
  const [nome, setNome] = useState('');
  const [ano, setAno] = useState('');
  const [genero, setGenero] = useState('');
  const [assistido, setAssistido] = useState(false);
  const [rating, setRating] = useState(0);

  async function adicionarFilme() {

    const novoFilme = {
      nome,
      ano,
      genero,
      assistido,
      rating
    };
    try {
      console.error('Adicionando filme:', novoFilme);
      await adicionarFilmeAPI(novoFilme);
      setNome('');
      setAno('');
      setGenero('');
      setAssistido(false);
      setRating(0);
    } catch (error) {
      console.error('Erro ao adicionar filme:', error);
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 min-w-72 h-fit">
      <h2 className="text-lg font-semibold mb-3">Adicionar Filme</h2>

      <form onSubmit={adicionarFilme} className="flex gap-1 mb-3 mt-12">
        <p>Nome do filme</p>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Nome"
          className="flex-1 border border-gray-300 ps-3 py-2 rounded"
        />
        <p>Ano de lançamento</p>
        <input
          type="number"
          value={ano}
          onChange={(e) => setAno(e.target.value)}
          placeholder="Ano"
          className="flex-1 border border-gray-300 ps-3 py-2 rounded"
        />
        <p>Género</p>
        <input
          type="text"
          value={genero}
          onChange={(e) => setGenero(e.target.value)}
          placeholder="Género"
          className="flex-1 border border-gray-300 ps-3 py-2 rounded"
        />
        <p>Assistido?</p>
        <input
          type="checkbox"
          checked={assistido}
          onChange={() => setAssistido(!assistido)}
          className="flex-1 border border-gray-300 ps-3 py-2 rounded"
        />
        <input
          type="number"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="flex-1 border border-gray-300 ps-3 py-2 rounded"
        />
        <button type="submit" onClick={adicionarFilme} disabled={!nome} className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Adicionar
        </button>
      </form>
    </div>
  );
}