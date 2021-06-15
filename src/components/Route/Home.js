import React from 'react';
import '../../styles/Home.css';
import bg from '../../img/bg7.jpg'
import { faMoon } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Home = () => {
    return(
        <div className='Home'>
            <div className='container'>
                <div className='background'>
                    <img src={bg} alt='background' />
                </div>
                <div className='body'>
                    <h5>
                        <span className='logo-icon'><FontAwesomeIcon icon={faMoon} /></span>
                        Thaidaik
                    </h5> 
                    <div>
                        <p>Welcome to my portfolio! Here, you can know more about me and test  my models ai! :D :D </p>
                    </div>
                    <button>Comming soon!</button>
                    <div className='TungCua1'>
                        <p>谋</p>
                        <p>事</p>
                        <p>在</p>
                        <p>人</p>
                        <p>成</p>
                        <p>事</p>
                        <p>在</p>
                        <p>天</p>
                    </div>
                    <div className='TungCua2'>
                        <p>阮</p>
                        <p>文</p>
                        <p>泰</p>
                    </div>
                    <div className='IngLit'>
                        <p>Keep</p>
                        <p>It</p>
                        <p>Simple</p>
                        <p>And</p>
                        <p>Study!</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Home;