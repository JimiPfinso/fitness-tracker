import { useEffect, useState } from "react";
import "./App.css";
import { FaYoutube, FaTiktok } from "react-icons/fa";

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
  const [age, setAge] = useState("");
  const [tdeeWeight, setTdeeWeight] = useState("");
  const [height, setHeight] = useState("");
  const [sex, setSex] = useState("male");
  const [activity, setActivity] = useState("1.55");
  const [goal, setGoal] = useState("maintain");
  const [targetCalories, setTargetCalories] = useState<number | null>(null);
  const [targetProtein, setTargetProtein] = useState<number | null>(null);
  const [targetFat, setTargetFat] = useState<number | null>(null);
  const [targetCarbs, setTargetCarbs] = useState<number | null>(null);

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

function calculateTDEE(event: React.FormEvent) {
  event.preventDefault();

  const weightKg = Number(tdeeWeight);
  const heightCm = Number(height);
  const ageYears = Number(age);

  let bmr;

  if (sex === "male") {
    bmr = 10 * weightKg + 6.25 * heightCm - 5 * ageYears + 5;
  } else {
    bmr = 10 * weightKg + 6.25 * heightCm - 5 * ageYears - 161;
  }

  const tdee = bmr * Number(activity);

  let calories = tdee;

  if (goal === "bulk") {
    calories += 500;
  } else if (goal === "cut") {
    calories -= 500;
  }

  const proteinGrams = weightKg * 2;
  const proteinCalories = proteinGrams * 4;

  const fatCalories = calories * 0.30;
  const fatGrams = fatCalories / 9;

  const carbCalories = calories - proteinCalories - fatCalories;
  const carbGrams = carbCalories / 4;

  setTargetCalories(Math.round(calories));
  setTargetProtein(Math.round(proteinGrams));
  setTargetFat(Math.round(fatGrams));
  setTargetCarbs(Math.round(carbGrams));
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
      <h2>TDEE & Calorie Calculator</h2>

  <p className="card-description">

    Estimate your daily calorie needs based on your body measurements,

    activity level and goal.

  </p>

  <div className="tdee-layout">

    <div className="tdee-calculator">

      <form className="form" onSubmit={calculateTDEE}>

        <input

          type="number"

          placeholder="Age"

          value={age}

          onChange={(event) => setAge(event.target.value)}

          min="15"

          required

        />

        <input

          type="number"

          step="0.1"

          placeholder="Weight (kg)"

          value={tdeeWeight}

          onChange={(event) => setTdeeWeight(event.target.value)}

          min="1"

          required

        />

        <input

          type="number"

          step="0.1"

          placeholder="Height (cm)"

          value={height}

          onChange={(event) => setHeight(event.target.value)}

          min="1"

          required

        />

        <select value={sex} onChange={(event) => setSex(event.target.value)}>

          <option value="male">Male</option>

          <option value="female">Female</option>

        </select>

        <select

          value={activity}

          onChange={(event) => setActivity(event.target.value)}

        >

          <option value="1.2">Sedentary</option>

          <option value="1.375">Lightly Active</option>

          <option value="1.55">Moderately Active</option>

          <option value="1.725">Very Active</option>

          <option value="1.9">Extremely Active</option>

        </select>

        <select value={goal} onChange={(event) => setGoal(event.target.value)}>

          <option value="cut">Cut</option>

          <option value="maintain">Maintain</option>

          <option value="bulk">Bulk</option>

        </select>

        <button type="submit">Calculate</button>

      </form>

      {targetCalories !== null &&

      targetProtein !== null &&

      targetFat !== null &&

      targetCarbs !== null && (

        <div className="tdee-result">

          <span>Estimated daily target</span>

          <strong>{targetCalories} calories</strong>

          <div className="macro-targets">

            <div>

              <span className="macro-icon">🍗</span>

              <strong>{targetProtein}g</strong>

              <span>Protein</span>

            </div>

            <div>

              <span className="macro-icon">🧈</span>

              <strong>{targetFat}g</strong>

              <span>Fat</span>

            </div>

            <div>

              <span className="macro-icon">🍚</span>

              <strong>{targetCarbs}g</strong>

              <span>Carbs</span>

            </div>

          </div>

          <small>

            Macro targets are estimates: protein is set at 2.0 g/kg,

            fat at 30% of calories, and remaining calories come from carbohydrates.

          </small>

        </div>

      )}

      {/* ADD THIS HERE */}

      <div className="goal-guide">

        <h3>🎯 Nutrition Goal Guide</h3>

        <div className="goal-item">

          <span className="goal-icon">✂️</span>

          <div>

            <strong>Cutting</strong>

            <p>Roughly 500 calories below maintenance.</p>

          </div>

        </div>

        <div className="goal-item">

          <span className="goal-icon">⚖️</span>

          <div>

            <strong>Maintenance</strong>

            <p>Eat around your estimated maintenance calories.</p>

          </div>

        </div>

        <div className="goal-item">

          <span className="goal-icon">📈</span>

          <div>

            <strong>Bulking</strong>

            <p>Roughly 500 calories above maintenance.</p>

          </div>

        </div>

        <div className="goal-note">

          <strong>🍽️ Keep it flexible</strong>

          <p>

            No specific foods need to be completely avoided. Focus on

            consistently hitting your calorie and protein targets while

            fitting foods within your overall macros and maintaining a

            balanced diet.

          </p>

        </div>

      </div>

    </div>

    <aside className="activity-guide">

      <h3>🏃 Activity Guide</h3>

      <p>

        <strong>🛋️ Sedentary</strong><br />

        &lt;5,000 steps/day • little exercise

      </p>

      <p>

        <strong>🚶 Lightly Active</strong><br />

        5,000–7,500 steps/day • 1–3 workouts/week

      </p>

      <p>

        <strong>🏋️ Moderately Active</strong><br />

        7,500–10,000+ steps/day • 3–5 workouts/week

      </p>

      <p>

        <strong>🏃 Very Active</strong><br />

        10,000–12,500+ steps/day • 5–7 workouts/week

      </p>

      <p>

        <strong>🔥 Extremely Active</strong><br />

        12,500+ steps/day • intense training or physical job

      </p>

      <small>Activity levels are approximate guides.</small>

    </aside>
  </div>
</section>

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

    <section className="card resources-card">

      <h2>🔗 Recommended Resources</h2>

      <p className="card-description">

        A few apps and fitness creators I recommend.

      </p>

      <div className="resources-grid">

        <div className="resource-group">

          <h3>📱 Tracking Apps</h3>

          <a

            href="https://www.hevyapp.com/"

            target="_blank"

            rel="noopener noreferrer"

            className="resource-link"

          >

            🏋️ Hevy

            <span>Workout & strength tracking</span>

          </a>

          <a

            href="https://apps.apple.com/au/app/stupid-simple-macro-tracker/id1210995590"

            target="_blank"

            rel="noopener noreferrer"

            className="resource-link"

          >

            🍚 Stupid Simple Macro Tracker

            <span>Calories & macro tracking</span>

          </a>

        </div>

        <div className="resource-group">

  <h3>▶️ Fitness Creators</h3>

  <div className="creator-section">

    <h4>🏋️ Training & Overall Fitness</h4>

    <div className="creator-list">

      <a

        href="https://www.youtube.com/@sam_sulek"

        target="_blank"

        rel="noopener noreferrer"

        className="creator-link"

      >

        <strong>💪 Sam Sulek</strong>

        <span className="platform">
        <FaYoutube /> YouTube
        </span>

        <small>Training, bodybuilding and general fitness content</small>

      </a>

      <a

        href="https://www.tiktok.com/@jacoboestreichercoaching?lang=en"

        target="_blank"

        rel="noopener noreferrer"

        className="creator-link"

      >

        <strong>🏋️ Jacob Oestricher</strong>

        <span className="platform">
        <FaTiktok /> TikTok
        </span>

        <small>Training, physique development and general fitness content</small>

      </a>

    </div>

    <h4>🥗 Diet & Cutting</h4>

    <div className="creator-list">

      <a

        href="https://www.youtube.com/@AlexGamble"

        target="_blank"

        rel="noopener noreferrer"

        className="creator-link"

      >

        <strong>🥗 Alex Gamble</strong>

        <span className="platform">
        <FaYoutube /> YouTube
        </span>

        <small>Dieting, cutting tips and practical nutrition strategies</small>

      </a>

      <a

        href="https://www.tiktok.com/@lmtlsstraining"

        target="_blank"

        rel="noopener noreferrer"

        className="creator-link"

      >

        <strong>✂️ Chris LMTT</strong>

        <span className="platform">
        <FaTiktok /> TikTok
        </span>

        <small>Cutting, calorie management and dieting techniques</small>

      </a>

    </div>

    <p className="creator-disclaimer">

      Creator recommendations are for general fitness content and entertainment,

      not individualized medical or nutrition advice.

    </p>

  </div>

</div>
      </div>
    </section>
  </div>
);
}
export default App;