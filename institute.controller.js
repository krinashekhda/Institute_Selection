const Institute = require("./institute.model");
const instituteValidationSchema = require("./validation/index");

// Create Institute Controller
const createInstitute = async (req, res) => {
  try {
    const {
      type,
      board,
      medium,
      classCategory,
      standard,
      subjects,
      university,
      degreeType,
      examType,
    } = req.body;
    const error = instituteValidationSchema.validate(req.body);
    console.log(error);
    
    if (error.error) {
      return res.status(400).json({ message: error.error.details[0].message });
    }
    // Validate required fields
    if (!type) {
      return res
        .status(400)
        .json({ message: "Name and Type are required fields." });
    }
    // if(type)

    // Create a new Institute object
    const newInstitute = new Institute({
      type,
      board,
      medium,
      classCategory,
      standard,
      subjects,
      university,
      degreeType,
      examType,
    });

    // Save to the database
    const savedInstitute = await newInstitute.save();

    // Respond with the saved institute
    res.status(201).json({
      message: "Institute created successfully",
      institute: savedInstitute,
    });
  } catch (error) {
    console.error("Error creating institute:", error);
    res.status(500).json({
      message: "An error occurred while creating the institute",
      error: error.message,
    });
  }
};
const getInstitutes = async (req, res) => {
  try {
      // Extract query parameters for filtering
      const { type, board, medium, class: classCategory, standard, subjects } = req.query;

      // Build a filter object based on query parameters
      const filter = {};
      if (type) filter.type = type;
      if (board) filter.board = board;
      if (medium) filter.medium = medium;
      if (classCategory) filter.class = classCategory;
      if (standard) filter.standard = standard;
      if (subjects) filter.subjects = { $in: subjects.split(",") }; // Handles comma-separated subjects

      // Fetch institutes from the database based on the filter
      const institutes = await Institute.find(filter);

      // Respond with the list of institutes
      res.status(200).json({
          message: "Institutes retrieved successfully",
          data: institutes
      });
  } catch (error) {
      console.error("Error fetching institutes:", error);
      res.status(500).json({
          message: "An error occurred while fetching institutes",
          error: error.message
      });
  }
};

module.exports = { createInstitute, getInstitutes };
