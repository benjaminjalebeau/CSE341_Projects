const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;


const getAllRepairOrders= async (req, res) => {
    //#swagger.tags=['RepairOrder']
    const result = await mongodb.getDatabase().db('pianos').collection('repairOrder').find();
    result.toArray((err) => {
        if (err) {
            res.status(400).json({message: err});
        }
    }).then((repairOrder) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(repairOrder);
    });
};

const getRepairOrder = async (req, res) => {
    //#swagger.tags=['RepairOrder']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json("Please enter a valid order id.")
    }
    const orderId =new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db('pianos').collection('repairOrder').find({ _id: orderId });
    result.toArray((err) => {
        if (err) {
            res.status(400).json({message: err});
        }
    }).then((repairOrder) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(repairOrder[0]);
    });

};



const addRepairOrder = async (req, res) => {
    //#swagger.tags=['RepairOrder']
    if (!ObjectId.isValid(req.body.customer_id)) {
        res.status(400).json("Please enter a valid customer id.")
    }
    const repairOrder = {
        customer_id: req.body.customer_id,
        quote_cost: req.body.quote_cost,
        actual_cost: req.body.actual_cost,
        repair_description: req.body.repair_description,
        completed: req.body.completed
    };
    console.log(repairOrder);
    const response = await mongodb.getDatabase().db('pianos').collection('repairOrder').insertOne(repairOrder);
    if (response.acknowledged) {
        res.status(204).send();

    } else {
        res.status(500).json(response.error || 'Something happened while adding the order');
    }
};

const updateRepairOrder = async (req, res) => {
    //#swagger.tags=['RepairOrder']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json("Please enter a valid order id.")
    }
    if (!ObjectId.isValid(req.body.customer_id)) {
        res.status(400).json("Please enter a valid customer id.")
    }
    const orderId = new ObjectId(req.params.id);
    const repairOrder = {
        customer_id: req.body.customer_id,
        quote_cost: req.body.quote_cost,
        actual_cost: req.body.actual_cost,
        repair_description: req.body.repair_description,
        completed: req.body.completed
    };
    const response = await mongodb.getDatabase().db('pianos').collection('repairOrder').replaceOne({ _id: orderId }, repairOrder);
    if (response.modifiedCount > 0) {
        res.status(204).send();

    } else {
        res.status(500).json(response.error || 'Something happened while updating the order');
    }
};

const deleteRepairOrder = async (req, res) => {
    //#swagger.tags=['RepairOrder']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json("Please enter a valid order id.")
    }
    const orderId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db('pianos').collection('repairOrder').deleteOne({ _id: orderId });
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Something happened while deleting the order');
    }
};


module.exports = {
    getRepairOrder,
    getAllRepairOrders,
    addRepairOrder,
    updateRepairOrder,
    deleteRepairOrder
}
