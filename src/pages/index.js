import { useState } from 'react';
import CarregarFilmes from '@/components/AllMovies';
import AdicionarFilme from '@/components/AddMovie';
import VerFilmesPorClassificacao from '@/components/MoviesByRating';
import VerFilmesPorVer from '@/components/NotWatchedMovies';
import VerFilmesVistos from '@/components/WatchedMovies';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState('all');

  const renderComponent = () => {
    switch (selectedComponent) {
      case 'watched':
        return <VerFilmesVistos isOpen={true} onClose={() => setSelectedComponent('all')} />;
      case 'notWatched':
        return <VerFilmesPorVer isOpen={true} onClose={() => setSelectedComponent('all')} />;
      case 'byRating':
        return <VerFilmesPorClassificacao isOpen={true} onClose={() => setSelectedComponent('all')} />;
      case 'allMovies':
        return <CarregarFilmes isOpen={true} onClose={() => setSelectedComponent('all')} />;
      default:
        return <CarregarFilmes />;
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-5">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-7xl mx-auto">

        <button
          onClick={() => setIsModalOpen(true)}
          className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Adicionar novo filme
        </button>

        {isModalOpen && (
          <div
            tabIndex="-1"
            aria-hidden={!isModalOpen}
            className="fixed inset-0 z-50 flex justify-center items-center bg-black/50"
          >
            <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md p-6">
              <div className="flex items-center justify-between border-b pb-2 mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Adicionar Filme</h3>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center"
                >
                  <svg
                    className="w-3 h-3"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                </button>
              </div>
              <AdicionarFilme />
            </div>
          </div>
        )}
        {renderComponent()}
      </div>
    </div>
  );
}


