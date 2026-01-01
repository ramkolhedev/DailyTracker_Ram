import { useState, useEffect } from "react";
import styles from "./Settings.module.css";

const Settings = () => {
  const [settings, setSettings] = useState({
    remindersEnabled: true,
    reminderTime: "morning",
    soundEnabled: true,
    weekStart: "monday",
    dailyReset: "00:00",
    defaultDuration: "30",
    autoMissed: false,
    motivationalMsg: true,
  });

  useEffect(() => {
    const stored = localStorage.getItem("settings");
    if (stored) setSettings(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("settings", JSON.stringify(settings));
  }, [settings]);

  const update = (key, value) =>
    setSettings((prev) => ({ ...prev, [key]: value }));

  const resetToday = () => {
    localStorage.removeItem("calendarCompletedDates");
    localStorage.removeItem("habitStats");
    alert("Today's progress reset");
  };

  const clearAllData = () => {
    if (window.confirm("This will delete all habit data")) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.heading}>⚙️ Settings</h1>

        <div className={styles.card}>
          <h2>🔔 Notifications</h2>

          <div className={styles.row}>
            <span>Enable reminders</span>
            <label className={styles.switch}>
              <input
                type="checkbox"
                checked={settings.remindersEnabled}
                onChange={() =>
                  update("remindersEnabled", !settings.remindersEnabled)
                }
              />
              <span className={styles.slider}></span>
            </label>
          </div>

          {settings.remindersEnabled && (
            <>
              <div className={styles.row}>
                <span>Reminder time</span>
                <select
                  value={settings.reminderTime}
                  onChange={(e) =>
                    update("reminderTime", e.target.value)
                  }
                >
                  <option value="morning">Morning</option>
                  <option value="evening">Evening</option>
                </select>
              </div>

              <div className={styles.row}>
                <span>Sound</span>
                <label className={styles.switch}>
                  <input
                    type="checkbox"
                    checked={settings.soundEnabled}
                    onChange={() =>
                      update("soundEnabled", !settings.soundEnabled)
                    }
                  />
                  <span className={styles.slider}></span>
                </label>
              </div>
            </>
          )}
        </div>

        <div className={styles.card}>
          <h2>📅 Habit Preferences</h2>

          <div className={styles.row}>
            <span>Week starts on</span>
            <select
              value={settings.weekStart}
              onChange={(e) =>
                update("weekStart", e.target.value)
              }
            >
              <option value="monday">Monday</option>
              <option value="sunday">Sunday</option>
            </select>
          </div>

          <div className={styles.row}>
            <span>Daily reset time</span>
            <input
              type="time"
              value={settings.dailyReset}
              onChange={(e) =>
                update("dailyReset", e.target.value)
              }
            />
          </div>

          <div className={styles.row}>
            <span>Default habit duration</span>
            <select
              value={settings.defaultDuration}
              onChange={(e) =>
                update("defaultDuration", e.target.value)
              }
            >
              <option value="15">15 min</option>
              <option value="30">30 min</option>
              <option value="60">1 hour</option>
            </select>
          </div>

          <div className={styles.row}>
            <span>Auto mark missed habits</span>
            <label className={styles.switch}>
              <input
                type="checkbox"
                checked={settings.autoMissed}
                onChange={() =>
                  update("autoMissed", !settings.autoMissed)
                }
              />
              <span className={styles.slider}></span>
            </label>
          </div>

          <div className={styles.row}>
            <span>Daily motivational message</span>
            <label className={styles.switch}>
              <input
                type="checkbox"
                checked={settings.motivationalMsg}
                onChange={() =>
                  update("motivationalMsg", !settings.motivationalMsg)
                }
              />
              <span className={styles.slider}></span>
            </label>
          </div>
        </div>

        <div className={styles.card}>
          <h2>📊 Data & Progress</h2>

          <button className={styles.secondaryBtn} onClick={resetToday}>
            Reset today’s progress
          </button>

          <button className={styles.dangerBtn} onClick={clearAllData}>
            Clear all data
          </button>
        </div>

      </div>
    </div>
  );
};

export default Settings;
