db = db.getSiblingDB('ynov_ci');

db.createCollection('utilisateurs', {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["nom", "prenom", "email", "role"],
      properties: {
        nom: {
          bsonType: "string",
          description: "must be a string and is required"
        },
        prenom: {
          bsonType: "string",
          description: "must be a string and is required"
        },
        email: {
          bsonType: "string",
          pattern: "^.+@.+\..+$",
          description: "must be a valid email address and is required"
        },
        date_naissance: {
          bsonType: "date",
          description: "must be a date"
        },
        ville: {
          bsonType: "string",
          description: "must be a string"
        },
        code_postal: {
          bsonType: "string",
          description: "must be a string",
          minLength: 5,
          maxLength: 5
        },
        role: {
          enum: ["default", "admin"],
          description: "can only be one of 'default' or 'admin' and is required"
        }
      }
    }
  }
});

// Insérer un document initial avec explicit default value for role
db.utilisateurs.insert({
  nom: "super",
  prenom: "admin",
  email: "super.admin@ynov.com",
  role: "admin" // Make sure to provide default values in your application logic
});
