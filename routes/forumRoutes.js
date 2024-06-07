const express = require('express');
const router = express.Router();
const Forum = require('../models/Forum'); // Forum model defined later

router.get('/topics', async (req, res) => {
  const topics = await Forum.find();
  res.json(topics);
});

router.post('/topics', async (req, res) => {
  const topic = new Forum(req.body);
  await topic.save();
  res.status(201).json(topic);
});

router.get('/topics/:id', async (req, res) => {
  const topic = await Forum.findById(req.params.id);
  res.json(topic);
});

router.post('/topics/:id/posts', async (req, res) => {
  const topic = await Forum.findById(req.params.id);
  topic.posts.push(req.body);
  await topic.save();
  res.status(201).json(topic);
});

module.exports = router;
