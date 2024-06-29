import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
app.use(cors());
app.use(bodyParser.json());

const subjectsData = {
  CSE: [
    {
      name: "C",
      marks: 100,
      year: 1,
      pdfUri: "https://drive.google.com/file/d/1rCBvT4Q-DwmOggao7T0yinh4d9nloC25/view?usp=sharing",
    },
    {
      name: "C++",
      marks: 95,
      year: 1,
      pdfUri: "https://drive.google.com/file/d/1rCBvT4Q-DwmOggao7T0yinh4d9nloC25/view?usp=sharing",
    },
  ],
  ECE: [
    {
      name: "C",
      marks: 100,
      year: 1,
      pdfUri: "https://drive.google.com/file/d/1rCBvT4Q-DwmOggao7T0yinh4d9nloC25/view?usp=sharing",
    },
    {
      name: "C++",
      marks: 95,
      year: 1,
      pdfUri: "https://drive.google.com/file/d/1rCBvT4Q-DwmOggao7T0yinh4d9nloC25/view?usp=sharing",
    },
  ],
};

app.get("/:department", (req, res) => {
  const { department } = req.params;
  const subjects = subjectsData[department.toUpperCase()];
  if (subjects) {
    res.json(subjects);
  } else {
    res.status(404).json({ message: "Department not found" });
  }
});

app.post("/subjects", (req, res) => {
  const { department, name, marks, year, pdfUri } = req.body;

  if (!department || !name || !marks || !year || !pdfUri) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const departmentUpperCase = department.toUpperCase();
  if (!subjectsData[departmentUpperCase]) {
    subjectsData[departmentUpperCase] = [];
  }
  const newSubject = { name, marks, year, pdfUri };
  subjectsData[departmentUpperCase].push(newSubject);

  res.status(201).json({ message: "Subject added successfully", subject: newSubject });
});

app.listen(10000||5000, () => {
  console.log("Server running at http://localhost:10000/");
});
