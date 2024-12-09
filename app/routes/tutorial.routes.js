const express = require("express");
const router = express.Router();
const {
    createTutorial,
    findAllTutorials,
    findTutorialById,
    findAllPublishedTutorials,
    updateTutorial,
    deleteTutorial,
    deleteAllTutorials
} = require("../controllers/tutorial.controller.js");

router.post("/", createTutorial);

router.get("/", findAllTutorials);

router.get("/published", findAllPublishedTutorials);

router.get("/:id", findTutorialById);

router.put("/:id", updateTutorial);

router.delete("/:id", deleteTutorial);

router.delete("/", deleteAllTutorials);

module.exports = router;
