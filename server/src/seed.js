require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Task = require('./models/Task');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/digitit';

async function run() {
  await mongoose.connect(MONGO_URI);
  console.log('Connected to DB for seeding');

  await Task.deleteMany({});
  await User.deleteMany({});

  const teacherPassword = await bcrypt.hash('Pass1234', 10);
  const teacher = await User.create({
    email: 'teacherA@example.com',
    passwordHash: teacherPassword,
    role: 'teacher'
  });

  const s1 = await User.create({
    email: 'studentX@example.com',
    passwordHash: await bcrypt.hash('Pass1234', 10),
    role: 'student',
    teacherId: teacher._id
  });

  const s2 = await User.create({
    email: 'studentY@example.com',
    passwordHash: await bcrypt.hash('Pass1234', 10),
    role: 'student',
    teacherId: teacher._id
  });

  const t1 = await Task.create({
    userId: s1._id,
    title: 'Student X task 1',
    description: 'Complete chapter 1',
    dueDate: new Date(Date.now() + 3 * 24 * 3600 * 1000),
    progress: 'not-started'
  });

  const t2 = await Task.create({
    userId: s2._id,
    title: 'Student Y task 1',
    description: 'Practice quizzes',
    dueDate: new Date(Date.now() + 5 * 24 * 3600 * 1000),
    progress: 'in-progress'
  });

  const t3 = await Task.create({
    userId: teacher._id,
    title: 'Teacher A team meeting',
    description: 'Prepare weekly notes',
    dueDate: new Date(Date.now() + 2 * 24 * 3600 * 1000),
    progress: 'not-started'
  });

  console.log('Seed finished.');
  console.log('Accounts:');
  console.log('Teacher:', { email: teacher.email, password: 'Pass1234' });
  console.log('Student X:', { email: s1.email, password: 'Pass1234' });
  console.log('Student Y:', { email: s2.email, password: 'Pass1234' });

  await mongoose.disconnect();
  process.exit(0);
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
