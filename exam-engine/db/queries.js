const getExams = "SELECT * FROM examDefinition";
const getExamById = "SELECT * FROM examDefinition WHERE id = $1";
const checkExamExists = "SELECT * FROM examDefinition WHERE name = $1";
const addExamDefinition =
  "INSERT INTO examDefinition (name, Questions) VALUES ($1, $2)";
const createExamInstance =
  "INSERT INTO examInstance (examDefinationId, createdBy, takenBy, status) VALUES ($1, $2, $3, $4)";
const checkDefinitionExists = "SELECT * FROM examDefinition WHERE id = $1";
const getExamInstanceById = "SELECT * FROM examInstance WHERE id = $1";
const getExamInstances = "SELECT * FROM examInstance";
const getExamInstanceByStudentId =
  "SELECT * FROM examInstance WHERE takenby = $1";
const editExamInstanceById = `
  UPDATE examInstance
  SET
    score = $1,
    questions = $2,
    status = $3
  WHERE
    id = $4;
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
  getExamInstanceByStudentId,
  getExamInstances,
};
