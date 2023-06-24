// DEPENDENCIES
const events = require("express").Router();
const db = require("../models");
const { event } = db;

events.get("/", async (req, res) => {
  try {
    const foundEvents = await event.findAll();
    res.status(200).json(foundEvents);
  } catch (err) {
    console.log(err);
    res.status(500).send("ERROR GETTING ALL EVENTS");
  }
});

events.get("/:name", async (req, res) => {
  try {
    const foundEvent = await Event.findOne({
      where: { name: req.params.name },
      include: [
        {
          model: MeetGreet,
          as: "meet_greets",
          include: {
            model: Band,
            as: "band",
          },
        },
        {
          model: SetTime,
          as: "set_times",
          include: [
            {
              model: Band,
              as: "band",
            },
            {
              model: Stage,
              as: "stage",
            },
          ],
        },
        {
          model: Stage,
          as: "stages",
          through: { attributes: [] },
        },
      ],
    });
    res.status(200).json(foundEvent);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

events.post("/", async (req, res) => {
  try {
    const newEvent = await event.create(req.body);
    res.status(200).json({ message: "Created a new event!", data: newevent });
  } catch (err) {
    console.log(err);
    res.status(500).send("ERROR CREATING A EVENT");
  }
});

events.put("/:id", async (req, res) => {
  try {
    const updatedEvents = await Event.update(req.body, {
      where: { event_id: req.params.id },
    });
    res.status(200).json({ message: `Updated ${updatedEvents} events!` });
  } catch (err) {
    console.log(err);
    res.status(500).send("ERROR GETTING ONE EVENT");
  }
});

// DELETE AN EVENT
events.delete("/:id", async (req, res) => {
  try {
    const deletedEvents = await Event.destroy({
      where: {
        event_id: req.params.id,
      },
    });
    res.status(200).json({
      message: `Successfully deleted ${deletedEvents} event(s)`,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// EXPORT
module.exports = events;
