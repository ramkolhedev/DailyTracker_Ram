import { useState } from "react";
import styles from "./Categories.module.css";
import { MdDelete } from "react-icons/md";

const initialCategories = [
  {
    id: 1,
    name: "Mental & Self-Care",
    emoji: "🧠",
    color: "mental",
    habits: ["Meditation", "Journaling", "Gratitude", "Digital Detox"],
    favorite: false,
  },
  {
    id: 2,
    name: "Health & Fitness",
    emoji: "💪",
    color: "health",
    habits: ["Exercise", "Yoga", "Walking", "Sleep Tracking"],
    favorite: true,
  },
  {
    id: 3,
    name: "Learning & Growth",
    emoji: "📚",
    color: "learning",
    habits: ["Study", "Coding Practice", "Reading Books", "Online Courses"],
    favorite: false,
  },
  {
    id: 4,
    name: "Nutrition & Lifestyle",
    emoji: "🍎",
    color: "nutrition",
    habits: ["Drink Water", "Healthy Meals", "No Junk Food", "Vitamins"],
    favorite: false,
  },
  {
    id: 5,
    name: "Productivity & Routine",
    emoji: "🧹",
    color: "productivity",
    habits: ["Wake Up Early", "Plan Day", "No Procrastination", "Daily Checklist"],
    favorite: false,
  },
];

const Categories = () => {
  const [categories, setCategories] = useState(initialCategories);
  const [showModal, setShowModal] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [newHabit, setNewHabit] = useState("");

  const toggleFavorite = (id) => {
    setCategories((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, favorite: !c.favorite } : c
      )
    );
  };

  const openAddHabit = (category) => {
    setActiveCategory(category);
    setShowModal(true);
  };

  const addHabit = () => {
    if (newHabit.trim() === "") return;

    setCategories((prev) =>
      prev.map((c) =>
        c.id === activeCategory.id
          ? { ...c, habits: [...c.habits, newHabit] }
          : c
      )
    );

    setNewHabit("");
    setShowModal(false);
  };

  const deleteHabit = (categoryId, habitIndex) => {
    setCategories((prev) =>
      prev.map((c) =>
        c.id === categoryId
          ? {
            ...c,
            habits: c.habits.filter((_, i) => i !== habitIndex),
          }
          : c
      )
    );
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Categories</h1>

      {categories.map((cat) => (
        <div key={cat.id} className={`${styles.card} ${styles[cat.color]}`}>
          
          <div className={styles.header}>
            <h2>{cat.name}
              <span style={{ marginRight: "6px", marginLeft:"6px" }}>{cat.emoji}</span>
            </h2>

            <button
              className={styles.star}
              onClick={() => toggleFavorite(cat.id)}
            >
              {cat.favorite ? "⭐" : "☆"}
            </button>
          </div>

          <p className={styles.info}>{cat.habits.length} habits</p>

          <ul className={styles.habitList}>
            {cat.habits.map((habit, index) => (
              <li key={index} className={styles.habitItem}>
                <span>{habit}</span>
                <MdDelete
                  className={styles.deleteIcon}
                  onClick={() => deleteHabit(cat.id, index)}
                />
              </li>
            ))}
          </ul>

          <div className={styles.actions}>
            <button onClick={() => openAddHabit(cat)}>➕ Add Habit</button>
          </div>
        </div>
      ))}

      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalBox}>
            <h3>Add Habit</h3>
            <p className={styles.modalSub}>
              {activeCategory?.name}
            </p>

            <input
              type="text"
              placeholder="Enter habit name"
              value={newHabit}
              onChange={(e) => setNewHabit(e.target.value)}
            />

            <div className={styles.modalActions}>
              <button onClick={() => setShowModal(false)}>Cancel</button>
              <button onClick={addHabit}>Add</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;
