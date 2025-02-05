const Tutorial = require("../models/tutorial.model.js");

// Create and Save a new Tutorial
const createTutorial = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Tutorial
  const tutorial = new Tutorial({
    title: req.body.title,
    description: req.body.description,
    published: req.body.published || false
  });

  // Save Tutorial in the database
  Tutorial.create(tutorial, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Tutorial."
      });
    } else {
      res.send(data);
    }
  });
};

// Retrieve all Tutorials from the database (with or without condition)
const findAllTutorials = (req, res) => {
  const title = req.query.title;

  Tutorial.getAll(title, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving tutorials."
      });
    } else {
      res.send(data);
    }
  });
};

// Find a single Tutorial by id
const findTutorialById = (req, res) => {
  Tutorial.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Tutorial with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Tutorial with id " + req.params.id
        });
      }
    } else {
      res.send(data);
    }
  });
};

// Find all published Tutorials
const findAllPublishedTutorials = (req, res) => {
  Tutorial.getAllPublished((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving tutorials."
      });
    } else {
      res.send(data);
    }
  });
};

// Update a Tutorial identified by the id in the request
const updateTutorial = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  Tutorial.updateById(req.params.id, new Tutorial(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Tutorial with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error updating Tutorial with id " + req.params.id
        });
      }
    } else {
      res.send(data);
    }
  });
};

// Delete a Tutorial by id
const deleteTutorial = (req, res) => {
  Tutorial.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Tutorial with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Tutorial with id " + req.params.id
        });
      }
    } else {
      res.send({ message: `Tutorial was deleted successfully!` });
    }
  });
};

// Delete all Tutorials from the database
const deleteAllTutorials = (req, res) => {
  Tutorial.removeAll((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all tutorials."
      });
    } else {
      res.send({ message: `All Tutorials were deleted successfully!` });
    }
  });
};

module.exports = {
  createTutorial,
  findAllTutorials,
  findTutorialById,
  findAllPublishedTutorials,
  updateTutorial,
  deleteTutorial,
  deleteAllTutorials
};
