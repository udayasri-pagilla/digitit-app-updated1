const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { validateBody } = require('../middleware/validate');
const Joi = require('joi');
const { getTasks, createTask, updateTask, deleteTask } = require('../controllers/tasks.controller');

const createSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().optional().allow(''),
  dueDate: Joi.date().optional().allow(null),
  progress: Joi.string().valid('not-started','in-progress','completed').optional()
});

const updateSchema = Joi.object({
  title: Joi.string().optional(),
  description: Joi.string().optional().allow(''),
  dueDate: Joi.date().optional().allow(null),
  progress: Joi.string().valid('not-started','in-progress','completed').optional()
});

router.use(auth);

router.get('/', getTasks);
router.post('/', validateBody(createSchema), createTask);
router.put('/:id', validateBody(updateSchema), updateTask);
router.delete('/:id', deleteTask);

module.exports = router;
