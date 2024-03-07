const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3000;

const path = require('path');


// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/school', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Define a schema for your data
const Schema = mongoose.Schema;
const myDataSchema = new Schema({
  name: { type: String },
  age: { type: Number }
});

// Define a model
const Student = mongoose.model('Student', myDataSchema);

// Routes
app.get('/', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});
// Route pour afficher un formulaire d'ajout d'étudiant
app.get('/add-student', (req, res) => {
  // Chemin vers votre fichier HTML
  const filePath = path.join(__dirname, 'index.html');
  // Envoyer le fichier HTML
  res.sendFile(filePath);
});

// Route pour ajouter un étudiant
app.post('/add-student', async (req, res) => {
  try {
    // Récupérer les données de la requête POST
    const { name, age } = req.body;

    // Créer une nouvelle instance d'Étudiant avec les données reçues
    const newStudent = new Student({ name, age });

    // Sauvegarder l'instance dans la base de données MongoDB
    const savedStudent = await newStudent.save();

    // Renvoyer la réponse avec les données ajoutées
    res.status(201).json(savedStudent);
  } catch (error) {
    console.error('Erreur:', error);
    res.status(500).json({ message: 'Erreur lors de l\'ajout de l\'étudiant' });
  }
});
app.put('/students/:id', async (req, res) => {
  try {
    const { name, age } = req.body;
    const updatedStudent = await Student.findByIdAndUpdate(req.params.id, { name, age }, { new: true });
    res.json(updatedStudent);
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'étudiant:', error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'étudiant' });
  }
});

// Route pour supprimer un étudiant existant
app.delete('/students/:id', async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: 'Étudiant supprimé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'étudiant:', error);
    res.status(500).json({ message: 'Erreur lors de la suppression de l\'étudiant' });
  }
});
// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
