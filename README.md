# 💈 Barbearia System

Sistema completo de gerenciamento de barbearia com foco em **agendamentos, dashboard administrativo e API REST escalável**.

O projeto simula um sistema real utilizado em negócios locais, com arquitetura moderna separando backend e frontend.

---

# 🚀 Demonstração do Projeto

## 📌 Funcionalidades

- Criar agendamentos
- Listar agendamentos em tempo real
- Dashboard administrativo
- Controle de status
- Integração frontend/backend
- API REST documentada
- Estrutura escalável (Service + Repository)

---

# 🧠 Arquitetura do Sistema

Frontend (React + Vite + Tailwind)
        ↓
Axios (HTTP Client)
        ↓
FastAPI (Backend)
        ↓
Service Layer (Regras de negócio)
        ↓
Repository Layer (Acesso a dados)
        ↓
SQLite (Banco de dados)

---

# 🏗️ Tecnologias Utilizadas

## Backend
- Python
- FastAPI
- SQLAlchemy
- Pydantic
- Uvicorn
- SQLite

## Frontend
- React
- Vite
- TailwindCSS
- Axios
- Lucide Icons

---

# 📁 Estrutura do Projeto

barbearia-system/
│
├── backend/
│   ├── app/
│   │   ├── core/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── schemas/
│   │   ├── services/
│   │   ├── repositories/
│   │   └── main.py
│   │
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│
└── README.md

---

# ⚙️ Como Executar o Projeto

## 📌 Pré-requisitos

- Python 3.11+
- Node.js 18+
- npm
- Git

---

# 📥 1. Clonar o repositório

git clone https://github.com/seuusuario/barbearia-system.git
cd barbearia-system

---

# 🐍 2. Backend (FastAPI)

## Criar ambiente virtual

python -m venv .venv

---

## Ativar ambiente virtual (Windows)

.venv\Scripts\Activate.ps1

---

## Entrar no backend

cd backend

---

## Instalar dependências

pip install -r requirements.txt

---

## Rodar backend

uvicorn app.main:app --reload

---

## 🌐 Backend disponível em:

http://127.0.0.1:8000

## Swagger:

http://127.0.0.1:8000/docs

---

# ⚛️ 3. Frontend (React)

## Entrar no frontend

cd frontend

---

## Instalar dependências

npm install

---

## Rodar frontend

npm run dev

---

## 🌐 Frontend disponível em:

http://localhost:5173

---

# 🧪 Como testar o sistema

## Criar agendamento

Acesse:

http://127.0.0.1:8000/docs

---

Use:

POST /agendamentos

```json
{
  "cliente": "Carlos Silva",
  "data_hora": "2026-05-20T10:00:00"
}