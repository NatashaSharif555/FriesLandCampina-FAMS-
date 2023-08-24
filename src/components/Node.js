const express = require("express");
const fs = require("fs");
const app = express();
const port = 3001;

app.use(express.json());

app.post("/saveFormData", (req, res) => {
  try {
    const data = req.body;
    // Write data to a JSON file
    fs.writeFileSync("formData.json", JSON.stringify(data));
    res.status(200).json({ message: "Data saved successfully" });
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
