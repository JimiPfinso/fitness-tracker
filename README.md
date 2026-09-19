# Fitness Tracker

A full-stack fitness tracker for logging nutrition, workouts, and bodyweight while monitoring fitness progress and calorie/macronutrient targets.

## Live demo
https://fitness-tracker-4rat.onrender.com

## Features
- Log and delete food entries.
- Track daily calories and macronutrients.
- Log workouts including exercise, sets, reps and weight.
- View workout history.
- Record and analyse bodyweight.
- Calculate TDEE and calorie targets.
- Generate protein, carbohydrate and fat targets.
- Nutrition and training resources.
- Responsive React dashboard.

## Tech Stack
### Frontend
- React
- TypeScript
- Vite
- CSS

### Backend
- Python
- FastAPI
- Uvicorn

### Database
- PostgreSQL

### Testing
- pytest
- FastAPI TestClient

### Deployment
- Render Static Site - Frontend
- Render Web Service - backend
- Render PostgreSQL - database

## Architecture
```text
React / TypeScript Frontend
        |
        | REST API
        v
Python / FastAPI Backend
        |
        | SQL
        v
PostgreSQL Database
```

## Running locally
### Backend

Install dependencies:

```bash
pip install -r requirements.txt
```

Start the API:
```bash
python3 -m uvicorn api:app --reload
```

The API runs at http://127.0.0.1:8000.

### Frontend
```bash
cd frontend
npm install
npm run dev
```

The frontend runs at http://localhost:5173.

## Testing
Run the backend and API test suite:
```bash
python3 -m pytest
```

## API
The FastAPI backend provides endpoints for:
- Foods
- Workouts
- Bodyweight
- Nutrition analytics
- Bodyweight analytics

Interactive API documentation is available through FastAPI’s /docs endpoint when the backend is running.

## Author
Jimi Pfinso Wangtob
