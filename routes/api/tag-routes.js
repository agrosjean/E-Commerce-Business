const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Products
  const response = await Tag.findAll({ include: Product });
  res.json(response);
});

router.get('/:id', async (req, res) => {
  // find one tag by its `id` value
  // be sure to include its associated Products
  const response = await Tag.findOne({ where: { id: req.params.id }, include: Product });
  res.json(response);
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    await Tag.create(req.body);
    res.json('OK');
  } catch (err) {
    console.log('Error while creating Tag: ', err);
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag by its `id` value
  try {
    await Tag.update(req.body, { where: { id: req.params.id } });
    res.json('OK');
  } catch (err) {
    console.log('Error while updating Tag: ', err);
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a tag by its `id` value
  await Tag.destroy({ where: { id: req.params.id } });
  res.json('OK');
});

module.exports = router;
