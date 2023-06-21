const pool = require("../db/db");
const queries = require("../db/queries");

///Exam Creation
const createExamDefinition = async (req, res) => {
  try {
    const { name, questions } = req.body;

    const checkExamQuery = await pool.query(queries.checkExamExists, [name]);
    if (checkExamQuery.rows.length) {
      return res.send("Exam already exists.");
    }

    const addExamQuery = await pool.query(queries.addExamDefinition, [
      name,
      questions,
    ]);
    res.status(201).send("Exam Definition Created Successfully!");
  } catch (error) {
    console.error("Error creating exam definition:", error);
    res.status(500).send("Error creating exam definition");
  }
};

const createExamInstance = async (req, res) => {
  try {
    const { examDefinitionId, createdBy, takenBy, status } = req.body;

    if (!examDefinitionId) {
      return res.status(400).send("Exam Definition ID is required");
    }

    const createInstanceQuery = await pool.query(queries.createExamInstance, [
      examDefinitionId,
      createdBy,
      takenBy,
      status,
    ]);

    res.status(201).send("Exam Instance Created Successfully!");
  } catch (error) {
    console.error("Error creating exam instance:", error);
    res.status(500).send("Error creating exam instance");
  }
};

//Getting Exams

const getExams = (req, res) => {
  pool.query(queries.getExams, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const getExamById = (req, res) => {
  const id = req.params.id;
  // Fetch exam instance
  pool.query(queries.getExamById, [id], (error, instanceResults) => {
    if (error) throw error;

    // Fetch exam definition
    const examDefinition = instanceResults.rows[0];
    res.status(200).json({ examDefinition });
  });
};

const getExamInstanceById = async (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getExamInstanceById, [id], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const getExamInstances = async (req, res) => {
  pool.query(queries.getExamInstances, (error, results) => {
    if (error) throw error;
    results.rows.map(async (r) => {
      const examDefinition = await pool.query(queries.getExamDefinitionById, [
        r.examDefinitionId,
      ]);
      r.examDefinition = examDefinition.rows[0];
    });
    res.status(200).json(results.rows);
  });
};

// const getExamInstanceByStudentId = async (req, res) => {
//   const studentId = parseInt(req.params.studentId);
//   pool.query(queries.getExamInstanceByStudentId, [id], (error, results) => {
//     if (error) throw error;
//     res.status(200).json(results.rows);
//   });
// };

const editExamInstanceById = async (req, res) => {
  try {
    const { score, questions } = req.body;
    console.log(score);
    console.log(questions);
    const status = "absent";

    const examInstanceId = parseInt(req.params.id);
    console.log(examInstanceId);

    const editExamInstanceQuery = await pool.query(
      queries.editExamInstanceById,
      [score, questions, status, examInstanceId]
    );

    res.status(200).send("Exam Instance updated successfully!");
  } catch (error) {
    console.error("Error editing exam instance:", error);
    res.status(500).send("Error editing exam instance");
  }
};

module.exports = {
  createExamDefinition,
  getExams,
  getExamById,
  createExamInstance,
  getExamInstanceById,
  editExamInstanceById,
  getExamInstances,
};
