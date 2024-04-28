import validateForm, { getAge } from './validateForm';
import "@testing-library/jest-dom";

describe('validateForm', () => {
    let formData;
    beforeEach(() => {
        formData = {
            nom: 'Toto',
            prenom: 'Toto',
            email: 'toto@toto.com',
            dateNaissance: '01/01/2000',
            ville: 'Nice',
            codePostal: '06000'
        };
    });

    describe('nom', () => {
        it('valide que le nom est renseigné', () => {
            formData['nom'] = 'Toto';
            const result = validateForm(formData);
            expect(result.newErrors.nom).toBeUndefined();
            expect(result.formIsValid).toBeTruthy();
        });

        it('retourne une erreur si le nom n’est pas renseigné', () => {
            formData['nom'] = '';
            const result = validateForm(formData);
            expect(result.newErrors.nom).toBeDefined();
            expect(result.formIsValid).toBeFalsy();
        });

        it('valide que le nom ne contient pas de chiffres', () => {
            formData['nom'] = 'Tot0';
            const result = validateForm(formData);
            expect(result.newErrors.nom).toBeDefined();
            expect(result.formIsValid).toBeFalsy();
        });

        it('valide que le nom ne contient pas de caractères spéciaux', () => {
            formData['nom'] = 'Toto@';
            const result = validateForm(formData);
            expect(result.newErrors.nom).toBeDefined();
            expect(result.formIsValid).toBeFalsy();
        });

        it('valide que le nom accepte les accents', () => {
            formData['nom'] = 'Tôtô';
            const result = validateForm(formData);
            expect(result.newErrors.nom).toBeUndefined();
            expect(result.formIsValid).toBeTruthy();
        });
    });

    describe('prénom', () => {
        it('valide que le prénom est renseigné', () => {
            formData['prenom'] = 'Toto';
            const result = validateForm(formData);
            expect(result.newErrors.prenom).toBeUndefined();
            expect(result.formIsValid).toBeTruthy();
        });

        it('retourne une erreur si le prénom n’est pas renseigné', () => {
            formData['prenom'] = '';
            const result = validateForm(formData);
            expect(result.newErrors.prenom).toBeDefined();
            expect(result.formIsValid).toBeFalsy();
        });

        it('valide que le prénom ne contient pas de chiffres', () => {
            formData['prenom'] = 'Tot0';
            const result = validateForm(formData);
            expect(result.newErrors.prenom).toBeDefined();
            expect(result.formIsValid).toBeFalsy();
        });

        it('valide que le prénom ne contient pas de caractères spéciaux', () => {
            formData['prenom'] = 'Toto@';
            const result = validateForm(formData);
            expect(result.newErrors.prenom).toBeDefined();
            expect(result.formIsValid).toBeFalsy();
        });

        it('valide que le prénom accepte les accents', () => {
            formData['prenom'] = 'Tôtô';
            const result = validateForm(formData);
            expect(result.newErrors.prenom).toBeUndefined();
            expect(result.formIsValid).toBeTruthy();
        });
    });

    describe('email', () => {
        it('valide que l\'email est renseigné', () => {
            formData['email'] = 'test@example.com';
            const result = validateForm(formData);
            expect(result.newErrors.email).toBeUndefined();
            expect(result.formIsValid).toBeTruthy();
        });

        it('valide le format de l\'email', () => {
            formData['email'] = 'test';
            const result = validateForm(formData);
            expect(result.newErrors.email).toBeDefined();
            expect(result.formIsValid).toBeFalsy();
        });

        it('retourne une erreur si l\'email n’est pas renseigné', () => {
            formData['email'] = '';
            const result = validateForm(formData);
            expect(result.newErrors.email).toBeDefined();
            expect(result.formIsValid).toBeFalsy();
        });
    });

    describe('date de naissance', () => {
        it('valide que la date de naissance est renseignée', () => {
            formData['dateNaissance'] = '01/01/2000';
            const result = validateForm(formData);
            expect(result.newErrors.dateNaissance).toBeUndefined();
            expect(result.formIsValid).toBeTruthy();
        });
        it('valide que l\'utilisateur a au moins 18 ans', () => {
            formData['dateNaissance'] = '01/01/2010';
            const result = validateForm(formData);
            expect(result.newErrors.dateNaissance).toBeDefined();
            expect(result.formIsValid).toBeFalsy();
        });

        it('valide que la date accepte plusieurs formats', () => {
            formData['dateNaissance'] = '01-01-2000';
            const result = validateForm(formData);
            expect(result.newErrors.dateNaissance).toBeUndefined();
            expect(result.formIsValid).toBeTruthy();
        });

        it('retourne une erreur si la date de naissance n’est pas renseignée', () => {
            formData['dateNaissance'] = '';
            const result = validateForm(formData);
            expect(result.newErrors.dateNaissance).toBeDefined();
            expect(result.formIsValid).toBeFalsy();
        });
    });

    describe('ville', () => {
        it('valide que la ville est renseignée', () => {
            formData['ville'] = 'Nice';
            const result = validateForm(formData);
            expect(result.newErrors.ville).toBeUndefined();
            expect(result.formIsValid).toBeTruthy();
        });

        it('retourne une erreur si la ville n’est pas renseignée', () => {
            formData['ville'] = '';
            const result = validateForm(formData);
            expect(result.newErrors.ville).toBeDefined();
            expect(result.formIsValid).toBeFalsy();
        });
    });

    describe('code postal', () => {
        it('valide que le code postal est renseigné', () => {
            formData['codePostal'] = '06000';
            const result = validateForm(formData);
            expect(result.newErrors.codePostal).toBeUndefined();
            expect(result.formIsValid).toBeTruthy();
        });
        it('valide le format du code postal : 0600', () => {
            formData['codePostal'] = '0600';
            const result = validateForm(formData);
            expect(result.newErrors.codePostal).toBeDefined();
            expect(result.formIsValid).toBeFalsy();
        });

        it('valide le format du code postal : 060000', () => {
            formData['codePostal'] = '060000';
            const result = validateForm(formData);
            expect(result.newErrors.codePostal).toBeDefined();
            expect(result.formIsValid).toBeFalsy();
        });

        it('valide le format du code postal : 0600A', () => {
            formData['codePostal'] = '0600A';
            const result = validateForm(formData);
            expect(result.newErrors.codePostal).toBeDefined();
            expect(result.formIsValid).toBeFalsy();
        });

        it('retourne une erreur si le code postal n’est pas renseigné', () => {
            formData['codePostal'] = '';
            const result = validateForm(formData);
            expect(result.newErrors.codePostal).toBeDefined();
            expect(result.formIsValid).toBeFalsy();
        });
    });

    describe('validation globale du formulaire', () => {
        it('valide que le formulaire est considéré comme valide uniquement si tous les champs sont valides', () => {
            const result = validateForm(formData);
            expect(result.formIsValid).toBeTruthy();
        });
    });
});

describe('getAge', () => {
    it('calcule correctement l\'âge à partir de la date de naissance', () => {
        const birthdate = new Date(new Date().getFullYear() - 20, 5, 5).toISOString().split('T')[0];
        const age = getAge(birthdate);
        expect(age).toBe(19);
    });

    it('retourne 0 si la date de naissance est vide', () => {
        const age = getAge('');
        expect(age).toBe(0);
    });
});
