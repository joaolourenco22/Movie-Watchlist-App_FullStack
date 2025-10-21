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
    const confirmar = window.confirm("Tens a certeza que queres eliminar este filme?");
    if (!confirmar) return;

    try {
      await eliminarFilmeAPI(id);
      setFilmes(filmes.filter((filme) => filme._id !== id));
      alert('Filme eliminado com sucesso!');
    } catch (error) {
      console.error('Erro ao eliminar filme:', error);
    }
  }

  useEffect(() => {
    carregarFilmes();
  }, []);

  return (
    <div className="p-4 min-w-72 h-fit">
      <h2 className="text-3xl text-orange-900 font-bold mb-3">FILMES</h2>

      <div>
        {filmes.map((item) => (
          <div
            key={item._id}
            className="bg-orange-300 text-orange-950 m-2 p-4 rounded-lg shadow-sm flex flex-col md:flex-row justify-between"
          >
            <div className="flex flex-col text-left">
              <p className="font-bold text-xl mb-2">{item.title}</p>
              <p className="text-sm"><span className='font-bold'>Ano:</span> {item.year}</p>
              <p className="text-sm"><span className='font-bold'>Género:</span> {item.genre}</p>
              <p className="text-sm"><span className='font-bold'>Status:</span> {item.watched ? 'Visto' : 'Por ver'}</p>
              <p className="text-sm"><span className='font-bold'>Classificação:</span> {item.rating}</p>
              <p className="text-xs text-gray-700">
                <span className='font-bold'>Adicionado em:</span> {new Date(item.createdAt).toLocaleDateString()}
              </p>
            </div>

            <div
              className=" flex gap-5 justify-center items-center mt-3 md:mt-0 md:ml-6 md:self-center"
            >
              <button
                className="bg-blue-700 text-white p-3 rounded-full hover:bg-blue-800 transition"
                onClick={() => {
                  setShowEditMovie(true);
                  setFilmeParaEditar(item);
                }}
              >
                <GoPencil size={18} />
              </button>
              <button
                className="bg-red-500 text-white p-3 rounded-full hover:bg-red-600 transition"
                onClick={() => eliminarFilme(item._id)}
              >
                <IoTrashBinOutline size={18} />
              </button>
            </div>
          </div>
        ))}


      </div>
      {showEditMovie && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
            <button
              onClick={() => setShowEditMovie(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
            </button>
            <EditarFilme
              isOpen={showEditMovie}
              onClose={() => setShowEditMovie(false)}
              onSuccess={carregarFilmes}
              filme={filmeParaEditar}
            />
          </div>
        </div>
      )}
    </div>
  );
}


