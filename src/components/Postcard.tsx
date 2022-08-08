import React, {useState} from "react";
import {send} from "emailjs-com";

import {Modal, Button, Box, Typography} from "@mui/material";
import EmailIcon from '@mui/icons-material/Email';

type PostcardProps = {
    image: string,
    keyThing: number,
    locat: any
}

type SendType = {
    from_name: string,
    to_name: string,
    to_email: string,
    message: any,
    reply_to: string,
    img_url: any
}

export default function Postcard({image, keyThing, locat}: PostcardProps) {
    const [open, setOpen] = useState<boolean>(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [sending, setSending] = useState<SendType>({
        from_name: '',
        to_name: '',
        to_email: '',
        message: '',
        reply_to: '',
        // img_url: "<img src=" + image + " alt=''/>" //this sends, but no pics
        img_url: image
        // img_url: <img src={image} alt={locat}/> //this doesn't send, bug only
    });

    const onSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        send(
            'service_xv3kshf',
            'template_ux1nsvg',
            sending,
            'ZRj4cZXShyRWaouFS'
        )
            .then((response) => {
                // console.log('SUCCESS!', response.status, response.text);
                // e.preventDefault(); // Otherwise the form will be submitted
                alert("Your postcard was sent :)")
            })
            .catch((err) => {
                console.log('FAILED...', err);
            });
    };

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        setSending({...sending, [e.target.name]: e.target.value});
    };

    return (
        <div>
            {!open && <div onClick={handleOpen}><img src={image} key={keyThing} alt={locat}/></div>}
            <Modal
                className='modal'
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
                keepMounted
                open={open}
                onClose={handleClose}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <div className='card'>
                    {/*<div className={flip ? 'noHover content' : 'content'}>*/}
                    <div className='content'>
                        <div className='front'>
                            <img src={image} key={keyThing} alt={locat} onClick={handleClose}
                                 style={{maxWidth: '70vw'}}/>
                            <Button variant='contained' className='postcardMobile'>Flip postcard</Button>
                        </div>
                        <div className='back'>
                            <form className='postcardForm'
                                  onSubmit={onSubmit}
                            >
                                <div className='message'>
                                    <label htmlFor='message'>Your message:</label>
                                    <textarea
                                        // type='text'
                                        name='message'
                                        placeholder={`Hugs from ${locat}!`}
                                        value={sending.message}
                                        onChange={handleChange}
                                        rows={5}
                                        cols={40}
                                        maxLength={200}
                                    ></textarea>
                                    <div className='signature'>
                                        <p>Yours,</p>
                                        <p>{sending.from_name}</p>
                                    </div>
                                </div>
                                <div className='right-hand-side'>
                                    <button className='submitButton' type='submit'>Send <EmailIcon/></button>
                                    <div className='from'>
                                        <label htmlFor='to_name'>From:</label>
                                        <input
                                            type='text'
                                            name='from_name'
                                            placeholder='From YourName'
                                            value={sending.from_name}
                                            onChange={handleChange}
                                            autoComplete='off'
                                        />
                                        <input
                                            type='text'
                                            name='reply_to'
                                            placeholder='Your Email Address'
                                            value={sending.reply_to}
                                            onChange={handleChange}
                                            autoComplete='off'
                                            required
                                        />
                                    </div>
                                    <div className='to'>
                                        <label htmlFor='to_name'>To:</label>
                                        <input
                                            type='text'
                                            name='to_name'
                                            placeholder='Send to:'
                                            value={sending.to_name}
                                            onChange={handleChange}
                                            autoComplete='off'
                                        />
                                        <input
                                            type='text'
                                            name='to_email'
                                            placeholder='Their Email Address'
                                            value={sending.to_email}
                                            onChange={handleChange}
                                            autoComplete='off'
                                            required
                                        />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

