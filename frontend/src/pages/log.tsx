import { useEffect, useState } from "react";
import { API_URL } from "../api";

type Food = {
  id: number;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
};

function Log() {
  // Food form
  const [foodName, setFoodName] = useState("");
  const [calories, setCalories] = useState("");
  const [protein, setProtein] = useState("");
  const [carbs, setCarbs] = useState("");
  const [fat, setFat] = useState("");

  // Today's foods
  const [foods, setFoods] = useState<Food[]>([]);
  const [foodsLoaded, setFoodsLoaded] = useState(false);

  // Bodyweight form
  const [bodyweightInput, setBodyweightInput] = useState("");

  // Workout form
  const [exercise, setExercise] = useState("");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");

  function loadFoods() {
    fetch(`${API_URL}/foods`)
      .then((response) => response.json())
      .then((data) => {
        setFoods(data);
        setFoodsLoaded(true);
      });
  }

  useEffect(() => {
    loadFoods();
  }, []);

  function handleFoodSubmit(event: React.FormEvent) {
    event.preventDefault();

    const newFood = {
      name: foodName,
      calories: Number(calories),
      protein: Number(protein),
      carbs: Number(carbs),
      fat: Number(fat),
    };

    fetch(`${API_URL}/foods`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newFood),
    })
      .then((response) => response.json())
      .then(() => {
        setFoodName("");
        setCalories("");
        setProtein("");
        setCarbs("");
        setFat("");

        loadFoods();
      });
  }

  function handleDeleteFood(foodId: number) {
    fetch(`${API_URL}/foods/${foodId}`, {
      method: "DELETE",
    }).then((response) => {
      if (response.ok) {
        setFoods((currentFoods) =>
          currentFoods.filter((food) => food.id !== foodId)
        );
      }
    });
  }

  function handleBodyweightSubmit(event: React.FormEvent) {
    event.preventDefault();

    const newBodyweight = {
      weight: Number(bodyweightInput),
    };

    fetch(`${API_URL}/bodyweights`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBodyweight),
    })
      .then((response) => response.json())
      .then(() => {
        setBodyweightInput("");
      });
  }

  function handleWorkoutSubmit(event: React.FormEvent) {
    event.preventDefault();

    const newWorkout = {
      exercise,
      sets: Number(sets),
      reps: Number(reps),
      weight: Number(weight),
    };

    fetch(`${API_URL}/workouts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newWorkout),
    })
      .then((response) => response.json())
      .then(() => {
        setExercise("");
        setSets("");
        setReps("");
        setWeight("");
      });
  }

  return (
    <>
      <header className="header">
        <h1>Log</h1>
        <p>Record your nutrition, bodyweight and training.</p>
      </header>

      <section className="card">
        <h2>🍽️ Log Food</h2>

        <form className="form" onSubmit={handleFoodSubmit}>
          <input
            type="text"
            placeholder="Food name"
            value={foodName}
            onChange={(event) => setFoodName(event.target.value)}
            required
          />

          <input
            type="number"
            placeholder="Calories"
            value={calories}
            onChange={(event) => setCalories(event.target.value)}
            min="0"
            required
          />

          <input
            type="number"
            step="0.1"
            placeholder="Protein (g)"
            value={protein}
            onChange={(event) => setProtein(event.target.value)}
            min="0"
            required
          />

          <input
            type="number"
            step="0.1"
            placeholder="Carbs (g)"
            value={carbs}
            onChange={(event) => setCarbs(event.target.value)}
            min="0"
            required
          />

          <input
            type="number"
            step="0.1"
            placeholder="Fat (g)"
            value={fat}
            onChange={(event) => setFat(event.target.value)}
            min="0"
            required
          />

          <button type="submit">Log Food</button>
        </form>

        <div className="food-history">
          <h3>Today's Food</h3>

          {!foodsLoaded ? (
            <p>Loading...</p>
          ) : foods.length > 0 ? (
            foods.map((food) => (
              <div className="food-entry" key={food.id}>
                <div>
                  <strong>{food.name}</strong>
                  <p>
                    {food.calories} kcal · {food.protein}g protein ·{" "}
                    {food.carbs}g carbs · {food.fat}g fat
                  </p>
                </div>

                <button
                  className="delete-button"
                  onClick={() => handleDeleteFood(food.id)}
                  aria-label={`Delete ${food.name}`}
                  title="Delete food"
                >
                  🗑️
                </button>
              </div>
            ))
          ) : (
            <p>No food logged today.</p>
          )}
        </div>
      </section>

      <section className="card">
        <h2>⚖️ Log Bodyweight</h2>

        <form className="form" onSubmit={handleBodyweightSubmit}>
          <input
            type="number"
            step="0.1"
            placeholder="Bodyweight (kg)"
            value={bodyweightInput}
            onChange={(event) => setBodyweightInput(event.target.value)}
            min="1"
            required
          />

          <button type="submit">Log Bodyweight</button>
        </form>
      </section>

      <section className="card">
        <h2>🏋️ Log Workout</h2>

        <form className="form" onSubmit={handleWorkoutSubmit}>
          <input
            type="text"
            placeholder="Exercise"
            value={exercise}
            onChange={(event) => setExercise(event.target.value)}
            required
          />

          <input
            type="number"
            placeholder="Sets"
            value={sets}
            onChange={(event) => setSets(event.target.value)}
            min="1"
            required
          />

          <input
            type="number"
            placeholder="Reps"
            value={reps}
            onChange={(event) => setReps(event.target.value)}
            min="1"
            required
          />

          <input
            type="number"
            step="0.1"
            placeholder="Weight (kg)"
            value={weight}
            onChange={(event) => setWeight(event.target.value)}
            min="0"
            required
          />

          <button type="submit">Log Workout</button>
        </form>
      </section>
    </>
  );
}

export default Log;