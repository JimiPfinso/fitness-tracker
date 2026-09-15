# Fitness Tracker

A Python command-line fitness tracker for logging nutrition, workouts, and bodyweight progress using PostgreSQL for persistent data storage.

## Features
- Log food and track calories, protein, carbs, and fat.
- View total nutrition details.
- Log workouts with sets, reps, and weight.
- View workout history and calculate training volume.
- Log and store bodyweight measurements.
- View dated bodyweight history.
- Track starting weight, current weight, overall weight change, and average weight.
- Input validation for numeric values.
- Persist fitness data using PostgreSQL.
- Automated tests with pytest.

## Technologies
- Python
- PostgreSQL
- psycopg3
- pytest
- Git
- GitHub

## Running the project
Run the application with:

```bash
python3 main.py
```

Create the database tables:
```bash
psql fitness_tracker -f schema.sql
```

Run the tests with:
```bash
python3 -m pytest
```

## Current Status
Version 3 includes PostgreSQL persistence and fitness analytics.
Planned future development:
- Python backend REST API
- React and typescript web frontend
- User authentication
- Deployment