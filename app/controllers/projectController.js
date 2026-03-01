let ProjectsModel = require('../models/project');

module.exports.projectsList = async function (req, res, next) {
    try {
        let list = await ProjectsModel.find();
        // convert _id -> id for all
        list = list.map(p => {
            const obj = p.toObject();
            obj.id = obj._id.toString();
            delete obj._id;
            delete obj.__v;
            return obj;
        });

        res.json({
            success: true,
            message: "Projects list retrieved successfully.",
            data: list
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports.getByID = async function (req, res, next) {
    try {
        let project = await ProjectsModel.findOne({ _id: req.params.id });
        if (!project)
            throw new Error('Project not found.');

        const obj = project.toObject();
        obj.id = obj._id.toString();
        delete obj._id;
        delete obj.__v;

        res.json({
            success: true,
            message: "Project retrieved successfully.",
            data: obj
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports.processAdd = async (req, res, next) => {
    try {
        let project = req.body;
        let result = await ProjectsModel.create(project);

        const obj = result.toObject();
        obj.id = obj._id.toString();
        delete obj._id;
        delete obj.__v;

        res.status(200).json({
            success: true,
            message: "Project created successfully.",
            data: obj
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports.processEdit = async (req, res, next) => {
    try {
        let id = req.params.id;
        let updatedProject = ProjectsModel(req.body);
        updatedProject._id = id;

        let result = await ProjectsModel.updateOne({ _id: id }, updatedProject);
        if (result.modifiedCount > 0) {
            res.json({
                success: true,
                message: "Project updated successfully."
            });
        } else {
            throw new Error('Project not updated. Are you sure it exists?')
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports.performDelete = async (req, res, next) => {
    try {
        let id = req.params.id;
        let result = await ProjectsModel.deleteOne({ _id: id });

        if (result.deletedCount > 0) {
            res.json({
                success: true,
                message: "Project deleted successfully."
            });
        } else {
            throw new Error('Project not deleted. Are you sure it exists?');
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
}