require("../config/DB")
const collection = require("../config/Collection")
const mongoose = require("mongoose")

const DepartmentSchema = new mongoose.Schema({
    department: {
        type: String,
        required: [true, "department name is required in field"]
    },
    category: {
        type: String,
        required: [true, "category name is required in field"]
    },
    location: {
        type: String,
        required: [true, "location is required"] 
    },
    salary: { type: Number, required: [true, "salary is required in field"] },
    emplyId: { type: String, required: [true, "employee id is required in field"] }
})

const AdminData = mongoose.model(collection.Department, DepartmentSchema);

module.exports = AdminData;
