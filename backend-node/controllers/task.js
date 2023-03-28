const TaskService = require('../services/TaskService');

class TaskController {

  async getTasks(req, res) {
    try {
      const tasks = await TaskService.getTasks(req.user);
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async createTask(req, res) {
    try {
      const task = await TaskService.createTask(req.user.id, req.body);
      res.status(201).json(task);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateTask(req, res) {
    try {
      const updatedTask = await TaskService.updateTask(req.user.id, req.params.taskId, req.body);
      res.status(200).json(updatedTask);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteTask(req, res) {
    try {
      await TaskService.deleteTask(req.user.id, req.params.taskId);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async shareTask(req, res) {
    try {
      const sharedTask = await TaskService.shareTask(req.user.id, req.params.taskId, req.body.userId);
      res.status(200).json(sharedTask);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getTasksByFolder(req, res) {
    try {
      const tasks = await TaskService.getTasksByFolder(req.user.id, req.params.folder);
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async createFolder(req, res) {
    try {
      const folder = await TaskService.createFolder(req.user.id, req.body.name);
      res.status(201).send(folder);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getFolders(req, res) {
    try {
      const folders = await TaskService.getFolders(req.user.id);
      res.status(200).json(folders);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async markTaskComplete(req, res) {
    try {
      const completedTask = await TaskService.markTaskComplete(req.user.id, req.params.taskId, req.user.role);
      res.status(200).json(completedTask);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  
}



module.exports = new TaskController();
