import React, { useRef, useEffect, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as blazeface from '@tensorflow-models/blazeface';
import Webcam  from 'react-webcam';
import '../../styles/CheckFace.css';
import bg from '../../img/bg18.jpg'
import { detect } from 'async';
import { drawRect } from '../../utils/drawRect';
import { faHandPointer, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch } from 'react-redux';
const CheckFace = () => {
    const dispatch = useDispatch();
    const [checkRobot, setCheckRobot] = useState(false);
    const [checkCtx, setCheckCtx] = useState(false);
    const [checkCap, setCheckCap] = useState(false);
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);
    
    const runBlazeFace = async () => {
        const net = await blazeface.load();
        setInterval(() => {
            detect(net);
        }, 100);
    }
    const detect = async (net) => {
        if (typeof webcamRef.current !== 'undefined' && webcamRef.current !== null && webcamRef.current.video.readyState === 4) {
            //lay cac thuoc tinh cua video
            const video = webcamRef.current.video;
            console.log(video.src);
            const videoWidth = webcamRef.current.video.videoWidth;
            const videoHeight = webcamRef.current.video.videoHeight;

            webcamRef.current.video.width = videoWidth;
            webcamRef.current.video.height = videoHeight;

            canvasRef.current.width = videoWidth;
            canvasRef.current.height = videoHeight;

            const face = await net.estimateFaces(video);
            console.log(face);
            if (face && !checkCap && webcamRef.current) {
                const imageSrc = webcamRef.current.getScreenshot();
                const data = new FormData()
                data.append('file', imageSrc);
                data.append('upload_preset', 'ml_default');
                data.append("cloud_name", "den6tpnab");
                fetch("https://api.cloudinary.com/v1_1/den6tpnab/image/upload", {
                method: "post",
                body: data
                }).then(res => res.json()).
                then(data => {
                    console.log(data);
                    setCheckCap(true)
                }).catch(err => {
                    console.log("An Error Occured While Uploading")
                })
                console.log(imageSrc)
                
            }
            if (canvasRef.current) {
                const ctx = canvasRef.current.getContext("2d");
                requestAnimationFrame(()=>{drawRect(face, ctx)});
            }
            if (face.length > 0) {
                setTimeout(() => {
                    setCheckCtx(true);
                    setCheckRobot(true);
                }, 3000)
                setTimeout(() => {
                    dispatch({type: 'AUTHED'})
                    sessionStorage.setItem('key', true);
                }, 5000)
            }
            
        }
    }
    useEffect(()=>{runBlazeFace()}, []);
    return(
        <div className='CheckFace'>
            <div className='container'>
                <div className='background'>
                    <img src={bg} alt='background' />
                </div>
                <div className='body'>
                    {checkRobot && <p className='check'><span ><FontAwesomeIcon icon={faCheckCircle} /> </span> Bạn chính là người!</p>}
                    <p className='click-permiss'> <span><FontAwesomeIcon icon={faHandPointer} /></span>Allow access Camera to handle Robot!</p>
                    <h4>Are you Human??</h4>
                    <div>
                        {!checkCtx && <Webcam
                        //mirrored ={true}
                        ref={webcamRef}
                        style={{
                            position: "absolute",
                            marginLeft: "auto",
                            marginRight: "auto",
                            left: 0,
                            right: 0,
                            textAlign: "center",
                            zindex: 9,
                            width: 640,
                            height: 480,
                            maxWidth: '100%'
                        }}
                        />}
                        <canvas
                        className='canvas1'
                        ref={canvasRef}
                        style={{
                            position: "absolute",
                            marginLeft: "auto",
                            marginRight: "auto",
                            left: 0,
                            right: 0,
                            textAlign: "center",
                            zindex: 9,
                            width: 640,
                            height: 480,
                            maxWidth: '100%'
                        }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default CheckFace;