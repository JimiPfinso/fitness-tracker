from fastapi import FastAPI
from database import (
    get_workouts, add_workout, delete_workout,
    get_todays_foods, add_food, delete_food,
    get_bodyweight_history, add_bodyweight,
    get_bodyweights
)
from main import (
    calculate_nutrition,
    calculate_average_weight,
    calculate_weight_change
)
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
class Workout(BaseModel):
    exercise: str
    sets: int
    reps: int
    weight: float

class Food(BaseModel):
    name: str
    calories: float
    protein: float
    carbs: float
    fat: float

class Bodyweight(BaseModel):
    weight: float

@app.get("/health")
def health_check():
    return {"status": "ok"}

@app.get("/workouts")
def read_workouts():
    return get_workouts()

@app.post("/workouts", status_code=201)
def create_workout(workout: Workout):
    add_workout(
        workout.exercise,
        workout.sets,
        workout.reps,
        workout.weight
    )
    return {"message": "Workout created"}

@app.delete("/workouts/{workout_id}")
def remove_workout(workout_id: int):
    deleted = delete_workout(workout_id)

    if not deleted:
        return {"message": "Workout not found"}

    return {"message": "Workout deleted"}

@app.get("/foods")
def read_foods():
    return get_todays_foods()

@app.post("/foods", status_code=201)
def create_food(food: Food):
    add_food(
        food.name,
        food.calories,
        food.protein,
        food.carbs,
        food.fat
    )
    return {"message": "Food created"}

@app.delete("/foods/{food_id}")
def remove_food(food_id: int):
    deleted = delete_food(food_id)

    if not deleted:
        return {"message": "Food not found"}

    return {"message": "Food deleted"}

@app.get("/bodyweights")
def read_bodyweights():
    return get_bodyweight_history()

@app.post("/bodyweights", status_code=201)
def create_bodyweight(bodyweight: Bodyweight):
    add_bodyweight(bodyweight.weight)
    return {"message": "Bodyweight created"}

@app.get("/analytics/nutrition")
def nutrition_analytics():
    foods = get_todays_foods()
    return calculate_nutrition(foods)

@app.get("/analytics/bodyweight")
def bodyweight_analytics():
    bodyweights = get_bodyweights()

    progress = calculate_weight_change(bodyweights)
    average = calculate_average_weight(bodyweights)

    if progress is None:
        return {"message": "No bodyweight data"}

    return {
        "starting_weight": progress["starting_weight"],
        "current_weight": progress["current_weight"],
        "change": round(progress["change"], 1),
        "average_weight": round(average, 1)
    }