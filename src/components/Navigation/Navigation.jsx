import styles from "./Navigation.module.css";
import { BsList } from "react-icons/bs";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    if (!window.confirm("Are you sure you want to log out?")) return;
    localStorage.clear();
    setIsOpen(false);
    navigate("/");
  };

  return (
    <>
      <nav className={styles.navbar}>
        <h2 className={styles.title}>DailyTracker</h2>

        <ul className={styles.links}>
          <li>
            <Link to="/your-habits" className={styles.link}>Your Habits</Link>
          </li>

          <li>
            <Link to="/report" className={styles.link}>Report</Link>
          </li>

          <li>
            <button className={styles.menuBtn} onClick={() => setIsOpen(true)}>
              <BsList />
            </button>
          </li>
        </ul>
      </nav>

      {/* SIDE MENU */}
      <div className={`${styles.sideMenu} ${isOpen ? styles.open : ""}`}>
        <div className={styles.menuHeader}>
          <h2>Menu</h2>
          <button onClick={() => setIsOpen(false)}>✕</button>
        </div>

        <ul className={styles.menuList}>
          <li><Link to="/profile" onClick={() => setIsOpen(false)}>Profile</Link></li>
          <li><Link to="/timer" onClick={() => setIsOpen(false)}>Timer</Link></li>
          <li><Link to="/categories" onClick={() => setIsOpen(false)}>Categories</Link></li>
          <li><Link to="/settings" onClick={() => setIsOpen(false)}>Settings</Link></li>

          <li className={styles.logout} onClick={handleLogout}>Log Out</li>
        </ul>
      </div>
    </>
  );
};

export default Navigation;
