
# 🪖 Soldiers Tracking API

This is a FastAPI backend for the Soldiers Tracking project. It provides a simple HTTP interface for sending and receiving position data and is designed to be easily connected to a frontend.

---

## 🚀 Features

- ✅ Built with [FastAPI](https://fastapi.tiangolo.com/)
- ✅ CORS support (allowing frontend interaction)
- ✅ `/` root welcome route
- ✅ `/send_position` POST route to receive position data

---

## 📁 Project Structure

```

.
├── main.py               # Main FastAPI application
├── requirements.txt      # Python dependencies
└── README.md             # Project documentation

````

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/soldiers-tracking.git
cd soldiers-tracking/fastapi
````

### 2. Create a Virtual Environment

```bash
python -m venv .venv
```

### 3. Activate the Virtual Environment

* **Windows**:

  ```bash
  .venv\Scripts\activate
  ```

* **macOS/Linux**:

  ```bash
  source .venv/bin/activate
  ```

### 4. Install Dependencies

```bash
pip install --upgrade pip
pip install -r requirements.txt
```

---

## 📦 requirements.txt

```
fastapi==0.115.12
uvicorn==0.32.1
numpy>=1.26.0
python-multipart==0.0.9
```

---

## ▶️ Running the App

Make sure you're in the `fastapi` directory and your virtual environment is activated:

```bash
python main.py
```

Or with `uvicorn`:

```bash
uvicorn main:app --reload
```

The API will be available at:
`http://127.0.0.1:8000`

---

## 📬 API Endpoints

### `GET /`

Returns a welcome message.

**Response:**

```json
{ "message": "Welcome to Soldiers Tracking API" }
```

---

### `POST /send_position`

Logs the position data sent from the client (currently just prints to console).

**Body**: JSON

---

## 🛡️ CORS

CORS is enabled for all origins to allow frontend communication. You can restrict origins in:

```python
allow_origins=["*"]  # Change this to specific domains for production
```

---