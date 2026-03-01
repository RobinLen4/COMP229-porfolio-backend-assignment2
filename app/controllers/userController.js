const UsersModel = require('../models/user');

const formatDocument = (doc) => {
    const obj = doc.toObject();
    obj.id = obj._id.toString();
    delete obj._id;
    delete obj.__v;
    return obj;
}

module.exports.usersList = async function (req, res, next) {
    try {
        let list = await UsersModel.find();
        list = list.map(formatDocument);

        res.json({
            success: true,
            message: "User list retrieved successfully.",
            data: list
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports.getByID = async function (req, res, next) {
    try {
        let user = await UsersModel.findOne({ _id: req.params.id });
        if (!user) throw new Error('User not found.');

        res.json({
            success: true,
            message: "User retrieved successfully.",
            data: formatDocument(user)
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports.processAdd = async function (req, res, next) {
    try {
        let user = await UsersModel.create(req.body);

        res.status(200).json({
            success: true,
            message: "User created successfully.",
            data: formatDocument(user)
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports.processEdit = async function (req, res, next) {
    try {
        let id = req.params.id;
        let result = await UsersModel.updateOne({ _id: id }, req.body);

        if (result.modifiedCount > 0) {
            res.json({ success: true, message: "User updated successfully." });
        } else {
            throw new Error('User not updated. Are you sure it exists?');
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports.performDelete = async function (req, res, next) {
    try {
        let id = req.params.id;
        let result = await UsersModel.deleteOne({ _id: id });

        if (result.deletedCount > 0) {
            res.json({ success: true, message: "User deleted successfully." });
        } else {
            throw new Error('User not deleted. Are you sure it exists?');
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
}