import React from 'react';
import {Link} from "react-router-dom"
import { useDispatch, useSelector} from 'react-redux';
import Button from '@mui/material/Button';
import axios from '../../axios.js'
import styles from './Header.module.scss';
import Avatar from '@mui/material/Avatar';
import Container from '@mui/material/Container';
import { logout, selectIsAuth} from '../../redux/slices/auth';


export const Header = () => {
  const dispatch = useDispatch()
  const dataUser = useSelector(state => state.auth)
  const isAuth = useSelector(selectIsAuth);
  const onClickLogout = () => {
    if(window.confirm("Вы действительно хотите выйти?")) {
      dispatch(logout())
      window.localStorage.removeItem('token')
    }
  };
  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link className={styles.logo} to="/">
            <div>Shavkatov blog</div>
          </Link>
          <div className={styles.buttons}>
            {isAuth ? (
              <>
                <Avatar sx={{ width: 35, height: 35 }} src={dataUser.data.avatarUrl ? `${process.env.REACT_APP_API_URL}${dataUser.data.avatarUrl}` : ''} alt="Uploaded"/>
                <Link to="/add-post">
                  <Button variant="contained">Написать статью</Button>
                </Link>
                <Button onClick={onClickLogout} variant="contained" color="error">
                  Выйти
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outlined">Войти</Button>
                </Link>
                <Link to="/register">
                  <Button variant="contained">Создать аккаунт</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
