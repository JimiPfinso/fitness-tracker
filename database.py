import os
import psycopg


def get_connection():
    database_url = os.getenv("DATABASE_URL")

    if database_url:
        return psycopg.connect(database_url)

    return psycopg.connect(
        dbname="fitness_tracker"
    )

def add_bodyweight(weight):
    with get_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                "INSERT INTO bodyweights (weight) VALUES (%s)",
                (weight,)
            )

def get_bodyweights():
    with get_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                "SELECT weight FROM bodyweights ORDER BY created_at"
            )
            rows = cur.fetchall()
    return [row[0] for row in rows]

def get_bodyweight_history():
    with get_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                SELECT weight, created_at
                FROM bodyweights
                ORDER BY created_at, id
                """
            )
            rows = cur.fetchall()
    return [
        {
            "weight": row[0],
            "date": row[1]
        }
        for row in rows
    ]

def add_food(name, calories, protein, carbs, fat):
    with get_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                INSERT INTO foods (name, calories, protein, carbs, fat)
                VALUES (%s, %s, %s, %s, %s)
                """,
                (name, calories, protein, carbs, fat)
            )

def get_foods():
    with get_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                SELECT name, calories, protein, carbs, fat
                FROM foods
                ORDER BY created_at
                """
            )
            rows = cur.fetchall()
    return [
        {
            "name": row[0],
            "calories": row[1],
            "protein": row[2],
            "carbs": row[3],
            "fat": row[4]
        }
        for row in rows
    ]

def add_workout(exercise, sets, reps, weight):
    with get_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                INSERT INTO workouts (exercise, sets, reps, weight)
                VALUES (%s, %s, %s, %s)
                """,
                (exercise, sets, reps, weight)
            )

def delete_workout(workout_id):
    with get_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                "DELETE FROM workouts WHERE id = %s",
                (workout_id,)
            )
            deleted = cur.rowcount

    return deleted > 0

def get_workouts():
    with get_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                SELECT id, exercise, sets, reps, weight
                FROM workouts
                ORDER BY created_at
                """
            )
            rows = cur.fetchall()

    return [
        {
            "id": row[0],
            "exercise": row[1],
            "sets": row[2],
            "reps": row[3],
            "weight": row[4]
        }
        for row in rows
    ]

def get_todays_foods():
    with get_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                SELECT id, name, calories, protein, carbs, fat
                FROM foods
                WHERE created_at::date = CURRENT_DATE
                ORDER BY created_at, id
                """
            )
            rows = cur.fetchall()

    return [
        {
            "id": row[0],
            "name": row[1],
            "calories": row[2],
            "protein": row[3],
            "carbs": row[4],
            "fat": row[5]
        }
        for row in rows
    ]

def delete_food(food_id):
    with get_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                "DELETE FROM foods WHERE id = %s",
                (food_id,)
            )
            deleted = cur.rowcount

    return deleted > 0