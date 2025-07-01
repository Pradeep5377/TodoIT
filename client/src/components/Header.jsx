import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Logo from "../assets/todologo.png"
import "../styles/header.css";

const Header = () => {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/auth/user`, {
        withCredentials: true,
      });
      console.log("Fetched user:", res.data);
      setUser(res.data);
    } catch (err) {
      console.error("Failed to load user:", err);
      navigate("/");
    }
  };


  const handleLogout = async () => {
    const confirm = window.confirm("Logout?");
    if (!confirm) return;
    try {
      await axios.get("/auth/logout", { withCredentials: true });

      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const toggleDropdown = () => setDropdownOpen(prev => !prev);

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!user) return null;

  return (
    <header className="header">
      <div className="header-left">
        <img src={Logo} alt="Todo Logo" className="header-logo" />
        <p className="app-tagline">Organize. Track. Collaborate.</p>
      </div>
      <div className="header-profile" ref={dropdownRef}>
        <p className="header-username">Welcome !</p>
        <img
          src={user.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}`}
          // alt={`${user.name}'s avatar`}
          className="avatar"
          onClick={toggleDropdown}
        />
        {dropdownOpen && (
          <div className="dropdown-menu">
            <p className="dropdown-name">{user.name}</p>
            <p className="dropdown-email">{user.email}</p>
            <button className="dropdown-item" onClick={handleLogout}>
              <FontAwesomeIcon icon={faRightFromBracket} />
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
