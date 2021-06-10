import React, {useState} from 'react'
import firebase from "firebase"
import { storage, db } from './Firebase'
import { Button , Input} from '@material-ui/core';
import './ImageUpload.css'

const ImageUpload = ({username}) => {

    const [ image , setImage] = useState(null);
    const [ url , setUrl]= useState("");
    const [progress , setProgress] = useState(0);
    const [ caption , setCaption] = useState("");
   

    const handleChange = (e) =>{
        if(e.target.files[0]){
            setImage(e.target.files[0]);
        }
    }

    const handleUpload = (e) =>{
         e.preventDefault();
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
            

        uploadTask.on(
            "state_changed",

            (snapshot) =>{
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes)*100
                
                );
                setProgress(progress);
            },
   
            (error)=>{
                console.log(error);
                alert(error.message);
            },
            ()=> {
                storage
                .ref("images")
                .child(image.name)
                .getDownloadURL()
                .then((url) =>{
                    setUrl(url);
                    
                        //Upload data into databasee
                    db.collection("posts").add({
                        imageUrl:url,
                        caption: caption,
                        username: username,
                        timestamp: firebase.firestore.FieldValue.serverTimestamp(),

                    });
                    setProgress(0);
                    setCaption("");
                    setImage(null);
                    
                });
            }
    

            
        );

            
    };
    return (
        <div className="imageUpload">
            <progress className="imageUploadProgress" value={progress} max="100" />
            <input type="text" placeholder='Enter captio...' value={caption} onChange={(event) => setCaption(event.target.value)}  />
            <input type="file"  onChange={handleChange}  />
            <Button onClick={handleUpload}>Upload File</Button>
        </div>
   
  );
};


export default ImageUpload
