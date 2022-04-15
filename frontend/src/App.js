import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import NavbarComponent from "./pages/components/NavbarComponent";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom"
import Login from "./pages/Login";
import Home from "./pages/Home";
import StressAnalyzer from "./pages/StressAnalyzer";
import DepressionAnalyzer from './pages/DepressionAnalyser'
import Dashboard from './pages/Dashboard';
import Register from './pages/Register'
import Profile from './pages/Profile'
import Feed from './pages/Feed'
import { useSelector } from 'react-redux'

function App() {

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  return (
    <div className="bg-dark">
      <Router>
        <NavbarComponent />
        <hr className="m-0 py-1 bg-info" />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path="/depression" element={<DepressionAnalyzer />} />
          <Route path="/stress" element={<StressAnalyzer />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/feed" element={userInfo ? <Feed /> : <Navigate to="/login" />} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
