import React, { useEffect, useState } from 'react'
import axios from 'axios'

function formatDate(dateString){
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth()<10? '0'+ date.getMonth() : date.getMonth();
    const day = date.getDate()<10? '0'+ date.getDate() : date.getDate();

    const formattedDate = year +"-"+ month + "-" + day;
    return formattedDate;
}

export default function MyPost() {
    const axiosConfig = {
        headers: {
            "Authorization": "Bearer "+ localStorage.getItem("jwt")
        }
    }
    const [myPost, setMyPost] = useState([]);

    useEffect(()=> {
        axios.get('http://localhost:5000/post/mypost', axiosConfig)
            .then(res => {
                setMyPost(res.data)
                console.log(res)  // array of post objects
            })
            .catch( err => console.log(err.response)) }
    ,[])

    return (
        <div>
          <h1>My post</h1>
          {
            myPost.map((post,index) => (
              <div style={{border: "1px solid grey"}}key={index}>
                <h3>{post.name}</h3>
                <p>Created On:  {formatDate(post.createdAt)}</p>
                <p>Liked By: {post.likes}</p>
                <p>{post.comments}</p>
                <img style={{maxWidth: 500}} src={post.photo} alt='post-photo' />
                
              </div>
            ))
          }
        </div>
    )
}
