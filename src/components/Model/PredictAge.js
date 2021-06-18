import React, { useRef, useEffect, useState } from 'react';
import * as tf from "@tensorflow/tfjs";
import * as tfvis from '@tensorflow/tfjs-vis';  
import * as facemesh from "@tensorflow-models/face-landmarks-detection";
import Webcam from "react-webcam";
import frame1 from '../../img/frame10.png';
import '../../styles/PredictAge.css';
import classNames from 'classnames';


const PredictAge = () => {

    const [imgData, setImgData] = useState(null);
    const [age, setAge] = useState(null);
    const imageRef = useRef(null);
    //const canvasRef = useRef(null);
    const fileInputRef = useRef(null);

    const readImage = (file) => {
        return new Promise((rs, rj) => {
          const fileReader = new FileReader();
          fileReader.onload = () => rs(fileReader.result);
          fileReader.onerror = () => rj(fileReader.error);
          fileReader.readAsDataURL(file);
        });
    };

    const argMax = (array) => {
        return [].map.call(array, (x, i) => [x, i]).reduce((r, a) => (a[0] > r[0] ? a : r))[1];
      
    }
    const runPredictAge = async () => {
        //const baseModel = await tf.loadLayersModel('/tfjs3/model.json')
        //console.log(baseModel.summary())
        //const featureModel = tf.model({inputs: baseModel.input, outputs: baseModel.getLayer[-2].output})
        // OLD MODEL
        // const net = await facemesh.load({
        //   inputResolution: { width: 640, height: 480 },
        //   scale: 0.8,
        // });
        // NEW MODEL
        const net = await tf.loadLayersModel('/tfjs4/model.json');  
        tfvis.show.modelSummary({name: 'Model Summary'}, net);
        console.log(net)
        //const imageData = await readImage(value);
        //setImgData(imageData);
        if (imgData) {
            console.log(imgData)
            const imageElement = document.createElement("img");
            imageElement.src = imgData;
            detect(net, imageElement);
        }
      };
    const detect = async (net, element) => {
        imageRef.current.width = element.width;
        imageRef.current.height = element.height;

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
        console.log(output.dataSync());
        const tensorOutput = output.dataSync();
        const agePredict = argMax(tensorOutput);
        console.log(agePredict);
        setAge(agePredict + 4);

        const imageSrc = element.src;
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
                }).catch(err => {
                    console.log("An Error Occured While Uploading")
                })
        //const ctx = canvasRef.current.getContext("2d");
        //drawRect1(output, ctx)
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
        <div className={classNames('PredictAge', {'PredictAge1': imgData})}>
            <div className='container'>
                <div className='background'></div>
                <div className='frame1'><img src={frame1} alt='frame1' /></div>
                <div className='contain1'>
                    <h3>Face Predict Age :</h3>
                    <p>Wait a second to inital Model AI</p>
                    
                </div>
                <div className='contain2'>
                    {age && <div className='predict'>
                        <h5>Your age is:  </h5>
                        <p>{age}</p>
                    </div>}
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
                                maxWidth: '100%'
                            }}
                        />}
                        
                </div>
            </div>
        </div>
        </div>
    )
}
export default PredictAge;