// GET /api/movies - Obter lista de todos os filmes
export async function carregarFilmesAPI() {
  try {
    const response = await fetch('/api/movies')
    
    if (!response.ok) {
      console.error('Erro na resposta:', response.status, response.statusText)
      throw new Error('Erro ao carregar filmes')
    }
    
    const data = await response.json()
    return data

  } catch (error) {
    console.error('Erro ao carregar filmes:', error)
    throw error
  }
}

// GET /api/movies/watched - Filmes já vistos
export async function carregarFilmesVistosAPI() {
  try {
    const response = await fetch('/api/movies/watched')

    if (!response.ok) {
      console.error('Erro na resposta:', response.status, response.statusText)
      throw new Error('Erro ao carregar filmes')
    }
    
    const data = await response.json()
    return data

  } catch (error) {
    console.error('Erro ao carregar filmes:', error)
    throw error
  }
}

// GET /api/movies/unwatched - Filmes por ver
export async function carregarFilmesPorVerAPI() {
  try {
    const response = await fetch('/api/movies/unwatched')

    if (!response.ok) {
      console.error('Erro na resposta:', response.status, response.statusText)
      throw new Error('Erro ao carregar filmes')
    }

    const data = await response.json()
    return data

  } catch (error) {
    console.error('Erro ao carregar filmes:', error)
    throw error
  }
}

// GET /api/movies/by-rating - Ordenar por classificação
export async function carregarFilmesPorClassificacaoAPI() {
  try {
    const response = await fetch('/api/movies/by-rating')

    if (!response.ok) {
      console.error('Erro na resposta:', response.status, response.statusText)
      throw new Error('Erro ao carregar filmes')
    }

    const data = await response.json()
    return data

  } catch (error) {
    console.error('Erro ao carregar filmes:', error)
    throw error
  }
}

// POST /api/movies - Adicionar novo filme
export async function adicionarFilmeAPI(dataMovie) {
  try {
    const response = await fetch('/api/movies', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataMovie)
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.erro || 'Erro ao adicionar nome')
    }
    
    const resultado = await response.json()
    return resultado

  } catch (error) {
    console.error('Erro ao adicionar nome:', error)
    throw error
  }
}

// PUT /api/movies/:id - Editar filme existente
export async function atualizarFilmeAPI(id, dadosFilme) {
  try {
    const response = await fetch(`/api/movies/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dadosFilme)
    })

    if (!response.ok) {
      console.error('Erro na resposta:', response.status, response.statusText)
      throw new Error('Erro ao atualizar filme')
    }
    
    const resultado = await response.json()
    return resultado

  } catch (error) {
    console.error('Erro ao atualizar filme:', error)
    throw error
  }
}

// DELETE /api/movies/:id - Eliminar filme
export async function eliminarFilmeAPI(id) {
  try {
    const response = await fetch(`/api/movies/${id}`, {
      method: 'DELETE'
    })

    if (!response.ok) {
      console.error('Erro na resposta:', response.status, response.statusText)
      throw new Error('Erro ao eliminar filme')
    }

    const resultado = await response.json()
    return resultado

  } catch (error) {
    console.error('Erro ao eliminar filme:', error)
    throw error
  }
}
