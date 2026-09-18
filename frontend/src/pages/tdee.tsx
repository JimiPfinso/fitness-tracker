import { useState } from "react";

function TDEE() {
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

  function calculateTDEE(event: React.FormEvent) {
    event.preventDefault();

    const weightKg = Number(tdeeWeight);
    const heightCm = Number(height);
    const ageYears = Number(age);

    let bmr: number;

    if (sex === "male") {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * ageYears + 5;
    } else {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * ageYears - 161;
    }

    const tdee = bmr * Number(activity);

    let calorieTarget = tdee;

    if (goal === "bulk") {
      calorieTarget += 500;
    } else if (goal === "cut") {
      calorieTarget -= 500;
    }

    const proteinGrams = weightKg * 2;
    const proteinCalories = proteinGrams * 4;

    const fatCalories = calorieTarget * 0.3;
    const fatGrams = fatCalories / 9;

    const carbCalories =
      calorieTarget - proteinCalories - fatCalories;
    const carbGrams = carbCalories / 4;

    setTargetCalories(Math.round(calorieTarget));
    setTargetProtein(Math.round(proteinGrams));
    setTargetFat(Math.round(fatGrams));
    setTargetCarbs(Math.round(carbGrams));
  }

  return (
    <>
      <header className="header">
        <h1>TDEE Calculator</h1>
        <p>
          Estimate your calorie and macronutrient targets based on your body,
          activity level and goal.
        </p>
      </header>

      <section className="card">
        <div className="tdee-layout">
          <div className="tdee-calculator">
            <h2>Calculate Your Targets</h2>

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

              <select
                value={sex}
                onChange={(event) => setSex(event.target.value)}
              >
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

              <select
                value={goal}
                onChange={(event) => setGoal(event.target.value)}
              >
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
                    fat at 30% of calories, and remaining calories come from
                    carbohydrates.
                  </small>
                </div>
              )}

            <div className="goal-guide">
              <h3>🎯 Nutrition Goal Guide</h3>

              <div className="goal-item">
                <span className="goal-icon">✂️</span>

                <div>
                  <strong>Cutting</strong>
                  <p>
                    Uses a 500 calorie daily deficit as a simple starting
                    estimate.
                  </p>
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
                  <p>
                    Uses a 500 calorie daily surplus as a simple starting
                    estimate.
                  </p>
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
              <strong>🛋️ Sedentary</strong>
              <br />
              &lt;5,000 steps/day • little exercise
            </p>

            <p>
              <strong>🚶 Lightly Active</strong>
              <br />
              5,000–7,500 steps/day • 1–3 workouts/week
            </p>

            <p>
              <strong>🏋️ Moderately Active</strong>
              <br />
              7,500–10,000+ steps/day • 3–5 workouts/week
            </p>

            <p>
              <strong>🏃 Very Active</strong>
              <br />
              10,000–12,500+ steps/day • 5–7 workouts/week
            </p>

            <p>
              <strong>🔥 Extremely Active</strong>
              <br />
              12,500+ steps/day • intense training or physical job
            </p>

            <small>
              Activity levels are approximate guides. Actual energy
              requirements vary between individuals.
            </small>
          </aside>
        </div>
      </section>
    </>
  );
}

export default TDEE;