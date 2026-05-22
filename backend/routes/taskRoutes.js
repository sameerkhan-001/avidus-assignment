const express = require("express");

const router = express.Router();

const {
    createTask,
    getMyTasks,
    updateTask,
    deleteTask,
} = require("../controllers/taskController");

const {
    protect,
} = require("../middleware/authMiddleware");

router.post("/", protect, createTask);

router.get("/", protect, getMyTasks);

router.put("/:id", protect, updateTask);

router.delete("/:id", protect, deleteTask);

module.exports = router;