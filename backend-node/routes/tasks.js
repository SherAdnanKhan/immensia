const express = require("express");
const TaskController = require("../controllers/task");
const router = express.Router();
const { protect, authorize } = require("../middlewares/auth");

router.use(protect);
router.get("/", TaskController.getTasks);
router.post("/", authorize("admin"), TaskController.createTask);
router.get("/folders", TaskController.getFolders);
router.post("/folders", TaskController.createFolder);
router.put("/:taskId", authorize("admin"), TaskController.updateTask);
router.post('/:taskId/share', TaskController.shareTask);
router.get("/:taskId/complete", TaskController.markTaskComplete);
router.delete("/:taskId", authorize("admin"), TaskController.deleteTask);
router.get("/folders/:folder", TaskController.getTasksByFolder);

module.exports = router;
