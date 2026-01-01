import { useState, useRef } from "react";
import styles from "./Timer.module.css";

const Timer = () => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(25);
  const [time, setTime] = useState((0 * 60 + 25) * 60);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  const totalSeconds = () => (hours * 60 + minutes) * 60;

  const startTimer = () => {
    if (isRunning) return;
    if (time <= 0) return;

    setIsRunning(true);

    intervalRef.current = setInterval(() => {
      setTime((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const pauseTimer = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
  };

  const resetTimer = () => {
    clearInterval(intervalRef.current);
    setTime(totalSeconds());
    setIsRunning(false);
  };

  const handleHoursChange = (e) => {
    const value = Number(e.target.value);
    if (value < 0 || value > 12) return; 
    setHours(value);
    if (!isRunning) {
      setTime((value * 60 + minutes) * 60);
    }
  };

  const handleMinutesChange = (e) => {
    const value = Number(e.target.value);
    if (value < 0 || value > 59) return;
    setMinutes(value);
    if (!isRunning) {
      setTime((hours * 60 + value) * 60);
    }
  };

  const formatTime = () => {
    const hrs = Math.floor(time / 3600);
    const mins = Math.floor((time % 3600) / 60);
    const secs = time % 60;

    if (hrs > 0) {
      return `${hrs}:${mins < 10 ? "0" : ""}${mins}:${secs < 10 ? "0" : ""}${secs}`;
    }
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>⏱ Focus Timer</h2>

      <div className={styles.timeInputs}>
        <div className={styles.inputBox}>
          <label>Hours</label>
          <input
            type="number"
            min="0"
            max="12"
            value={hours}
            disabled={isRunning}
            onChange={handleHoursChange}
          />
        </div>

        <div className={styles.inputBox}>
          <label>Minutes</label>
          <input
            type="number"
            min="0"
            max="59"
            value={minutes}
            disabled={isRunning}
            onChange={handleMinutesChange}
          />
        </div>
      </div>

      <div className={styles.circle}>
        {formatTime()}
      </div>

      <div className={styles.controls}>
        <button className={styles.btn} onClick={startTimer}>Start</button>
        <button className={styles.btn} onClick={pauseTimer}>Pause</button>
        <button className={styles.btn} onClick={resetTimer}>Reset</button>
      </div>
    </div>
  );
};

export default Timer;
