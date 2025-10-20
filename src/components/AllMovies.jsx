import { useState, useEffect } from 'react';
import { carregarFilmesAPI, eliminarFilmeAPI } from '../services/api';
import { IoTrashBinOutline } from "react-icons/io5";
import { GoPencil } from "react-icons/go";
import EditarFilme from './EditMovie';

export default function CarregarFilmes() {
  const [filmes, setFilmes] = useState([]);
  const [showEditMovie, setShowEditMovie] = useState(false);
  const [filmeParaEditar, setFilmeParaEditar] = useState(null);

  async function carregarFilmes() {
    try {
      const data = await carregarFilmesAPI();
      setFilmes(data);
    } catch (error) {
      console.error('Erro ao carregar filmes:', error);
    }
  }

  async function eliminarFilme(id) {
    try {
      await eliminarFilmeAPI(id);
      setFilmes(filmes.filter((filme) => filme._id !== id));
    } catch (error) {
      console.error('Erro ao eliminar filme:', error);
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
          <div key={item._id}  className='bg-orange-400 m-2 p-3 rounded-lg flex flex-col justify-between items-center'>
            <p className='font-bold '>{item.title}</p>
            <p>Ano: {item.year}</p>
            <p>Gênero: {item.genre}</p>
            <p>{item.watched ? 'Visto' : 'Por ver'}</p>
            <p>Classificação: {item.rating}</p>
            <p>Adicionado em: {new Date(item.createdAt).toLocaleDateString()}</p>

            <div className='h-2'>
            <button
              className="bg-blue-500 text-white p-3 rounded-full m-1"
              onClick={() => (setShowEditMovie(true), setFilmeParaEditar(item))}
            >
              <GoPencil />
            </button>
            <button
              className="bg-red-500 text-white p-3 rounded-full m-1"
              onClick={() => eliminarFilme(item._id)}
            >
              <IoTrashBinOutline />
            </button>
            </div>
          </div>
        ))}
      </div>
      {showEditMovie && <EditarFilme isOpen={showEditMovie} onClose={() => setShowEditMovie(false)} onSuccess={carregarFilmes} filme={filmeParaEditar} />}
    </div>
  );
}


