const State = require("../models/State");
const statesData = require("../states.json");

const getAllStates = async (req, res) => {
    try {
        const funFactsData = await State.find({});
        const funFactsMap = new Map(
            funFactsData.map((state) => [state.stateCode, state.funfacts])
        );

        const statesWithFunFacts = statesData.map((state) => {
            if (funFactsMap.get(state.code) !== undefined) {
                return {
                    ...state,
                    funfacts: funFactsMap.get(state.code),
                };
            } else {
                return { ...state };
            }
        });

        res.json(statesWithFunFacts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getStateData = async (req, res) => {

    const { stateData } = req;

    try {
        const stateFunFacts = await State.findOne({
            stateCode: stateData.code,
        }).exec();

        if (stateFunFacts !== null) {
            return res.json({
                ...stateData,
                funfacts: stateFunFacts.funfacts,
            });
        } else {
            return res.json({ ...stateData });
        }
    } catch (error) {
        res.status(500).json({ error: "Error fetching state information" });
    }
};

const getStatesByContiguity = async (req, res) => {

    const { contig } = req.query;

    try {
      
        const isContiguous = contig === "true";

        const filteredStates = statesData.filter((state) => {
            const nonContiguous = ["AK", "HI"];

            
            return isContiguous
                ? !nonContiguous.includes(state.code)
                : nonContiguous.includes(state.code);
        });

        res.json(filteredStates);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getStateCapital = (req, res) => {
    const stateCode = req.params.state.toUpperCase();
    const stateData = statesData.find((state) => state.code === stateCode);

    if (stateData) {
        res.json({ state: stateData.state, capital: stateData.capital_city });
    } else {
        res.status(404).json({ error: "State not found" });
    }
};

const getStateNickname = (req, res) => {
    const { stateData } = req;
    return res.json({ state: stateData.state, nickname: stateData.nickname });
};

const getStatePopulation = (req, res) => {
    const { stateData } = req;

    return res.json({
        state: stateData.state,
        population: stateData.population.toLocaleString("en-US"),
    });
};

const getStateAdmissionDate = (req, res) => {
    const { stateData } = req;

    return res.json({
        state: stateData.state,
        admitted: stateData.admission_date,
    });
};

const getRandomFunFact = async (req, res) => {
    const { stateData } = req;

    try {
        const state = await State.findOne({ stateCode: stateData.code });

        if (!state || !state.funfacts || state.funfacts.length === 0) {
            return res
                .status(404)
                .json({ message: `No Fun Facts found for ${stateData.state}` });
        }

        
        const randomIndex = Math.floor(Math.random() * state.funfacts.length);

        const funfact = state.funfacts[randomIndex];

        res.json({ funfact });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const addFunFacts = async (req, res) => {
    const stateCode = req.stateData.code;
    const newFunFacts = req.body?.funfacts;

    if (typeof newFunFacts === "undefined") {
        return res
            .status(400)
            .json({ message: "State fun facts value required" });
    } else if (!Array.isArray(newFunFacts)) {
        return res
            .status(400)
            .json({ message: "State fun facts value must be an array" });
    }

    try {
       
        const state = await State.findOneAndUpdate(
            { stateCode },
            { $push: { funfacts: { $each: newFunFacts } } },
            { new: true, upsert: true } 
        );

        
        newFunFacts.length === 0
            ? res.status(200).json(state)
            : res.status(201).json(state);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateFunFact = async (req, res) => {
    const { index, funfact } = req.body;
    const stateCode = req.stateData.code;
    if (index === undefined) {
        return res
            .status(400)
            .json({ message: "State fun fact index value required" });
    } else if (isNaN(index) || index < 1) {
        return res.status(400).json({
            message: `No Fun Fact found at that index for ${req.stateData.state}`,
        });
    }

    let funfactStr = funfact;
    if (typeof funfact === "boolean" || typeof funfact === "number") {
        funfactStr = funfact.toString();
    }

    if (funfactStr == null || funfactStr === "") {
        return res
            .status(400)
            .json({ message: "State fun fact value required" });
    }

    try {
        const arrayIndex = index - 1;
        const state = await State.findOne({ stateCode: stateCode });
        if (!state || state.funfacts.length === 0) {
            return res.status(404).json({
                message: `No Fun Facts found for ${req.stateData.state}`,
            });
        }

        if (arrayIndex >= state.funfacts.length || arrayIndex < 0) {
            return res.status(400).json({
                message: `No Fun Fact found at that index for ${req.stateData.state}`,
            });
        }
        state.funfacts[arrayIndex] = funfact;
        await state.save();

        res.status(200).json(state);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteFunFact = async (req, res) => {
    const { index } = req.body;
    const stateCode = req.stateData.code;

    if (index === undefined) {
        return res
            .status(400)
            .json({ message: "State fun fact index value required" });
    } else if (isNaN(index) || index < 1) {
        return res.status(400).json({
            message: `No Fun Fact found at that index for ${req.stateData.state}`,
        });
    }

    try {
        
        const arrayIndex = index - 1;
        const state = await State.findOne({ stateCode: stateCode });
        if (!state || state.funfacts.length === 0) {
            return res.status(404).json({
                message: `No Fun Facts found for ${req.stateData.state}`,
            });
        }
        if (arrayIndex >= state.funfacts.length || arrayIndex < 0) {
            return res.status(400).json({
                message: `No Fun Fact found at that index for ${req.stateData.state}`,
            });
        }
        state.funfacts.splice(arrayIndex, 1);
        await state.save();

        res.status(200).json(state);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllStates,
    getStateData,
    getStatesByContiguity,
    getStateCapital,
    getStateNickname,
    getStatePopulation,
    getStateAdmissionDate,
    getRandomFunFact,
    addFunFacts,
    updateFunFact,
    deleteFunFact,
};
