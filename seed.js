const mongoose = require("mongoose");

// Conexão com o banco
mongoose.connect("mongodb://localhost:27017/fragascity_db", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Schemas
const City = mongoose.model("City", new mongoose.Schema({
  name: String,
  latitude: Number,
  longitude: Number,
  categories: [String]
}));

const Establishment = mongoose.model("Establishment", new mongoose.Schema({
  name: String,
  description: String,
  address: String,
  phone: String,
  cityId: mongoose.Schema.Types.ObjectId,
  category: String
}));

async function seed() {
  try {
    await City.deleteMany({});
    await Establishment.deleteMany({});

    // Criar cidade
    const city = new City({
      name: "Frecheirinha",
      latitude: -3.755,
      longitude: -40.82,
      categories: [
        "Saúde",
        "Educação",
        "Comércio",
        "Transporte",
        "Segurança",
        "Saneamento",
        "Comunicação",
        "Serviços",
        "Lazer e Cultura",
        "Fontes de energia",
        "Administração Pública",
        "Serviços Públicos"
      ]
    });

    const savedCity = await city.save();

    // Criar estabelecimentos exemplo
    const establishments = [
      {
        name: "Hospital Municipal",
        description: "Atendimento de urgência e emergência 24h.",
        address: "Av. Principal, 123 - Centro",
        phone: "(88) 99999-0001",
        cityId: savedCity._id,
        category: "Saúde"
      },
      {
        name: "Farmácia Popular",
        description: "Medicamentos com preços acessíveis.",
        address: "Rua das Flores, 50 - Centro",
        phone: "(88) 99999-0002",
        cityId: savedCity._id,
        category: "Saúde"
      },
      {
        name: "Escola Municipal Padre Anchieta",
        description: "Ensino fundamental do 1º ao 9º ano.",
        address: "Rua da Educação, 200 - Bairro Escola",
        phone: "(88) 99999-0003",
        cityId: savedCity._id,
        category: "Educação"
      },
      {
        name: "Universidade Estadual do Ceará - Polo Frecheirinha",
        description: "Cursos de graduação e pós-graduação.",
        address: "Av. Acadêmica, 300 - Bairro Novo",
        phone: "(88) 99999-0004",
        cityId: savedCity._id,
        category: "Educação"
      },
      {
        name: "Supermercado Bom Preço",
        description: "Alimentos e produtos variados.",
        address: "Rua do Comércio, 100 - Centro",
        phone: "(88) 99999-0005",
        cityId: savedCity._id,
        category: "Comércio"
      },
      {
        name: "Restaurante Sabor da Terra",
        description: "Comida regional e pratos típicos.",
        address: "Av. Gastronômica, 45 - Bairro Novo",
        phone: "(88) 99999-0006",
        cityId: savedCity._id,
        category: "Comércio"
      }
    ];

    await Establishment.insertMany(establishments);

    console.log("✅ Seed executado com sucesso!");
    process.exit();
  } catch (err) {
    console.error("❌ Erro no seed:", err);
    process.exit(1);
  }
}

seed();
