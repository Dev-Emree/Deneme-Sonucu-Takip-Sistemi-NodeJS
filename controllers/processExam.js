let User = require("../models/User"),
    { TYT } = require("../models/TYT"),
    { AYT } = require("../models/AYT"),
    { YDT } = require("../models/YDT");

var calculateTotal = function (data) {
    var dogru = 0,
        yanlis = 0;

    for (var key in data) {
        if (key == "examName") continue;
        dogru += parseInt(data[key]["dogru"]);
        yanlis += parseInt(data[key]["yanlis"]);
    }

    data.Total = { dogru: dogru, yanlis: yanlis };

    return data;
};

const saveExam = async function (data, user_id, exam_name) {
    let exam;
    switch (exam_name) {
        case "TYT":
            exam = new TYT(data);
            break;
        case "AYT":
            exam = AYT(data);
            break;
        default:
            return false;
    }

    var exam_id = exam._id;

    // OPTIMIZATION: Use findById with projection and .lean() to avoid loading massive arrays into memory
    var user = await User.findById(user_id, 'username').lean();

    if (user === null) return false;

    exam.username = user.username;

    try {
        await exam.save();
    } catch (e) {
        console.log(e);
        return false;
    }

    // OPTIMIZATION: Use updateOne with $push to avoid full document save() roundtrip
    let updateField = exam_name === "TYT" ? "tyts" : "ayts";
    try {
        await User.updateOne({ _id: user_id }, { $push: { [updateField]: exam_id } });
    } catch (e) {
        console.log(e);
        return false;
    }

    return true;
};

const saveYDT = async function (data, user_id) {
    var _data = {
        lang: data.language,
        Total: {
            dogru: data.dogru,
            yanlis: data.yanlis,
            net: data.net,
        },
        examName: data.examName,
    };
    var exam = YDT(_data);

    var exam_id = exam._id;

    // OPTIMIZATION: Use findById with projection and .lean() to avoid loading massive arrays into memory
    var user = await User.findById(user_id, 'username').lean();
    if (!user) return false;

    exam.username = user.username;

    try {
        await exam.save();
    } catch (e) {
        console.log(e);
        return false;
    }

    // OPTIMIZATION: Use updateOne with $push to avoid full document save() roundtrip
    try {
        await User.updateOne({ _id: user_id }, { $push: { ydts: exam_id } });
    } catch (e) {
        console.log(e);
        return false;
    }

    return true;
};

module.exports = {
    processExam: saveExam,
    processYDT: saveYDT,
};
