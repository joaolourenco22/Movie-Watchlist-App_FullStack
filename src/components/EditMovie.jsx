import { useState, useEffect } from 'react'
import { atualizarFilmeAPI } from '@/services/api'

export default function EditarFilme({ isOpen, onClose, onSuccess, filme }) {
    const [formData, setFormData] = useState({
        title: '',
        year: '',
        genre: '',
        watched: false,
        rating: 0,
    })

    useEffect(() => {
        if (filme) {
            setFormData({
                title: filme.title || '',
                year: filme.year || '',
                genre: filme.genre || '',
                watched: filme.watched || false,
                rating: filme.rating || 0,
            })
        }
    }, [filme])

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            await atualizarFilmeAPI(filme._id, formData)
            alert('Filme atualizado com sucesso!')
            onSuccess()
            onClose()
        } catch (error) {
            alert('Erro ao atualizar filme')
        }
    }

    function handleClose() {
        setFormData({ title: '', year: '', genre: '', watched: false, rating: 0 })
        onClose()
    }

    if (!isOpen || !filme) return null

    return (
        <div >
            <div >
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">✏️ Editar Filme</h2>
                    <button onClick={handleClose} className="text-gray-400 hover:text-gray-600 text-2xl">
                        BLABLABLA
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                            Título do Filme
                        </label>
                        <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Ex: Smartphone Pro" />
                    </div>

                    <div>
                        <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-2">
                            Ano de Lançamento
                        </label>
                        <input type="number" id="year" name="year" value={formData.year} onChange={handleChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Ex: 2021" />
                    </div>

                    <div>
                        <label htmlFor="genre" className="block text-sm font-medium text-gray-700 mb-2">
                            Gênero
                        </label>
                        <input type="text" id="genre" name="genre" value={formData.genre} onChange={handleChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Ex: Ação" />
                    </div>

                    <div>
                        <label htmlFor="watched" className="block text-sm font-medium text-gray-700 mb-2">
                            Já Assistido?
                        </label>
                        <input type="checkbox" id="watched" name="watched" checked={formData.watched} onChange={handleChange} className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                    </div>

                    <div>
                        <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-2">
                            Avaliação (0 a 10)
                        </label>
                        <input type="number" id="rating" name="rating" value={formData.rating} onChange={handleChange} min="0" max="10" required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Ex: 8" />
                    </div>

                    <div className="flex space-x-3 pt-4">
                        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex-1">
                            Atualizar
                        </button>

                        <button type="button" onClick={handleClose} className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 flex-1">
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}