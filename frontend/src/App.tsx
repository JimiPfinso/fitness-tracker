import { useEffect, useState } from "react";
import "./App.css";

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

  <div className="app">

    <header className="header">

      <h1>Fitness Tracker</h1>

      <p>Track your nutrition, bodyweight and training progress.</p>

    </header>

    <div className="dashboard">

      <section className="card">

        <h2>Today's Nutrition</h2>

        {nutrition ? (

          <div className="stats">

            <div className="stat">

              <strong>{nutrition.calories}</strong>

              <span>Calories</span>

            </div>

            <div className="stat">

              <strong>{nutrition.protein}g</strong>

              <span>Protein</span>

            </div>

            <div className="stat">

              <strong>{nutrition.carbs}g</strong>

              <span>Carbs</span>

            </div>

            <div className="stat">

              <strong>{nutrition.fat}g</strong>

              <span>Fat</span>

            </div>

          </div>

        ) : (

          <p>Loading...</p>

        )}

      </section>

      <section className="card">

        <h2>Bodyweight Progress</h2>

        {bodyweight ? (

          <div className="stats">

            <div className="stat">

              <strong>{bodyweight.starting_weight}kg</strong>

              <span>Starting</span>

            </div>

            <div className="stat">

              <strong>{bodyweight.current_weight}kg</strong>

              <span>Current</span>

            </div>

            <div className="stat">

              <strong>{bodyweight.change}kg</strong>

              <span>Change</span>

            </div>

            <div className="stat">

              <strong>{bodyweight.average_weight}kg</strong>

              <span>Average</span>

            </div>

          </div>

        ) : (

          <p>Loading...</p>

        )}

      </section>

    </div>

    <section className="card">

      <h2>Log Food</h2>

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

          required

        />

        <input

          type="number"

          placeholder="Protein (g)"

          value={protein}

          onChange={(event) => setProtein(event.target.value)}

          required

        />

        <input

          type="number"

          placeholder="Carbs (g)"

          value={carbs}

          onChange={(event) => setCarbs(event.target.value)}

          required

        />

        <input

          type="number"

          placeholder="Fat (g)"

          value={fat}

          onChange={(event) => setFat(event.target.value)}

          required

        />

        <button type="submit">Log Food</button>

      </form>

    </section>

    <section className="card">

      <h2>Log Bodyweight</h2>

      <form className="form" onSubmit={handleBodyweightSubmit}>

        <input

          type="number"

          step="0.1"

          placeholder="Bodyweight (kg)"

          value={bodyweightInput}

          onChange={(event) => setBodyweightInput(event.target.value)}

          required

        />

        <button type="submit">Log Bodyweight</button>

      </form>

    </section>

    <section className="card">

      <h2>Log Workout</h2>

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

          required

        />

        <input

          type="number"

          placeholder="Reps"

          value={reps}

          onChange={(event) => setReps(event.target.value)}

          required

        />

        <input

          type="number"

          step="0.1"

          placeholder="Weight (kg)"

          value={weight}

          onChange={(event) => setWeight(event.target.value)}

          required

        />

        <button type="submit">Log Workout</button>

      </form>

    </section>

    <section className="card">

      <h2>Workouts</h2>

      {workouts.length > 0 ? (

        <div>

          {workouts.map((workout, index) => (

            <div className="workout" key={index}>

              <div>

                <strong>{workout.exercise}</strong>

                <p>

                  {workout.sets} sets × {workout.reps} reps

                </p>

              </div>

              <span className="workout-weight">

                {workout.weight}kg

              </span>

            </div>

          ))}

        </div>

      ) : (

        <p>No workouts logged.</p>

      )}

    </section>

  </div>

);
}
export default App;