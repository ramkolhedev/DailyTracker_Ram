import { useState, useEffect } from "react";
import styles from "./Habitlist.module.css";
import MonthlyCalendar from "../MonthlyCalendar/MonthlyCalendar";
import { MdDelete } from "react-icons/md";

const getTodayStr = () => new Date().toISOString().split("T")[0];

const getYesterdayStr = () => {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    return d.toISOString().split("T")[0];
};

const computeStreak = (dates) => {
    if (!dates || dates.length === 0) return 0;

    const unique = Array.from(new Set(dates)).sort();
    let streak = 1;
    let current = new Date(unique[unique.length - 1]);

    for (let i = unique.length - 2; i >= 0; i--) {
        const d = new Date(unique[i]);
        const diff = Math.round((current - d) / (1000 * 60 * 60 * 24));
        if (diff === 1) {
            streak++;
            current = d;
        } else break;
    }
    return streak;
};

const Habitlist = ({ habits, addHabit, deleteHabit }) => {
    const [showModal, setShowModal] = useState(false);
    const [newHabit, setNewHabit] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [selectedEmoji, setSelectedEmoji] = useState("🔥");

    const emojiList = [
        "🔥", "💧", "📚", "🏃‍♀️", "🌿", "💤", "🧘‍♀️",
        "👨‍🎓", "✏️", "🔬", "😊", "🎨", "🎯", "🥛", "🌸"
    ];

    const [completedDates, setCompletedDates] = useState(() => {
        const stored = localStorage.getItem("calendarCompletedDates");
        return stored ? JSON.parse(stored) : [];
    });

    const [habitStats, setHabitStats] = useState(() => {
        const stored = localStorage.getItem("habitStats");
        return stored ? JSON.parse(stored) : {};
    });

    useEffect(() => {
        localStorage.setItem("calendarCompletedDates", JSON.stringify(completedDates));
    }, [completedDates]);

    useEffect(() => {
        localStorage.setItem("habitStats", JSON.stringify(habitStats));
    }, [habitStats]);

    const todayStr = getTodayStr();

    const handleToggleHabit = (habit) => {
        const isCompletedToday =
            habitStats[habit.id]?.completedDates?.includes(todayStr) || false;

        const newCompleted = !isCompletedToday;

        setHabitStats((prev) => {
            const prevStats = prev[habit.id] || {
                completedDates: [],
                lastCompletedDate: null,
                streak: 0,
            };

            let completedDatesForHabit = [...prevStats.completedDates];
            let lastCompletedDate = prevStats.lastCompletedDate;
            let streak = prevStats.streak || 0;

            if (newCompleted) {
                completedDatesForHabit.push(todayStr);
                if (lastCompletedDate === getYesterdayStr()) streak += 1;
                else streak = 1;
                lastCompletedDate = todayStr;
            } else {
                completedDatesForHabit = completedDatesForHabit.filter(d => d !== todayStr);
                streak = computeStreak(completedDatesForHabit);
                lastCompletedDate =
                    completedDatesForHabit[completedDatesForHabit.length - 1] || null;
            }

            return {
                ...prev,
                [habit.id]: {
                    completedDates: completedDatesForHabit,
                    lastCompletedDate,
                    streak,
                },
            };
        });

        setCompletedDates(prev =>
            newCompleted
                ? [...new Set([...prev, todayStr])]
                : prev.filter(d => d !== todayStr)
        );
    };

    const handleSubmit = () => {
        if (!newHabit.trim()) return;

        addHabit({
            title: `${selectedEmoji} ${newHabit}`,
            description: newDescription,
        });

        setNewHabit("");
        setNewDescription("");
        setSelectedEmoji("🔥");
        setShowModal(false);
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.title}>
                    <h1 className={styles.heading}>Today's Habits</h1>
                    <button className={styles.add_btn} onClick={() => setShowModal(true)}>
                        + Add New Habit
                    </button>
                </div>

                <div style={{ marginTop: "2rem" }}>
                    {habits.map(habit => {
                        const isCompletedToday =
                            habitStats[habit.id]?.completedDates?.includes(todayStr) || false;

                        return (
                            <div
                                key={habit.id}
                                style={{
                                    padding: "1rem",
                                    background: isCompletedToday ? "#d4f8d4" : "#f2f2f2",
                                    marginBottom: "10px",
                                    borderRadius: "10px",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}
                            >
                                <div className={styles.HabitName}>
                                    <span>{habit.title}</span>
                                    {habit.description && (
                                        <p style={{ fontSize: "14px", color: "gray", marginTop: "5px" }}>
                                            {habit.description}
                                        </p>
                                    )}
                                </div>

                                <div style={{ display: "flex", gap: "10px" }}>
                                    <input
                                        type="checkbox"
                                        checked={isCompletedToday}
                                        onChange={() => handleToggleHabit(habit)}
                                    />
                                    <button
                                        onClick={() => deleteHabit(habit.id)}
                                        style={{ border: "none", background: "transparent", cursor: "pointer" }}
                                    >
                                        <MdDelete />
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <MonthlyCalendar completedDates={completedDates} />

            {showModal && (
                <div
                    style={{
                        position: "fixed",
                        inset: 0,
                        background: "rgba(0,0,0,0.5)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 100,
                    }}
                >
                    <div style={{ width: "350px", background: "white", padding: "20px", borderRadius: "15px" }}>
                        <h2 style={{ textAlign: "center" }}>Add New Habit</h2>

                        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                            {emojiList.map((emoji, i) => (
                                <span
                                    key={i}
                                    onClick={() => setSelectedEmoji(emoji)}
                                    style={{
                                        fontSize: "24px",
                                        padding: "8px",
                                        cursor: "pointer",
                                        borderRadius: "8px",
                                        background: selectedEmoji === emoji ? "#d1e7ff" : "#f2f2f2",
                                    }}
                                >
                                    {emoji}
                                </span>
                            ))}
                        </div>

                        <input
                            value={newHabit}
                            onChange={(e) => setNewHabit(e.target.value)}
                            placeholder="Enter habit name"
                            style={{ width: "100%", padding: "10px", marginTop: "10px" }}
                        />

                        <input
                            value={newDescription}
                            onChange={(e) => setNewDescription(e.target.value)}
                            placeholder="Enter description"
                            style={{ width: "100%", padding: "10px", marginTop: "10px" }}
                        />

                        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
                            <button className={styles.cancelbtn} onClick={() => setShowModal(false)}>Cancel</button>
                            <button className={styles.addbtn} onClick={handleSubmit}>Add Habit</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Habitlist;
