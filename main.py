from database import (
    add_bodyweight, get_bodyweights, get_bodyweight_history, 
    add_food, get_foods, get_todays_foods,
    add_workout, get_workouts,
)

def show_menu():
    print("=== Fitness Tracker ===")
    print("1. Log food")
    print("2. View today's nutrition")
    print("3. Log workout")
    print("4. View workouts")
    print("5. Log bodyweight")
    print("6. View progress")
    print("7. View bodyweight history")
    print("8. Exit")

def get_float(prompt):
    while True:
        try:
            return float(input(prompt))
        except ValueError:
            print("Please enter a valid number.")

def get_int(prompt):
    while True:
        try:
            return int(input(prompt))
        except ValueError:
            print("Please enter a valid whole number.")

def log_food():
    food = input("Food name: ")
    calories = get_float("Calories: ")
    protein = get_float("Protein (g): ")
    carbs = get_float("Carbs (g): ")
    fat = get_float("Fat (g): ")

    add_food(food, calories, protein, carbs, fat)

    print("Food logged: ")
    print(f"food: {food}, calories: {calories}, protein: {protein}g, carbs: {carbs}g, fat: {fat}g")

def calculate_nutrition(foods):
    total_calories = 0
    total_protein = 0
    total_carbs = 0
    total_fat = 0

    for food in foods:
        total_calories += food["calories"]
        total_protein += food["protein"]
        total_carbs += food["carbs"]
        total_fat += food["fat"]
    
    return {
        "calories": total_calories,
        "protein": total_protein,
        "carbs": total_carbs,
        "fat": total_fat
    }

def view_nutrition():
    foods = get_todays_foods()
    totals = calculate_nutrition(foods)

    print(f"Calories: {totals['calories']}")
    print(f"Protein: {totals['protein']}g")
    print(f"Carbs: {totals['carbs']}g")
    print(f"Fat: {totals['fat']}g")

def log_workout():
    exercise = input("Exercise name: ")
    sets = get_int("Sets: ")
    reps = get_int("Reps: ")
    weight = get_float("Weight (kg): ")

    add_workout(exercise, sets, reps, weight)

    print("Workout logged:")
    print(f"{exercise}: {sets} sets x {reps} reps at {weight}kg")

def calculate_workout_volume(workout):
    return workout["sets"] * workout["reps"] * workout["weight"]

def view_workouts():
    workouts = get_workouts()

    if len(workouts) == 0:
        print("No workouts logged.")
    else:
        for workout in workouts:
            volume = calculate_workout_volume(workout)

            print(
                f"{workout['exercise']}: "
                f"{workout['sets']} sets x "
                f"{workout['reps']} reps at "
                f"{workout['weight']}kg | "
                f"Volume: {volume}kg"
            )

def log_bodyweight():
    weight = get_float("Bodyweight (kg): ")
    add_bodyweight(weight)

    print(f"Bodyweight logged: {weight}kg")

def calculate_weight_change(bodyweights):
    if len(bodyweights) == 0:
        return None

    starting_weight = bodyweights[0]
    current_weight = bodyweights[-1]
    change = current_weight - starting_weight

    return {
        "starting_weight": starting_weight,
        "current_weight": current_weight,
        "change": change
    }

def calculate_average_weight(bodyweights):
    if len(bodyweights) == 0:
        return None

    total = 0

    for weight in bodyweights:
        total += weight

    return total / len(bodyweights)

def view_progress():
    bodyweights = get_bodyweights()
    progress = calculate_weight_change(bodyweights)
    average = calculate_average_weight(bodyweights)

    if progress is None:
        print("No bodyweight entries logged.")
    else:
        print(f"Starting weight: {progress['starting_weight']}kg")
        print(f"Current weight: {progress['current_weight']}kg")
        print(f"Change: {progress['change']:.1f}kg")      
        print(f"Average weight: {average:.1f}kg")     

def view_bodyweight_history():
    history = get_bodyweight_history()

    if len(history) == 0:
        print("No bodyweight entries logged.")
    else:
        for entry in history:
            date = entry["date"].strftime("%d %b %Y")
            print(f"{date}: {entry['weight']}kg")

def main():
    while True:
        show_menu()
        choice = input("Select an option: ")

        if choice == "1":
            log_food()
        elif choice == "2":
            view_nutrition()
        elif choice == "3":
            log_workout()
        elif choice == "4":
            view_workouts()
        elif choice == "5":
            log_bodyweight()
        elif choice == "6":
            view_progress()
        elif choice == "7":
            view_bodyweight_history()
        elif choice == "8":
            print("Goodbye!")
            break
        else:
            print("Invalid option") 

if __name__ == "__main__":
    main()