foods = []

print("Fitness Tracker")
print("=== Fitness Tracker ===")
print("1. Log food")
print("2. View today's nutrition")
print("3. Log workout")
print("4. View workouts")
print("5. Log bodyweight")
print("6. View progress")
print("7. Exit")

choice = input("Select an option: ")

if choice == "1":
    food = input("Food name: ")
    calories = float(input("Calories: "))
    protein = float(input("Protein (g): "))
    carbs = float(input("Carbs (g): "))
    fat = float(input("Fat (g): "))

    food_entry = {
        "name": food,
        "calories": calories,
        "protein": protein,
        "carbs": carbs,
        "fat": fat
    }

    foods.append(food_entry)

    print("Food logged: ")
    print(food_entry)
    print(f"food: {food}, calories: {calories}, protein: {protein}g, carbs: {carbs}g, fat: {fat}g")
elif choice == "2":
    print("View today's nutrition selected")
elif choice == "3":
    print("Log workout selected")
elif choice == "4":
    print("View workouts selected")
elif choice == "5":
    print("Log bodyweight selected")
elif choice == "6":
    print("View progress selected")
elif choice == "7":
    print("Goodbye!")
else:
    print("Invalid option")