// DEPENDENCIES
const bands = require("express").Router();
const db = require("../models");
const { Band } = db;

bands.get("/", async (req, res) => {
  try {
    const foundBands = await Band.findAll();
    res.status(200).json(foundBands);
  } catch (err) {
    console.log(err);
    res.status(500).send("ERROR GETTING ALL BANDS");
  }
});

bands.get("/:id", async (req, res) => {
  try {
    const foundBand = await Band.findOne({ where: { band_id: req.params.id } });
    res.status(200).json(foundBand);
  } catch (err) {
    console.log(err);
    res.status(500).send("ERROR GETTING ONE BAND");
  }
});

bands.post("/", async (req, res) => {
  try {
    const newBand = await Band.create(req.body);
    res.status(200).json({ message: "Created a new band!", data: newBand });
  } catch (err) {
    console.log(err);
    res.status(500).send("ERROR CREATING A BAND");
  }
});

bands.put("/:id", async (req, res) => {
  try {
    const updatedBands = await Band.update(req.body, {
      where: { band_id: req.params.id },
    });
    res.status(200).json({ message: `Updated ${updatedBands} bands!` });
  } catch (err) {
    console.log(err);
    res.status(500).send("ERROR GETTING ONE BAND");
  }
});

// DELETE A BAND
bands.delete("/:id", async (req, res) => {
  try {
    const deletedBands = await Band.destroy({
      where: {
        band_id: req.params.id,
      },
    });
    res.status(200).json({
      message: `Successfully deleted ${deletedBands} band(s)`,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// EXPORT
module.exports = bands;
