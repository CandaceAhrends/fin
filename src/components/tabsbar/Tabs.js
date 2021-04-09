import React from "react";
import { NavLink } from "react-router-dom";
import "./tabsbar.scss";

const tabLinks = [
  { title: "Historical", path: "historical" },
  { title: "Today", path: "today" },
  { title: "Financials", path: "financials" },
  { title: "Indicators", path: "indicators" },
  { title: "Google Trends", path: "trends" },
];
const Tabs = () => {
  return (
    <ul className="tabs">
      {tabLinks.map((link) => (
        <li>
          <NavLink activeClassName="selected-tab" to={`/${link.path}`}>
            {link.title}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default Tabs;
