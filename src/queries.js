const getStudentsquerry = "SELECT * FROM students";
const getStudentByIdquerry = `SELECT * FROM students WHERE id = $1`;
const createStudentquerry = `INSERT INTO students (name,email,age,dob) VALUES($1,$2,$3,$4)`;
const checkEmailExsists = `SELECT email FROM students WHERE email = $1`;
const deleteStudentQuerry = `DELETE FROM students WHERE id = $1 RETURNING *`;
const updateStudentQuerry = `UPDATE students SET name = $1,email = $2,age = $3 WHERE id = $4`;
export {
  getStudentsquerry,
  getStudentByIdquerry,
  createStudentquerry,
  checkEmailExsists,
  deleteStudentQuerry,
  updateStudentQuerry,
};
