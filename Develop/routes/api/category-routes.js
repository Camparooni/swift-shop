const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const allCategories = await Category.findAll({
      include: [{ model: Product }],
    });
    res.json(allCategories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not load categories' });
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryId = req.params.id;
    const category = await Category.findByPk(categoryId, {
      include: [{ model: Product }],
    });

    if(!category) {
      res.status(404).json({ error: 'Category not found '});
      return;
    }

    res.json(category);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const { name } = req.body;
    const newCategory = await Category.create ({ name });
    res.json(newCategory);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'unable to create category' });
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const categoryId = req.params.id;
    const { name } = req.body;

    const category = await Category.findByPk(categoryId);
    if (!category) {
      res.status(404).json({ error: 'Category not found' });
      return;
    }

    await category.update({ name });

    res.json(category);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Unable to update category' });
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryId = req.params.id;
    const category = await Category.findByPk(categoryId);

    if(!category) {
      res.status(404).json({ error: 'Category not found' });
      return;
    }

    await category.destroy();
    res.json({ message: 'Category deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Unable to delete category' });
  }
});

module.exports = router;
