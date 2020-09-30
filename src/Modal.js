import React, { useState, useEffect } from "react";
import "./App.css";
import { db, auth } from "./firebase";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Button from "@material-ui/core/Button";
import { Input } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: 500,
  },
}));






const Modall = ({open,signUpClose}) => {

  
    
    console.log("Great i am in modal")
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [close, setclose] = useState(true);
    const classes = useStyles();


// This function will fire when we submit the button of modal
const signUp = (event) => {
    event.preventDefault();

    // create user with email and password and update the display name which is null initially
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        
        return result.user.updateProfile({
          displayName:username
        }
        );
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorMessage = error.message;
        alert(errorMessage);
      });

    // This below function for closing the modal when we submit the form
    // handleClose();
      
  };

//  const handleClose = () => {
//     setOpen(false);
//  }


//   const signIn = (e) => {
//     e.preventDefault();
  
//     auth.signInWithEmailAndPassword(email, password)
//       .catch(function (error) {
//         // Handle Errors here.
//         var errorMessage = error.message;
//         alert(errorMessage);

//         // ...
//       });

//     setopenSignIn(false);
//   };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={signUpClose} 
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <center>
              <img
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                alt=""
              />
            </center>

            <form className="app__modal__form">
              <Input
                className="input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                placeholder="Enter Username"
                fullWidth={true}
                required={true}
              />
              <Input
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Enter Email"
                fullWidth={true}
              />
              <Input
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Enter Password"
                fullWidth={true}
              />
              <Button
                className="input sign"
                onClick={signUp}
                variant="contained"
                color="primary"
                fullWidth={true}
              >
                SignUp
              </Button>
            </form>  

                
            
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default Modall;
