const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  try {
    const tags = await Tag.findAll ({
      include: [{ model: Product, through: ProductTag }],
    });
    res.json(tags);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  try {
    const tagId = req.params.id;
    const tag = await Tag.findByPk(tagId, {
      include: [{ model: Product, through: ProductTag }],
    });

    if(!tag) {
      res.status(404).json({ error: 'Tag not found' });
      return;
    }

    res.json(tag);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/', (req, res) => {
  // create a new tag
  try {
    const { tag_name } = req.body;
    const newtag = await Tag.create({ tag_name });
    res.json(newTag);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tagId = req.params.id;
    const { tag_name } = req.body;

    const tag = await Tag.findByPk(tagId);
    if (!tag) {
      res.status(404).json({ error: 'Tag not found' });
      return;
    }

    await tag.update({ tag_name });

    res.json(tag);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagId = req.params.id;
    const tag = await Tag.findbyPk(tagId);
    
    if(!tag) {
      res.status(404).json({ error: 'Tag not found' });
      return;
    }

    await tag.destroy();
    res.json({ message: 'Tag deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
