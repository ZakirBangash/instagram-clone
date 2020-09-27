import React, { useState, useEffect } from "react";
import "./App.css";
import Posts from "./Posts";
import { db, auth } from "./firebase";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Button from "@material-ui/core/Button";
import { Input } from "@material-ui/core";
import Upload from "./Upload";

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

function App() {
  const [post, setPost] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [openSignIn, setopenSignIn] = useState(false);

  // useEffect Hook for getting all posts from Firebase
  useEffect(() => {
    db.collection("posts").onSnapshot((snapshot) => {
      // every time a new post added,this code fires
      setPost(snapshot.docs.map((doc) => doc.data()));
    });
  }, []);

  useEffect(() => {
    console.log("use1");
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        console.log(authUser);
        console.log("auth ha");
        // User is signed in.
        setUser(authUser);
      } else {
        // User is signed out.
        console.log("out");
        setUser(null);
      }
    });

    return () => {
      //  cleanup
      unsubscribe();
    };
  }, [user,username]);

  // This function for opening SignUp modal
  const signUpOpen = () => {
    setOpen(true);
  };

  // This function for closing SignUp modal
  const signUpClose = () => {
    setOpen(false);
  };

  // This function for opening SignIn modal
  const signInOpen = () => {
    setopenSignIn(true);
  };

  // This function for closing SignIn modal
  const signInClose = () => {
    setopenSignIn(false);
  };

  // This function will fire when we submit the button of modal
  const signUp = (event) => {
    event.preventDefault();
    // create user with email and password and update the display name which is null initially
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        console.log(username)
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
    signUpClose();
  };

  const signIn = (e) => {
    e.preventDefault();
  
    auth.signInWithEmailAndPassword(email, password)
      .catch(function (error) {
        // Handle Errors here.
        var errorMessage = error.message;
        alert(errorMessage);

        // ...
      });

    setopenSignIn(false);
  };

  console.log("Good that's great");
  return (
    <div className="App">
      <div className="app__header">
        <img
          className="app__image"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt=""
        />
          
        {user?.displayName?(
          <Upload username={user.displayName} />
         
        ) : (
          <h3>Sorry you need to login to upload</h3>
        )}
      

        {user ? (
          <Button
            className="modal__button"
            type="button"
            onClick={() => auth.signOut()}
          >
            LogOut
          </Button>
        ) : (
          <div className="app_signInButton">
            <Button className="modal__button" onClick={signInOpen}>
              SignIn
            </Button>

            <Button className="modal__button" onClick={signUpOpen}>
              SignUp
            </Button>
          </div>
        )}
      </div>

      <h1>
        Hello Clever Programmers , i React developer doing instagram clone
      </h1>

      {post.map(({ username, imageUrl, caption }) => {
        return (
          <Posts imageUrl={imageUrl} UserName={username} Caption={caption} />
        );
      })}

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

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={openSignIn}
        onClose={signInClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openSignIn}>
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
                onClick={signIn}
                variant="contained"
                fullWidth={true}
              >
                SignIn
              </Button>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

export default App;
