import React from "react";
import { Link, useLocation } from "react-router-dom";
import { GoChevronRight } from "react-icons/go";

const SmallCrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <div className="bg-[#E8EDF166] shadow-sm px-6">
      <div className=" mx-auto px-4 py-2">
        <div className="flex items-center text-sm">
          <Link to="/" className="text-gray-500 hover:text-primary text-base">
            Home
          </Link>
          {pathnames.length > 0 && (
            <span className="mx-2 text-gray-400"><GoChevronRight className="w-4 h-4 mx-1" /></span>
          )}
          {pathnames.map((value, index) => {
            const to = `/${pathnames.slice(0, index + 1).join("/")}`;
            const isLast = index === pathnames.length - 1;
            return (
              <span key={to} className="flex items-center">
                <Link
                  to={to}
                  className={`text-[#697D95] border-b-2 hover:text-primary ${
                    isLast ? "font-semibold border-none" : ""
                  }`}
                >
                  {value.replace(/-/g, " ").charAt(0).toUpperCase() +
                    value.slice(1)}
                </Link>
                {!isLast && <span className="mx-2 text-gray-400"><GoChevronRight className="w-4 h-4 mx-1" /></span>}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SmallCrumb;
