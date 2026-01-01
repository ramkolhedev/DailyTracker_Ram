import { useState } from "react";
import styles from "./MonthlyCalendar.module.css";
import { MdOutlineKeyboardDoubleArrowLeft, MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";

const MonthlyCalendar = ({ completedDates }) => {
    const [currentDate, setCurrentDate] = useState(new Date());

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const prevMonth = () => {
        setCurrentDate(new Date(year, month - 1, 1));
    };

    const nextMonth = () => {
        setCurrentDate(new Date(year, month + 1, 1));
    };

    const formatDate = (d) => {
        return new Date(year, month, d).toISOString().split("T")[0];
    };

    return (
        <div className={styles.calendar}>
            <div className={styles.header}>
                <button onClick={prevMonth}><MdOutlineKeyboardDoubleArrowLeft /></button>
                <h3>
                    {currentDate.toLocaleString("default", { month: "long" })} {year}
                </h3>
                <button onClick={nextMonth}><MdOutlineKeyboardDoubleArrowRight /></button>
            </div>

            <div className={styles.weekdays}>
                <div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div>
                <div>Thu</div><div>Fri</div><div>Sat</div>
            </div>

            <div className={styles.days}>
                {Array(firstDay).fill(null).map((_, i) => (
                    <div key={i}></div>
                ))}

                {Array.from({ length: daysInMonth }, (_, i) => {
                    const day = i + 1;
                    const dateStr = formatDate(day);
                    const isCompleted = completedDates.includes(dateStr);

                    return (
                        <div
                            key={day}
                            className={`${styles.day} ${isCompleted ? styles.completed : ""}`}
                        >
                            {day}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default MonthlyCalendar;
