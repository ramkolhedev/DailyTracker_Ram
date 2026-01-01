import styles from "./Profile.module.css";

const Profile = () => {
  const habits = JSON.parse(localStorage.getItem("habits")) || [];
  const habitStats = JSON.parse(localStorage.getItem("habitStats")) || {};

  const totalHabits = habits.length;

  const totalCheckIns = Object.values(habitStats).reduce(
    (sum, h) => sum + (h.completedDates?.length || 0),
    0
  );

  const longestStreak = Object.values(habitStats).reduce(
    (max, h) => Math.max(max, h.streak || 0),
    0
  );

  const today = new Date().toISOString().split("T")[0];

  const activeHabits = Object.values(habitStats).filter(
    h => h.completedDates?.includes(today)
  ).length;

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.avatar}>👨🏻‍💻</div>
          <h2 className={styles.name}>User</h2>
          <p className={styles.sub}>Member since Dec 2025</p>
        </div>

        <div className={styles.card}>
          <h3>Your Statistics</h3>
          <div className={styles.statsGrid}>
            <div className={styles.statBox}>
              <span>{totalHabits}</span>
              <p>Total Habits</p>
            </div>
            <div className={styles.statBox}>
              <span>{activeHabits}</span>
              <p>Completed Today</p>
            </div>
            <div className={styles.statBox}>
              <span>{longestStreak}</span>
              <p>Longest Streak</p>
            </div>
            <div className={styles.statBox}>
              <span>{totalCheckIns}</span>
              <p>Total Check-ins</p>
            </div>
          </div>
        </div>

        <div className={styles.card}>
          <h3>Achievements</h3>
          <div className={styles.badges}>
            {totalHabits >= 1 && <div className={styles.badge}>🏅 First Habit</div>}
            {totalHabits >= 5 && <div className={styles.badge}>🧘 Habit Master</div>}
            {longestStreak >= 7 && <div className={styles.badge}>🔥 7 Day Streak</div>}
            {longestStreak >= 30 && <div className={styles.badge}>🔥 30 Day Streak</div>}
            {totalCheckIns >= 20 && <div className={styles.badge}>💯 Consistent</div>}
            {totalHabits < 1 && <p>No achievements yet</p>}
          </div>
        </div>


        <div className={styles.card}>
          <h3>Habit Overview</h3>
          <ul className={styles.habitList}>
            {habits.map(habit => (
              <li key={habit.id}>
                <span>{habit.title}</span>
                <span>{habitStats[habit.id]?.streak || 0}🔥</span>
              </li>
            ))}
          </ul>
        </div>

        <p className={styles.quote}>
          Small habits make big changes 🌱
        </p>
      </div>
    </div>
  );
};

export default Profile;
