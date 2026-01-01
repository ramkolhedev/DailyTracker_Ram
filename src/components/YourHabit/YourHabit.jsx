import { useState } from "react";
import styles from "./YourHabit.module.css";
import { toast } from "react-toastify";
import { MdDelete, MdEdit, MdCalendarMonth } from "react-icons/md";


const YourHabit = ({ habits, addHabit, deleteHabit, onEditHabit, onOpenCalendar }) => {
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newHabit, setNewHabit] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [frequency, setFrequency] = useState("Daily");
  const [selectedEmoji, setSelectedEmoji] = useState("🔥");

  const [habitStats] = useState(() => {
    const stored = localStorage.getItem("habitStats");
    return stored ? JSON.parse(stored) : {};
  });

  const emojiList = ["🔥", "💧", "📚", "🏃‍♀️", "🌿", "💤", "🧘‍♀️", "👨‍🎓", "✏️", "🔬", "😊", "🎨", "🎯", "🥛", "🌸"];

  const filteredHabits = habits.filter((habit) =>
    habit.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleSubmit = () => {
    if (newHabit.trim() === "") {
      toast.error("Please enter a habit name!");
      return;
    }
    addHabit({
      title: selectedEmoji + " " + newHabit,
      description: newDescription,
      frequency: frequency,
    });
    toast.success("Habit added successfully! 🎉");

    setNewHabit("");
    setNewDescription("");
    setFrequency("Daily");
    setSelectedEmoji("🔥");
    setShowModal(false);
  };

  const handleDelete = (id) => {
    if (deleteHabit) deleteHabit(id);
  };

  const handleEdit = (habit) => {
    if (onEditHabit) onEditHabit(habit);
  };

  const handleCalendar = (habit) => {
    if (onOpenCalendar) onOpenCalendar(habit);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.topRow}>
          <h1 className={styles.heading}>Your Habits</h1>

          <div className={styles.searchWrapper}>
            <input
              type="text"
              placeholder="Search habits..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={styles.searchBar}
            />

            <div className={styles.habitList}>
              {search.trim() !== "" &&
                filteredHabits.map((habit) => {
                  const stats = habitStats[habit.id] || {};
                  const streak = stats.streak || 0;

                  return (
                    <div key={habit.id} className={styles.habitCard}>
                      <span>{habit.title}</span>
                    </div>
                  );
                })}
            </div>
          </div>

          <button
            className={styles.add_btn}
            onClick={() => setShowModal(true)}
          >
            + Add New Habit
          </button>
        </div>
      </div>

      <div className={styles.allHabits}>
        {habits.map((habit) => {
          const stats = habitStats[habit.id] || {};
          const streak = stats.streak || 0;

          return (
            <div key={habit.id} className={styles.fullHabitCard}>
              {streak > 0 && (
                <div className={styles.streakBadge}>
                  🔥 {streak}
                </div>
              )}

              <span>{habit.title}</span>

              {habit.description && (
                <p
                  style={{
                    fontSize: "15px",
                    color: "gray",
                    marginTop: "4px",
                  }}
                >
                  {habit.description}
                </p>
              )}

              <p
                style={{
                  fontSize: "15px",
                  color: "gray",
                  marginTop: "4px",
                  
                }}
              >
                Frequency: {habit.frequency || "Daily"}
              </p>

              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "10px",
                  marginTop: "8px",
                }}
              >
                <button
                  onClick={() => handleEdit(habit)}
                  style={{
                    border: "none",
                    background: "transparent",
                    cursor: "pointer",
                    fontSize: "18px",
                  }}
                  title="Edit habit"
                >
                  <MdEdit />
                </button>

                <button
                  onClick={() => handleCalendar(habit)}
                  style={{
                    border: "none",
                    background: "transparent",
                    cursor: "pointer",
                    fontSize: "18px",
                  }}
                  title="Open calendar"
                >
                  <MdCalendarMonth />
                </button>

                <button
                  onClick={() => handleDelete(habit.id)}
                  style={{
                    border: "none",
                    background: "transparent",
                    cursor: "pointer",
                    fontSize: "18px",
                  }}
                  title="Delete habit"
                >
                  <MdDelete />
                </button>
              </div>


            </div>
          );
        })}
      </div>

      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalBox}>
            <h2>Add New Habit</h2>

            <p>Select Emoji:</p>
            <div className={styles.emojiGrid}>
              {emojiList.map((emoji, i) => (
                <span
                  key={i}
                  className={`${styles.emojiItem} ${selectedEmoji === emoji ? styles.activeEmoji : ""
                    }`}
                  onClick={() => setSelectedEmoji(emoji)}
                >
                  {emoji}
                </span>
              ))}
            </div>

            <input
              type="text"
              placeholder="Enter habit name"
              value={newHabit}
              onChange={(e) => setNewHabit(e.target.value)}
              className={styles.inputBox}
            />

            <input
              type="text"
              placeholder="Enter description"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              className={styles.inputBox}
            />

            <p>Frequency:</p>
            <select
              className={styles.inputBox}
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
            >
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
            </select>

            <div className={styles.modalButtons}>
              <button
                className={styles.cancelBtn}
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button className={styles.submitBtn} onClick={handleSubmit}>
                Add Habit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default YourHabit;
