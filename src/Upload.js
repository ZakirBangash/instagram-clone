import React,{useState} from 'react'
import Button from "@material-ui/core/Button";
import { Input } from "@material-ui/core";
import { db, auth,storage } from "./firebase";
import firebase from 'firebase';
import './Upload.css';

const Upload = ({username}) => {

    console.log(username);
    const [image, setimage] = useState(null);
    const [progress, setprogress] = useState(0);
    const [caption, setcaption] = useState('');

    const handleChange = (e) => {
        // Get file
            if(e.target.files[0]){
                console.dir(e.target.files[0])
                setimage(e.target.files[0]);
            }            
    }

    const handleUpload = () => {
        // Create a storage ref
        let storageRef = storage.ref(`images/${image.name}`);

        /**
         * Upload the file
         * Put method below will upload this
         * file to firebase storage
         */

        let task = storageRef.put(image);

        // update the progress bar
        task.on('state_changed',
        (snapshot)=> {
            const percentage = (snapshot.bytesTransferred /snapshot.totalBytes) * 100; 
                setprogress(percentage);
                
        },
        // Catching any Error
        (error) => {
                alert(error);
        },
        // complete function
        () => {
            storage.ref('images')
            .child(image.name)
            .getDownloadURL()
            .then( url => {
                // post image inside Database
                db.collection("posts").add({
                    // timestamp: firebase.firestore.FieldValue.serverTimestamp,
                    imageUrl:url,
                    caption:caption,
                    username:username

                });
                console.log('control is in upload');
                setprogress(0);
                setcaption('');
                setimage(null);
            })
        }
        
        
        )
       

     
    }

    return (
        <div className='upload__image'>
            <progress className="upload__progress" max='100' value={progress} />
            <Input type='text' value={caption} onChange={(e)=> setcaption(e.target.value)} placeholder="Enter a Caption ..." />
            <Input type='file' placeholder="Enter a Caption ..." onChange={handleChange} />
            {image?(
                <Button onClick={handleUpload}>Upload</Button>
            ):
              <Button disabled onClick={handleUpload}>Upload</Button>
            }
            
        </div>
    )
}

export default Upload
