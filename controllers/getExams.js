let { TYT } = require('../models/TYT'),
    { AYT } = require('../models/AYT'),
    { YDT } = require('../models/YDT');

const getExams = async function (username, chunk, _exam) {
    try {
        let datas = [], exam_len = 0;
        let Model;

        switch (_exam) {
            case 't': Model = TYT; break;
            case 'a': Model = AYT; break;
            case 'y': Model = YDT; break;
            default: return { datas: false, exam_len: 0 };
        }

        const filter = { username: username };

        let page = parseInt(chunk);
        if (isNaN(page) || page < 1) page = 1;

        // Execute countDocuments and find concurrently to reduce database latency
        [exam_len, datas] = await Promise.all([
            Model.countDocuments(filter),
            Model.find(filter)
                .sort({ createdAt: -1 })
                .skip((page - 1) * 10)
                .limit(10)
        ]);

        return { datas, exam_len };
    } catch (err) {
        console.error(err);
        return { datas: false, exam_len: 0 };
    }
}

module.exports = getExams;
