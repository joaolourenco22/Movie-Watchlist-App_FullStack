// ===== CONSTANTES FIXAS =====
const express = require('express');
const next = require('next');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./lib/mongodb');
const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();
const app = express();
app.use(cors());
app.use(express.json());

// Esta constante é relativa às coleções da tua base de dados e deves acrescentar mais se for o caso
const Movie = require('./models/Movie');



// ===== ENDPOINTS DA API =====

//GET /api/movies - Obter lista de todos os filmes
app.get('/api/movies', async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    console.error('Erro ao carregar filmes:', error);
    res.status(500).json({ erro: 'Erro interno do servidor' });
  }
});

//GET /api/movies?watched=true - Filmes já vistos
app.get('/api/movies/watched', async (req, res) => {
  try {
    const movies = await Movie.find({ watched: true });
    res.json(movies);
  } catch (error) {
    console.error('Erro ao carregar filmes:', error);
    res.status(500).json({ erro: 'Erro interno do servidor' });
  }
});

//GET /api/movies?watched=false - Filmes por ver
app.get('/api/movies/unwatched', async (req, res) => {
  try {
    const movies = await Movie.find({ watched: false });
    res.json(movies);
  } catch (error) {
    console.error('Erro ao carregar filmes:', error);
    res.status(500).json({ erro: 'Erro interno do servidor' });
  }
});

//GET /api/movies?sortBy=rating&order=desc - Ordenar por classificação
app.get('/api/movies/by-rating', async (req, res) => {
  try {
    const movies = await Movie.find().sort({ rating: -1 });
    res.json(movies);
  } catch (error) {
    console.error('Erro ao carregar filmes:', error);
    res.status(500).json({ erro: 'Erro interno do servidor' });
  }
});

//POST /api/movies - Adicionar novo filme
app.post('/api/movies', async (req, res) => {
  try {
    const { title, year, genre, watched, rating } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ erro: 'Título é obrigatório' });
    }

    const newMovie = new Movie({ title: title.trim(), year, genre, watched, rating });
    const savedMovie = await newMovie.save();
    res.status(201).json(savedMovie);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ erro: 'Este nome já existe' });
    }
    console.error('Erro ao criar nome:', error);
    res.status(500).json({ erro: 'Erro interno do servidor' });
  }
});

//PUT /api/movies/:id - Editar filme existente
app.put('/api/movies/:id', async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }  // Retorna documento atualizado e executa validações
    );

    if (!movie) return res.status(404).json({ erro: 'Filme não encontrado' });
    res.json(movie);
  } catch (error) {
    console.error('Erro ao atualizar filme:', error);
    res.status(500).json({ erro: 'Erro interno do servidor' });
  }
});

//DELETE /api/movies/:id - Eliminar filme
app.delete('/api/movies/:id', async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);

    if (!movie) return res.status(404).json({ erro: 'Filme não encontrado' });
    res.json({ mensagem: 'Filme eliminado com sucesso' });
  } catch (error) {
    console.error('Erro ao eliminar produto:', error);
    res.status(500).json({ erro: 'Erro interno do servidor' });
  }
});



// ===== INICIALIZAÇÃO DO SERVIDOR (também não se deve mexer)=====

app.use((req, res) => {
  return handle(req, res);
});

const PORT = process.env.PORT || 3000;

const iniciarServidor = async () => {
  try {
    await connectDB();
    await nextApp.prepare();
    app.listen(PORT, () => {
      console.log(`Servidor Next.js + Express a correr em http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Erro ao iniciar servidor:', error);
    process.exit(1);
  }
};

iniciarServidor();
