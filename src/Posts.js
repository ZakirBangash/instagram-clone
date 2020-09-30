import React from 'react'
import "./Post.css";
import Avatar from '@material-ui/core/Avatar';

const Posts = ({imageUrl,caption,UserName}) => {
    

    return (
        <div className="post">
            <div className="post__header">
            <Avatar className="avatar__image" alt={UserName} src="/static/images/avatar/1.jpg" />
           <h3>{UserName}</h3>
            </div>
           
            <img className="post__image" src={imageUrl} alt="Instagram Image" />
    <h4 className="post__text"><strong>{UserName}:</strong> {caption}</h4>
        </div>
    )
}

export default Posts
