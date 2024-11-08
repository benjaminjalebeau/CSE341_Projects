const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getSingle = async (req, res) => {
    const userId = ObjectId.createFromHexString(req.params.id);
    const result = await mongodb.getDatabase().db('project1').collection('users').find({ _id: userId });
    result.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users[0]);
    });

};

const getAll= async (req, res) => {
    const result = await mongodb.getDatabase().db('project1').collection('users').find();
    result.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users);
    });
};

module.exports = {
    getSingle,
    getAll
}

