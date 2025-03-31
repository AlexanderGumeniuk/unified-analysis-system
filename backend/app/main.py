from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from .auth import create_user, authenticate_user, create_access_token
from .database import get_db, Base, engine

app = FastAPI()

# Создание таблиц в базе данных
Base.metadata.create_all(bind=engine)

# Регистрация пользователя
@app.post("/register")
def register(username: str, password: str, db: Session = Depends(get_db)):
    db_user = db.query(auth.User).filter(auth.User.username == username).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    user = create_user(db, username, password)
    return {"message": "User created successfully"}

# Вход пользователя
@app.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = create_access_token(data={"sub": user.username})
    return {"access_token": access_token, "token_type": "bearer"}