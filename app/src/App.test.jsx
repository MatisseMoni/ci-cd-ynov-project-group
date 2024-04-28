import {
  render,
  screen,
  within,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import App from "./App";
import "@testing-library/jest-dom";

describe("App", () => {
  let formData;
  beforeEach(() => {
    formData = {
      nom: "Toto",
      prenom: "Toto",
      email: "toto#toto.com",
      dateNaissance: "2000-01-01",
      ville: "Nice",
      codePostal: "06000",
    };
  });

  test("renders the form", () => {
    render(<App />);
    const form = screen.getByTestId("form");
    expect(form).toBeInTheDocument();
  });
  describe("tests for the form", () => {
    describe("nom", () => {
      test("renders the input", () => {
        render(<App />);
        const labelNom = screen.getByTestId("labelNom");
        expect(labelNom).toBeInTheDocument();
      });

      test("renders the error message", () => {
        render(<App />);
        const divNom = screen.getByTestId("divNom");
        const inputNom = screen.getByTestId("inputNom");
        inputNom.focus();
        inputNom.blur();
        const error = within(divNom).getByText("Ce champ est requis.");
        expect(error).toBeInTheDocument();
      });

      test("should update the state", () => {
        render(<App />);
        const divNom = screen.getByTestId("divNom");
        const inputNom = screen.getByTestId("inputNom");
        fireEvent.change(inputNom, { target: { value: formData.nom } });
        expect(inputNom.value).toBe(formData.nom);
        expect(divNom).not.toHaveTextContent("Ce champ est requis.");
      });

      test("should display an error message if the input is invalid tot@", () => {
        render(<App />);
        const divNom = screen.getByTestId("divNom");
        const inputNom = screen.getByTestId("inputNom");
        fireEvent.change(inputNom, { target: { value: "tot@" } });
        inputNom.focus();
        inputNom.blur();
        const error = within(divNom).getByText("Le nom est invalide.");
        expect(error).toBeInTheDocument();
      });

      test("should display an error message if the input is invalid tot0", () => {
        render(<App />);
        const divNom = screen.getByTestId("divNom");
        const inputNom = screen.getByTestId("inputNom");
        fireEvent.change(inputNom, { target: { value: "tot0" } });
        inputNom.focus();
        inputNom.blur();
        const error = within(divNom).getByText("Le nom est invalide.");
        expect(error).toBeInTheDocument();
      });
    });

    describe("prenom", () => {
      test("renders the input", () => {
        render(<App />);
        const labelPrenom = screen.getByTestId("labelPrenom");
        expect(labelPrenom).toBeInTheDocument();
      });

      test("renders the error message", () => {
        render(<App />);
        const divPrenom = screen.getByTestId("divPrenom");
        const inputPrenom = screen.getByTestId("inputPrenom");
        inputPrenom.focus();
        inputPrenom.blur();
        const error = within(divPrenom).getByText("Ce champ est requis.");
        expect(error).toBeInTheDocument();
      });

      test("should update the state", () => {
        render(<App />);
        const divPrenom = screen.getByTestId("divPrenom");
        const inputPrenom = screen.getByTestId("inputPrenom");
        fireEvent.change(inputPrenom, { target: { value: formData.prenom } });
        expect(inputPrenom.value).toBe(formData.prenom);
        expect(divPrenom).not.toHaveTextContent("Ce champ est requis.");
      });

      test("should display an error message if the input is invalid tot@", () => {
        render(<App />);
        const divPrenom = screen.getByTestId("divPrenom");
        const inputPrenom = screen.getByTestId("inputPrenom");
        fireEvent.change(inputPrenom, { target: { value: "tot@" } });
        inputPrenom.focus();
        inputPrenom.blur();
        const error = within(divPrenom).getByText("Le prénom est invalide.");
        expect(error).toBeInTheDocument();
      });

      test("should display an error message if the input is invalid tot0", () => {
        render(<App />);
        const divPrenom = screen.getByTestId("divPrenom");
        const inputPrenom = screen.getByTestId("inputPrenom");
        fireEvent.change(inputPrenom, { target: { value: "tot0" } });
        inputPrenom.focus();
        inputPrenom.blur();
        const error = within(divPrenom).getByText("Le prénom est invalide.");
        expect(error).toBeInTheDocument();
      });
    });

    describe("email", () => {
      test("renders the input", () => {
        render(<App />);
        const labelEmail = screen.getByTestId("labelEmail");
        expect(labelEmail).toBeInTheDocument();
      });

      test("renders the error message", () => {
        render(<App />);
        const divEmail = screen.getByTestId("divEmail");
        const inputEmail = screen.getByTestId("inputEmail");
        inputEmail.focus();
        inputEmail.blur();
        const error = within(divEmail).getByText("Ce champ est requis.");
        expect(error).toBeInTheDocument();
      });

      test("should update the state", () => {
        render(<App />);
        const divEmail = screen.getByTestId("divEmail");
        const inputEmail = screen.getByTestId("inputEmail");
        fireEvent.change(inputEmail, { target: { value: formData.email } });
        expect(inputEmail.value).toBe(formData.email);
        expect(divEmail).not.toHaveTextContent("Ce champ est requis.");
      });

      test("should display an error message if the input is invalid xxxx@xxxx", () => {
        render(<App />);
        const divEmail = screen.getByTestId("divEmail");
        const inputEmail = screen.getByTestId("inputEmail");
        fireEvent.change(inputEmail, { target: { value: "xxxx@xxxx" } });
        inputEmail.focus();
        inputEmail.blur();
        const error = within(divEmail).getByText("L'email est invalide.");
        expect(error).toBeInTheDocument();
      });

      test("should display an error message if the input is invalid toto.toto", () => {
        render(<App />);
        const divEmail = screen.getByTestId("divEmail");
        const inputEmail = screen.getByTestId("inputEmail");
        fireEvent.change(inputEmail, { target: { value: "toto.toto" } });
        inputEmail.focus();
        inputEmail.blur();
        const error = within(divEmail).getByText("L'email est invalide.");
        expect(error).toBeInTheDocument();
      });
    });
    
    describe("dateNaissance", () => {
      test("renders the input", () => {
        render(<App />);
        const labelDate = screen.getByTestId("labelDate");
        expect(labelDate).toBeInTheDocument();
      });

      test("renders the error message", () => {
        render(<App />);
        const divDate = screen.getByTestId("divDate");
        const inputDate = screen.getByTestId("inputDate");
        inputDate.focus();
        inputDate.blur();
        const error = within(divDate).getByText("Ce champ est requis.");
        expect(error).toBeInTheDocument();
      });

      test("should update the state", () => {
        render(<App />);
        const divDate = screen.getByTestId("divDate");
        const inputDate = screen.getByTestId("inputDate");
        fireEvent.change(inputDate, { target: { value: formData.dateNaissance } });
        expect(inputDate.value).toBe(formData.dateNaissance);
        expect(divDate).not.toHaveTextContent("Ce champ est requis.");
      });

      test("should display an error message if the age is below 18 years", () => {
        render(<App />);
        const divDate = screen.getByTestId("divDate");
        const inputDate = screen.getByTestId("inputDate");
        fireEvent.change(inputDate, { target: { value: "20021-01-01" } });
        inputDate.focus();
        inputDate.blur();
        const error = within(divDate).getByText("Vous devez avoir au moins 18 ans.");
        expect(error).toBeInTheDocument();
      })
    });

    describe("ville", () => {
      test("renders the input", () => {
        render(<App />);
        const labelVille = screen.getByTestId("labelVille");
        expect(labelVille).toBeInTheDocument();
      });

      test("renders the error message", () => {
        render(<App />);
        const divVille = screen.getByTestId("divVille");
        const inputVille = screen.getByTestId("inputVille");
        inputVille.focus();
        inputVille.blur();
        const error = within(divVille).getByText("Ce champ est requis.");
        expect(error).toBeInTheDocument();
      });

      test("should update the state", () => {
        render(<App />);
        const divVille = screen.getByTestId("divVille");
        const inputVille = screen.getByTestId("inputVille");
        fireEvent.change(inputVille, { target: { value: formData.ville } });
        expect(inputVille.value).toBe(formData.ville);
        expect(divVille).not.toHaveTextContent("Ce champ est requis.");
      });
    });

    describe("codePostal", () => {
      test("renders the input", () => {
        render(<App />);
        const labelZip = screen.getByTestId("labelZip");
        expect(labelZip).toBeInTheDocument();
      });

      test("renders the error message", () => {
        render(<App />);
        const divZip = screen.getByTestId("divZip");
        const inputZip = screen.getByTestId("inputZip");
        inputZip.focus();
        inputZip.blur();
        const error = within(divZip).getByText("Ce champ est requis.");
        expect(error).toBeInTheDocument();
      });

      test("should update the state", () => {
        render(<App />);
        const divZip = screen.getByTestId("divZip");
        const inputZip = screen.getByTestId("inputZip");
        fireEvent.change(inputZip, { target: { value: formData.codePostal } });
        expect(inputZip.value).toBe(formData.codePostal);
        expect(divZip).not.toHaveTextContent("Ce champ est requis.");
      });

      test("should display an error message if the input is invalid 0600", () => {
        render(<App />);
        const divZip = screen.getByTestId("divZip");
        const inputZip = screen.getByTestId("inputZip");
        fireEvent.change(inputZip, { target: { value: "0600" } });
        inputZip.focus();
        inputZip.blur();
        const error = within(divZip).getByText("Le code postal est invalide.");
        expect(error).toBeInTheDocument();
      });
    });
  });

  describe("tests sending the form", () => {
    test("should not send the form if there are errors", () => {
      render(<App />);
      const form = screen.getByTestId("form");
      const buttonForm = within(form).getByRole("button");
      expect(buttonForm).toBeDisabled();
    });

    test("should send the form if there are no errors", async () => {
      render(<App />);
      const form = screen.getByTestId("form");
      const inputNom = within(form).getByTestId("inputNom");
      const inputPrenom = within(form).getByTestId("inputPrenom");
      const inputEmail = within(form).getByTestId("inputEmail");
      const inputDate = within(form).getByTestId("inputDate");
      const inputVille = within(form).getByTestId("inputVille");
      const inputZip = within(form).getByTestId("inputZip");
      fireEvent.change(inputNom, { target: { value: formData.nom } });
      fireEvent.change(inputPrenom, { target: { value: formData.prenom } });
      fireEvent.change(inputEmail, { target: { value: formData.email } });
      fireEvent.change(inputDate, {
        target: { value: formData.dateNaissance },
      });
      fireEvent.change(inputVille, { target: { value: formData.ville } });
      fireEvent.change(inputZip, { target: { value: formData.codePostal } });
      const buttonForm = within(form).getByRole("button");
      setTimeout(() => {
        expect(buttonForm).toBeEnabled();
      }, 500);
      fireEvent.submit(form)

      /* fireEvent.click(buttonForm); */
      setTimeout(() => {
        expect(screen.getByText("Inscription réussie !")).toBeInTheDocument();
        expect(inputNom.value).toBe("");
        expect(inputPrenom.value).toBe("");
        expect(inputEmail.value).toBe("");
        expect(inputDate.value).toBe("");
        expect(inputVille.value).toBe("");
        expect(inputZip.value).toBe("");

        // get localStorage
        const user = JSON.parse(localStorage.getItem("user"));
        expect(user).toEqual(formData);
      }, 500);
    });
  });
});
