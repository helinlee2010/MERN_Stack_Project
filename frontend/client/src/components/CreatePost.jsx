import React, { useState, useEffect } from 'react'
import { Grid, TextField, Button } from '@material-ui/core'
import Rating from '@material-ui/lab/Rating'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUtensils } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import Alert from './Alert'



export default function CreatePost() {
    const [detail, setDetail] = useState({
        name:'',
        stars:0,
        comment:''
    })
    const [img, setImg ] = useState('')
    const [imgUrl, setImgUrl] = useState('')

    //Post status
    const [success, setSuccess]=useState(false)
    const [fail, setFail] = useState(false)
    // const classes = useStyles()

    let axiosConfig = {
        headers: {
            "Authorization": "Bearer "+ localStorage.getItem('jwt'),
            "Content-Type": "application/json"
        }
    }

    useEffect(()=>{
        if(imgUrl){
            const newPost = {  
                ...detail,
                imgUrl
            }
            console.log(newPost)
            axios.post('http://localhost:5000/post/create', newPost, axiosConfig)
                .then(res => {
                    console.log(res.data)
                    setSuccess(true)
                })
                .catch(err=> {
                    console.log(err.response.data)
                    setFail(true)
                })
            
        }
    },[imgUrl])

    const uploadImg = () => {
        let imgData = new FormData()
        imgData.append('file', img)
        imgData.append('upload_preset', 'mernstack')
        // imgData.append('cloud_name', 'espressothenine')
        
        axios.post('https://api.cloudinary.com/v1_1/espressothenine/image/upload', imgData)
            .then( res => {
                console.log(res.data.url)
                setImgUrl(res.data.url)
                // everytime after img uploaded, url state will change
            })
            .catch( err => console.log(err.response.data))
    }

    return (
        <div>
        {/* <form autoComplete='off'></form> */}

            <div style={{paddingTop:'2em'}}>
                {
                    success &&
                    <Alert msg='Great! Your post was created!' severity='success' />
                }
                {
                    fail &&
                    <Alert msg='Something was wrong...' severity='warning' />
                }
                <Grid container spacing={1} justify='center' alignItems='flex-end'>
                    <Grid item>
                        <FontAwesomeIcon icon={faUtensils} size='2x' />
                    </Grid>
                    <Grid item>
                        <TextField id='name' label='Restaurant Name' 
                            value={detail.name}
                            onChange={ (e) => setDetail({
                                ...detail,
                                name: e.target.value
                                })}
                        />
                    </Grid>
                </Grid>
            </div>
            <Grid container spacing={1} justify='center' style={{paddingTop:'2em'}}>
                <Grid item>Rating</Grid>
                <Grid item>
                    <Rating precision={0.5} value={detail.stars}
                        onChange={ e => setDetail({
                            ...detail,
                            stars: e.target.value
                        })}
                    />
                </Grid>
            </Grid>
            
            <br />
            <TextField 
                id='comment'
                label='Comment'
                multiline
                rows={7}
                size='medium'
                required={true}
                variant='outlined'
                value={detail.comment}
                onChange={ (e) => setDetail({
                            ...detail,
                            comment: e.target.value
                        })}
            /> 
            <br />
            <input style={{
                    marginTop:'2em',
                    paddingLeft :'3em',
                    color: 'purple'
                }} 
                type='file' accept='image/jpeg image/png'
                onChange={ e => setImg(e.target.files[0])}/>
            <br />
            <Button onClick={()=> uploadImg()} style={{marginTop:'1em'}}>Post</Button>
        </div>
    )
}
