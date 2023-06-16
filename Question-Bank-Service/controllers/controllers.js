const { Question } = require("../models/question");
const jwt = require("jsonwebtoken");

// 1st API Create and Save question
async function createQuestion(req, res) {
  try {
    // Extract the question data from the request body
    const {
      name,
      category,
      subcategory,
      mark,
      expectedTime,
      correctAnswers,
      createdBy,
      answers,
    } = req.body;

    // Extract the token from the request headers
    const token = req.headers.authorization;

    // Verify and decode the token to access the payload
    const decodedToken = jwt.verify(token, config.get("jwtPrivateKey"));

    // Check if the userType is "teacher"
    if (decodedToken.userType !== "teacher") {
      return res
        .status(403)
        .json({ error: "You are not authorized to create a question." });
    }

    // Create a new question object using the Question model
    const question = new Question({
      name,
      category,
      subcategory,
      mark,
      expectedTime,
      correctAnswers,
      createdBy,
      answers,
    });

    // Save the question to the database
    const savedQuestion = await question.save();

    // Respond with the saved question as the result
    res.status(201).json(savedQuestion);
  } catch (error) {
    // Handle any errors that occur during the creation process
    console.error("Error: ", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the question." });
  }
}

//2nd API: Get Question by ID
async function getQuestionById(req, res) {
  try {
    // Extract the question ID from the request parameters
    const { id } = req.params;

    // Find the question in the database based on the provided ID
    const question = await Question.findById(id);

    // If the question is not found, return a 404 Not Found response
    if (!question) {
      return res.status(404).json({ error: "Question not found." });
    }

    // Return the question as the response
    res.status(200).json(question);
  } catch (error) {
    // Handle any errors that occur during the process
    console.error("Error: ", error);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving the question." });
  }
}

// 3rd API: Get all questions
async function getAllQuestions(req, res) {
  try {
    // Retrieve all questions from the database
    const questions = await Question.find();

    // Return the questions as the response
    res.status(200).json(questions);
  } catch (error) {
    // Handle any errors that occur during the process
    console.error("Error: ", error);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving the questions." });
  }
}

// 4th API: Update a question
async function updateQuestion(req, res) {
  try {
    // Extract the question ID from the request parameters
    const { id } = req.params;

    // Find the question in the database based on the provided ID
    const question = await Question.findById(id);

    // If the question is not found, return a 404 Not Found response
    if (!question) {
      return res.status(404).json({ error: "Question not found." });
    }

    // Update the question properties with the data from the request body
    question.name = req.body.name;
    question.category = req.body.category;
    question.subcategory = req.body.subcategory;
    question.mark = req.body.mark;
    question.expectedTime = req.body.expectedTime;
    question.correctAnswers = req.body.correctAnswers;
    question.createdBy = req.body.createdBy;
    question.answers = req.body.answers;

    // Save the updated question to the database
    const updatedQuestion = await question.save();

    // Return the updated question as the response
    res.status(200).json(updatedQuestion);
  } catch (error) {
    // Handle any errors that occur during the process
    console.error("Error: ", error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the question." });
  }
}

//5th API: Add answer to a question
async function addAnswerToQuestion(req, res) {
  try {
    // Extract the question ID from the request parameters
    const { id } = req.params;

    // Find the question in the database based on the provided ID
    const question = await Question.findById(id);

    // If the question is not found, return a 404 Not Found response
    if (!question) {
      return res.status(404).json({ error: "Question not found." });
    }

    // Create a new answer object based on the data from the request body
    const newAnswer = {
      id: req.body.id,
      name: req.body.name,
      description: req.body.description,
    };

    // Add the new answer to the question's answers array
    question.answers.push(newAnswer);

    // Save the updated question to the database
    const updatedQuestion = await question.save();

    // Return the updated question as the response
    res.status(200).json(updatedQuestion);
  } catch (error) {
    // Handle any errors that occur during the process
    console.error("Error: ", error);
    res.status(500).json({
      error: "An error occurred while adding the answer to the question.",
    });
  }
}

// 6th API: Delete answer from a question
async function deleteAnswerFromQuestion(req, res) {
  try {
    // Extract the question ID and answer ID from the request parameters
    const { id, answerId } = req.params;

    // Find the question in the database based on the provided ID
    const question = await Question.findById(id);

    // If the question is not found, return a 404 Not Found response
    if (!question) {
      return res.status(404).json({ error: "Question not found." });
    }

    // Find the index of the answer to delete in the answers array
    const answerIndex = question.answers.findIndex(
      (answer) => answer.id === answerId
    );

    // If the answer is not found, return a 404 Not Found response
    if (answerIndex === -1) {
      return res.status(404).json({ error: "Answer not found." });
    }

    // Remove the answer from the answers array
    question.answers.splice(answerIndex, 1);

    // Save the updated question to the database
    const updatedQuestion = await question.save();

    // Return the updated question as the response
    res.status(200).json(updatedQuestion);
  } catch (error) {
    // Handle any errors that occur during the process
    console.error("Error: ", error);
    res.status(500).json({
      error: "An error occurred while deleting the answer from the question.",
    });
  }
}

// 7th API: Delete a question
async function deleteQuestion(req, res) {
  try {
    const { id } = req.params;

    // Find the question by ID and delete it
    const deletedQuestion = await Question.findOneAndDelete({ _id: id });

    if (!deletedQuestion) {
      return res.status(404).json({ error: "Question not found" });
    }

    res.json({
      message: "Question and associated answers deleted successfully",
    });
  } catch (error) {
    console.error("Error: ", error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the question" });
  }
}

// Export modules
module.exports = {
  getQuestionById,
  createQuestion,
  getAllQuestions,
  updateQuestion,
  addAnswerToQuestion,
  deleteAnswerFromQuestion,
  deleteQuestion,
};
