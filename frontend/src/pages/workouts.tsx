import { useEffect, useState } from "react";

type Workout = {
  id: number;
  exercise: string;
  sets: number;
  reps: number;
  weight: number;
};

function Workouts() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/workouts")
      .then((response) => response.json())
      .then((data) => {
        setWorkouts(data);
        setLoaded(true);
      });
  }, []);

  function handleDelete(workoutId: number) {
    fetch(`http://127.0.0.1:8000/workouts/${workoutId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => {
        setWorkouts((currentWorkouts) =>
          currentWorkouts.filter(
            (workout) => workout.id !== workoutId
          )
        );
      });
  }

  return (
    <>
      <header className="header">
        <h1>Workouts</h1>
        <p>View your recorded training history.</p>
      </header>

      <section className="card">
        <h2>🏋️ Workout History</h2>

        {!loaded ? (
          <p>Loading...</p>
        ) : workouts.length > 0 ? (
          <div>
            {workouts.map((workout) => (
              <div className="workout" key={workout.id}>
                <div>
                  <strong>{workout.exercise}</strong>
                  <p>
                    {workout.sets} sets × {workout.reps} reps
                  </p>
                </div>

                <div className="workout-actions">
                  <span className="workout-weight">
                    {workout.weight}kg
                  </span>

                  <button
                    className="delete-button"
                    onClick={() => handleDelete(workout.id)}
                    aria-label={`Delete ${workout.exercise}`}
                    title="Delete workout"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No workouts logged yet.</p>
        )}
      </section>
    </>
  );
}

export default Workouts;