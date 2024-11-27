const Joi = require("joi");

// validation schema
const instituteValidationSchema = Joi.object({
  type: Joi.string()
    .valid("School", "College", "Competitive Exam Center", "Playhouse")
    .required()
    .messages({
      "any.required": "Type is required",
      "any.only": "Invalid type",
    }),

  board: Joi.when("type", {
    is: "School",
    then: Joi.string().valid("CBSE", "GSEB").required().messages({
      "any.required": "Board is required for School",
      "any.only": "Invalid board",
    }),
    otherwise: Joi.string().allow(null),
  }),

  medium: Joi.when("type", {
    is: "School",
    then: Joi.string().valid("English", "Hindi").required().messages({
      "any.required": "Medium is required for School",
      "any.only": "Invalid medium",
    }),
    otherwise: Joi.string().allow(null),
  }),

  classCategory: Joi.when("type", {
    is: "School",
    then: Joi.string()
      .valid("primary", "secondary", "higher-secondary", "pre-primary")
      .required()
      .messages({
        "any.required": "Class is required for School",
        "any.only": "Invalid class",
      }),
    otherwise: Joi.string().allow(null),
  }),

  standard: Joi.alternatives().conditional("type", {
    is: "School",
    then: Joi.alternatives().conditional("classCategory", [
      {
        is: "pre-primary",
        then: Joi.string().valid("LKG", "HKG").required().messages({
          "any.required": "Standard is required for Primary class",
          "any.only": "Invalid standard",
        }),
      },
      {
        is: "higher-secondary",
        then: Joi.string().valid("8", "9", "10").required().messages({
          "any.required": "Standard is required for Secondary class",
          "any.only": "Invalid standard",
        }),
      },
    ]),
    otherwise: Joi.string().allow(null),
  }),

  subjects: Joi.when("type", {
    is: "School",
    then: Joi.array().items(Joi.string()).min(1).required().messages({
      "array.min": "At least one subject is required for School",
      "any.required": "Subjects are required for School",
    }),
    otherwise: Joi.array().allow(null),
  }),

  university: Joi.when("type", {
    is: "College",
    then: Joi.string().required().messages({
      "any.required": "University is required for College",
    }),
    otherwise: Joi.forbidden().messages({
      "any.unknown": "University cannot be provided for non-College type",
    }),
  }),

  degreeType: Joi.when("type", {
    is: "College",
    then: Joi.string().required().messages({
      "any.required": "Degree Type is required for College",
    }),
    otherwise: Joi.forbidden().messages({
      "any.unknown": "Degree Type cannot be provided for non-College type",
    }),
  }),

  examType: Joi.when("type", {
    is: "Competitive Exam Center",
    then: Joi.string().required().messages({
      "any.required": "Exam Type is required for Competitive Exam Center",
    }),
    otherwise: Joi.forbidden().messages({
      "any.unknown":
        "Invalid field. Only 'examType' is allowed for Competitive Exam Center",
    }),
  }),

  // Disallow other fields if the type is not matching.
  board: Joi.when("type", {
    is: "Competitive Exam Center",
    then: Joi.forbidden().messages({
      "any.unknown": "Board cannot be provided for Competitive Exam Center",
    }),
  }),
  medium: Joi.when("type", {
    is: "Competitive Exam Center",
    then: Joi.forbidden().messages({
      "any.unknown": "Medium cannot be provided for Competitive Exam Center",
    }),
  }),
  classCategory: Joi.when("type", {
    is: "Competitive Exam Center",
    then: Joi.forbidden().messages({
      "any.unknown":
        "Class Category cannot be provided for Competitive Exam Center",
    }),
  }),
  // standard: Joi.when("type", {
  //   is: "Competitive Exam Center",
  //   then: Joi.forbidden().messages({
  //     "any.unknown": "Standard cannot be provided for Competitive Exam Center",
  //   }),
  // }),
  // subjects: Joi.when("type", {
  //   is: "Competitive Exam Center",
  //   then: Joi.forbidden().messages({
  //     "any.unknown": "Subjects cannot be provided for Competitive Exam Center",
  //   }),
  // }),
});

module.exports = instituteValidationSchema;
