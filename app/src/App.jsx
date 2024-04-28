/**
 * Ce composant représente le formulaire d'inscription.
 * @function App
 * @returns {JSX.Element} Le formulaire d'inscription
 */

import "./App.css";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import validateForm from "./validateForm";
import axios from "axios";
const { REACT_APP_API_URL } = process.env;

function App() {
  // État initial pour les champs du formulaire et les messages d'erreur
  const userInit = {
    nom: "",
    prenom: "",
    email: "",
    date_naissance: "",
    ville: "",
    code_postal: "",
  };
  const [formData, setFormData] = useState(userInit);
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  // Gestion des changements des champs du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Gestion de la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        console.log(formData);
        console.log(REACT_APP_API_URL);
        const response = await axios.post(
          `${REACT_APP_API_URL}/users`,
          formData
        );
        console.log(response);
        if (response.status === 201 || response.status === 200) {
          toast.success("Inscription réussie !");
          setFormData(userInit);
        } else {
          toast.error("Erreur lors de l'inscription.");
        }
      } catch (error) {
        toast.error(
          `Erreur lors de l'inscription : ${error.response.data.detail}`
        );
      }
    } else {
      toast.error("Des erreurs sont présentes dans le formulaire.");
    }
  };

  // Validation des champs ici
  useEffect(() => {
    const v = validateForm(formData);
    setIsFormValid(v.formIsValid);
    setErrors(v.newErrors);
  }, [formData]);

  // Affichage du formulaire
  return (
    <div>
      <form data-testid="form" onSubmit={handleSubmit}>
        <div data-testid="divNom">
          <label data-testid="labelNom">Nom:</label>
          <input
            data-testid="inputNom"
            type="text"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            required
          />
          {errors.nom && <p className="error">{errors.nom}</p>}
        </div>
        <div data-testid="divPrenom">
          <label data-testid="labelPrenom">Prénom:</label>
          <input
            data-testid="inputPrenom"
            type="text"
            name="prenom"
            value={formData.prenom}
            onChange={handleChange}
            required
          />
          {errors.prenom && <p className="error">{errors.prenom}</p>}
        </div>
        <div data-testid="divEmail">
          <label data-testid="labelEmail">Email:</label>
          <input
            data-testid="inputEmail"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <div data-testid="divDate">
          <label data-testid="labelDate">Date de naissance:</label>
          <input
            data-testid="inputDate"
            type="date"
            name="date_naissance"
            value={formData.date_naissance}
            onChange={handleChange}
            required
          />
          {errors.date_naissance && (
            <p className="error">{errors.date_naissance}</p>
          )}
        </div>
        <div data-testid="divVille">
          <label data-testid="labelVille">Ville:</label>
          <input
            data-testid="inputVille"
            type="text"
            name="ville"
            value={formData.ville}
            onChange={handleChange}
            required
          />
          {errors.ville && <p className="error">{errors.ville}</p>}
        </div>
        <div id="inputZip" data-testid="divZip">
          <label data-testid="labelZip">Code Postal:</label>
          <input
            data-testid="inputZip"
            type="text"
            name="code_postal"
            pattern="\d{5}"
            value={formData.code_postal}
            onChange={handleChange}
            required
          />
          {errors.code_postal && <p className="error">{errors.code_postal}</p>}
        </div>
        <button type="submit" disabled={!isFormValid}>
          Sauvegarder
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default App;
