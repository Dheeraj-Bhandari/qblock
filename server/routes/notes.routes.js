const express = require("express")
const controller =  require("../controller/notes.controller")
const route = express.Router();

route.post("/addnotes" ,controller.addNotes)
route.get("/getnotes" ,controller.getNotes)
route.get("/getnote/:id" ,controller.getNotebyid)
route.post("/deletenotes" ,controller.deleteNotes)
route.patch("/updatenotes/:id" ,controller.updateNotes)



module.exports = route;