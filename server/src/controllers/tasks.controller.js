const Task = require('../models/Task');
const User = require('../models/User');
const mongoose = require('mongoose');

async function getTasks(req, res, next) {
  try {
    const user = req.user;
    const { progress } = req.query;
    const q = {};

    if (user.role === 'student') {
      q.userId = user._id;
    } else if (user.role === 'teacher') {
      const students = await User.find({ teacherId: user._id }).select('_id');
      const studentIds = students.map(s => s._id);
      q.$or = [
        { userId: user._id }, // tasks created by teacher
        { userId: { $in: studentIds } } // tasks created by assigned students
      ];
    }

    if (progress && ['not-started','in-progress','completed'].includes(progress)) {
      q.progress = progress;
    }

    const tasks = await Task.find(q).sort({ createdAt: -1 }).populate({ path: 'userId', select: 'email role teacherId' });
    res.json({ success: true, tasks });
  } catch (err) {
    next(err);
  }
}

async function createTask(req, res, next) {
  try {
    const user = req.user;
    const data = req.validated;
    const task = await Task.create({ ...data, userId: user._id });
    const populated = await Task.findById(task._id).populate({ path: 'userId', select: 'email role teacherId' });
    res.status(201).json({ success: true, task: populated });
  } catch (err) {
    next(err);
  }
}

async function updateTask(req, res, next) {
  try {
    const user = req.user;
    const taskId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      const err = new Error('Invalid task id');
      err.status = 400;
      return next(err);
    }
    const task = await Task.findById(taskId);
    if (!task) {
      const err = new Error('Task not found');
      err.status = 404;
      return next(err);
    }
    // Only owner (creator) can update
    if (task.userId.toString() !== user._id.toString()) {
      const err = new Error('Forbidden: only owner can update');
      err.status = 403;
      return next(err);
    }
    Object.assign(task, req.validated);
    await task.save();
    const populated = await Task.findById(task._id).populate({ path: 'userId', select: 'email role teacherId' });
    res.json({ success: true, task: populated });
  } catch (err) {
    next(err);
  }
}

// async function deleteTask(req, res, next) {
//   try {
//     const user = req.user;
//     const taskId = req.params.id;
//     if (!mongoose.Types.ObjectId.isValid(taskId)) {
//       const err = new Error('Invalid task id');
//       err.status = 400;
//       return next(err);
//     }
//     const task = await Task.findById(taskId);
//     if (!task) {
//       const err = new Error('Task not found');
//       err.status = 404;
//       return next(err);
//     }
//     if (task.userId.toString() !== user._id.toString()) {
//       const err = new Error('Forbidden: only owner can delete');
//       err.status = 403;
//       return next(err);
//     }
//     await task.remove();
//     res.json({ success: true, message: 'Task deleted' });
//   } catch (err) {
//     next(err);
//   }
// }

// module.exports = { getTasks, createTask, updateTask, deleteTask };
async function deleteTask(req, res, next) {
  try {
    const user = req.user;
    const taskId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      const err = new Error('Invalid task id');
      err.status = 400;
      return next(err);
    }

    const task = await Task.findById(taskId);
    if (!task) {
      const err = new Error('Task not found');
      err.status = 404;
      return next(err);
    }

    // Only owner may delete
    if (task.userId.toString() !== user._id.toString()) {
      const err = new Error('Forbidden: only owner can delete');
      err.status = 403;
      return next(err);
    }

    // Use deleteOne on the model for compatibility
    await Task.deleteOne({ _id: taskId });

    return res.json({ success: true, message: 'Task deleted' });
  } catch (err) {
    next(err);
  }
}

module.exports = { getTasks, createTask, updateTask, deleteTask };