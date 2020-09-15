import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Card, CardMedia, CardContent, Typography, Button, Grid } from '@material-ui/core'
import Rating from '@material-ui/lab/Rating'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import '../App.css'

export default function AllPost() {
    const [fetchedPost, setFetchedPost] = useState([])
    const [likedPost, setLikedPost] = useState([])

    useEffect(()=>{
        axios.get('http://localhost:5000/post/all')
            .then(res => {
                // console.log(res.data) //return an array of all post
                setFetchedPost(res.data)
            })
            .catch( err=> console.log(err))
    } ,[])

    // Like onClick function
    const handleLike = (postId) => {
        const config = {
            headers:{
                "content-type": "application/json",
                "authorization": localStorage.getItem('jwt')
            }
        }
        axios.put('http://localhost:5000/post/like', {postId: postId}, config)
            .then(res=>{
                console.log(res.data)
                setLikedPost([...likedPost, postId])
            } )
            .catch(err => console.log(err.response))
    }
    // Cancel the like
    const cancelLike = (postId) => {
        const config = {
            headers:{
                "content-type": "application/json",
                "authorization": localStorage.getItem('jwt')
            }
        }
        axios.put('http://localhost:5000/post/unlike', {postId: postId}, config)
            .then(res=> {
                console.log(res.data)
                // Filter out the post whose like just got cancelled
                const updatedLiked = likedPost.filter( post => (post._id !== postId))
                setLikedPost(updatedLiked)
            })
            .catch(err => console.log(err.response))
    }
    
    return (
        <div style={{
            margin: '10px auto',
            padding: '0 80px'
        }}>
           <h3>Discover all the post here</h3>
           <Grid container spacing={1} direction='row' justifyContent='center'>      
            {
                fetchedPost.map((item, index)=>(
                    <Grid item>
                        <Card key={index} style={{
                            width: '250px',
                            height: '380px',
            
                        }}>
                            <CardContent style={{paddingTop: '0.2em', height: '20px'}}>
                                <Typography variant='h5'>{item.name}</Typography>
                            </CardContent>

                            <CardMedia style={{
                                height: '180px',
                            }} image={item.photo}/>
                            <CardContent className='card-desc-area' style={{border: '1px solid purple'}}>
                                <div className='card-rating-box'>
                                    <Rating className='card-rating' value={item.stars} precision={0.5} readOnly />
                                    <p className='rating-text'>{item.stars}</p>
                                </div>
                                <Typography variant="body2" color="textSecondary" component='p'>{item.comments}</Typography>
                                
                            </CardContent>
                            
                            <div className='card-action-area' style={{paddingBottom:0, marginBottom:0}}> 
                                <FontAwesomeIcon className='heart' icon={faHeart} size='2x'
                                    onClick={()=>{
                                        if(likedPost.includes(item._id)){
                                            cancelLike(item._id) 
                                        }else{
                                            handleLike(item._id)
                                        }
                                    }}
                                />  
                            
                                <Button size='small' color='primary'>
                                    <Link to='/post/{item._id}'>Learn More</Link>
                                </Button>
                            </div>
                        </Card>
                    </Grid>
                ))
            }
            
           </Grid>
        </div>
    )
}
