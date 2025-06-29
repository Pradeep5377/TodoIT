import Task from '../models/Task.js';
import User from '../models/User.js';

export const getTasks = async (req, res) => {
  const tasks = await Task.find({
    $or: [{ owner: req.user.id }, { sharedWith: req.user.id }]
  })
  .populate('sharedWith', 'email name');
  res.json(tasks);
};

export const createTask = async (req, res) => {
  const task = await Task.create({ ...req.body, owner: req.user.id });
  req.io.emit("taskCreated", task);  // Real-time
  res.status(201).json(task);
};

export const updateTask = async (req, res) => {
  const updated = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  req.io.emit("taskUpdated", updated);
  res.json(updated);
};

export const deleteTask = async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  req.io.emit("taskDeleted", req.params.id);
  res.json({ message: "Deleted" });
};

export const shareTask = async (req, res) => {
  const { id } = req.params;
  const { email } = req.body;

  const userToShare = await User.findOne({ email: email.toLowerCase() });
  if (!userToShare) {
    return res.status(404).json({ message: "User not found" });
  }

  const task = await Task.findById(id);
  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  if (!task.sharedWith.includes(userToShare._id)) {
    task.sharedWith.push(userToShare._id);
    await task.save();
    req.io.emit("taskShared", { taskId: id, sharedWith: userToShare._id });
  }

  // Return the updated sharedWith list:
  const populated = await Task.findById(id).populate('sharedWith', 'email');
  res.json(populated.sharedWith);
};

