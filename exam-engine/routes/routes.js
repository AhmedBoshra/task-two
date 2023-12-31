const Router = require("express");
const router = Router();

const examController = require("../controllers/controller");

//Exam Creation
router.post("/create-exam-definition", examController.createExamDefinition);
router.post("/create-exam", examController.createExamInstance);

//Getting Exams
router.get("/getexams", examController.getExams);
router.get("/getexams/:id", examController.getExamById);
router.get("/getexaminstance/:id", examController.getExamInstanceById);
router.get("/getexaminstances", examController.getExamInstances);
// Edit Exam Instance
router.put("/editexaminstance/:id", examController.editExamInstanceById);

module.exports = router;
