const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  const response = await Category.findAll({ include: Product });
  res.json(response);
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  const response = await Category.findOne({ where: { id: req.params.id }, include: Product });
  res.json(response);
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    await Category.create(req.body);
    res.json('OK');
  } catch (err) {
    console.log('Error while creating Category: ', err);
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    await Category.update(req.body, { where: { id: req.params.id } });
    res.json('OK');
  } catch (err) {
    console.log('Error while updating Category: ', err);
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  await Category.destroy({ where: { id: req.params.id } });
  res.json('OK');
});

module.exports = router;
