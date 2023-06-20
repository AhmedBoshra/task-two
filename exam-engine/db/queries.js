const getExams = "SELECT * FROM examDefinition";
const getExamById = "SELECT * FROM examDefinition WHERE id = $1";
const checkExamExists = "SELECT * FROM examDefinition WHERE name = $1";
const addExamDefinition =
  "INSERT INTO examDefinition (name, Questions) VALUES ($1, $2)";
const createExamInstance =
  "INSERT INTO examInstance (examDefinationId, createdBy, takenBy, status) VALUES ($1, $2, $3, $4)";
const checkDefinitionExists = "SELECT * FROM examDefinition WHERE id = $1";
const getExamInstanceById = "SELECT * FROM examInstance WHERE id = $1";
const editExamInstanceById = `
  UPDATE examInstance
  SET
    duration = $1,
    startedtime = $2,
    endtime = $3,
    score = $4,
    Questions = $5,
    status = $6
  WHERE
    id = $7;
`;

module.exports = {
  getExams,
  getExamById,
  checkExamExists,
  addExamDefinition,
  createExamInstance,
  checkDefinitionExists,
  getExamInstanceById,
  editExamInstanceById,
};
