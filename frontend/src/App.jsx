import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import { AuthProvider } from "./hooks/useAuth";
import { useEffect } from "react";
import CreateExamDefinition from "./components/CreateExamDefinition";
import Exams from "./components/TeacherExams";
import HomePage from "./pages/HomePage";
import CreateExamInstance from "./components/CreateExamInstance";
import "bootstrap/dist/css/bootstrap.min.css";
import ExamDetails from "./components/ExamDetails";
import TakeExam from "./components/TakeExam";
import StudentExams from "./components/StudentExams";
import useAuth from "./hooks/useAuth";
import jwtDecode from "jwt-decode";
import { Navigate } from "react-router-dom";

const App = () => {
  const [isLogin, token] = useAuth();
  const decodedToken = token ? jwtDecode(token) : null;
  console.log("decoded Token ", decodedToken);
  const userType = decodedToken ? decodedToken.usertype : null;
  // const location = useLocation();

  useEffect(() => {
    // Access the token or perform actions based on login status
    console.log("isLogin:", isLogin);
    console.log("token:", token);

    // Conditionally redirect based on usertype
    if (isLogin) {
      if (userType === "student" && location.pathname !== "/studentexams") {
        const navigateToStudentExams = () => {
          return <Navigate to="/studentexams" />;
        };
        navigateToStudentExams();
      } else if (
        userType === "teacher" &&
        location.pathname !== "/create-exam"
      ) {
        const navigateToCreateExam = () => {
          return <Navigate to="/create-exam" />;
        };
        navigateToCreateExam();
      }
    }
  }, [isLogin, token, userType, location]);

  return (
    <Router>
      <div>
        <Routes>
          {isLogin && <Route path="/" element={<HomePage />} />}

          {isLogin && userType === "student" && (
            <Route
              path="/studentexams"
              element={<StudentExams decodedToken={decodedToken} />}
            />
          )}

          {isLogin && userType === "teacher" && (
            <>
              <Route path="/create-exam" element={<CreateExamDefinition />} />
              <Route path="/exams" element={<Exams />} />
              <Route
                path="/create-exam-instance"
                element={<CreateExamInstance />}
              />
              <Route path="/exams/:id" element={<ExamDetails />} />
            </>
          )}

          {isLogin && userType === "student" && (
            <Route path="/take-exam/:eid/:did" element={<TakeExam />} />
          )}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
