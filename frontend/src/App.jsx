import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import CreateExamDefinition from "./components/CreateExamDefinition";
import Exams from "./components/TeacherExams";
import HomePage from "./pages/HomePage";
import CreateExamInstance from "./components/CreateExamInstance";
import "bootstrap/dist/css/bootstrap.min.css";
import ExamDetails from "./components/ExamDetails";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create-exam" element={<CreateExamDefinition />} />
          <Route path="/exams" element={<Exams />} />
          <Route
            path="/create-exam-instance"
            element={<CreateExamInstance />}
          />
          <Route path="/exams/:id" element={<ExamDetails />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;