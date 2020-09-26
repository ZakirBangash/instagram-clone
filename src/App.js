import React, { useState, useEffect } from "react";
import "./App.css";
import Posts from "./Posts";
import { db,auth } from './firebase'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button'
import { Input } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width:500,
  },
}));




function App() {
  const [post, setPost] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {

    db.collection('posts').onSnapshot(snapshot => {
      setPost(snapshot.docs.map(doc => doc.data()))
    })

  }, []);

  useEffect(() => {
    
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // User is signed in.
        console.log(authUser);
        setUser(authUser);      

        // ...
      } else {
        // User is signed out.
        // ...
      }
    });


    // return () => {
    //   cleanup
    // }
  }, [])


  const classes = useStyles();
  const [open, setOpen] = React.useState(false);


  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const signUp = (event) => {
    event.preventDefault();
    
    auth.createUserWithEmailAndPassword(email, password).then((result)=>{
      return result.user.updateProfile({
        displayName:username
      })
      
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      
      var errorMessage = error.message;
      alert(errorCode,errorMessage)
      // ...
    });

  }


  return (
    <div className="App">
      <div className="app__header">
        <img className="app__image"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt=""
        />
        <Button className='modal__button' type="button" onClick={handleOpen}>
          SignUp
      </Button>
      </div>

      <h1>
        Hello Clever Programmers , i React developer doing instagram clone
      </h1>
      {post.map(({ username, imageUrl, caption }) => {

        return (
          <Posts imageUrl={imageUrl} UserName={username} Caption={caption} />
        )
      })}







      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
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

            <Input className="input" value={username} onChange={(e)=> setUsername(e.target.value)}  type="text" placeholder="Enter Username"  fullWidth={true} required={true}	 />
            <Input className="input" value={email} onChange={(e)=> setEmail(e.target.value)} type="email" placeholder="Enter Email"  fullWidth={true}/>
            <Input className="input" value={password} onChange={(e)=> setPassword(e.target.value)} type="password" placeholder="Enter Password" fullWidth={true} />
            <Button className="input sign" onClick={signUp} variant="contained" color="primary" fullWidth={true}>SignUp</Button>
            
            </form>
          </div>
        </Fade>
      </Modal>






    </div>
  );
}

export default App;
