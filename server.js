// Buscar cidade pelo nome
app.get('/api/cities/by-name/:name', async (req, res) => {
  try {
    const city = await City.findOne({ name: new RegExp(`^${req.params.name}$`, 'i') });
    if (!city) {
      return res.status(404).json({ message: "Cidade não encontrada." });
    }
    res.json(city);
  } catch (err) {
    res.status(500).json({ message: "Erro ao buscar cidade.", error: err });
  }
});
