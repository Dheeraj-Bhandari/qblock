import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Modal,
  TextField,
  Card,
  Box,
  Typography,
} from "@mui/material";
import { getNotes, updatenotes, delNotes, getNote, addNotes } from "../api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CampaignIcon from '@mui/icons-material/Campaign';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useSpeechSynthesis } from 'react-speech-kit';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Notes = () => {
  // State for Storing Notes Data
  let [notes, setNotes] = useState([]);
  // State for First Model
  const [open, setOpen] = useState(false);
  // State for Second Model
  const [open2, setOpen2] = useState(false);
  // State for Third Model
  const [open3, setOpen3] = useState(false);

  // State for Storing Title and Content of Notes
  let [title, setTitle] = useState("");
  let [content, setContent] = useState("");

  // State for Storing Title and Content of New Notes
  let [newtitle, newsetTitle] = useState("");
  let [newcontent, newsetContent] = useState("");

  // State for Storing ID of Notes To Be Edit
  let [editID, setEditID] = useState("");

  const handleClose = () => setOpen(false);
  const handleClose2 = () => setOpen2(false);
  const handleClose3 = () => setOpen3(false);

  // ----Function To Get All Note ------
  const handleGetNotes = () => {
    axios
      .get(getNotes)
      .then((res) => {
        setNotes(res.data?.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  // ----Function To View Note------
  const handleOpen = (id) => {
    axios
      .get(`${getNote}/${id}`)
      .then((res) => {
        document.getElementById("modal-modal-title").innerText =
          res.data.data.title;
        document.getElementById("modal-modal-description").innerText =
          res.data.data.content;
      })
      .catch(function (error) {
        console.error(error);
      });

    setOpen(true);
  };

  // ----Function To Add Note------
  const handleAddNotes = () => {
    if (!newtitle || !newcontent) {
      return alert("Title and Content Both Required");
    }
    let body = {
      title: newtitle,
      content: newcontent,
    };
    axios
      .post(addNotes, body)
      .then((res) => {
        handleGetNotes();
        handleClose3();
        toast.success("Notes Added Succesfully :)");
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  // ----Function To Delete Note------
  const handleDel = (id) => {
    axios
      .post(delNotes, { id: id })
      .then((res) => {
        toast.error("Note Deleted Succesfully :)");
      })
      .catch(function (error) {
        console.error(error);
      });
    let newnotes = notes.filter((note) => note._id !== id);
    setNotes(newnotes);
  };

  // ----Function To Edit Note 1------
  const handleEdit1 = (id) => {
    axios
      .get(`${getNote}/${id}`)
      .then((res) => {
        document.getElementById("outlined-required").value =
          res.data.data.title;
        document.getElementById("standard-multiline-static").value =
          res.data.data.content;
      })
      .catch(function (error) {
        console.error(error);
      });
    setEditID(id);
    setOpen2(true);
  };

  // ----Function To Edit Note 2------
  const handleEdit2 = () => {
    let id = editID;
    let body = {
      title: title ? title : document.getElementById("outlined-required").value,
      content: content
        ? content
        : document.getElementById("standard-multiline-static").value,
    };
    console.log(body);
    axios
      .patch(`${updatenotes}/${id}`, body)
      .then((res) => {
        handleGetNotes();
        setOpen2(false);
        toast.success("Note Edited Succesfully :)");
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  // Function for Speak Output
  const { speak } = useSpeechSynthesis();
  const handleSpeak = (id)=>{
    axios
    .get(`${getNote}/${id}`)
    .then((res) => {
      
      speak({text : res.data.data.content} )
       
    })
    .catch(function (error) {
      console.error(error);
    });
  }

  useEffect(() => {
    handleGetNotes();
  }, []);

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(1, 1fr)",
        gap: "2rem",
        padding: "2rem",
        border: "2px solid red",
        "@media (min-width: 600px)": {
          gridTemplateColumns: "repeat(2, 1fr)",
        },
        "@media (min-width: 768px)": {
          gridTemplateColumns: "repeat(3, 1fr)",
        },
        "@media (min-width: 1200px)": {
          gridTemplateColumns: "repeat(4, 1fr)",
        },
      }}
    >
      <Button variant="contained" onClick={() => setOpen3(true)}>
        Save Your Idea Here...
      </Button>
      {/* ------------Looping Out To All Notes Using Map HOF-------- */}
      {notes?.map((note) => {
        return (
          <Card sx={{ maxWidth: 345 }} key={note._id}>
            <CardMedia
              sx={{ height: 140 }}
              image="https://clickup.com/blog/wp-content/uploads/2020/01/note-taking.png"
              title="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {note.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {note.content.substring(0, 100)}...
              </Typography>
            </CardContent>
            
            <CardActions>
              <Button
                size="small"
                sx={{ cursor: "pointer" }}
                onClick={() => handleOpen(note._id)}
              >
                Read More
              </Button>
              <Button
                size="small"
                sx={{ color: "yellow" }}
                onClick={() => handleEdit1(note._id)}
              >
                Edit Notes
              </Button>
              <DeleteForeverIcon
                size="small"
                sx={{ color: "red" }}
                onClick={() => handleDel(note._id)}
              >
                Delete
              </DeleteForeverIcon>
              <CampaignIcon onClick={()=>handleSpeak(note._id)}></CampaignIcon>
            </CardActions>
          </Card>
        );
      })}

      {/*------- Model for Displaying Note--------- */}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>

      {/*------- Model for Edit Note--------- */}

      <Modal
        open={open2}
        onClose={handleClose2}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <TextField
            required
            id="outlined-required"
            label="Required"
            placeholder="Add note Title"
            onChange={(e) => setTitle(e.target.value)}
          />{" "}
          <TextField
            id="standard-multiline-static"
            label="Multiline"
            multiline
            rows={20}
            placeholder="Add Note Content"
            required
            variant="standard"
            onChange={(e) => setContent(e.target.value)}
          />
          <Button variant="contained" onClick={handleEdit2}>
            Save Notes
          </Button>
        </Box>
      </Modal>

      {/*------- Model For Adding New Note--------- */}
      <Modal
        open={open3}
        onClose={handleClose3}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <TextField
            required
            id="outlined-required"
            label="Required"
            placeholder="Add note Title"
            onChange={(e) => newsetTitle(e.target.value)}
          />{" "}
          <TextField
            id="standard-multiline-static"
            label="Multiline"
            multiline
            rows={20}
            placeholder="Add Note Content"
            required
            variant="standard"
            onChange={(e) => newsetContent(e.target.value)}
          />
          <Button variant="contained" onClick={handleAddNotes}>
            Save Notes
          </Button>
        </Box>
      </Modal>

      {/* Toast Body */}
      <ToastContainer />
    </Box>
  );
};

export default Notes;
