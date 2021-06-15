import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import avt from '../img/panda.png';
import { Link, useHistory } from 'react-router-dom';
import '../styles/Navbar.css';


const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

export default function TemporaryDrawer(props) {
  const history = useHistory();
  const { avt } = props;
  const classes = useStyles();
  const [state, setState] = React.useState({
    right: false,
  });



  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ right: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List >
          <ListItem button key='z1'>
              <div>
                <img src={avt} alt='avt' className='avt-user' width={40} />
              </div>
          </ListItem>
      </List>
      <Divider />
      <List >
            <Link to='/creator' className='Link-nav'>
              <ListItem button key='z2' className='Link-item'>
                About me
              </ListItem>
            </Link>
          <Link to="/home" className='Linkz'>
            <ListItem button key='z3' className='Link-item Link-Mobile'>
              Home
            </ListItem>
          </Link>
          <Link to="/model" className='Linkz'>
            <ListItem button key='z3' className='Link-item Link-Mobile'>
              Models
            </ListItem>
          </Link>
      </List>
    </div>
  );

  return (
    <div>
        <React.Fragment key='right'>
            <img src={avt} alt='avt' className='avt-user' width={40} 
              
              onClick={toggleDrawer('right', true)}
            />
          <Drawer anchor='right' open={state['right']} onClose={toggleDrawer('right', false)}>
            {list('right')}
          </Drawer>
        </React.Fragment>
    </div>
  );
}
