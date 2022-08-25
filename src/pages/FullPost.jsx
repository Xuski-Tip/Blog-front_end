import React from "react";
import {useParams} from "react-router-dom"
import { useDispatch, useSelector} from 'react-redux';
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import axios from '../axios'
import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import { fetchGetComments} from "../redux/slices/Comments";
export const FullPost = () => {
  const dispatch = useDispatch()
  const {comments} = useSelector(state => state.comments)
  const [trueComments, userTrueComments] = React.useState(true)
  const [data, setData] = React.useState([])
  const [isLoading, setLoading] = React.useState(true)
  const {id} = useParams()
          // Изменение счетчика коментариев 
          try{
            const fields = {
              commentsCount:comments.items.length
            }
            const {data} = axios.post(`/posts/${id}`, fields)
          }catch(err) {
            console.warn(err)
            alert('Ошибка в возврате комментария')
          }
          //  
  React.useEffect(()=> {
    dispatch(fetchGetComments(id))
    if(comments) {
      userTrueComments(false)
    }
    axios.get(`/posts/${id}`).then((res)=> {
      setData(res.data)
      setLoading(false)
    }).catch(err => {
      console.warn(err);
      alert('Ошибка при получений статьи')
    })
  }, [])
  if(isLoading) {
    return <Post isLoading={isLoading} isFullPost/>
  }
  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        imageUrl={data.imageUrl ? `${process.env.REACT_APP_API_URL}${data.imageUrl}` : ''}
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={comments.items.length}
        tags={data.tags}  
        isFullPost
      >
        <ReactMarkdown children={data.text}></ReactMarkdown>
      </Post>
      <CommentsBlock items = {comments.items} isLoading = {trueComments}>
      <Index />
      </CommentsBlock>
    </>
  );
};
