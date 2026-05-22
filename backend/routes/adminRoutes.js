const express = require("express");

const router = express.Router();

const {
    getAllUsers,
    getAllTasks,
    deleteUser,
    updateUserStatus,
    getActivityLogs,
} = require("../controllers/adminController");

const {
    protect,
    adminOnly,
} = require("../middleware/authMiddleware");

router.get(
    "/users",
    protect,
    adminOnly,
    getAllUsers
);

router.get(
    "/tasks",
    protect,
    adminOnly,
    getAllTasks
);

router.delete(
    "/users/:id",
    protect,
    adminOnly,
    deleteUser
);

router.put(
    "/users/:id",
    protect,
    adminOnly,
    updateUserStatus
);

router.get(
    "/logs",
    protect,
    adminOnly,
    getActivityLogs
);

module.exports = router;