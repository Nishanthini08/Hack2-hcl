import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Login } from './pages/Login';
import { Candidates } from './pages/Candidates';
import { Results } from './pages/Results';

function App() {
  const [user, setUser] = useState(null);

  // Protected route wrapper
  const ProtectedRoute = ({ children }) => {
    if (!user) {
      return <Navigate to="/" replace />;
    }
    return children;
  };

  return (
    <BrowserRouter>
      {/* We only show Navbar when logged in, or we can show a simplified one. Let's show full on all but differ based on user presence. */}
      {user && <Navbar user={user} onLogout={() => setUser(null)} />}
      
      <main className="min-h-screen bg-slate-50 w-full font-sans">
        <Routes>
          <Route 
            path="/" 
            element={user ? <Navigate to="/candidates" replace /> : <Login onLogin={setUser} />} 
          />
          <Route 
            path="/candidates" 
            element={
              <ProtectedRoute>
                <Candidates user={user} setUser={setUser} />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/results" 
            element={
              <ProtectedRoute>
                <Results />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
