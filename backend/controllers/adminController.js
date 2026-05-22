const ActivityLog =
require("../models/ActivityLog");

const User = require("../models/User");
const Task = require("../models/Task");

exports.getAllUsers = async (req, res) => {

    try {

        const users = await User.find()
            .select("-password");

        res.json(users);

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });
    }
};

exports.getAllTasks = async (req, res) => {

    try {

        const tasks = await Task.find()
            .populate("user", "name email");

        res.json(tasks);

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });
    }
};

exports.deleteUser = async (req, res) => {

    try {

        const user = await User.findById(req.params.id);

        if (!user) {

            return res.status(404).json({
                message: "User not found",
            });
        }

        await user.deleteOne();

        res.json({
            message: "User deleted",
        });

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });
    }
};

exports.updateUserStatus = async (req, res) => {

    try {

        const user = await User.findById(req.params.id);

        if (!user) {

            return res.status(404).json({
                message: "User not found",
            });
        }

        user.status = req.body.status;

        await user.save();

        res.json(user);

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });
    }
};

exports.getActivityLogs =
async (req, res) => {

    try {

        const logs =
            await ActivityLog.find()
            .populate("user", "name email");

        res.json(logs);

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });
    }
};