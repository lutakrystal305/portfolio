import React, { useRef, useEffect } from 'react';
import * as tf from "@tensorflow/tfjs";
import * as facemesh from "@tensorflow-models/face-landmarks-detection";
import Webcam from "react-webcam";
import { drawMesh } from '../../utils/drawFaceMark';
import '../../styles/FaceMesh.css';
import '../../styles/CheckFace.css';
import frame1 from '../../img/frame9.png';
import frame2 from '../../img/frame4.png';

const FaceMesh = () => {
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);

    const runFacemesh = async () => {
        // OLD MODEL
        // const net = await facemesh.load({
        //   inputResolution: { width: 640, height: 480 },
        //   scale: 0.8,
        // });
        // NEW MODEL
        const net = await facemesh.load(facemesh.SupportedPackages.mediapipeFacemesh);
        setInterval(() => {
          detect(net);
        }, 10);
      };
    const detect = async (net) => {
        if (
            typeof webcamRef.current !== "undefined" &&
            webcamRef.current !== null &&
            webcamRef.current.video.readyState === 4
        ) {
            // Get Video Properties
            const video = webcamRef.current.video;
            const videoWidth = webcamRef.current.video.videoWidth;
            const videoHeight = webcamRef.current.video.videoHeight;

            // Set video width
            webcamRef.current.video.width = videoWidth;
            webcamRef.current.video.height = videoHeight;

            // Set canvas width
            canvasRef.current.width = videoWidth;
            canvasRef.current.height = videoHeight;

            // Make Detections
            // OLD MODEL
            //       const face = await net.estimateFaces(video);
            // NEW MODEL
            const face = await net.estimateFaces({input:video, flipHorizontal: true});
            console.log(face);

            // Get canvas context
            if (face && canvasRef.current) {
                const ctx = canvasRef.current.getContext("2d");
                requestAnimationFrame(()=>{drawMesh(face, ctx)});
            }
        }
    };
    
    useEffect(()=>{runFacemesh()}, []);
    return(
        <div className='FaceMesh'>
            <div>
                <div className='frame1'><img src={frame1} alt='frame1' /></div>
                <div className='frame2'><img src={frame2} alt='frame2' /></div>
                <div>
                    <h3>Face landmark detection :</h3>
                    <p>Wait a second to inital Model AI</p>
                    
                </div>
                <div>
                    <Webcam
                    mirrored={true}
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
            </div>
        </div>
    )
}
export default FaceMesh;