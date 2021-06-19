import React, { useState, useEffect } from 'react';
import bg from '../../img/bg2.jpg';
import '../../styles/Model.css';

const Model = () => {

    useEffect(() => {
        document.title = 'Model'
    }, []);
    return(
        <div className='Model'>
            <div className='container'>
                <div className='background'>
                    <img src={bg} alt='background' />
                </div>
                <div className='body'>
                    <div>                   
                        <h5>This is my model and model api tensorflowjs: </h5>
                    </div>
                    <div className='list-model'>
                        <a href='/model/cocossd'>Object detection</a>
                        <a href='/model/facemesh'>Face land mark</a>
                        <a href='/model/predictAge'>Predict Age</a>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Model