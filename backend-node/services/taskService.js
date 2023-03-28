const Folder = require("../models/folder");
const Task = require("../models/Task");

class TaskService {
  async getTasks(user) {
    if (user.role === "admin") {
      const tasks = await Task.find().populate("assignedTo", "name");
      return tasks;
    } else {
      const tasks = await Task.find({
        $or: [
          { assignedTo: user.id },
          { sharedWith: user.id },
          { $and: [{ isCompleted: false }, { isPublic: true }] },
        ],
      }).populate("assignedTo", "name");
      return tasks;
    }
  }

  async createTask(userId, taskData) {
    const task = new Task({ userId, ...taskData });
    await task.save();
    return task;
  }

  async updateTask(userId, taskId, taskData) {
    const task = await Task.findOneAndUpdate(
      { userId, _id: taskId },
      taskData,
      { new: true }
    );
    return task;
  }

  async deleteTask(userId, taskId) {
    await Task.deleteOne({ userId, _id: taskId });
  }

  async shareTask(userId, taskId, targetUserId) {
    const task = await this.getTask(userId, taskId);

    if (!task.sharedWith) {
      task.sharedWith = [];
    }

    if (!Array.isArray(task.sharedWith)) {
      task.sharedWith = [task.sharedWith];
    }

    if (!task.sharedWith.includes(targetUserId)) {
      task.sharedWith.push(targetUserId);
    }

    await this.updateTask(userId, taskId, task);

    return task;
  }

  async getTask(userId, taskId) {
    const task = await Task.findOne({ userId, _id: taskId });
    return task;
  }

  async getTasksByFolder(userId, folderId) {
    const tasks = await Task.find({ userId, folder: folderId });
    return tasks;
  }

  async createFolder(userId, folderName) {
    const folder = new Folder({ name: folderName, userId });
    await folder.save();
    return folder;
  }

  async getFolders(userId) {
    const folders = await Folder.find({ userId });
    return folders;
  }

  async markTaskComplete(userId, taskId, userRole) {
    let task;

    if (userRole === "admin") {
      task = await Task.findOneAndUpdate(
        { _id: taskId },
        { completed: true },
        { new: true }
      );
    } else {
      task = await Task.findOneAndUpdate(
        { _id: taskId, assignedTo: { $in: [userId] } },
        { completed: true },
        { new: true }
      );
    }

    return task;
  }
}

module.exports = new TaskService();
