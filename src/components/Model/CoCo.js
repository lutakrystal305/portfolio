import React, { useEffect, useRef, useState } from 'react';
import '../../styles/CoCo.css';
import '../../styles/CheckFace.css';
import Webcam from 'react-webcam';
import { drawRect, drawRect1 } from '../../utils/drawRect';
import * as cocossd from '@tensorflow-models/coco-ssd';
import * as tf from '@tensorflow/tfjs';
import classNames from 'classnames';
import { Player } from 'video-react';
import pic1 from '../../img/frame2.png';
import pic2 from '../../img/frame7.png';
import pic3 from '../../img/frame6.png';
import pic4 from '../../img/frame5.png';


const Coco = () => {
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);
    const [check, setCheck] = useState('');
    const [onFile, setOnFile] = useState(false);
    const [value, setValue] = useState(null);
    const [imgData, setImgData] = useState(null);
    const [vidData, setVidData] = useState(null);
    const [frame1, setFrame1] = useState(pic1);
    const [frame2, setFrame2] = useState(pic2);
    const [frame3, setFrame3] = useState(pic3);

    const fileInputRef = useRef();
    const imageRef = useRef();
    const videoRef = useRef(null);
    
    let videoWidth, videoHeight;
    const readImage = (file) => {
        return new Promise((rs, rj) => {
          const fileReader = new FileReader();
          fileReader.onload = () => rs(fileReader.result);
          fileReader.onerror = () => rj(fileReader.error);
          fileReader.readAsDataURL(file);
        });
    };
    const readVideo = (file) => {
            const reader = new FileReader();
            reader.readAsArrayBuffer(file);
            reader.onload = function(e) {
            // The file reader gives us an ArrayBuffer:
            let buffer = e.target.result;
          
            // We have to convert the buffer to a blob:
            let videoBlob = new Blob([new Uint8Array(buffer)], { type: 'video/mp4' });
          
            // The blob gives us a URL to the video file:
            let url = window.URL.createObjectURL(videoBlob);
            console.log(url)
            return url
            //video.src = url;
          }

    };
    const runCoco = async () => {
        const net = await cocossd.load();
        if (value && check === 'file') {
            //img = window.URL.createObjectURL(value);
            let z = value.name.split('.');
            console.log(z);
            if (vidData && check === 'file') {
                
                const videoElementRoot = document.getElementsByClassName('video-react-video')[0];
                //console.log(videoElementRoot)
                //videoElementRoot.ref = videoRef;
                //videoElementRoot.onplay = detect2(net, videoElementRoot)
                setInterval(() => {
                    detect2(net, videoElementRoot);
                }, 100);
            } else if (z[1] !== 'mp4') {
                const imageData = await readImage(value);
                setImgData(imageData);
                setVidData(null);
                const imageElement = document.createElement("img");
                imageElement.src = imgData;
                detect2(net, imageElement);
            }
        }
        else if (check === 'webcam') {
            setInterval(() => {
                detect1(net);
            }, 100);
        } 
    }
    const detect2 = async (net, element) => {
            console.log('video instanceof HTMLVideoElement', element instanceof HTMLVideoElement)
            //console.log('fuck')
            //let image = tf.browser.fromPixels(value);
            if (vidData && check === 'file') {
                console.log(element.readyState);
                console.log(videoRef)
                if ( videoRef.current !== null && videoRef.current !== 'undefined' && videoRef.current.video.video.readyState >= 3 ) {
                    //const video = videoRef.current.video;
                    const video = videoRef.current.video.video;
                    console.log(video);
                    
                    videoWidth = videoRef.current.video.videoWidth;
                    videoHeight = videoRef.current.video.videoHeight;
                    
                    videoRef.current.video.width = videoWidth;
                    videoRef.current.video.height = videoHeight;

                    canvasRef.current.width = videoWidth;
                    canvasRef.current.height = videoHeight;

                    const obj = await net.detect(video);
                    console.log(obj);

                    const ctx = canvasRef.current.getContext("2d");
                    drawRect1(obj, ctx)
                }
            }
            else if (imgData) {
                imageRef.current.width = element.width;
                imageRef.current.height = element.height;
                canvasRef.current.width = element.width;
                canvasRef.current.height = element.height;

                const obj = await net.detect(element);
                console.log(obj);
                const ctx = canvasRef.current.getContext("2d");
                drawRect1(obj, ctx)
            }

            
    }
    const detect1 = async (net) => {
        if (typeof webcamRef.current !== 'undefined' && webcamRef.current !== null && webcamRef.current.video.readyState === 4) {
            //lay cac thuoc tinh cua video
            console.log(webcamRef)
            const video = webcamRef.current.video;
            console.log(video)
            const videoWidth = webcamRef.current.video.videoWidth;
            const videoHeight = webcamRef.current.video.videoHeight;

            webcamRef.current.video.width = videoWidth;
            webcamRef.current.video.height = videoHeight;

            canvasRef.current.width = videoWidth;
            canvasRef.current.height = videoHeight;

            const obj = await net.detect(video);
            console.log(obj);

            const ctx = canvasRef.current.getContext("2d");
            drawRect(obj, ctx)
        }
    }
    const handleChange = (event) => {
        console.log(event.target.files[0]);
        setValue(event.target.files[0]);
        setImgData(null)
        setVidData(null)
        let z = event.target.files[0].name.split('.');
        console.log(z);
        if (z[1] === 'mp4') {
            console.log('nhu cc');
            const reader = new FileReader();
            reader.readAsArrayBuffer(event.target.files[0]);
            reader.onload = function(event) {
            // The file reader gives us an ArrayBuffer:
            let buffer = event.target.result;
        
            // We have to convert the buffer to a blob:
            let videoBlob = new Blob([new Uint8Array(buffer)], { type: 'video/mp4' });
        
            // The blob gives us a URL to the video file:
            let url = window.URL.createObjectURL(videoBlob);
            console.log(url);
            setVidData(url);
            setImgData(null);
            //video.src = url;
        }}
        
    }
    
    useEffect(()=>{
        
            runCoco()
    },[check, value, imgData, vidData]);
    useEffect(() => {
        if (check === 'file') {
            setFrame1(pic4);
        } else if (check === 'webcam') {
            setFrame1(pic1);
        }
    }, [check]);
    useEffect(() => {
        document.title = 'Model Object Detection'
    }, []);
    return(
        <div className={classNames('Coco', {'Coco1': check.length !== 0})}>
            <div className={classNames('background', {'background1': imgData}, {'background2': vidData})}></div>
            <div className='contain'>
                <div className='frame1'><img src={frame1} alt='frame1' /></div>
                <div className='frame2'><img src={frame2} alt='frame2' /></div>
                {check !== '' && <div className='frame3'><img src={frame3} alt='frame3' /></div>}
                <div className='contain1'>
                    <h3>CocoSSD object detection (80 label):</h3>
                    {check.length === 0 && <p>Wait a second to inital Model AI</p>}
                    {check === 'webcam' && <p>Wait a second to inital Webcam!!</p> }
                    {check === 'file' && <p>Wait a second to process</p>}
                </div>
                <div className='contain2'>
                    <h6>Choose</h6>
                    <div>
                        <button onClick={() => setCheck('webcam')}>Webcam</button>
                        <button onClick={() => setCheck('file')}>Upload File</button>
                    </div>
                </div>
                {check === 'webcam' && <div className='webcam-wrap'>
                    <Webcam
                    mirrored ={true}
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
                        maxWidth: '100%',
                    }}
                    />
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
                }
                {check === 'file' && <div className='input-wrap'>
                    <div>
                        <input type='file' onChange={handleChange} ref={fileInputRef}  />
                        <div className='frame'>
                            {imgData && <img src={imgData} alt='file' ref={imageRef} 
                                style={{
                                    position: "absolute",
                                    marginLeft: "auto",
                                    marginRight: "auto",
                                    left: 0,
                                    right: 0,
                                    textAlign: "center",
                                    zindex: 9,
                                    width: 480,
                                    height: 640,
                                    maxWidth: '100%'
                                }}
                            />}
                            {imgData && <canvas ref={canvasRef} 
                                style={{
                                    position: "absolute",
                                    marginLeft: "auto",
                                    marginRight: "auto",
                                    left: 0,
                                    right: 0,
                                    textAlign: "center",
                                    zindex: 9,
                                    width: 480,
                                    height: 640,
                                    maxWidth: '100%'
                                }}
                            /> }
                            {vidData && <Player
                            playsInline
                            src={vidData}
                            ref={videoRef}
                            
                            />}
                            {vidData && <canvas ref={canvasRef} 
                                style={{
                                    position: "absolute",
                                    marginLeft: "auto",
                                    marginRight: "auto",
                                    left: 0,
                                    right: 0,
                                    top: 200,
                                    textAlign: "center",
                                    zIndex: 9,
                                    maxWidth: '100%'
                                }}
                            /> }
                            
                        </div>
                    </div>
                </div>}
            </div>
        </div>
    )
}
export default Coco