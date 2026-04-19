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

        const deletedDoc = await ReferenceModel.findByIdAndDelete(id);

        if (!deletedDoc) {
            return res.status(404).json({
                success: false,
                message: "Item not found or already deleted."
            });
        }

        return res.json({
            success: true,
            message: "Item deleted successfully."
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}