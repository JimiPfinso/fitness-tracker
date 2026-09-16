import { useEffect, useState } from "react";

type Nutrition = {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
};

type Bodyweight = {
  starting_weight: number;
  current_weight: number;
  change: number;
  average_weight: number;
};

type Workout = {
  exercise: string;
  sets: number;
  reps: number;
  weight: number;
};

function App() {
  const [nutrition, setNutrition] = useState<Nutrition | null>(null);
  const [bodyweight, setBodyweight] = useState<Bodyweight | null>(null);
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [exercise, setExercise] = useState("");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");
  const [foodName, setFoodName] = useState("");
  const [calories, setCalories] = useState("");
  const [protein, setProtein] = useState("");
  const [carbs, setCarbs] = useState("");
  const [fat, setFat] = useState("");
  const [bodyweightInput, setBodyweightInput] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/analytics/nutrition")
      .then((response) => response.json())
      .then((data) => setNutrition(data));

    fetch("http://127.0.0.1:8000/analytics/bodyweight")
      .then((response) => response.json())
      .then((data) => setBodyweight(data));
    
    fetch("http://127.0.0.1:8000/workouts")
    .then((response) => response.json())
    .then((data) => setWorkouts(data));
  }, []);

  function handleWorkoutSubmit(event: React.FormEvent) {
  event.preventDefault();

  const newWorkout = {
    exercise: exercise,
    sets: Number(sets),
    reps: Number(reps),
    weight: Number(weight),
  };

  fetch("http://127.0.0.1:8000/workouts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newWorkout),
  })
    .then((response) => response.json())
    .then(() => {
      setWorkouts([...workouts, newWorkout]);

      setExercise("");
      setSets("");
      setReps("");
      setWeight("");
    });
}

function handleFoodSubmit(event: React.FormEvent) {
  event.preventDefault();

  const newFood = {
    name: foodName,
    calories: Number(calories),
    protein: Number(protein),
    carbs: Number(carbs),
    fat: Number(fat),
  };

  fetch("http://127.0.0.1:8000/foods", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newFood),
  })
    .then((response) => response.json())
    .then(() => {
      return fetch("http://127.0.0.1:8000/analytics/nutrition");
    })
    .then((response) => response.json())
    .then((data) => {
      setNutrition(data);

      setFoodName("");
      setCalories("");
      setProtein("");
      setCarbs("");
      setFat("");
    });
}

function handleBodyweightSubmit(event: React.FormEvent) {

  event.preventDefault();

  const newBodyweight = {

    weight: Number(bodyweightInput),

  };

  fetch("http://127.0.0.1:8000/bodyweights", {

    method: "POST",

    headers: {

      "Content-Type": "application/json",

    },

    body: JSON.stringify(newBodyweight),

  })

    .then((response) => response.json())

    .then(() => {

      return fetch("http://127.0.0.1:8000/analytics/bodyweight");

    })

    .then((response) => response.json())

    .then((data) => {

      setBodyweight(data);

      setBodyweightInput("");

    });

}
  return (
    <div>
      <h1>Fitness Tracker</h1>

      <h2>Today's Nutrition</h2>

      {nutrition ? (
        <div>
          <p>Calories: {nutrition.calories}</p>
          <p>Protein: {nutrition.protein}g</p>
          <p>Carbs: {nutrition.carbs}g</p>
          <p>Fat: {nutrition.fat}g</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}

      <h2>Log Food</h2>

<form onSubmit={handleFoodSubmit}>
  <input
    type="text"
    placeholder="Food name"
    value={foodName}
    onChange={(event) => setFoodName(event.target.value)}
  />

  <input
    type="number"
    placeholder="Calories"
    value={calories}
    onChange={(event) => setCalories(event.target.value)}
  />

  <input
    type="number"
    placeholder="Protein (g)"
    value={protein}
    onChange={(event) => setProtein(event.target.value)}
  />

  <input
    type="number"
    placeholder="Carbs (g)"
    value={carbs}
    onChange={(event) => setCarbs(event.target.value)}
  />

  <input
    type="number"
    placeholder="Fat (g)"
    value={fat}
    onChange={(event) => setFat(event.target.value)}
  />

  <button type="submit">Log Food</button>
</form>

      <h2>Bodyweight Progress</h2>

      {bodyweight ? (
        <div>
          <p>Starting Weight: {bodyweight.starting_weight}kg</p>
          <p>Current Weight: {bodyweight.current_weight}kg</p>
          <p>Change: {bodyweight.change}kg</p>
          <p>Average Weight: {bodyweight.average_weight}kg</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}

      <h2>Log Bodyweight</h2>

<form onSubmit={handleBodyweightSubmit}>
  <input
    type="number"
    step="0.1"
    placeholder="Bodyweight (kg)"
    value={bodyweightInput}
    onChange={(event) => setBodyweightInput(event.target.value)}
  />

  <button type="submit">Log Bodyweight</button>
</form>

      <h2>Log Workout</h2>

      <form onSubmit={handleWorkoutSubmit}>
        <input
          type="text"
          placeholder="Exercise"
          value={exercise}
          onChange={(event) => setExercise(event.target.value)}
        />

        <input
          type="number"
          placeholder="Sets"
          value={sets}
          onChange={(event) => setSets(event.target.value)}
        />

        <input
          type="number"
          placeholder="Reps"
          value={reps}
          onChange={(event) => setReps(event.target.value)}
        />

        <input
          type="number"
          placeholder="Weight (kg)"
          value={weight}
          onChange={(event) => setWeight(event.target.value)}
        />

        <button type="submit">Log Workout</button>
      </form>

      <h2>Workouts</h2>
      {workouts.length > 0 ? (
        <div>
          {workouts.map((workout, index) => (
            <div key={index}>
              <strong>{workout.exercise}</strong>
              <p>
                {workout.sets} sets × {workout.reps} reps at {workout.weight}kg
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p>No workouts logged.</p>
      )}
    </div>
  );
}

export default App;