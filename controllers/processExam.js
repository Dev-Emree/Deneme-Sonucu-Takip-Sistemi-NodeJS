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
    switch (exam_name) {
        case "TYT":
            var exam = new TYT(data);
            break;
        case "AYT":
            var exam = AYT(data);
            break;
        default:
            return false;
    }

    var exam_id = await exam._id;

    // ⚡ Bolt: Use .lean() and projection to prevent loading large arrays (tyts, ayts, ydts) into memory
    var user = await User.findById(user_id, 'username').lean();

    if (user === null) return false;

    exam.username = user.username;

    try {
        await exam.save();
    } catch (e) {
        console.log(e);
        return false;
    }

    var arrayName = "";
    switch (exam_name) {
        case "TYT":
            arrayName = "tyts";
            break;
        case "AYT":
            arrayName = "ayts";
            break;
    }

    if (arrayName !== "") {
        try {
            // ⚡ Bolt: Use atomic $push update instead of full document .save() to prevent memory bloat
            await User.updateOne({ _id: user_id }, { $push: { [arrayName]: exam_id } });
        } catch (e) {
            console.log(e);
            return false;
        }
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

    var exam_id = await exam._id;

    // ⚡ Bolt: Use .lean() and projection to prevent loading large arrays (tyts, ayts, ydts) into memory
    var user = await User.findById(user_id, 'username').lean();

    if (user === null) return false;

    exam.username = user.username;

    try {
        await exam.save();
    } catch (e) {
        console.log(e);
        return false;
    }

    try {
        // ⚡ Bolt: Use atomic $push update instead of full document .save() to prevent memory bloat
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
