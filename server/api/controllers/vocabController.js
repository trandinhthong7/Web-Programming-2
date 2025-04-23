const mongoose = require('mongoose');
const Vocab = mongoose.model('Vocab');

// List all words
exports.list_all_words = async (req, res) => {
    try {
        const words = await Vocab.find({});
        res.json(words);
    } catch (err) {
        res.status(500).send(err);
    }
};

// Create a word
exports.create_a_word = async (req, res) => {
    try {
        const newWord = new Vocab(req.body);
        const word = await newWord.save();
        res.json(word);
    } catch (err) {
        res.status(500).send(err);
    }
};

// Read a word
exports.read_a_word = async (req, res) => {
    try {
        const word = await Vocab.findById(req.params.wordId);
        if (!word) {
            return res.status(404).send({ message: 'Word not found' });
        }
        res.json(word);
    } catch (err) {
        res.status(500).send(err);
    }
};

// Update a word
exports.update_a_word = async (req, res) => {
    try {
        const word = await Vocab.findOneAndUpdate(
            { _id: req.params.wordId },
            req.body,
            { new: true }
        );
        if (!word) {
            return res.status(404).send({ message: 'Word not found' });
        }
        res.json(word);
    } catch (err) {
        res.status(500).send(err);
    }
};

// Delete a word
exports.delete_a_word = async (req, res) => {
    try {
        const result = await Vocab.deleteOne({ _id: req.params.wordId });
        if (result.deletedCount === 0) {
            return res.status(404).send({ message: 'Word not found' });
        }
        res.json({ message: 'Word successfully deleted', _id: req.params.wordId });
    } catch (err) {
        res.status(500).send(err);
    }
};