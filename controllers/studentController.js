const db = require("../config/db");

// Get All Students List
const getStudents = async (req, res) => {
  try {
    const [data] = await db.query("SELECT * FROM students");
    if (!data) {
      return res.status(404).send({
        success: false,
        message: "No Records found",
      });
    }
    res.status(200).send({
      success: true,
      message: "All Students Records",
      totalStudents: data.length,
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Get All Students",
      error,
    });
  }
};


// Get Student By Id
const getStudentById = async (req, res) => {
  try {
    const studentID = req.params.id;
    if (!studentID) {
      return res.status(404).send({
        success: false,
        message: "Invalid Or Provide Student id",
      });
    }
    const [data] = await db.query("SELECT * FROM students WHERE id = ?", [
      studentID,
    ]);
    if (!data) {
      return res.status(404).send({
        success: false,
        message: "No Records found",
      });
    }
    res.status(200).send({
      success: true,
      studentDetails: data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Get Students by id API",
      error,
    });
  }
};


// Create Student
const createStudent = async (req, res) => {
  try {
    const { name, roll_no, standard } = req.body;
    if (!name || !roll_no || !standard) {
      return res.status(500).send({
        success: false,
        message: "Please provide all required fields",
      });
    }
    const [data] = await db.query(
      "INSERT INTO students (name, roll_no, standard) VALUES (?, ?, ?)",
      [name, roll_no, standard]
    );
    if (!data) {
      return res.status(404).send({
        success: false,
        message: "Error in INSERT Query",
      });
    }
    res.status(201).send({
      success: true,
      message: "New Student Created Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Create Student API",
      error,
    });
  }
};


// Update Student
const updateStudent = async (req, res) => {
  try {
    const studentID = req.params.id;
    if (!studentID) {
      return res.status(404).send({
        success: false,
        message: "Invalid Or Provide Student id",
      });
    }
    const { name, roll_no, fees, medium } = req.body;
    if (!name || !roll_no || !fees || !medium) {
      return res.status(500).send({
        success: false,
        message: "Please provide all required fields",
      });
    }
    const [data] = await db.query(
      "UPDATE students SET name = ?, roll_no = ?, fees = ?, medium = ? WHERE id = ?",
      [name, roll_no, fees, medium, studentID]
    );
    if (!data) {
      return res.status(404).send({
        success: false,
        message: "Error in UPDATE Query",
      });
    }
    res.status(200).send({
      success: true,
      message: "Student Updated Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Update Student API",
      error,
    });
  }
};


// Delete student
const deleteStudent = async (req, res) => {
  try {
    const studentID = req.params.id;
    if (!studentID) {
      return res.status(404).send({
        success: false,
        message: "Invalid Or Provide Student id",
      });
    }
    const [data] = await db.query("DELETE FROM students WHERE id = ?", [
      studentID,
    ]);
    if (!data) {
      return res.status(404).send({
        success: false,
        message: "Error in DELETE Query",
      });
    }
    res.status(200).send({
      success: true,
      message: "Student Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Delete Student API",
      error,
    });
  }
};

module.exports = { getStudents, getStudentById, createStudent, updateStudent, deleteStudent };
