const { User } = require('../models/');

const userController = {
    // get all users
    getAllUsers(req, res) {
        User.find({})
          .populate({
            path: 'thoughts',
            select: '-__v'
          })
          .select('-__v')
          .sort({ _id: -1 })
          .then(dbUserData => res.json(dbUserData))
          .catch(err => res.status(400).json({ message: 'No data found' }));
    },

    // get one user by id
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
          .populate({
            path: 'thoughts',
            select: '-__v'
          })
          .select('-__v')
          .then(dbUserData => res.json(dbUserData))
          .catch(err => {
            console.log(err);
            res.sendStatus(400);
          });
    },

    // create user
    createUser({ body }, res) {
        User.create(body)
          .then(dbUserData => res.json(dbUserData))
          .catch(err => res.json(err));
    },

    // update user by id
    updateUser({ params, body }, res) {
      console.log(params.id);
      console.log(body);
      User.findOneAndUpdate(
        { _id: params.id },
        { body },
        { new: true, runValidators: true }
      )
        .then(dbUserData => {
          if(!dbUserData) {
            res.status(404).json({ message: 'No user found with that id' });
            return;
          }
          res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },

    // delete user by id
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
          .then(dbUserData => res.json(dbUserData))
          .catch(err => res.json(err));
    }
};

module.exports = userController;