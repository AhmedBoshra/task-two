const express = require("express");
const teacher = require("../middlewares/teachers");
const router = express.Router();
const auth = require("../Authentication/Auth");

const {
  getQuestionById,
  createQuestion,
  getAllQuestions,
  updateQuestion,
  addAnswerToQuestion,
  deleteAnswerFromQuestion,
  deleteQuestion,
} = require("../controllers/controllers");

// router.use(auth);

// Create and Save question
router.post("/questions", createQuestion);

// Get Question by ID
router.get("/questions/:id", getQuestionById);

// Get all questions
router.get("/questions", getAllQuestions);

// Update a question
router.put("/questions/:id", updateQuestion);

// Add answer to a question
router.post("/questions/:id/answers", addAnswerToQuestion);

// Delete an answer from a question
router.delete("/questions/:id/answers/:answerId", deleteAnswerFromQuestion);

// Delete a question
router.delete("/questions/:id", deleteQuestion);

module.exports = router;
