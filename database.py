import psycopg

def get_connection():
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

def get_workouts():
    with get_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                SELECT exercise, sets, reps, weight
                FROM workouts
                ORDER BY created_at
                """
            )
            rows = cur.fetchall()
    return [
        {
            "exercise": row[0],
            "sets": row[1],
            "reps": row[2],
            "weight": row[3]
        }
        for row in rows
    ]

def get_todays_foods():
    with get_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                SELECT name, calories, protein, carbs, fat
                FROM foods
                WHERE created_at::date = CURRENT_DATE
                ORDER BY created_at, id
                """
            )
            rows = cur.fetchall()
    return [
        {
            "name": row[0],
            "calories":row[1],
            "protein":row[2],
            "carbs":row[3],
            "fat":row[4]
        }
        for row in rows
    ]