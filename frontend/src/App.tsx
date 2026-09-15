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

  fetch("http://127.0.0.1:8000/workouts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      exercise: exercise,
      sets: Number(sets),
      reps: Number(reps),
      weight: Number(weight),
    }),
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