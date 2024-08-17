import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  const Links = [
    {
      id: 1,
      title: "Add Staff Member",
      path: "/admin/add_staff",
      icon: "fa-solid fa-user",
    },
    {
      id: 2,
      title: "View Staff Member",
      path: "/admin/add_staff",
      icon: "fa-solid fa-users",
    },
  ];

  return (
    <div>
      <div className="sidebar w-80 h-screen bg-emerald-600 flex flex-col items-center pt-16 px-6 gap-4">
        {Links.map((item) => {
          return (
            <Link
              key={item.id}
              className="w-full bg-white flex items-center py-2 gap-5 justify-center rounded-lg"
            >
              <i className={`fa-solid ${item.icon}`}></i>
              <h3 className="font-medium hover:underline">{item.title}</h3>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Sidebar;
