import {PicturesApi,images} from "./../API Calls/PicturesApi";
import React, {useCallback, useEffect, useState} from "react";
import {Carousel} from "react-responsive-carousel";
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../anyotherfile.scss'
import Postcard from "./Postcard";
import {Container} from "@mui/material";

type TPicturesProps = {
    locat:string,
    orientation:string
}

export default function PicturesComponent({locat, orientation}:TPicturesProps){
    //API 3: PICTURES
    const initialPictures : images = {url:[], alt:[], height:[]}
    const [pictures, setPictures] = useState<images>(initialPictures)
    const [errorMessage, setErrorMessage] = useState<string>('')
    const getPictures = useCallback(
        async () => {
            const result = await PicturesApi(locat, orientation);
            if (result.url.length > 0){
                setPictures({
                    url:result.url,
                    alt:result.alt,
                    height:result.height
                })
            }else{
                setErrorMessage('So sad! No pictures found :(')
            }
        },
        [locat],
    );

    let renderedImages = [];
    for (let i=0; i<pictures.url.length; i++) {
        const e =
            <div>
                <img alt={pictures.alt[i]} key={i} src={pictures.url[i]} loading='lazy'/>
            </div>
        renderedImages.push(e)
    }
    let renderedImagesUrls:string[] = [];
    for (let i=0; i<pictures.url.length; i++) {
        const e = pictures.url[i]
        renderedImagesUrls.push(e)
    }

    //MODAL
    const [open, setOpen] = useState<boolean>(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        if(locat!==''){
            getPictures()
        }
        // return () => ()
    }, [locat]);

    return(
        <>
            {errorMessage === '' &&
                <>
                    <p style={{textAlign:'center', margin:'.3rem 0 0 0'}}>Click on your favourite postcard</p>
                <Container className='picturesSection'
                           style={{margin:'.5rem auto',display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
                <Carousel>
                    {renderedImagesUrls.map((i, ix:number) => {return<div> <Postcard image={i} keyThing={ix} locat={locat}/> <caption><a href={i}>&copy; Unsplash</a></caption> </div>
                    })}
                </Carousel>
                </Container>
                </>
            }
            {errorMessage !== '' &&
                <div style={{textAlign:'center'}}>
                    {errorMessage}
                </div>
            }
        </>
    )

}