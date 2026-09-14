from main import calculate_nutrition

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