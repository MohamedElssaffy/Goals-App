const asyncHandler = require('express-async-handler');

const Goal = require('../models/goalModel');

// GET /api/goals
// Private

const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id });
  res.json(goals);
});

// POST /api/goals
// Private

const setGoals = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error('Please add a text');
  }

  const goal = await Goal.create({
    text: req.body.text,
    user: req.user.id,
  });

  res.status(201).json(goal);
});

// PUT /api/goals/id
// Private

const updateGoals = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(404);
    throw new Error('Goal not found');
  }

  // Check if login user has this goal
  if (goal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorize');
  }

  goal.text = req.body.text;
  await goal.save();
  res.json(goal);
});

// DELETE /api/goals/id
// Private

const deleteGoals = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(404);
    throw new Error('Goal not found');
  }

  // Check if login user has this goal
  if (goal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorize');
  }

  await goal.remove();
  res.json({ id: req.params.id });
});

module.exports = {
  getGoals,
  setGoals,
  updateGoals,
  deleteGoals,
};
