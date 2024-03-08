import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';

const CRUD = () => {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({ username: '', email: '', password: '', age: 0 });
  const [editingStudent, setEditingStudent] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/');
      setStudents(response.data);
    } catch (error) {
      console.error('Erreur lors de la recup :', error);
    }
  };

  const handleAddStudent = async () => {
    try {
      await axios.post('http://localhost:3000/', newStudent);
      setNewStudent({ username: '', email: '', password: '', age: 0 });
      fetchData();
    } catch (error) {
      console.error('Erreur ajout :', error);
    }
  };

  const handleDeleteStudent = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/${id}`);
      fetchData();
    } catch (error) {
      console.error('Erreur supp :', error);
    }
  };

  const handleEditStudent = (student) => {
    setEditingStudent(student);
    setNewStudent(student);
  };

  const handleUpdateStudent = async () => {
    try {
      await axios.put(`http://localhost:3000/${editingStudent._id}`, newStudent);
      setEditingStudent(null);
      setNewStudent({ username: '', email: '', password: '', age: 0 });
      fetchData();
    } catch (error) {
      console.error('Erreur maj:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStudent({ ...newStudent, [name]: value });
  };

  return (
    <div>
      <h1>Liste des étudiants</h1>
      <div className="students-container"> 
        {students.map(student => (
          <div key={student._id} className="student-card"> 
            <div className="student-info">
              <span>{student.username}</span>
            </div>
            <div className="student-buttons">
              <button onClick={() => handleEditStudent(student)}>Modifier</button>
              <button onClick={() => handleDeleteStudent(student._id)}>Supprimer</button>
            </div>
          </div>
        ))}
      </div>

      <h2>{editingStudent ? "Modifier l'étudiant" : "Ajouter un nouvel étudiant"}</h2>
      <div className="form-container">
        <input type="text" name="username" value={newStudent.username} onChange={handleInputChange} placeholder="Nom d'utilisateur" />
        <input type="email" name="email" value={newStudent.email} onChange={handleInputChange} placeholder="Email" />
        <input type="password" name="password" value={newStudent.password} onChange={handleInputChange} placeholder="Mot de passe" />
        <input type="number" name="age" value={newStudent.age} onChange={handleInputChange} placeholder="Âge" />
        <button onClick={editingStudent ? handleUpdateStudent : handleAddStudent}>{editingStudent ? "Modifier" : "Ajouter"}</button>
      </div>
    </div>
  );
};

export default CRUD;
