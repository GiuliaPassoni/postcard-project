import {PicturesApi,images} from "./../API Calls/PicturesApi";
import React, {useCallback, useEffect, useState} from "react";
import {Carousel} from "react-responsive-carousel";
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../style.scss'
import Postcard from "./Postcard";
import {Modal, Button, Box, Typography} from "@mui/material";

type TPicturesProps = {
    locat:string
}

export default function PicturesComponent({locat}:TPicturesProps){
    //API 3: PICTURES
    const initialPictures : images = {url:[], alt:[], height:[]}
    const [pictures, setPictures] = useState<images>(initialPictures)
    const [errorMessage, setErrorMessage] = useState<string>('')
    const getPictures = useCallback(
        async () => {
            const result = await PicturesApi(locat);
            if (result.url.length > 0){
                setPictures({
                    url:result.url,
                    alt:result.alt,
                    height:result.height
                })
                console.log('pics pass')
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
                <div  >
                <Carousel>
                    {renderedImagesUrls.map((i, ix:number) => {return <Postcard image={i} keyThing={ix} locat={locat}/>
                    })}
                </Carousel>
                </div>
            }
            {errorMessage !== '' && errorMessage}
            {/*<>*/}
            {/*    <Modal*/}
            {/*        className='modal'*/}
            {/*        sx={{*/}
            {/*        display:'flex',*/}
            {/*        justifyContent:'center',*/}
            {/*        alignItems:'center'}}*/}
            {/*        keepMounted*/}
            {/*        open={open}*/}
            {/*        onClose={handleClose}*/}
            {/*        // onClose={handleClose}*/}
            {/*        aria-labelledby="keep-mounted-modal-title"*/}
            {/*        aria-describedby="keep-mounted-modal-description"*/}
            {/*    >*/}

            {/*        <div className='card'>*/}
            {/*        /!*    <div className='content'>*!/*/}
            {/*        /!*        <div className='front'>*!/*/}
            {/*                    <Carousel>*/}
            {/*                        {renderedImagesUrls.map((i, ix:number) => {return  <div>*/}
            {/*                            <img key={i} src={renderedImagesUrls[ix]} alt='' onClick={setImage} />*/}
            {/*                        </div>*/}
            {/*                        })}*/}
            {/*                    </Carousel>*/}
            {/*        /!*        </div>*!/*/}
            {/*        /!*        <div className='back'>*!/*/}
            {/*        /!*            <h3>SUCCESS</h3>*!/*/}
            {/*        /!*        </div>*!/*/}
            {/*        /!*    </div>*!/*/}
            {/*        </div>*/}
            {/*</Modal>*/}
            {/*    {console.log('image',image)}*/}
            {/*</>*/}
        </>
    )

}