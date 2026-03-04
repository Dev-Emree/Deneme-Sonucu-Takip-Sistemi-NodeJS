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

    // ⚡ Bolt: Fetch only the required username field instead of the full document
    var user = await User.findById(user_id, 'username').lean();

    if (user === null) return false;

    exam.username = user.username;

    try {
        await exam.save();
    } catch (e) {
        console.log(e);
        return false;
    }

    let updateQuery;
    switch (exam_name) {
        case "TYT":
            updateQuery = { $push: { tyts: exam_id } };
            break;
        case "AYT":
            updateQuery = { $push: { ayts: exam_id } };
            break;
    }

    if (updateQuery) {
        try {
            // ⚡ Bolt: Use atomic $push update instead of re-saving the entire user document
            await User.updateOne({ _id: user_id }, updateQuery);
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

    // ⚡ Bolt: Fetch only the required username field instead of the full document
    var user = await User.findById(user_id, 'username').lean();

    exam.username = user.username;

    try {
        await exam.save();
    } catch (e) {
        console.log(e);
        return false;
    }

    try {
        // ⚡ Bolt: Use atomic $push update instead of re-saving the entire user document
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
