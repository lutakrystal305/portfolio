import React, { useRef, useEffect, useState } from 'react';
import * as tf from "@tensorflow/tfjs";
import * as facemesh from "@tensorflow-models/face-landmarks-detection";
import Webcam from "react-webcam";
import { drawRect1 } from '../../utils/drawRect';
import frame1 from '../../img/frame9.png';
import frame2 from '../../img/frame4.png';
import { loadLayersModel } from '@tensorflow/tfjs';


const PredictAge = () => {

    const [imgData, setImgData] = useState(null);
    const [value, setValue] = useState(null);
    const imageRef = useRef(null);
    const canvasRef = useRef(null);
    const fileInputRef = useRef(null);

    const readImage = (file) => {
        return new Promise((rs, rj) => {
          const fileReader = new FileReader();
          fileReader.onload = () => rs(fileReader.result);
          fileReader.onerror = () => rj(fileReader.error);
          fileReader.readAsDataURL(file);
        });
    };

    const runPredictAge = async () => {
        const baseModel = await tf.loadLayersModel('/tfjs3/model.json')
        console.log(baseModel.summary())
        console.log(baseModel.getLayer[1])
        const featureModel = tf.model({inputs: baseModel.input, outputs: baseModel.getLayer[-2].output})
        // OLD MODEL
        // const net = await facemesh.load({
        //   inputResolution: { width: 640, height: 480 },
        //   scale: 0.8,
        // });
        // NEW MODEL
        const net = await tf.loadLayersModel('/tfjs_model/model.json');
        console.log(net)
        //const imageData = await readImage(value);
        //setImgData(imageData);
        if (imgData) {
            console.log(imgData)
            const imageElement = document.createElement("img");
            imageElement.src = imgData;
            detect(featureModel, imageElement);
        }
      };
    const detect = async (net, element) => {
        imageRef.current.width = element.width;
        imageRef.current.height = element.height;
        canvasRef.current.width = element.width;
        canvasRef.current.height = element.height;

        let img = tf.browser.fromPixels(element);
        let normalizationOffset = tf.scalar(255/2); // 127.5
        let tensor = img
                .resizeNearestNeighbor([224, 224])
                .toFloat()
                .sub(normalizationOffset)
                .div(normalizationOffset)
                .reverse(2)
                .expandDims();

        const output = await net.predict(tensor);
        console.log(output);
        console.log()
        const ctx = canvasRef.current.getContext("2d");
        drawRect1(output, ctx)
    };
    const handleChange = (e) => {
        let reader = new FileReader();
        reader.onload = function(e) {
            console.log(reader.result);
            setImgData(reader.result);
        }
        reader.readAsDataURL(e.target.files[0]);
    }
    
    useEffect(()=>{runPredictAge()}, [imgData]);
    return(
        <div className='PredictAge'>
            <div>
               
                <div>
                    <h3>Face Predict Age :</h3>
                    <p>Wait a second to inital Model AI</p>
                    
                </div>
                <div>
                    <input type='file' onChange={handleChange} ref={fileInputRef}  />
                    <div className='frame'>
                        {imgData && <img src={imgData} alt='file' ref={imageRef}  className='pic-input'
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
                            }}
                        /> }
                </div>
            </div>
        </div>
        </div>
    )
}
export default PredictAge;