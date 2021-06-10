import React, {useState, useEffect} from 'react'
import { Avatar } from '@material-ui/core'
import './Post.css'
import { db } from './Firebase'
import firebase from "firebase"
const Post = ({postId,username ,user,caption , img}) => {


    const [ comments , setComments ] = useState([]);
    const [ comment , setComment] = useState([]);

    useEffect(()=>{
        let unsubscribe;
        if(postId){
             unsubscribe = db
            .collection("posts")
            .doc(postId)
            .collection("comments")
            .orderBy('timestamp', 'desc')
            .onSnapshot((snapshot)=>{
                setComments(snapshot.docs.map((doc)=>doc.data()))
            })
            
        }
        return()=>{
            unsubscribe();
        }
    },[postId]);
 console.log('f',comments)
    const postComment =  (event) =>{
            event.preventDefault();
            db
            .collection("posts")
            .doc(postId)
            .collection("comments")
            .add({
                text: comment,
                username: user.displayName,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            })
            setComment([]);
    }
    return (
        <div className="post">
            
            <div className="post__header">
                <Avatar
                className="post__Avatar"
                alt=""
                src="/static/images/avatar/1.jpg"
                />
                <h3>{username}</h3>
            </div>
            <img className="post__image" src={img} alt="" />
            <h4 className="post__text"><strong>{username}:</strong> {caption}</h4>
            <div className="post__comments">
                {
                    comments.map((comment)=>(
                        <p>
                            <strong>{comment.username}</strong>{comment.text}
                        </p>
                    ))
                }
            </div>
            { user && 
            <form className="post__commentBox">
              
                   <input 
               className="post__input"
               type="text"
               placeholder="Add comments"
               value={comment}
               onChange={(e)=>setComment(e.target.value)}
                />
              
  
                <button
                className="post__button"
                type="submit"
                onClose={!comment}
                onClick={postComment}>Post</button>
               
            </form>
            }
        </div>
    )
}

export default Post
