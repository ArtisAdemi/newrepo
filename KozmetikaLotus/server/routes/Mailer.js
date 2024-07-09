const express = require('express');
const router = express.Router();
const mailer = require('../middleware/Mailer')

router.post('/', (req, res) => {
    mailer.sendContactEmail(req.body);
});



module.exports = router;