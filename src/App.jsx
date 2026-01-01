import Navigation from './components/Navigation/Navigation';
import './App.css'
import Dashboard from './components/Dashboard/Dashboard'
import { useState } from "react";
import Habitlist from './components/Habitlist/Habitlist';
import YourHabit from './components/YourHabit/YourHabit';
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Profile from './components/Profile/Profile';
import Timer from './components/Timer/Timer';
import Categories from './components/Categories/Categories';
import Settings from './components/Settings/Settings';
import Report from "./components/Report/Report";


function App() {

  const [habits, setHabits] = useState(() => {
    const stored = localStorage.getItem("habits");
    return stored ? JSON.parse(stored) : [
      { id: 1, title: "🧘🏻‍♂️ Morning Exercise", description: "Do it daily for 30 min", frequency: "Daily", completed: false },
      { id: 2, title: "📚 Read Books", description: "Do it daily for 1 hr", frequency: "Daily", completed: false },
      { id: 3, title: "🥛 Drink Water", description: "Drinking Water keeps body hydrated ", frequency: "Daily", completed: false },
    ];
  });

  const addHabit = (habitObj) => {
    const newHabit = {
      id: Date.now(),
      title: habitObj.title,
      description: habitObj.description || "",
      frequency: habitObj.frequency || "Daily",
      // completed: false,
    };

    setHabits(prev => {
      const updated = [...prev, newHabit];
      localStorage.setItem("habits", JSON.stringify(updated));
      return updated;
    });
  };


  const deleteHabit = (id) => {
    setHabits(prev => {
      const updated = prev.filter(h => h.id !== id);
      localStorage.setItem("habits", JSON.stringify(updated));
      return updated;
    });
  };


  const handleEditHabit = (habit) => {
    console.log("Edit habit:", habit);
  };

  const handleOpenHabitCalendar = (habit) => {
    console.log("Open calendar for:", habit);
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} />
      <Navigation />

      <Routes>
      <Route path="/report" element={<Report />} />

        <Route
          path="/"
          element={
            <>
              <Dashboard habits={habits} />
              <Habitlist
                habits={habits}
                // toggleHabit={toggleHabit}
                addHabit={addHabit}
                deleteHabit={deleteHabit}
              />
            </>
          }
        />

        <Route
          path="/your-habits"
          element={<YourHabit
            habits={habits}
            addHabit={addHabit}
            deleteHabit={deleteHabit}
            onEditHabit={handleEditHabit}
            onOpenCalendar={handleOpenHabitCalendar} />}
        />

        <Route path="/profile" element={<Profile />} />
        <Route path="/timer" element={<Timer />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </>
  )
}

export default App
