import styles from './Dashboard.module.css';
import { FiTarget } from "react-icons/fi";
import { AiOutlineFire } from "react-icons/ai";
import { FiAward } from "react-icons/fi";
import { FiTrendingUp } from "react-icons/fi";
import { useEffect, useState } from "react";

const Dashboard = ({ habits }) => {
    const [habitStats, setHabitStats] = useState({});

    const today = new Date().toISOString().split("T")[0];

    useEffect(() => {
        const syncStats = () => {
            const stats = JSON.parse(localStorage.getItem("habitStats")) || {};
            setHabitStats(stats);
        };

        syncStats();
        window.addEventListener("storage", syncStats);
        return () => window.removeEventListener("storage", syncStats);
    }, []);

    const totalHabits = habits.length;

    const completedToday = habits.filter(habit =>
        habitStats[habit.id]?.completedDates?.includes(today)
    ).length;

    const completionRate =
        totalHabits === 0 ? 0 : Math.round((completedToday / totalHabits) * 100);

    const longestStreak = habits.reduce(
        (max, habit) => Math.max(max, habitStats[habit.id]?.streak || 0),
        0
    );

    return (
        <div className={styles.container}>
            <div className={styles.boxes}>

                <div className={`${styles.box} ${styles.gradient}`}>
                    <h2 className={styles.heading}>Today's Progress</h2>
                    <p className={styles.bigNum}>
                        {completedToday}/{totalHabits}
                    </p>
                    <p className={styles.subtext}>{completionRate}% complete</p>
                    <FiTarget className={styles.icon} />
                </div>

                <div className={styles.box}>
                    <h2 className={styles.heading}>Current Streak</h2>
                    <p className={styles.bigNum}>{longestStreak}</p>
                    <p className={styles.subtext}>Keep it up!</p>
                    <AiOutlineFire className={styles.icon} />
                </div>

                <div className={styles.box}>
                    <h2 className={styles.heading}>Total Habits</h2>
                    <p className={styles.bigNum}>{totalHabits}</p>
                    <p className={styles.subtext}>Consistency matters</p>
                    <FiAward className={styles.icon} />
                </div>

                <div className={styles.box}>
                    <h2 className={styles.heading}>Completion Rate</h2>
                    <p className={styles.bigNum}>{completionRate}%</p>
                    <p className={styles.subtext}>Keep Improving!</p>
                    <FiTrendingUp className={styles.icon} />
                </div>

            </div>
        </div>
    );
};

export default Dashboard;
