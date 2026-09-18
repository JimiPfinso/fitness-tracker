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

function Dashboard() {
  const [nutrition, setNutrition] = useState<Nutrition | null>(null);
  const [bodyweight, setBodyweight] = useState<Bodyweight | null>(null);

  const [nutritionLoaded, setNutritionLoaded] = useState(false);
  const [bodyweightLoaded, setBodyweightLoaded] = useState(false);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/analytics/nutrition")
      .then((response) => response.json())
      .then((data) => {
        setNutrition(data);
        setNutritionLoaded(true);
      });

    fetch("http://127.0.0.1:8000/analytics/bodyweight")
      .then((response) => response.json())
      .then((data) => {
        if ("message" in data) {
          setBodyweight(null);
        } else {
          setBodyweight(data);
        }

        setBodyweightLoaded(true);
      });
  }, []);

  return (
    <>
      <header className="header">
        <h1>Dashboard</h1>
        <p>Track your nutrition, bodyweight and training progress.</p>
      </header>

      <div className="dashboard">
        {/* Nutrition */}
        <section className="card">
          <h2>Today's Nutrition</h2>

          {!nutritionLoaded ? (
            <p>Loading...</p>
          ) : nutrition ? (
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
            <p>No nutrition data yet.</p>
          )}
        </section>

        {/* Bodyweight */}
        <section className="card">
          <h2>Bodyweight Progress</h2>

          {!bodyweightLoaded ? (
            <p>Loading...</p>
          ) : bodyweight ? (
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
            <p>No bodyweight data yet.</p>
          )}
        </section>
      </div>

      {/* Gym Cheat Sheet */}
      <section className="card cheat-sheet">
        <h2>🏋️ Gym Cheat Sheet</h2>

        <p className="cheat-intro">
          Keep the fundamentals simple. Consistency with these habits matters
          more than chasing a perfect routine or diet.
        </p>

        <div className="cheat-grid">
          <div className="cheat-item">
            <span className="cheat-icon">🔁</span>

            <div>
              <strong>Train Consistently</strong>
              <p>
                Aim to train each muscle around twice per week. Choose a
                training split you enjoy and can consistently follow.
              </p>
            </div>
          </div>

          <div className="cheat-item">
            <span className="cheat-icon">📈</span>

            <div>
              <strong>Progressive Overload</strong>
              <p>
                Over time, aim to add reps, weight or sets, or improve your
                technique and control.
              </p>
            </div>
          </div>

          <div className="cheat-item">
            <span className="cheat-icon">🥩</span>

            <div>
              <strong>Hit Your Protein</strong>
              <p>
                Aim for roughly 1.6–2.2 g of protein per kg of bodyweight per
                day.
              </p>
            </div>
          </div>

          <div className="cheat-item">
            <span className="cheat-icon">🎯</span>

            <div>
              <strong>Control Your Calories</strong>
              <p>
                Your overall calorie intake plays a major role in whether your
                weight increases, decreases or stays roughly the same.
              </p>
            </div>
          </div>

          <div className="cheat-item">
            <span className="cheat-icon">🥗</span>

            <div>
              <strong>Build a Balanced Diet</strong>
              <p>
                Base most of your diet around nutritious foods, but you don't
                need to completely restrict foods you enjoy. Fit them within
                your overall nutrition plan.
              </p>
            </div>
          </div>

          <div className="cheat-item">
            <span className="cheat-icon">⚖️</span>

            <div>
              <strong>Measure When Tracking</strong>
              <p>
                Weighing food can make calorie and macro tracking more
                accurate. Be consistent about whether you record foods raw or
                cooked, and remember calorie-dense extras such as oils and
                sauces.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Getting Back on Track */}
      <section className="card recovery-card">
        <h2>🧭 Went Off Plan? Keep Going.</h2>

        <p className="cheat-intro">
          Progress doesn't require perfection. One unusual meal, missed workout
          or off-plan day doesn't erase weeks of consistency.
        </p>

        <div className="recovery-grid">
          {/* Off-plan meal */}
          <div className="recovery-item">
            <span className="cheat-icon">🍕</span>

            <div>
              <strong>Had a Cheat Meal or Off-Plan Day?</strong>
              <p>
                Don't panic or try to punish yourself for it. Return to your
                normal eating routine at your next meal and keep going.
              </p>
            </div>
          </div>

          {/* Calorie perspective */}
          <div className="recovery-item">
            <span className="cheat-icon">🧮</span>

            <div>
              <strong>Put It Into Perspective</strong>
              <p>
                A commonly used rough estimate is that gaining 1 kg of body fat
                corresponds to around 7,700 calories of cumulative energy
                surplus.
              </p>

              <div className="perspective-example">
                <span>Example</span>

                <p>
                  If your maintenance is <strong>2,500 kcal</strong> and you eat{" "}
                  <strong>3,500 kcal</strong>, that's approximately a{" "}
                  <strong>1,000 kcal surplus</strong> — much less than 7,700
                  kcal.
                </p>
              </div>

              <small>
                This is only a rough energy-balance illustration. Actual body
                fat changes don't follow a perfectly fixed calorie conversion.
              </small>
            </div>
          </div>

          {/* Habit */}
          <div className="recovery-item">
            <span className="cheat-icon">🔁</span>

            <div>
              <strong>Don't Let One Miss Become a Pattern</strong>
              <p>
                Missing once happens. Focus on returning to the habit at your
                next opportunity. You don't need to compensate — just resume
                your normal routine.
              </p>
            </div>
          </div>

          {/* Missed gym */}
          <div className="recovery-item">
            <span className="cheat-icon">🏋️</span>

            <div>
              <strong>Couldn't Train 4–5 Times This Week?</strong>
              <p>
                That's okay. A busy week doesn't have to become a zero-training
                week. Two well-planned full-body sessions can still train your
                major muscle groups twice that week.
              </p>
            </div>
          </div>
        </div>

        <div className="recovery-message">
          <strong>Progress &gt; Perfection</strong>

          <p>
            Your results come from what you do consistently over time, not from
            executing every single day perfectly.
          </p>
        </div>
      </section>
    </>
  );
}

export default Dashboard;