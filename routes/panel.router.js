let router = require("express").Router(),
    getExams = require("../controllers/getExams"),
    { checkLoggedIn } = require("../controllers/loginHandler");

router.use(checkLoggedIn);
/*
router.get("/", (req, res) => {
    var usr = req.signedCookies["LOGIN_INFO"];
    res.render("panel/panel", { username: usr, page: 'panel' });
});
*/
router.get("/yeni-kayit", (req, res) => {
    res.render("panel/new-exam", { page: "yeni-kayit" });
});

router.get("/tytler/:chunk", async (req, res) => {
    if (!req.isAuthenticated()) return res.redirect("/giris");
    try {
        var chunk = req.params.chunk;
    } catch (e) {
        var chunk = 1;
    }
    var {datas, exam_len} = await getExams(req.user.username, chunk, "t");
    if (datas === false) {
        res.redirect("/panel");
    }
    res.render("panel/exams", {
        _domain: process.env.DOMAIN,
        _link: "ty",
        examName: "Temel Yeterlilik Testleri",
        exams: datas,
        page: "tytler",
        chunk:req.params.chunk,
        next: (exam_len-req.params.chunk*10)>0
    });
});

router.get("/aytler/:chunk", async (req, res) => {
    if (!req.isAuthenticated()) return res.redirect("/giris");
    try {
        var chunk = req.params.chunk;
    } catch (e) {
        var chunk = 1;
    }
    var {datas, exam_len} = await getExams(req.user.username, chunk, "a");
    if (datas === false) {
        res.redirect("/panel");
    }
    res.render("panel/exams", {
        _domain: process.env.DOMAIN,
        _link: "ay",
        examName: "Alan Yeterlilik Testleri",
        exams: datas,
        page: "aytler",
        chunk:req.params.chunk,
        next: (exam_len-req.params.chunk*10)>0
    });
});

router.get("/ydtler/:chunk", async (req, res) => {
    if (!req.isAuthenticated()) return res.redirect("/giris");
    try {
        var chunk = req.params.chunk;
    } catch (e) {
        var chunk = 1;
    }
    var {datas, exam_len} = await getExams(req.user.username, chunk, "y");
    res.render("panel/exams", {
        _domain: process.env.DOMAIN,
        _link: "yd",
        examName: "Yabancı Dil Testleri",
        exams: datas,
        page: "ydtler",
        chunk: req.params.chunk,
        next: (exam_len-req.params.chunk*10)>0
    });
});

router.get("/:exams", (req, res, next) => {
    switch (req.params.exams) {
        case "tytler":
            res.redirect("/panel/tytler/1");
            break;
        case "aytler":
            res.redirect("/panel/aytler/1");
            break;
        case "ydtler":
            res.redirect("/panel/ydtler/1");
            break;
        default:
            next();
            break;
    }
});

module.exports = router;
