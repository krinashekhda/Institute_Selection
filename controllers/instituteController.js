const Institute = require('../models/Institute');
const InstituteType = require('../models/InstituteType');
const Board = require('../models/Board');
const Medium = require('../models/Medium');
const ClassCategory = require('../models/ClassCategory');
const Standard = require('../models/Standard');
const Subject = require('../models/Subject');

// Create a new institute
const registerInstitute = async (req, res) => {
  try {
    const {
      instituteTypeId,
      boardId,
      mediumId,
      classCategoryId,
      university,
      degreeType,
      examType,
      standardIds,
      subjectIds,
    } = req.body;

    const instituteType = await InstituteType.findById(instituteTypeId);
    if (!instituteType) return res.status(400).json({ error: 'Invalid institute type' });

    const newInstitute = new Institute({
      instituteType: instituteTypeId,
      board: boardId,
      medium: mediumId,
      classCategory: classCategoryId,
      university,
      degreeType,
      examType,
      standards: standardIds,
      subjects: subjectIds,
    });

    await newInstitute.save();
    res.status(201).json({ message: 'Institute registered successfully', institute: newInstitute });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

// Fetch available institute types
const getInstituteTypes = async (req, res) => {
  try {
    const instituteTypes = await InstituteType.find();
    res.json(instituteTypes);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};

// Fetch boards for schools
const getBoards = async (req, res) => {
  try {
    const boards = await Board.find();
    res.json(boards);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};

// Fetch mediums for schools
const getMediums = async (req, res) => {
  try {
    const mediums = await Medium.find();
    res.json(mediums);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};

// Fetch class categories for schools
const getClassCategories = async (req, res) => {
  try {
    const classCategories = await ClassCategory.find();
    res.json(classCategories);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};

// Fetch standards based on class category
const getStandardsByClassCategory = async (req, res) => {
  try {
    const standards = await Standard.find({ classCategory: req.params.classCategoryId });
    res.json(standards);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};

// Fetch subjects based on standard
const getSubjectsByStandard = async (req, res) => {
  try {
    const subjects = await Subject.find({ standard: req.params.standardId });
    res.json(subjects);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};

const createBoard = async (req, res) => {
    try {
      const { name } = req.body;
      
      const existingBoard = await Board.findOne({ name });
      if (existingBoard) {
        return res.status(400).json({ error: 'Board already exists' });
      }
  
      const board = new Board({ name });
      await board.save();
      res.status(201).json({ message: 'Board created successfully', board });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Something went wrong' });
    }
  };

module.exports = {
  registerInstitute,
  getInstituteTypes,
  getBoards,
  getMediums,
  getClassCategories,
  getStandardsByClassCategory,
  getSubjectsByStandard,
  createBoard
};
