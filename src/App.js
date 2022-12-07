import "./App.css";
import Index from "./components/pages/Index";
import Dashboard from "./components/pages/Dashboard";
import CreateProposal from "./components/pages/CreateProposal";
import MyProposal from "./components/pages/MyProposal";
import ListProposal from "./components/pages/ListProposal";
import ProtectedRoute from "./components/pages/ProtectedRoute";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route
          path="dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="create-proposal"
          element={
            <ProtectedRoute>
              <CreateProposal />
            </ProtectedRoute>
          }
        />
        <Route
          path="list-proposal"
          element={
            <ProtectedRoute>
              <ListProposal />
            </ProtectedRoute>
          }
        />
        <Route path="vote-proposal" element={<Dashboard />} />
        <Route
          path="my-proposal"
          element={
            <ProtectedRoute>
              <MyProposal />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
