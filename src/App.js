import React, { useState, useEffect } from "react";
import "./App.css";
import Posts from "./Posts";
import { db } from './firebase'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button'

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
  },
}));




function App() {
  const [post, setPost] = useState([
    // {
    //   imageUrl:
    //     "https://images.unsplash.com/photo-1600194991617-317f25e77508?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop",
    //   UserName: "Zakir Bangash",
    //   Caption: "My first Post on instagram clone",
    // },
    // {
    //   imageUrl:
    //     "https://images.unsplash.com/photo-1599722758280-6a90187b521c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjczMTc0fQ&auto=format&fit=crop",
    //   UserName: "Malik ShahZain",
    //   Caption: "I just joined Instagram really fun",
    // },
    // {
    //   imageUrl:
    //     "https://images.unsplash.com/photo-1599751449029-e4ea8f21d966?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjczMTc0fQ&auto=format&fit=crop",
    //   UserName: "Ayesha",
    //   Caption: "I love the Developer of this clone",
    // },
  ]);


  useEffect(() => {


    db.collection('posts').onSnapshot(snapshot => {
      setPost(snapshot.docs.map(doc => doc.data()))

    })

  }, [])

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };



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
              <h2 id="transition-modal-title">Transition modal</h2>
              <p id="transition-modal-description">react-transition-group animates me.</p>
            </div>
          </Fade>
        </Modal>
  





    </div>
  );
}

export default App;
