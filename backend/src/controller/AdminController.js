const AdminData = require("../model/AdminModel");
const AuthUser = require("../model/AuthModel");

module.exports = {
    async AddEmp(req, res) {
        const data = req.body
        const response = {}
        try {
            // console.log("ok")
            const isAlreadyOne = await AuthUser.findOne({ empId: data.emplyId })
            const isAlready = await AdminData.findOne({ emplyId: data.emplyId })
            // console.log("ok1",isAlready)
            if (isAlreadyOne && !isAlready) {
                const mod = await new AdminData(data).save()
                if (mod) {
                    response.status = "success",
                        response.message = "add employee successfully"
                    // response.data = signupObj.password
                }
                else {
                    response.status = "failed",
                        response.message = "add employee failed"
                }
            }
            else if (!isAlreadyOne) {
                response.status = "failed",
                    response.message = "employee doesn't exists"
            }
            else if (isAlready) {
                response.status = "failed",
                    response.message = "employee already exists"
            }
        }
        catch (err) {
            response.status = "Add Employee failed"
            response.message = err
        }
        res.json(response)
    },

    async UpdateEmp(req, res) {
        const data = req.body
        const response = {};
        try {
            //console.log(data)
            const find = await AdminData.findOne({ emplyId: data.emplyId }, { _id: 0, __v: 0 })
            console.log(find)
            console.log("ok1")
            if (find) {
                const upData = await AdminData.updateOne(
                    { emplyId: data.emplyId },
                    {
                        $set: {
                            department: data.department,
                            category: data.category,
                            location: data.location,
                            salary: data.salary
                        }
                    }
                )
                console.log(upData)
                if (upData.modifiedCount == 1) {
                    response.status = "success";
                    response.message = "update successfully"
                }
                else if (upData.modifiedCount == 0) {
                    response.status = "no change took place";
                    response.message = "data isnt modified"
                }
                else {
                    response.status = "failed";
                    response.message = "update failed"
                }
            }
        }
        catch (err) {
            response.status = "failed";
            response.message = err
        }
        res.json(response)
    },

    async SingleEmp(req, res) {
        const data = req.body
        const response = {};
        try {
            console.log(req.query.id)
            const find = await AdminData.aggregate([
                { $match: { emplyId: req.query.id } },
                { $project: { _id: 0, __v: 0 } },
                {
                    $lookup: {
                        from: "auths",
                        localField: "emplyId",
                        foreignField: "empId",
                        as: 'personalData',
                        pipeline: [
                            { $project: { _id: 0, password: 0, __v: 0 } }
                        ]
                    }
                },
                { $unwind: "$personalData" }
            ]
            )
            console.log("ok")
            console.log({ ...find })
            if (find) {
                response.status = "success";
                response.message = "fetching of single employee data successfull";
                response.body = find
            }
        }
        catch (err) {
            response.status = "failed";
            response.message = "something bad happened"
        }
        res.json(response)
    },

    async DeleteEmp(req, res) {
        const data = req.query.id
        const response = {};

        try {
            const find = await AdminData.findOneAndDelete({ emplyId: data })
            if (find) {
                response.status = "success";
                response.message = "employee delete successfully"
            }
        }
        catch (err) {
            response.status = "failed";
            response.message = "something bad happened"
        }
        res.json(response)
    },

    async GetEmpByInactv(req, res) {
        const response = {};
        try {
            const find1 = await AuthUser.find({ empId: { $regex: "^E" } }, { password: 0, _id: 0, __v: 0 });
            const find2 = await AdminData.find({ emplyId: { $regex: "^E" } }, { emplyId: 1, _id: 0 })
            console.log(find1[0].empId)
            const arr = find2.map((ele) => {
                return ele.emplyId
            })
            //    console.log(arr)
            const find = find1.filter((ele) => {
                let count = 0
                for (let a of arr) {
                    if (ele.empId == a) count += 1
                }
                if (count == 0) return true
            })
            console.log(find)
            const obj = { ...find }
            if (find) {
                response.status = "success";
                response.message = "fetching of all employee data successfull";
                response.body = find
            }
        }
        catch (err) {
            response.status = "failed";
            response.message = "something bad happened"
        }

        res.json(response)
    },

    async GetEmpByDept(req, res) {
        const response = {};
        const currPage = req.query.currPage
        const limit = 5;
        const count = await AdminData.find({ department: req.query.dept }, { _id: 0, __v: 0 }).count()
        const totalPage = Math.ceil(count / limit);
        response.totalPage = totalPage
        if (currPage >= 1 && currPage <= totalPage) {
            const skip = (currPage - 1) * limit
            try {
                const find = await AdminData.find({ department: req.query.dept }, { _id: 0, __v: 0 }).skip(skip).limit(limit)
                console.log({ ...find })
                const obj = { ...find }
                if (find) {
                    response.status = "success";
                    response.message = "fetching of all employee data successfull";
                    response.body = find
                }
            }
            catch (err) {
                response.status = "failed";
                response.message = "something bad happened"
            }
        }
        else {
            response.status = "failed"
            response.message = "Page Range not valid"
        }
        res.json(response)
    },

    async GetEmpByCatgry(req, res) {
        const response = {};
        try {
            let find
            console.log(req.query.category , req.query.location)
            if (req.query.category && req.query.location=="undefined") {
                find = await AdminData.find(
                    {
                        category: {
                            $regex: new RegExp(req.query.category, 'i')
                        }
                    },
                    { _id: 0, __v: 0 })
                    console.log("ok1",find)
            }
            else if (req.query.category && req.query.location) {
                find = await AdminData.find(
                    {
                        $and: [
                            { category: { $regex: new RegExp(req.query.category, 'i') } },
                            { location: { $regex: new RegExp(`^${req.query.location}`, 'i') } }
                        ]
                    },
                    { _id: 0, __v: 0 })
                    console.log("ok2",find)
            }
            // console.log(find)
            const obj = { ...find }
            if (find) {
                response.status = "success";
                response.message = "fetching of all employee data successfull";
                response.body = find
            }
        }
        catch (err) {
            response.status = "failed";
            response.message = "something bad happened"
        }
        res.json(response)
    },



};