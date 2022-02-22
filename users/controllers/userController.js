const db = require("../models");
// const bcrypt = require("bcrypt");

const User = db.users;

// for user registration
const addUser = async (req, res) => {
  // req.body.password = bcrypt.hashSync(req.body.password, 10);
  let info = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    phone_number: req.body.phone_number,
    password: req.body.password,
  };

  const user = await User.create(info)
    .then((user) => {
      res.status(200).json(user.id);
    })
    .catch((error) => {
      res.status(500).json({ message: "Failed to Register !" });
    });
};


// get all users data
const getAllUsers = async (req, res) => {
  let users = await User.findAll({
    attributes: ["id", "first_name", "last_name", "email", "phone_number"],
  })
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => {
      req.status(500).json({ message: "Unable to Retrive Users" });
    });
};


// get single user data by id
const getSingleUser = async (req, res) => {
  let id = req.params.id;
  let user = await User.findOne({
    attributes: ["id", "first_name", "last_name", "email", "phone_number"],
    where: { id: id },
  })
    .then((user) => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "Record not Found !" });
      }
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};


// update user by id
const updateUser = async (req, res) => {
  let id = req.params.id;
  let changes = req.body;
  const user = await User.update(changes, {
    attributes: ["id", "first_name", "last_name", "email", "phone_number"],
    where: { id: id },
  })
    .then((user) => {
      if (user) {
        res.status(200).json(user);
        console.log("userrr", user);
      } else {
        res.status(404).json({ message: "Record not Found !" });
      }
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};


// delete user by id
const deleteUser = async (req, res) => {
  let id = req.params.id;
  const user = await User.destroy({ where: { id: id } })
    .then((user) => {
      if (user) {
        res.status(200).json("Successfully Deleted !");
      } else {
        res.status(404).json({ message: "Record not Found !" });
      }
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

module.exports = {
  addUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
