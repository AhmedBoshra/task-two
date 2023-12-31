import { useEffect, useState } from "react";
import { Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ExamDetails from "./ExamDetails";

const StudentExams = (props) => {
  const [exams, setExams] = useState([]);
  const [selectedExam, setSelectedExam] = useState(null);
  const navigate = useNavigate();

  console.log(props);
  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/getexaminstances",
          {
            params: { userid: props.decodedToken.sub },
          }
        );
        const examsData = response.data;
        setExams(examsData);
        console.log(examsData);
      } catch (error) {
        console.error("Failed to fetch exams:", error);
      }
    };

    fetchExams();
  }, []);

  const handleExamClick = (examId, definitionId) => {
    navigate(`/take-exam/${examId}/${definitionId}`);
    const selectedExam = exams.find((exam) => exam.id === examId);
    setSelectedExam(selectedExam);
  };

  return (
    <div>
      <h1 className="text-center">Exams</h1>
      <Row className="justify-content-center">
        {exams.map((exam) => (
          <Col key={exam.id} md={3} className="mb-4">
            <Button
              variant="primary"
              className="mt-3"
              block="true"
              onClick={() => handleExamClick(exam.id, exam.examdefinationid)}
            >
              {exam.examDefinition.name}
            </Button>
          </Col>
        ))}
      </Row>
      {selectedExam && <ExamDetails questions={selectedExam.questions} />}
    </div>
  );
};

export default StudentExams;
