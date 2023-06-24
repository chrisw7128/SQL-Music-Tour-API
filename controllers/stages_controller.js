// DEPENDENCIES
const stages = require("express").Router();
const db = require("../models");
const { Stage } = db;

stages.get("/", async (req, res) => {
  try {
    const foundStages = await Stage.findAll();
    res.status(200).json(foundStages);
  } catch (err) {
    console.log(err);
    res.status(500).send("ERROR GETTING ALL STAGES");
  }
});

stages.get("/:id", async (req, res) => {
  try {
    const foundStage = await Stage.findOne({
      where: { stage_id: req.params.id },
    });
    res.status(200).json(foundStage);
  } catch (err) {
    console.log(err);
    res.status(500).send("ERROR GETTING ONE STAGE");
  }
});

stages.post("/", async (req, res) => {
  try {
    const newStage = await Stage.create(req.body);
    res.status(200).json({ message: "Created a new stage!", data: newStage });
  } catch (err) {
    console.log(err);
    res.status(500).send("ERROR CREATING A STAGE");
  }
});

stages.put("/:id", async (req, res) => {
  try {
    const updatedStages = await Stage.update(req.body, {
      where: { stage_id: req.params.id },
    });
    res.status(200).json({ message: `Updated ${updatedStages} stages!` });
  } catch (err) {
    console.log(err);
    res.status(500).send("ERROR GETTING ONE STAGE");
  }
});

// DELETE A STAGE
stages.delete("/:id", async (req, res) => {
  try {
    const deletedStages = await Stage.destroy({
      where: {
        stage_id: req.params.id,
      },
    });
    res.status(200).json({
      message: `Successfully deleted ${deletedStages} stage(s)`,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// EXPORT
module.exports = stages;
