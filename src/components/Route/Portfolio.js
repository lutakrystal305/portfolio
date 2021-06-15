import React, { useState } from 'react';
import '../../styles/Portfolio.css';
import classNames from 'classnames';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faAddressCard, faPhone, faGlobeAsia, faReply, faMedal, faBriefcase, faGraduationCap, faBiking, faCheck } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faYoutube, faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';
import { Progress } from 'reactstrap';
import Rating from '../Rating1';
import z from '../../img/z.jpg';
import onepiece from '../../img/1.jpg';
import dog from '../../img/2.jpg';
import coding from '../../img/3.png';
import hangout from '../../img/4.jpg';
import music from '../../img/5.jpg';
import football from '../../img/6.jpg';

const Portfolio = () => {
    const [check, setCheck] = useState(1);
    return(
        <div className='Portfolio'>
            <div className='background'></div>
            <div className='container'>
                <header className='header'>
                    <div className='top-menu'>
                        <div className='menu-container'>
                            <ul className='menu'>
                                <li className='bio' onClick={() => setCheck(1)}>
                                    <a href='#bio' className={classNames('link-menu', {'on-menu': check === 1})}>
                                        <span className='icon-menu icon-bio'>
                                            <FontAwesomeIcon icon={faUser} />
                                        </span>
                                        Bio
                                    </a>
                                </li>
                                <li className='resume' onClick={() => setCheck(2)}>
                                    <a href='#resume' className={classNames('link-menu', {'on-menu': check === 2})}>
                                        <span className='icon-menu icon-resume'>
                                            <FontAwesomeIcon icon={faAddressCard} />
                                        </span>
                                        Resume
                                    </a>    
                                </li>
                                <li className='work' onClick={() => setCheck(3)}>
                                    <a href='#work' className={classNames('link-menu', {'on-menu': check === 3})}>
                                        <span className='icon-menu icon-work'>
                                            <FontAwesomeIcon icon={faGlobeAsia} />
                                        </span>
                                        Hobbies
                                    </a>
                                </li>
                                <li className='contact' onClick={() => setCheck(4)}>
                                    <a href='#contact' className={classNames('link-menu', {'on-menu': check === 4})}>
                                        <span className='icon-menu icon-contact'>
                                            <FontAwesomeIcon icon={faPhone} />
                                        </span>
                                        Contact
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </header>
                <div className='card'>
                    <div className='profile'>
                        <div className='profile-content'>
                            <div className='profile-avt'>
                                <img className='img-avt' src={z} alt='avt' />
                            </div>
                            <div className='profile-fake-name'>
                                Luta Krystal
                            </div>
                            <div className='profile-name'>
                                Nguyễn Văn Thái
                            </div>
                            <div className='profile-job'>
                                Author
                            </div>
                            <span className='type-cusor'></span>
                            <div className='profile-social'>
                                <a href='https://github.com/lutakrystal305' target='blank' className='icon-social'>
                                    <FontAwesomeIcon icon={faGithub} />
                                </a>
                                <a href='https://www.facebook.com/lutakrystal305/' target='blank' className='icon-social'>
                                    <FontAwesomeIcon icon={faFacebook} />
                                </a>
                                <a href='https://www.youtube.com/channel/UCjddmzteQBzAvqOSXE9tHKA' target='blank' target='blank' className='icon-social'>
                                    <FontAwesomeIcon icon={faYoutube} />
                                </a>
                                <a href='https://www.instagram.com/lutakrystal/' target='blank' className='icon-social'>
                                    <FontAwesomeIcon icon={faInstagram} />
                                </a>
                            </div>
                        </div>
                        <div className='hireme' onClick={() =>setCheck(4)}>
                            <a href='#'>
                                <span>Hire me</span>
                                <FontAwesomeIcon icon={faReply} />
                            </a>
                        </div>
                    </div>
                </div>
                <div className='overlay'></div>
                <div id='bio' className={classNames('card-infor','card-bio', 'animated', {'fadeInLeft' : check === 1}, {'on': check === 1}, {'fadeOutLeft': check !== 1}, {'hidden': check !== 1})}>
                    <div className='card-wrap'>
                        <div className='bio-content'>
                            <div className='title'>
                                Biography
                            </div>
                            <div className='introduce'>
                                <p>I'm Thai. Now, i am studying at Da Nang University of Technology,
                                     but my major is Food Technology instead of IT.1 year ago, I have started learning about Software. I'm interested in learning more and improve myself. I always wanna be better.</p>
                                     <span className='kiss'>Keep it simple and study!!!</span>
                                <div className='intro-wrap'>
                                    <div>
                                        <span>Age:</span>
                                        <p>21</p>
                                    </div>
                                    <div>
                                        <span>Resident:</span>
                                        <p>Viet Nam</p>
                                    </div>
                                    <div>
                                        <span>Phone Number: </span>
                                        <p>0764323005</p>
                                    </div>
                                    <div>
                                        <span>Adress:</span>
                                        <p>Quang Nam, Viet Nam</p>
                                    </div>
                                </div>
                            </div>
                            <div className='award'>
                                <FontAwesomeIcon icon={faMedal} />
                                <p>Silver Medal in Physical of province </p>
                            </div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                </div>
                <div id='resume' className={classNames('card-infor','card-resume', 'animated', {'fadeInLeft' : check === 2}, {'on': check === 2}, {'fadeOutLeft': check !== 2}, {'hidden': check !== 2})}>
                    <div className='card-wrap'>
                        <div className='resume-content'>
                            <div className='title'>Resume</div>
                            <div className='body'>
                                <div className='experience'>
                                    <div className='head'>
                                        <FontAwesomeIcon icon={faBriefcase} />
                                        <p>experience</p>
                                    </div>
                                    <div className='element-1'>
                                        <p className='time-series'>2/2021-3/2021</p>
                                        <p className='product'>App Message</p>
                                        <p className='caption'>It's my first app on mobile,....</p>
                                    </div>
                                    <div className='element-1'>
                                        <p className='time-series'>11/2020-12/2020</p>
                                        <p className='product'>Web Message</p>
                                        <p className='caption'>it's web that was written by nodejs and socketio."https://kmess.herokuapp.com", you can visit it to know more!</p>
                                    </div>
                                    <div className='element-1'>
                                        <p className='time-series'>9/2020-10/2020</p>
                                        <p className='product'>Ecomerce web</p>
                                        <p className='caption'>It's my first web that i completely created! "https://lutakrystal305.herokuapp.com", you can visit it to know more!</p>
                                    </div>
                                </div>
                                <div className='education'>
                                    <div className='head'>
                                        <FontAwesomeIcon icon={faGraduationCap} />
                                        <p>education</p>
                                    </div>
                                        <div className='element-1'>
                                            <p className='time-series'>9/2018-present</p>
                                            <p className='product'>Da Nang Universty of Technology</p>
                                            <p className='caption'>my major is Food technology</p>
                                        </div>
                                    <div className='element-1'>
                                        <p className='time-series'>9/2015-5/2018</p>
                                        <p className='product'>Nguyen Duy Hieu high school</p>
                                        <p className='caption'>It's best time, it make me be better!</p>
                                    </div>
                                    <div className='element-1'>
                                            <p className='time-series'>9/2011-5/2015</p>
                                            <p className='product'>Nguyen Duy Hieu secondary school</p>
                                            <p className='caption'>I'm a bad student</p>
                                    </div>
                                </div>
                            </div>
                            <div className='content-skill'>
                                <div className='head'>
                                    <p>Skills</p>
                                    <FontAwesomeIcon icon={faBiking} />
                                </div>
                                <div className='skills'>
                                    <div className='skills-self'>
                                        <div className='element-2'>
                                            <p>The ability to communicate</p>
                                            <Progress striped color='success' value={60} />
                                        </div>
                                        <div className='element-2'>
                                            <p>Problem solving</p>
                                            <Progress striped color='success' value={80} />
                                        </div>
                                        <div className='element-2'>
                                            <p>Work independently</p>
                                            <Progress striped color='success' value={80} />
                                        </div>
                                        <div className='element-2'>
                                            <p>Learning new problem</p>
                                            <Progress striped color='success' value={70} />
                                        </div>
                                        <div className='element-2'>
                                            <p>Adaptability</p>
                                            <Progress striped color='success' value={80} />
                                        </div>
                                        <div className='element-2'>
                                            <p>Strong research skill</p>
                                            <Progress striped color='success' value={70} />
                                        </div>
                                        <div className='element-2'>
                                            <p>Organizational skills</p>
                                            <Progress striped color='success' value={50} />
                                        </div>
                                    </div>
                                    <div className='skills-knowledge'>
                                        <div className='head-skills'>
                                            <div className='title-lan'>
                                                <p>Language programming</p>
                                            </div>
                                            <div className='title-knowledge'>
                                                <p>knowledge</p>
                                            </div>
                                        </div>
                                        <div className='skill-wrap' >
                                            <div className='language'>
                                                
                                                <div className='element-3'>
                                                    <p>Javascript</p>
                                                    <FontAwesomeIcon icon={faCheckCircle} />
                                                </div>
                                                <div className='element-3'>
                                                    <p>Python</p>
                                                    <FontAwesomeIcon icon={faCheckCircle} />
                                                </div>
                                                <div className='element-3'>
                                                    <p>C++</p>
                                                    <FontAwesomeIcon icon={faCheckCircle} />
                                                </div>
                                            </div>
                                            <div className='knowledge'>
                                                
                                                <div className='element-3'>
                                                    <FontAwesomeIcon icon={faCheck} />
                                                    <p>algorithm and data structure</p>
                                                </div>
                                                <div className='element-3'>
                                                    <FontAwesomeIcon icon={faCheck} />
                                                    <p>object oriented programming</p>
                                                </div>
                                                <div className='element-3'>
                                                    <FontAwesomeIcon icon={faCheck} />
                                                    <p>Computer vision</p>
                                                </div>
                                                <div className='element-3'>
                                                    <FontAwesomeIcon icon={faCheck} />
                                                    <p>Natural Language Processing</p>
                                                </div>
                                                <div className='element-3'>
                                                    <FontAwesomeIcon icon={faCheck} />
                                                    <p>Machine Learning, Deep Learning</p>
                                                </div>
                                                <div className='element-3'>
                                                    <FontAwesomeIcon icon={faCheck} />
                                                    <p>Web, app developer</p>
                                                </div>
                                                <div className='element-3'>
                                                    <FontAwesomeIcon icon={faCheck} />
                                                    <p>Game 2D basic</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='skill-contain'>
                                            <div className='title-framework'>
                                                <p>FrameWork</p>
                                            </div>
                                            <div className='framework' >
                                                <div className='element-3'>
                                                    <p>Reactjs</p>
                                                    <FontAwesomeIcon icon={faCheck} />
                                                </div>
                                                <div className='element-3'>
                                                    <p>React Native</p>
                                                    <FontAwesomeIcon icon={faCheck} />
                                                </div>
                                                <div className='element-3'>
                                                    <p>Express Nodejs</p>
                                                    <FontAwesomeIcon icon={faCheck} />
                                                </div>
                                                <div className='element-3'>
                                                    <p>Pygame</p>
                                                    <FontAwesomeIcon icon={faCheck} />
                                                </div>
                                                <div className='element-3'>
                                                    <p>Keras</p>
                                                    <FontAwesomeIcon icon={faCheck} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                </div>
                <div id='work' className={classNames('card-infor','card-work', 'animated', {'fadeInLeft' : check === 3}, {'on': check === 3}, {'fadeOutLeft': check !== 3}, {'hidden': check !== 3})}>
                    <div className='card-wrap'>
                        <div className='hobby'>
                            <div className='title'>
                                Hobbies
                            </div>
                            <div className='body'>
                                <div className='element-4'>
                                    <div className='img-hobby'>
                                        <img src={onepiece} className='anime' alt='hobby' />
                                    </div>
                                    <div className='name-hobby'>
                                        <p>Anime</p>
                                        <Rating x={4} />
                                    </div>

                                </div>
                                <div className='element-4'>
                                    <div className='img-hobby'>
                                        <img src={football} className='football' alt='hobby' />
                                    </div>
                                    <div className='name-hobby'>
                                        <p>Football</p>
                                        <Rating x={5} />
                                    </div>

                                </div>
                                <div className='element-4'>
                                    <div className='img-hobby'>
                                        <img src={hangout} className='hangout' alt='hobby' />
                                    </div>
                                    <div className='name-hobby'>
                                        <p>Hang out</p>
                                        <Rating x={3} />
                                    </div>

                                </div>
                                <div className='element-4'>
                                    <div className='img-hobby'>
                                        <img src={dog} className='dog' alt='hobby' />
                                    </div>
                                    <div className='name-hobby'>
                                        <p>Take care of my dog</p>
                                        <Rating x={4} />
                                    </div>

                                </div>
                                <div className='element-4'>
                                    <div className='img-hobby'>
                                        <img src={coding} className='coding' alt='hobby' />
                                    </div>
                                    <div className='name-hobby'>
                                        <p>Coding</p>
                                        <Rating x={4} />
                                    </div>

                                </div>
                                <div className='element-4'>
                                    <div className='img-hobby'>
                                        <img src={music} className='music' alt='hobby' />
                                    </div>
                                    <div className='name-hobby'>
                                        <p>Music</p>
                                        <Rating x={3} />
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id='contact' className={classNames('card-infor','card-contact', 'animated', {'fadeInLeft' : check === 4}, {'on': check === 4}, {'fadeOutLeft': check !== 4}, {'hidden': check !== 4})}>
                    <div className='card-wrap'>
                        <div className='card-contact'>
                            <div className='title'>
                                Contact
                            </div>
                            <div className='map'>
                                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3836.4047949688775!2d108.22215991446774!3d15.94022354711715!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31421aa54ea3830f%3A0xec96076cd8a07706!2sAgribank%20Bac%20Dien%20Ban%20Quang%20Nam!5e0!3m2!1svi!2s!4v1623242320644!5m2!1svi!2s" width={450} height={300} allowfullscreen="" loading="lazy"></iframe>
                            </div>
                            <div className='contact-wrap'>
                                <div>
                                    <span>Address: </span>
                                    <p>91A quoc lo 1A, Viem Tay 2, Dien Thang Bac, Dien Ban, Quang Nam</p>
                                </div>
                                <div>
                                    <span>Phone: </span>
                                    <p>0764323005</p>
                                </div>
                                <div>
                                    <span>Mail: </span>
                                    <p>nguyenvanthai305@gmail.com</p>
                                </div>
                                <div>
                                    <span>Freelancer: </span>
                                    <p>available</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Portfolio
