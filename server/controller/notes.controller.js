const Notes = require("../model/notes.model");

// ----Function To Add Notes into Database---
exports.addNotes = async (req, res) => {
  const { title, content } = req.body;

  try {
    const addNotes = await Notes.create({
      title,
      content,
    });

    await addNotes.save();
    res.status(200).json(addNotes);
  } catch (error) {
    res.status(500).json(error);
  }
};

// ----Function To Get All Notes from Database---
exports.getNotes = async (req, res) => {
  try {
    const notes = await Notes.find();
    if (notes.length == 0) {
      res.status(500).json({
        err: "Notes Not Found",
      });
    }

    res.status(200).json({
      data: notes,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

// ----Function To Get by id Notes from Database---
exports.getNotebyid = async (req, res) => {
  try {
    let { id } = req.params;
    const notes = await Notes.findById(id);
    if (!notes) {
      res.status(500).json({
        err: "Notes Not Found",
      });
    }

    res.status(200).json({
      data: notes,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

// ----Function To Delete Notes from Database---
exports.deleteNotes = async (req, res) => {
  let { id } = req.body;
  try {
    let data = await Notes.findByIdAndDelete({ _id: id });

    res.status(200).json({
      data: "Notes Deleted Succesfully",
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

// ----Function To Update Notes into Database---
exports.updateNotes = async (req, res) => {
  let { title, content } = req.body;
  console.log(req.body);
  console.log(req.params);

  try {
    const notes = await Notes.findByIdAndUpdate(req.params.id, {
      title,
      content,
    });
    console.log("sdfsdfsdfsdf ", notes);
    if (notes) {
      res.status(200).json(notes);
    } else {
      res.status(500).json({ err: "Notes not found" });
    }
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};
