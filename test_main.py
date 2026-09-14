from main import (
    calculate_nutrition, 
    calculate_weight_change,
    get_float,
    get_int,
    save_data,
    load_data
)

def test_calculate_nutrition():
    foods = [
        {
            "name": "Chicken",
            "calories": 200,
            "protein": 40,
            "carbs": 0,
            "fat": 5
        },
        {
            "name": "Rice",
            "calories": 300,
            "protein": 6,
            "carbs": 65,
            "fat": 2
        }
    ]

    result = calculate_nutrition(foods)

    assert result["calories"] == 500
    assert result["protein"] == 46
    assert result["carbs"] == 65
    assert result["fat"] == 7

def test_calculate_nutrition_empty():
    result = calculate_nutrition([])

    assert result["calories"] == 0
    assert result["protein"] == 0
    assert result["carbs"] == 0
    assert result["fat"] == 0

def test_calculate_weight_change():
    result = calculate_weight_change([67, 70, 78])
    assert result["starting_weight"] == 67
    assert result["current_weight"] == 78
    assert result["change"] == 11

def test_calculate_weight_change_empty():
    result = calculate_weight_change([])
    assert result is None

def test_get_float(monkeypatch):
    monkeypatch.setattr("builtins.input", lambda prompt: "12.5")
    result = get_float("Enter number: ")
    assert result == 12.5

def test_get_int(monkeypatch):
    monkeypatch.setattr("builtins.input", lambda prompt: "3")
    result = get_int("Enter whole number: ")
    assert result == 3

def test_save_and_load_data(tmp_path, monkeypatch):
    monkeypatch.chdir(tmp_path)
    foods = [
        {
            "name": "Chicken",
            "calories": 200,
            "protein": 40,
            "carbs": 0,
            "fat": 5
        }
    ]
    workouts = [
        {
            "exercise": "Bench",
            "sets": 3,
            "reps": 10,
            "weight": 80
        }
    ]
    bodyweights = [70, 71]
    save_data(foods, workouts, bodyweights)
    loaded_foods, loaded_workouts, loaded_bodyweights = load_data()

    assert loaded_foods == foods
    assert loaded_workouts == workouts
    assert loaded_bodyweights == bodyweights