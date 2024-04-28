from os import getenv
from fastapi import FastAPI, HTTPException, Depends, Header, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import mysql.connector
from datetime import date

app = FastAPI()

class User(BaseModel):
    nom: str
    prenom: str
    email: str
    date_naissance: date
    ville: str
    code_postal: str

db_config = {
    'user': getenv('MYSQL_USER'),
    'password': getenv('MYSQL_ROOT_PASSWORD'),
    'host': getenv('MYSQL_HOST'),
    'database': getenv('MYSQL_DATABASE')
}

print(db_config)

def get_db_connection():
    return mysql.connector.connect(**db_config)

def verify_admin(password: str = Header(None), admin: bool = False):
    correct_password = getenv('ADMIN_PASS')  # Mot de passe à vérifier
    if password == correct_password or admin:
        return True
    else:
        raise HTTPException(status_code=401, detail="Unauthorized")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

router = APIRouter()

@router.get("/users")
def read_users(dependencies=[Depends(verify_admin)]):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM utilisateurs")
    users = cursor.fetchall()
    cursor.close()
    conn.close()
    return users

@router.get("/users/{user_id}")
def read_user(user_id: int):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM utilisateurs WHERE id = %s", (user_id,))
    user = cursor.fetchone()
    cursor.close()
    conn.close()
    if user:
        return user
    raise HTTPException(status_code=404, detail="User not found")

@router.post("/users")
def create_user(user: User):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("INSERT INTO utilisateurs (nom, prenom, email, date_naissance, ville, code_postal) VALUES (%s, %s, %s, %s, %s, %s)", (user.nom, user.prenom, user.email, user.date_naissance, user.ville, user.code_postal))
    conn.commit()
    new_id = cursor.lastrowid
    cursor.close()
    conn.close()
    return {"id": new_id, "nom": user.nom, "prenom": user.prenom, "email": user.email, "date_naissance": user.date_naissance, "ville": user.ville, "code_postal": user.code_postal}

@router.delete("/users/{user_id}")
def delete_user(user_id: int, dependencies=[Depends(verify_admin)]):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM utilisateurs WHERE id = %s", (user_id,))
    conn.commit()
    if cursor.rowcount == 0:
        cursor.close()
        conn.close()
        raise HTTPException(status_code=404, detail="User not found")
    cursor.close()
    conn.close()
    return {"message": "User deleted successfully"}

app.include_router(router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
