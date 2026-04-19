const UsersModel = require('../models/user');
const jwt = require('jsonwebtoken');

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
        console.log("BODY RECEIVED:", req.body);

        let user = await UsersModel.create(req.body);

        res.status(200).json({
            success: true,
            message: "User created successfully.",
            data: formatDocument(user)
        });
    } catch (error) {
        console.error("CREATE USER ERROR:", error); 
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

module.exports.processEdit = async function (req, res, next) {
    try {
        let id = req.params.id;
        let updated = await UsersModel.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        );

        if (!updated) {
            throw new Error('User not found or not updated.');
        }

        res.json({
            success: true,
            message: "User updated successfully.",
            data: formatDocument(updated)
        });

    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports.performDelete = async function (req, res, next) {
    try {
        let id = req.params.id;

        const deletedDoc = await UsersModel.findByIdAndDelete(id);

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

module.exports.login = async function (req, res, next) {
    try {
        const { email, password } = req.body;

        const user = await UsersModel.findOne({ email });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.json({
            success: true,
            message: "Login successful",
            token,
            data: formatDocument(user)
        });

    } catch (error) {
        console.log(error);
        next(error);
    }
};