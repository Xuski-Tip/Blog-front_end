import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import {useForm} from 'react-hook-form'
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import axios from '../../../src/axios.js';
import Avatar from '@mui/material/Avatar';
import styles from './Login.module.scss';
import { fetchRegister, selectIsAuth } from "../../redux/slices/auth";

export const Registration = () => {
  const isAuth = useSelector(selectIsAuth)
  const dispatch = useDispatch()
  const {register, handleSubmit, formState: {errors, isValid}} = useForm({
    mode: 'onChange',
  });
  const onSubmit = async(values) => {
    const formData = new FormData();
    const file = values.avatarUrl[0];
    formData.append('userIMG', file);
    const {data}  = await axios.post('/userimg', formData)
    values.avatarUrl = data.url
    const dataFile = await dispatch(fetchRegister(values))
    if(!dataFile.payload) {
      return alert('не удалось зарегестрироваться')
    }
    if('token' in dataFile.payload) {
      window.localStorage.setItem('token', dataFile.payload.token)
    }
  }

  if(isAuth) {
    return <Navigate to="/"></Navigate>
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Создание аккаунта
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
      <TextField 
      error= {Boolean(errors.fullName?.message)}
      helperText={errors.fullName?.message}
      {...register('fullName', {required: 'Укажите полное имя'})}
      className={styles.field} 
      label="Полное имя" 
      fullWidth />
      <TextField 
      error= {Boolean(errors.email?.message)}
      helperText={errors.email?.message}
      type='email'
      {...register('email', {required: 'Укажите почту'})}
      className={styles.field} label="E-Mail" fullWidth />
      <TextField 
      error= {Boolean(errors.password?.message)}
      helperText={errors.password?.message}
      type='password'
      {...register('password', {required: 'Укажите пароль'})}
      className={styles.field} label="Пароль" fullWidth />
      <label className={styles.input_file}>
        <TextField  {...register('avatarUrl')}  type="file"/>
        <span className={styles.input_file_btn}>Выберите Аватарку</span>           
	   	  <span className={styles.input_file_text}>Макс 10мб</span>
 	    </label>
      <Button disabled={!isValid} type="submit" size="large" variant="contained" fullWidth>
        Зарегистрироваться
      </Button>
      </form>
    </Paper>
  );
};
