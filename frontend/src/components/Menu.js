// import React, { useState } from "react";

// import "./Menu.css";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";

// const Menu = () => {
//   const navigate=useNavigate();
//   const [selectedMenu, setSelectedMenu] = useState(0);
//   const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

//   const handleMenuClick = (index) => {
//     setSelectedMenu(index);
//   };

//   const handleProfileClick = () => {
//     setIsProfileDropdownOpen(!isProfileDropdownOpen);
//   };
// const handleLogout = async () => {
//     try {
//         await axios.post(
//             "https://project2-frjx.onrender.com/logout",
//             {},
//             { withCredentials: true }
//         );

//         navigate("/login");
//     } catch (error) {
//         console.log(error);
//     }
// };
//   const menuClass = "menu";
//   const activeMenuClass = "menu selected";

//   return (
//     <div className="menu-container">
//       {/* <img src="logo.png" style={{ width: "50px" }} /> */}
//       <i className="fa-solid fa-arrow-trend-up"></i>
//       <div className="menus">
//         <ul>
//           <li>
//             <Link
//               style={{ textDecoration: "none" }}
//               to="/dashboard"
//               onClick={() => handleMenuClick(0)}
//             >
//               <p className={selectedMenu === 0 ? activeMenuClass : menuClass}>
//                 Dashboard
//               </p>
//             </Link>
//           </li>
//           <li>
//             <Link
//               style={{ textDecoration: "none" }}
//               to="/dashboard/orders"
//               onClick={() => handleMenuClick(1)}
//             >
//               <p className={selectedMenu === 1 ? activeMenuClass : menuClass}>
//                 Orders
//               </p>
//             </Link>
//           </li>
//           <li>
//             <Link
//               style={{ textDecoration: "none" }}
//               to="/dashboard/holdings"
//               onClick={() => handleMenuClick(2)}
//             >
//               <p className={selectedMenu === 2 ? activeMenuClass : menuClass}>
//                 Holdings
//               </p>
//             </Link>
//           </li>
//           <li>
//             <Link
//               style={{ textDecoration: "none" }}
//               to="/dashboard/positions"
//               onClick={() => handleMenuClick(3)}
//             >
//               <p className={selectedMenu === 3 ? activeMenuClass : menuClass}>
//                 Positions
//               </p>
//             </Link>
//           </li>
          
          
//         </ul>
//         <hr />
//        <div className="profile-container">
//             <div className="profile" onClick={handleProfileClick}>
//           <div className="avatar">ZU</div>
//           <p className="username">USERID</p>
//         </div>
//         {isProfileDropdownOpen && (<div className="profile-dropdown">
//             <button onClick={handleLogout}>Logout</button>
//         </div>)}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Menu;

import React, { useState } from "react";
import "./Menu.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const Menu = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await axios.post(
        "https://project2-frjx.onrender.com/logout",
        {},
        { withCredentials: true }
      );

      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsProfileDropdownOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const menuClass = "menu";
  const activeMenuClass = "menu selected";

  return (
    <div className="menu-container">
      <i className="fa-solid fa-arrow-trend-up"></i>

      {/* Hamburger button: visible only on mobile */}
      <button
        className="menu-toggle"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle navigation menu"
        aria-expanded={isMobileMenuOpen}
      >
        <i className={`fa-solid ${isMobileMenuOpen ? "fa-xmark" : "fa-bars"}`}></i>
      </button>

      <div className={`menus ${isMobileMenuOpen ? "mobile-open" : ""}`}>
        <ul className="menu-links">
          <li>
            <Link
              to="/dashboard"
              onClick={closeMobileMenu}
              style={{ textDecoration: "none" }}
            >
              <p className={isActive("/dashboard") ? activeMenuClass : menuClass}>
                Dashboard
              </p>
            </Link>
          </li>

          <li>
            <Link
              to="/dashboard/orders"
              onClick={closeMobileMenu}
              style={{ textDecoration: "none" }}
            >
              <p className={isActive("/dashboard/orders") ? activeMenuClass : menuClass}>
                Orders
              </p>
            </Link>
          </li>

          <li>
            <Link
              to="/dashboard/holdings"
              onClick={closeMobileMenu}
              style={{ textDecoration: "none" }}
            >
              <p className={isActive("/dashboard/holdings") ? activeMenuClass : menuClass}>
                Holdings
              </p>
            </Link>
          </li>

          <li>
            <Link
              to="/dashboard/positions"
              onClick={closeMobileMenu}
              style={{ textDecoration: "none" }}
            >
              <p className={isActive("/dashboard/positions") ? activeMenuClass : menuClass}>
                Positions
              </p>
            </Link>
          </li>
        </ul>

        <hr />

        <div className="profile-container">
          <div
            className="profile"
            onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
          >
            <div className="avatar">ZU</div>
            <p className="username">USERID</p>
          </div>

          {isProfileDropdownOpen && (
            <div className="profile-dropdown">
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu;
