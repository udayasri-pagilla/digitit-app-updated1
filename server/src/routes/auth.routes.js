const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/auth.controller');
const { validateBody } = require('../middleware/validate');
const Joi = require('joi');

const signupSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid('student','teacher').required(),
  teacherId: Joi.string().hex().length(24).optional().allow(null),
  teacherEmail: Joi.string().email().optional()
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

router.post('/signup', validateBody(signupSchema), signup);
router.post('/login', validateBody(loginSchema), login);

module.exports = router;
