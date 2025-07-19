const express = require("express");
const { getStudents, getStudentById, createStudent, updateStudent, deleteStudent } = require("../controllers/studentController");

//router object
const router = express.Router();

//routes

// GET All Students
router.get("/getall", getStudents);

// Get Student By Id
router.get("/get/:id", getStudentById);

// Create Student
router.post("/create", createStudent);

// Update Student
router.put("/update/:id", updateStudent);

// Delete Student
router.delete("/delete/:id", deleteStudent);

module.exports = router;