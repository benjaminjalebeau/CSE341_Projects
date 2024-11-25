const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;


const getAllCustomers= async (req, res) => {
    //#swagger.tags=['Customers']
    const result = await mongodb.getDatabase().db('pianos').collection('customers').find();
    result.toArray((err) => {
        if (err) {
            res.status(400).json({message: err});
        }
    }).then((customers) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(customers);
    });
};

const getCustomer = async (req, res) => {
    //#swagger.tags=['Customers']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json("Please enter a valid customer id.")
    }
    const customerId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db('pianos').collection('customers').find({ _id: customerId });
    result.toArray((err) => {
        if (err) {
            res.status(400).json({message: err});
        }
    }).then((customers) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(customers[0]);
    });

};



const addCustomer = async (req, res) => {
    //#swagger.tags=['Customers']
    const customer = {
        fName: req.body.fName,
        lName: req.body.lName,
        address: req.body.address,
        city: req.body.city,
        pianoModel: req.body.pianoModel,
        lastAppointment: req.body.lastAppointment,
        nextAppointment: req.body.nextAppointment
    };
    console.log(customer);
    const response = await mongodb.getDatabase().db('pianos').collection('customers').insertOne(customer);
    if (response.acknowledged) {
        res.status(204).send();

    } else {
        res.status(500).json(response.error || 'Something happened while adding the customer');
    }
};

const updateCustomer = async (req, res) => {
    //#swagger.tags=['Customers']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json("Please enter a valid customer id.")
    }
    const customerId = new ObjectId(req.params.id);
    const customer = {
        fName: req.body.fName,
        lName: req.body.lName,
        address: req.body.address,
        city: req.body.city,
        pianoModel: req.body.pianoModel,
        lastAppointment: req.body.lastAppointment,
        nextAppointment: req.body.nextAppointment
    };
    const response = await mongodb.getDatabase().db('pianos').collection('customers').replaceOne({ _id: customerId }, customer);
    if (response.modifiedCount > 0) {
        res.status(204).send();

    } else {
        res.status(500).json(response.error || 'Something happened while updating the customer');
    }
};

const deleteCustomer = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json("Please enter a valid customer id.")
    }
    //#swagger.tags=['Customers']
    const customerId =new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db('pianos').collection('customers').deleteOne({ _id: customerId });
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Something happened while deleting the customer');
    }
};


module.exports = {
    getCustomer,
    getAllCustomers,
    addCustomer,
    updateCustomer,
    deleteCustomer
}

