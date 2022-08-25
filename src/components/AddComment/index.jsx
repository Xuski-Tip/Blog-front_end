import React from "react";
import {useParams} from "react-router-dom"
import styles from "./AddComment.module.scss";
import axios from '../../axios.js'
import { useDispatch, useSelector} from 'react-redux';
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { selectIsAuth } from "../../redux/slices/auth";
import { fetchGetComments} from "../../redux/slices/Comments";

export const Index = () => {
  const dispatch = useDispatch()
  const {id} = useParams()
  const isAuth = useSelector(selectIsAuth)
  const [text, setText] = React.useState('');
  const [data, setData] = React.useState([])
  React.useEffect(() => {
    axios.get(`/auth/me`).then((res)=> {
      setData(res.data)
    }).catch(err => {
      console.warn(err);
      alert('Ошибка при получений статьи')
    })
    
  }, [])
  const PutComments = async(event) => {
    event.preventDefault();
    try{
      const fields = {
        text,
        post: id
      }
      const {data} = await axios.post('/comments', fields)
      dispatch(fetchGetComments(id))
    }catch(err) {
      console.warn(err)
      alert('Ошибка при созданий статьи!')
    }
  }
  return (
    <>
       {!isAuth ? <div></div> : <form>
        <div className={styles.root}>
          {data.avatarUrl && (
            <Avatar className={styles.avatarImg} src={data.avatarUrl ? `${process.env.REACT_APP_API_URL}${data.avatarUrl}` : ''} alt="Uploaded"></Avatar>
          )}
          <div className={styles.form}>
            <TextField
              onChange={(e) => setText(e.target.value)}
              value={text}
              label="Написать комментарий"
              variant="outlined"
              maxRows={10}
              multiline
              fullWidth
            />
            <Button onClick={PutComments} disabled={!isAuth} type="submit" variant="contained">Отправить</Button>
          </div>
        </div>
      </form>}
    </>
  );
};
