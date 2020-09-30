const express = require('express');
const router = express.Router();
const validUrl = require('valid-url');
const shortid = require('shortid');
const config = require('./config/keys');
const Url = require('./models/Url');

router.get('/:code', async (req, res) => {
  const { urlCode } = req.params;

  try {
    const url = await Url.findOne({ urlCode });
    if (url) {
      return res.redirect(url.longUrl);
    } else {
      return res.status(404).json('Url not found');
    }
  } catch (err) {
    console.error({ err });
    return res.status(500).json('Server error');
  }
});

router.post('/short', async (req, res) => {
  const { longUrl } = req.body;
  const baseUrl = config.get('baseUrl');

  if (!validUrl.isUri(baseUrl)) return res.status(401).json('Base url invalid');

  const urlCode = shortid.generate();
  if (validUrl.isUri(longUrl)) {
    try {
      let url = await Url.findOne({ longUrl });
      if (url) return res.json(url);

      const shortUrl = baseUrl + '/' + urlCode;
      url = new Url({
        longUrl,
        shortUrl,
        urlCode,
        date: new Date()
      });
      await url.save();
      return res.json(url);
      
    } catch (err) {
      console.error({ err });
      return res.status(500).json('Server error');
    }
  } else {
    return res.status(401).json('Long url invalid');
  }
});

module.exports = router;
