import styles from "./Report.module.css";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid
} from "recharts";

const Report = () => {
    const habits = JSON.parse(localStorage.getItem("habits")) || [];
    const habitStats = JSON.parse(localStorage.getItem("habitStats")) || {};

    const dateMap = {};
    let totalCheckIns = 0;
    let longestStreak = 0;

    Object.values(habitStats).forEach(h => {
        totalCheckIns += h.completedDates?.length || 0;
        longestStreak = Math.max(longestStreak, h.streak || 0);

        h.completedDates?.forEach(date => {
            dateMap[date] = (dateMap[date] || 0) + 1;
        });
    });

    const chartData = Object.keys(dateMap)
        .sort()
        .map(date => ({
            date,
            completed: dateMap[date]
        }));

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <h2>Progress Report</h2>
                <p>Track how consistently you complete your habits</p>
            </div>

            <div className={styles.stats}>
                <div className={styles.statCard}>
                    <span>{habits.length}</span>
                    <p>Total Habits</p>
                </div>
                <div className={styles.statCard}>
                    <span>{totalCheckIns}</span>
                    <p>Total Check-ins</p>
                </div>
                <div className={styles.statCard}>
                    <span>{longestStreak}</span>
                    <p>Best Streak</p>
                </div>
            </div>

            <div className={styles.chartCard}>
                {chartData.length === 0 ? (
                    <p className={styles.empty}>No activity yet. Start completing habits!</p>
                ) : (
                    <ResponsiveContainer width="100%" height={320}>
                        <LineChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis allowDecimals={false} />
                            <Tooltip />
                            <Line
                                type="monotone"
                                dataKey="completed"
                                stroke="#4ac6d9"
                                strokeWidth={3}
                                dot={{ r: 4 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                )}
            </div>
        </div>
    );
};

export default Report;
