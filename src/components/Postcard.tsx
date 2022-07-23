import React, {useEffect, useState, useCallback} from "react";
import {send} from "emailjs-com";

import {Modal, Button, Box, Typography} from "@mui/material";

type PostcardProps = {
    image:string,
    keyThing:number,
    locat:any
}

type SendType = {
    from_name: string,
    to_name: string,
    message: any,
    reply_to: string,
}

export default function Postcard ({image, keyThing,locat}:PostcardProps) {
    const [open, setOpen] = useState<boolean>(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [sending, setSending] = useState<SendType>({
        from_name: '',
        to_name: '',
        message: '',
        reply_to: '',
    });

    const onSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        send(
            'SERVICE ID',
            'TEMPLATE ID',
            sending,
            'User ID'
        )
            .then((response) => {
                console.log('SUCCESS!', response.status, response.text);
            })
            .catch((err) => {
                console.log('FAILED...', err);
            });
    };

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        setSending({ ...sending, [e.target.name]: e.target.value });
    };



    return (
        <div>
            {!open && <div onClick={handleOpen}><img src={image} key={keyThing} alt='' /></div>}
            <Modal
                className='modal'
                sx={{
                    display:'flex',
                    justifyContent:'center',
                    alignItems:'center'}}
                keepMounted
                open={open}
                onClose={handleClose}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <div className='card'>
                    <div className='content'>
                        <div className='front'>
                            <img src={image} key={keyThing} alt='' onClick={handleClose} style={{maxWidth:'70vw'}}/>
                        </div>
                        <div className='back'>
                            <form onSubmit={onSubmit}>
                                <div className='from'>
                                    <label htmlFor='to_name'>From:</label>
                                    <input
                                        type='text'
                                        name='from_name'
                                        placeholder='From YourName'
                                        value={sending.from_name}
                                        onChange={handleChange}
                                    />
                                    <input
                                        type='text'
                                        name='reply_to'
                                        placeholder='Your Email Address'
                                        value={sending.reply_to}
                                        onChange={handleChange}
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
                                    />
                                </div>
                                <div className='message'>
                                <label htmlFor='message'>Your message:</label>
                                <input
                                    type='text'
                                    name='message'
                                    placeholder={`Hugs from ${locat}!`}
                                    value={sending.message}
                                    onChange={handleChange}
                                />
                                <div className='signature'>
                                    <p>Yours,</p>
                                    <p>{sending.from_name}</p>
                                </div>
                                </div>
                                <button type='submit'>Send *icon*</button>
                            </form>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

