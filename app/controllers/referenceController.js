const ReferenceModel = require('../models/reference');

const formatDocument = (doc) => {
    const obj = doc.toObject();
    obj.id = obj._id.toString();
    delete obj._id;
    delete obj.__v;
    return obj;
}

module.exports.referencesList = async function (req, res, next) {
    try {
        let list = await ReferenceModel.find();
        list = list.map(formatDocument);

        res.json({
            success: true,
            message: "References list retrieved successfully.",
            data: list
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports.getByID = async function (req, res, next) {
    try {
        let reference = await ReferenceModel.findOne({ _id: req.params.id });
        if (!reference) throw new Error('Reference not found.');

        res.json({
            success: true,
            message: "Reference retrieved successfully.",
            data: formatDocument(reference)
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports.processAdd = async function (req, res, next) {
    try {
        let reference = await ReferenceModel.create(req.body);

        res.status(200).json({
            success: true,
            message: "Reference created successfully.",
            data: formatDocument(reference)
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports.processEdit = async function (req, res, next) {
    try {
        let id = req.params.id;
        let result = await ReferenceModel.updateOne({ _id: id }, req.body);

        if (result.modifiedCount > 0) {
            res.json({ success: true, message: "Reference updated successfully." });
        } else {
            throw new Error('Reference not updated. Are you sure it exists?');
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports.performDelete = async function (req, res, next) {
    try {
        let id = req.params.id;
        let result = await ReferenceModel.deleteOne({ _id: id });

        if (result.deletedCount > 0) {
            res.json({ success: true, message: "Reference deleted successfully." });
        } else {
            throw new Error('Reference not deleted. Are you sure it exists?');
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
}