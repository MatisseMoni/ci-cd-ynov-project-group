/**
 * Fonction de validation du formulaire
 * @function validateForm
 * @param {Object} formData - Données du formulaire
 * @param {string} formData.nom - Nom de l'utilisateur
 * @param {string} formData.prenom - Prénom de l'utilisateur
 * @param {string} formData.email - Email de l'utilisateur
 * @param {string} formData.date_naissance - Date de naissance de l'utilisateur
 * @param {string} formData.ville - Ville de l'utilisateur
 * @param {string} formData.code_postal - Code postal de l'utilisateur
 * @returns {boolean} formIsValid - Validité du formulaire
 * @returns {Object} newErrors - Erreurs de validation
 * @example
 * const { formIsValid, newErrors } = validateForm({
 *  nom: 'Doe',
 *  prenom: 'John',
 *  email: 'john.doe@mail.com',
 *  date_naissance: '01-01-2000',
 *  ville: 'Paris',
 *  code_postal: '75000'
 * });
 */

const validateForm = (formData = {
    nom: '',
    prenom: '',
    email: '',
    date_naissance: '',
    ville: '',
    code_postal: ''
}) => {
    let newErrors = {};
    let formIsValid = true;

    // Validation du nom (exemple : non vide, sans caractères spéciaux et chiffres)
    if (!/^[a-zA-ZÀ-ÿ\-']+$/u.test(formData.nom.trim())) {
        formIsValid = false;
        newErrors.nom = "Le nom est invalide.";
    }

    // Validation du prénom (exemple : non vide, sans caractères spéciaux et chiffres)
    if (!/^[a-zA-ZÀ-ÿ\-']+$/u.test(formData.prenom.trim())) {
        formIsValid = false;
        newErrors.prenom = "Le prénom est invalide.";
    }

    // Validation de l'email (format)
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
        formIsValid = false;
        newErrors.email = "L'email est invalide.";
    }

    // Validation de la date de naissance (âge >= 18)
    if (!formData.date_naissance) {
        formIsValid = false;
        newErrors.date_naissance = "La date de naissance est requise.";
    }

    const age = getAge(formData.date_naissance); // Implémenter une fonction getAge pour calculer l'âge
    if (age < 18) {
        formIsValid = false;
        newErrors.date_naissance = "Vous devez avoir au moins 18 ans.";
    }
    // Validation du code postal (format français)
    if (!/^(\d{5})?$/.test(formData.code_postal)) {
        formIsValid = false;
        newErrors.code_postal = "Le code postal est invalide.";
    }

    for (let key in formData) {
        if (!formData[key]) {
            newErrors[key] = "Ce champ est requis.";
            formIsValid = false;
        }
    }

    return {formIsValid, newErrors};
};

/**
 * Calcule l'âge de l'utilisateur
 * @param {string} date_naissance - Date de naissance de l'utilisateur (format : 'JJ-MM-AAAA')
 * @returns {number} - L'âge de l'utilisateur
 * @example
 * const age = getAge('01-01-2000');
 * console.log(age); // 22
 */

const getAge = (date_naissance) => {
    if (!date_naissance || isNaN(Date.parse(date_naissance))) {
        return 0;
    }

    const birthDate = new Date(date_naissance);
    const currentDate = new Date();

    let age = currentDate.getFullYear() - birthDate.getFullYear();

    // Adjust age if the current date is before the birth month and day
    if (
        currentDate.getMonth() < birthDate.getMonth() ||
        (currentDate.getMonth() === birthDate.getMonth() &&
            currentDate.getDate() < birthDate.getDate())
    ) {
        age--;
    }

    return age;
};

export default validateForm;
export { getAge };