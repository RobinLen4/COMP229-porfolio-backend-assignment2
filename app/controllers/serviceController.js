const ServiceModel = require('../models/service');

const formatDocument = (doc) => {
    const obj = doc.toObject();
    obj.id = obj._id.toString();
    delete obj._id;
    delete obj.__v;
    return obj;
}

module.exports.servicesList = async function (req, res, next) {
    try {
        let list = await ServiceModel.find();
        list = list.map(formatDocument);

        res.json({
            success: true,
            message: "Services list retrieved successfully.",
            data: list
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports.getByID = async function (req, res, next) {
    try {
        let service = await ServiceModel.findOne({ _id: req.params.id });
        if (!service) throw new Error('Service not found.');

        res.json({
            success: true,
            message: "Service retrieved successfully.",
            data: formatDocument(service)
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports.processAdd = async function (req, res, next) {
    try {
        let service = await ServiceModel.create(req.body);

        res.status(200).json({
            success: true,
            message: "Service created successfully.",
            data: formatDocument(service)
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports.processEdit = async function (req, res, next) {
    try {
        let id = req.params.id;
        let result = await ServiceModel.updateOne({ _id: id }, req.body);

        if (result.modifiedCount > 0) {
            res.json({ success: true, message: "Service updated successfully." });
        } else {
            throw new Error('Service not updated. Are you sure it exists?');
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports.performDelete = async function (req, res, next) {
    try {
        let id = req.params.id;

        const deletedDoc = await ServiceModel.findByIdAndDelete(id);

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