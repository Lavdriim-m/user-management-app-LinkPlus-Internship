import { Routes, Route, Navigate, Link } from "react-router-dom";
import UsersPage from "./pages/UsersPage.jsx";
import UserDetailsPage from "./pages/UserDetailsPage.jsx";

export default function App() {
  return (
    <div className="app">
      <header className="topbar">
        <div className="container topbar__inner">
          <Link to="/users" className="brand">
            User Management
          </Link>
          <nav className="nav">
            <Link to="/users" className="nav__link">Users</Link>
          </nav>
        </div>
      </header>

      <main className="container">
        <Routes>
          <Route path="/" element={<Navigate to="/users" replace />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/users/:id" element={<UserDetailsPage />} />
          <Route path="*" element={<div className="card">Not found</div>} />
        </Routes>
      </main>
    </div>
  );
}