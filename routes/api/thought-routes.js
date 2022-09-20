const router = require('express').Router();

const {
    getThoughts,
    addThought,
    addReaction,
    removeThought,
    removeReaction
} = require('../../controllers/thought-controller');

// /api/thoughts/
router.route('/').get(getThoughts);

// /api/thoughts/<thoughtId>
router.route('/:userId').post(addThought);

// /api/thoughts/<userId>/<thoughtId>
router
    .route('/:userId/:thoughtId')
    .put(addReaction)
    .delete(removeThought);

// /api/thoughts/<userId>/<thoughtId>/<reactionId>
router.route('/:userId/:thoughtId/:reactionId').delete(removeReaction);

module.exports = router;