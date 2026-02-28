let router = require('express').Router(),
    { processExam, processYDT } = require('../controllers/processExam'),
    { setPublic } = require('../controllers/examPublic');

//TYT
router.post('/new-tyt', async (req, res) => {
    if (!req.session || !req.session.passport || req.session.passport.user === undefined) return res.send({ saved: false });
    if (typeof req.body.examName !== 'string' || req.body.examName.length > 16) return res.send({ saved: false });
    var ok = await processExam(
        {
            Turkce: req.body.tr,
            Sosyal: req.body.sos,
            Matematik: req.body.mat,
            Fen: req.body.fen,
            Total: req.body.total,
            examName: req.body.examName,
        },
        req.session.passport.user,
        'TYT'
    );
    if (ok) {
        res.send({ saved: true });
        return;
    }
    res.send({ saved: false });
});

//AYT
router.post('/new-ayt', async (req, res) => {
    if (!req.session || !req.session.passport || req.session.passport.user === undefined) return res.send({ saved: false });
    if (typeof req.body.examName !== 'string' || req.body.examName.length > 16) return res.send({ saved: false });
    var ok = await processExam(
        {
            Turkce: req.body.tr,
            Sosyal: req.body.sos,
            Matematik: req.body.mat,
            Fen: req.body.fen,
            MF_Total: req.body.mf,
            TM_Total: req.body.tm,
            TS_Total: req.body.ts,
            examName: req.body.examName
        },
        req.session.passport.user,
        'AYT'
    );
    if (ok) {
        res.send({ saved: true });
        return;
    }
    res.send({ saved: false });
});

//YDT
router.post('/new-ydt', async (req, res) => {
    if (!req.session || !req.session.passport || req.session.passport.user === undefined) return res.send({ saved: false });
    if (typeof req.body.examName !== 'string' || req.body.examName.length > 16) return res.send({ saved: false });
    var ok = await processYDT(
        req.body,
        req.session.passport.user
    );
    if (ok) {
        res.send({ saved: true });
        return;
    }
    res.send({ saved: false });
});

router.post('/exam-public', async (req, res) => {
    if (!req.session || !req.session.passport || req.session.passport.user === undefined) return res.redirect('/giris');
    if (typeof req.body.examId !== 'string' || typeof req.body.examName !== 'string') return res.sendStatus(400);
    var isPublic = await setPublic(req.body.examId, req.body.examName, req.session.passport.user);
    
    if (isPublic === 'Unauthorized') return res.sendStatus(403);

    if (typeof isPublic == 'boolean') {
        res.send({public:isPublic});
    } else {
        res.sendStatus(500);
    }
});

module.exports = router;