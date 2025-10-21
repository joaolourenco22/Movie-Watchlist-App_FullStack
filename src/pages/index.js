import { useState } from 'react';
import CarregarFilmes from '@/components/AllMovies';
import AdicionarFilme from '@/components/AddMovie';
import VerFilmesPorClassificacao from '@/components/MoviesByRating';
import VerFilmesPorVer from '@/components/NotWatchedMovies';
import VerFilmesVistos from '@/components/WatchedMovies';
import { CiCirclePlus } from "react-icons/ci";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState('all');

  const renderComponent = () => {
    switch (selectedComponent) {
      case 'watched':
        return <VerFilmesVistos />;
      case 'notWatched':
        return <VerFilmesPorVer />;
      case 'byRating':
        return <VerFilmesPorClassificacao />;
      default:
        return <CarregarFilmes />;
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center p-4 sm:p-6 lg:p-8">

      <div className="w-full max-w-6xl bg-white rounded-lg shadow-md pt-4">
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6">
          {[
            { label: 'Todos os Filmes', key: 'allMovies' },
            { label: 'Filmes já vistos', key: 'watched' },
            { label: 'Filmes não vistos', key: 'notWatched' },
            { label: 'Ordenar por classificação', key: 'byRating' },
          ].map(({ label, key }) => (
            <button
              key={key}
              onClick={() => setSelectedComponent(key)}
              className={`py-2 px-4 text-sm sm:text-base font-medium rounded-full border transition-colors
                ${selectedComponent === key
                  ? 'bg-orange-900 text-white border-orange-900'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-orange-50 hover:text-orange-900'
                }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="mb-24">{renderComponent()}</div>
      </div>

      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-6 right-6 md:bottom-10 md:right-12 bg-orange-800 hover:bg-orange-700 text-white p-4 rounded-full shadow-lg transition-transform hover:scale-105"
        aria-label="Adicionar novo filme"
      >
        <CiCirclePlus size={28} />
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
            <div className="flex items-center justify-between border-b pb-3 mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Adicionar Filme</h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center"
              >
                <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
              </button>
            </div>
            <AdicionarFilme
              onClose={() => setIsModalOpen(false)}
              onSuccess={() => window.location.reload()}
            />
          </div>
        </div>
      )}
    </div>
  );
}
