import React, { useContext, useState } from 'react'
import '../App.css'
import { UserContext } from '../App'
import Swiper from 'react-id-swiper'

const sliderConfigs = {
    containerClass: 'swiper-container bg-slider',
    parallax: true,
    centeredSlides: true,
    grabCursor: true,
    speed: 500,
    spaceBetween: 0,
    effect:'slide',
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
    }
}


export default function Home() {
    
    const { state, dispatch } = useContext(UserContext)
    // console.log(state) 
        //Logged In: object with username & _id (payload)
        //Not logged in: null
    const [parallaxSwiper, setParallexSwiper] = useState(null);
    const parallaxAmount = parallaxSwiper? parallaxSwiper.width * 0.95: 0;
    const parallaxOpacity = 0.5;


    return (
        <Swiper {...sliderConfigs}
                getSwiper={setParallexSwiper}>
            <div className='bg-slider'>
                <div className='slide-img'
                    data-swiper-parallax={parallaxAmount}
                    data-swiper-parallax-opacity={parallaxOpacity}
                >
                    <img src='https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80' alt='slide2img' />
                </div>
                <div className='slide-content'>
                    <h1>Home Page</h1>
                    {
                        state? <h2>Welcome Back {state.username}!</h2> :
                        <h2>Hello👋 Welcome to Foodiegram! 😆</h2>
                    }
                </div>
            </div>
            
            <div className='bg-slider'>
                <div className='slide-img'
                    data-swiper-parallax={parallaxAmount}
                    data-swiper-parallax-opacity={parallaxOpacity}
                >
                    <img className='bg-image' src='https://images.unsplash.com/photo-1497888329096-51c27beff665?ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80' alt='img-2' />
                    <div className='slide-content'>
                        <h2>Slide 2</h2>
                    </div>
                </div>
            </div>
                
        </Swiper>
    )
}
