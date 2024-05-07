const express = require("express");
const router = express.Router();
const checkState = require("../middleware/checkState"); // Middleware for state validation
const statesController = require("../controllers/statesController"); // Controller for state operations
const path = require("path");

// GET METHODS

// Route to get all states or states by contiguity if specified
router.get("/", (req, res) => {
    if (req.query.contig) {
        return statesController.getStatesByContiguity(req, res);
    }
    statesController.getAllStates(req, res);
});

// Route to get data of a specific state
router.get("/:state", checkState, statesController.getStateData);

// Route to get the capital of a specific state
router.get("/:state/capital", checkState, statesController.getStateCapital);

// Route to get the nickname of a specific state
router.get("/:state/nickname", checkState, statesController.getStateNickname);

// Route to get the population of a specific state
router.get("/:state/population", checkState, statesController.getStatePopulation);

// Route to get the admission date of a specific state
router.get("/:state/admission", checkState, statesController.getStateAdmissionDate);

// Route to get a random fun fact about a specific state
router.get("/:state/funfact", checkState, statesController.getRandomFunFact);

// POST METHODS

// Route to add a fun fact about a specific state
router.post("/:state/funfact", checkState, statesController.addFunFacts);

// PATCH METHODS

// Route to update a fun fact about a specific state
router.patch("/:state/funfact", checkState, statesController.updateFunFact);

// DELETE METHODS

// Route to delete a fun fact about a specific state
router.delete("/:state/funfact", checkState, statesController.deleteFunFact);

// CATCH-ALL METHOD

// Route to handle all other requests and return a 404 page
router.all("*", (req, res) => {
    res.status(404).sendFile(path.join(__dirname, "../public", "404.html"));
});

module.exports = router;