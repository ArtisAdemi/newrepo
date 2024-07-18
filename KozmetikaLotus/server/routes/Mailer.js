const express = require('express');
const router = express.Router();
const mailer = require('../middleware/Mailer')

router.post('/', (req, res) => {
    try {
        mailer.sendContactEmail(req.body);
    }
     catch (err) {
        console.log(err);
     }
});



module.exports = router;