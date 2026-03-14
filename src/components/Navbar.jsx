import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Vote, LogOut, User } from 'lucide-react';

export const Navbar = ({ user, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-600 text-white shadow-sm">
            <Vote size={20} className="w-5 h-5" />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900">EduVote</span>
        </div>

        {user ? (
          <div className="flex items-center space-x-6">
            <NavLink
              to="/candidates"
              className={({ isActive }) =>
                `text-sm font-medium transition-colors hover:text-primary-600 ${
                  isActive ? 'text-primary-600' : 'text-slate-600'
                }`
              }
            >
              Candidates
            </NavLink>
            <NavLink
              to="/results"
              className={({ isActive }) =>
                `text-sm font-medium transition-colors hover:text-primary-600 ${
                  isActive ? 'text-primary-600' : 'text-slate-600'
                }`
              }
            >
              Live Results
            </NavLink>
            
            <div className="h-6 w-px bg-slate-200"></div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-600">
                  <User size={16} />
                </div>
                {user.username}
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 rounded-lg p-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
              >
                <LogOut size={16} />
                <span className="sr-only sm:not-sr-only">Logout</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="text-sm font-medium text-slate-500">
            Hackathon Project Showcase
          </div>
        )}
      </div>
    </nav>
  );
};
