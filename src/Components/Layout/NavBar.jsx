import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { FaHome, FaUserPlus, FaUsers, FaTools, FaMoneyBill, FaUser, FaKey } from 'react-icons/fa';

const NavBar = () => {
  const { isAuthenticated, user } = useAuth0();
  const rolesUrl = import.meta.env.VITE_API_ROLES_URL;
  const userRoles = user && user[rolesUrl] ? user[rolesUrl] : [];

  const isAdminOrHR = isAuthenticated && userRoles.length > 0 &&
    (userRoles.includes('Admin') || userRoles.includes('HR'));

  const isEmployee = isAuthenticated && userRoles.includes('Employee');

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark vh-100 p-0">
      <div className="d-flex flex-column h-100">
        <ul className="nav flex-column flex-grow-1">
          <NavItem to="/" icon={<FaHome />} text="Home" />
          {isAdminOrHR && (
            <>
              <NavItem to="/admin/addemp" icon={<FaUserPlus />} text="Add Employee" />
              <NavItem to="/admin/allemp" icon={<FaUsers />} text="All Employees" />
              <NavItem to="/admin/service" icon={<FaTools />} text="Service" />
              
            </>
          )}
          {isEmployee && (
            <>
              <NavItem to="/employee/viewprofile" icon={<FaUser />} text="View Profile" />
              <NavItem to="/updatepassword" icon={<FaKey />} text="Reset Password" />
              <NavItem to="/genratepayslip" icon={<FaMoneyBill />} text="Generate Pay Slip" />
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

const NavItem = ({ to, icon, text }) => (
  <li className="nav-item">
    <Link to={to} className="nav-link text-white">
      {icon} {text}
    </Link>
  </li>
);

export default NavBar;
