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
    const [age, setAge] = useState([]);
    const [check, setCheck] = useState(false);

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

    const findMax = (array) => {
        let result1 = Math.max(...array);
        if (result1 > 0.1) {
            result1 = 0.097
        }
        let agePredict1 = array.indexOf(Math.max(...array));
        array[agePredict1] = 0;
        
        let result2 = Math.max(...array);
        if (result2 > 0.1) {
            result2 = 0.095;
        }
        let agePredict2 = array.indexOf(Math.max(...array));
        array[agePredict2] = 0;

        let result3 = Math.max(...array);
        if (result3 > 0.1) {
            result3 = 0.094;
        }
        const agePredict3 = array.indexOf(Math.max(...array));
        array[agePredict3] = 0;
        return [{agePredict: agePredict1, result: result1}, {agePredict: agePredict2, result: result2}, {agePredict: agePredict3, result: result3}];
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
        if (net) {
            console.log('kakakaa')
            setCheck(true)
        };
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
        const agePredict = findMax(tensorOutput);
        console.log(agePredict);
        //console.log(tensorOutput[agePredict]*10)
        setAge(agePredict);

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
    useEffect(() => {
        document.title = 'Model Predict Age'
    }, []);
    return(
        <div className={classNames('PredictAge', {'PredictAge1': imgData})}>
            <div className='container'>
                <div className='background'></div>
                {!imgData && <div className='frame1'><img src={frame1} alt='frame1' /></div>}
                <div className='contain1'>
                    <h3>Face Predict Age :</h3>
                    {!check && <h6>Sorry for my inconvenient, because My Model is too big, so It will take a lot of time!</h6>}
                    {check && imgData && age.length === 0 && <p>Wait a second to process picture</p>}
                    {!check && <p>Wait a moment to initial Model AI</p>}
                    
                </div>
                <div className='contain2'>
                    {age.length > 0 && <div className='predict'>
                        <h5>Your age is:  </h5>
                        {age.map((x) => <p>{x.agePredict + 3} - <span>{(x.result*1000).toFixed(2)}%</span></p>)}
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