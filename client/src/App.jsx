import { Routes, Route, useLocation } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Header from './components/Header';
import { Analytics } from "@vercel/analytics/react"

function App() {
  const location = useLocation();

  // Optional: Show header on all pages except login
  const hideHeader = location.pathname === '/';

  return (
    <>
      {!hideHeader && <Header />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Analytics/>
    </>
  );
}

export default App;
