from os import getenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import mysql.connector
from datetime import date

app = FastAPI()

# Modèle Pydantic pour les données utilisateur
class User(BaseModel):
    nom: str
    prenom: str
    email: str
    date_naissance: date
    ville: str
    code_postal: str

# Configuration de la base de données
db_config = {
    'user': getenv('MYSQL_USER'),
    'password': getenv('MYSQL_ROOT_PASSWORD'),
    'host': getenv('MYSQL_HOST'),
    'database': getenv('MYSQL_DATABASE')
}

print(db_config)

# Fonction pour obtenir une connexion
def get_db_connection():
    return mysql.connector.connect(**db_config)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Autorise toutes les origines
    allow_credentials=True,
    allow_methods=["*"],  # Autorise toutes les méthodes
    allow_headers=["*"],  # Autorise tous les headers
)

@app.get("/users")
def read_users(password: Optional[str] = None, admin: bool = False):
    if (getenv('ADMIN_PASS') != password) and not admin:
        raise HTTPException(status_code=401, detail="Unauthorized")
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM utilisateur")
    users = cursor.fetchall()
    cursor.close()
    conn.close()
    return users

@app.get("/users/{user_id}")
def read_user(user_id: int):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM utilisateur WHERE id = %s", (user_id,))
    user = cursor.fetchone()
    cursor.close()
    conn.close()
    if user:
        return user
    raise HTTPException(status_code=404, detail="User not found")

@app.post("/users")
def create_user(user: User):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("INSERT INTO utilisateur (nom, prenom, email, date_naissance, ville, code_postal) VALUES (%s, %s, %s, %s, %s, %s)", (user.nom, user.prenom, user.email, user.date_naissance, user.ville, user.code_postal))
    conn.commit()
    new_id = cursor.lastrowid
    cursor.close()
    conn.close()
    return {"id": new_id, "nom": user.nom, "prenom": user.prenom, "email": user.email, "date_naissance": user.date_naissance, "ville": user.ville, "code_postal": user.code_postal}

@app.delete("/users/{user_id}")
def delete_user(user_id: int, password: Optional[str] = None, admin: bool = False):
    if (getenv('ADMIN_PASS') != password) and not admin:
        raise HTTPException(status_code=401, detail="Unauthorized")
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM utilisateur WHERE id = %s", (user_id,))
    conn.commit()
    if cursor.rowcount == 0:
        cursor.close()
        conn.close()
        raise HTTPException(status_code=404, detail="User not found")
    cursor.close()
    conn.close()
    return {"message": "User deleted successfully"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
