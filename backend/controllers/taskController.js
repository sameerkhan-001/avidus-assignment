const ActivityLog =
require("../models/ActivityLog");

const Task = require("../models/Task");

exports.createTask = async (req, res) => {

    try {

        const task = await Task.create({
            title: req.body.title,
            description: req.body.description,
            user: req.user._id,
        });

        await ActivityLog.create({
        user: req.user._id,
        action: "Task Created",
        });

        res.status(201).json(task);

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });
    }
};

exports.getMyTasks = async (req, res) => {

    try {

        const tasks = await Task.find({
            user: req.user._id,
        });

        res.json(tasks);

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });
    }
};

exports.updateTask = async (req, res) => {

    try {

        const task = await Task.findById(req.params.id);

        if (!task) {

            return res.status(404).json({
                message: "Task not found",
            });
        }

        if (
            task.user.toString() !== req.user._id.toString()
        ) {

            return res.status(401).json({
                message: "Not authorized",
            });
        }

        task.title =
            req.body.title || task.title;

        task.description =
            req.body.description || task.description;

        task.completed =
            req.body.completed ?? task.completed;

        const updatedTask = await task.save();

        await ActivityLog.create({
        user: req.user._id,
        action: "Task Updated",
        });

        res.json(updatedTask);

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });
    }
};

exports.deleteTask = async (req, res) => {

    try {

        const task = await Task.findById(req.params.id);

        if (!task) {

            return res.status(404).json({
                message: "Task not found",
            });
        }

        if (
            task.user.toString() !== req.user._id.toString()
        ) {

            return res.status(401).json({
                message: "Not authorized",
            });
        }

        await task.deleteOne();

        await ActivityLog.create({
        user: req.user._id,
        action: "Task Deleted",
        });

        res.json({
            message: "Task deleted",
        });

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });
    }
};
