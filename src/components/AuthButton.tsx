import React, { useState, useEffect, useRef } from "react";
import { User, LogOut, Settings, BookOpen, Heart, Bell } from "lucide-react";

interface AuthButtonProps {
  currentUser?: any;
  onAuthClick: (mode: "login" | "signup") => void;
  onLogout: () => void;
}

export const AuthButton: React.FC<AuthButtonProps> = ({
  currentUser,
  onAuthClick,
  onLogout,
}) => {
  console.log("🔍 AuthButton component is rendering", { currentUser });
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [showDropdown]);

  const handleLogout = () => {
    setShowDropdown(false);
    onLogout();
  };

  const handleDropdownToggle = () => {
    console.log("🔍 Dropdown toggle clicked", { showDropdown });
    setShowDropdown(!showDropdown);
  };
  if (!currentUser) {
    return (
      <div className="flex space-x-3">
        <button
          onClick={() => onAuthClick("login")}
          className="text-neutral-600 hover:text-primary-700 font-medium px-4 py-2 rounded-lg hover:bg-neutral-100 transition-colors"
        >
          Log In
        </button>
        <button
          onClick={() => onAuthClick("signup")}
          className="btn-primary text-sm px-5 py-2"
        >
          Sign Up
        </button>
      </div>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={handleDropdownToggle}
        className="flex items-center space-x-3 p-2 rounded-lg hover:bg-neutral-100 transition-colors"
      >
        <div className="text-right hidden sm:block">
          <p className="text-sm font-medium text-primary-700">
            {currentUser.name}
          </p>
          <p className="text-xs text-neutral-500">
            {currentUser.role === "seller" ? "Seller" : "Buyer"}
          </p>
        </div>
        <div className="h-8 w-8 rounded-full bg-accent-100 flex items-center justify-center overflow-hidden">
          {currentUser.profilePicture ? (
            <img
              src={currentUser.profilePicture}
              alt={currentUser.name}
              className="h-8 w-8 rounded-full object-cover"
            />
          ) : (
            <User className="h-5 w-5 text-accent-600" />
          )}
        </div>
      </button>

      {showDropdown && (
        <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-xl border border-neutral-200 py-2 z-50">
          <div className="px-4 py-3 border-b border-neutral-200">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-accent-100 flex items-center justify-center overflow-hidden">
                {currentUser.profilePicture ? (
                  <img
                    src={currentUser.profilePicture}
                    alt={currentUser.name}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                ) : (
                  <User className="h-6 w-6 text-accent-600" />
                )}
              </div>
              <div>
                <p className="font-medium text-primary-700">
                  {currentUser.name}
                </p>
                <p className="text-sm text-neutral-500">{currentUser.email}</p>
              </div>
            </div>
          </div>

          <div className="py-2">
            <button className="w-full text-left px-4 py-2 hover:bg-neutral-50 flex items-center space-x-3">
              <BookOpen className="h-4 w-4 text-neutral-600" />
              <span className="text-sm text-neutral-700">My Books</span>
            </button>
            <button className="w-full text-left px-4 py-2 hover:bg-neutral-50 flex items-center space-x-3">
              <Heart className="h-4 w-4 text-neutral-600" />
              <span className="text-sm text-neutral-700">Wishlist</span>
            </button>
            <button className="w-full text-left px-4 py-2 hover:bg-neutral-50 flex items-center space-x-3">
              <Settings className="h-4 w-4 text-neutral-600" />
              <span className="text-sm text-neutral-700">Settings</span>
            </button>
          </div>

          <div className="border-t border-neutral-200 pt-2">
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 hover:bg-red-50 flex items-center space-x-3 text-red-600"
            >
              <LogOut className="h-4 w-4" />
              <span className="text-sm">Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
