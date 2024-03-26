import { response } from "express";
import pool from "../DatabaseConnect.js";
import {
  getStudentsquerry,
  getStudentByIdquerry,
  createStudentquerry,
  checkEmailExsists,
  deleteStudentQuerry,
  updateStudentQuerry,
} from "../src/queries.js";

const home = (req, res) => {
  res.send("This is Home");
};

const getStudents = async (req, res) => {
  try {
    const result = await pool.query(getStudentsquerry);
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getStudentById = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const result = await pool.query(getStudentByIdquerry, [id]);
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json(error);
  }
};

const addStudent = async (req, res) => {
  const { name, email, age, dob } = req.body;

  try {
    const result = await pool.query(checkEmailExsists, [email]);
    if (result.rows.length) {
      res.send("email already exsits");
      return;
    }
    try {
      const result = await pool.query(createStudentquerry, [
        name,
        email,
        age,
        dob,
      ]);
      res.status(201).send("student is created");
    } catch (error) {}
  } catch (error) {
    res.status(500).json(error);
  }
};
const deleteStudent = async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const result = await pool.query(deleteStudentQuerry, [id]);
    if (result.rowCount === 0) {
      res.status(404).send(`No student found with ID ${id}`);
      return;
    }

    res.status(200).json({
      message: "Student deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error deleting the student",
    });
  }
};

const updateStudent = async (req, res) => {
  const id = parseInt(req.params.id);
  let { name, age, email } = req.body;
  age = parseInt(age, 10);

  try {
    const response = await pool.query(updateStudentQuerry, [
      name,
      email,
      age,
      id,
    ]);
    res.status(202).json({
      message: "Updated succesfully",
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

export {
  home,
  getStudents,
  getStudentById,
  addStudent,
  deleteStudent,
  updateStudent,
};
