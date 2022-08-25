import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import Grid from '@mui/material/Grid';
import axios from '../axios.js'
import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';
import { fetchPosts, fetchTags} from '../redux/slices/posts.js';
import { fetchGetAllComments} from "../redux/slices/Comments";
import {Link} from "react-router-dom"
import { PopularPosts } from '../components/index.js';
import './pages.scss'
export const Home = () => {
  const dispatch = useDispatch()
  const {posts, tags} = useSelector(state => state.posts)
  const SortPosts = useSelector(state => state.posts.SortPosts)

  const {comments} = useSelector(state => state.comments)
  const [commentIsLoading, setCommentIsLoading] = React.useState(true)
  const userData = useSelector(state => state.auth.data)
  const [value, setValue] = React.useState('1');
  const isCommentsLoading = comments.status === 'loading'
  const isPostsLoading = posts.status === 'loading';
  const isTagsLoading = tags.status === 'loading';
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  React.useEffect(()=> {
    if(comments) {
      setCommentIsLoading(false)
    }
    dispatch(fetchGetAllComments())
    dispatch(fetchPosts())
    dispatch(fetchTags())
  }, [])
  return (
    <>
        
      <TabContext value={value}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Новые" value="1" />
            <Tab label="Популярные" value="2" />
          </TabList>
        <TabPanel value="1">


        <Grid container spacing={4}>
        <Grid xs={8} item>
          {( isPostsLoading ? [...Array(5)] : posts.items).map((obj, index) => isPostsLoading ? (<Post isLoading = {true} key={index}></Post>) 
          :(<Post
          key={obj._id}
          id={obj._id}
          title={obj.title}
          imageUrl={obj.imageUrl ? `${process.env.REACT_APP_API_URL}${obj.imageUrl}` : ''}
          user={obj.user}
          createdAt={obj.createdAt}
          viewsCount={obj.viewsCount}
          commentsCount={obj.commentsCount}
          tags={obj.tags}
          isEditable={userData?._id === obj.user._id}
        />)
           )}
        </Grid>
        <Grid xs={4} item>
          <>
          <TagsBlock items={tags.items} isLoading={isTagsLoading} />
          {
            isCommentsLoading ? <div></div> : <CommentsBlock items = {comments.items} isLoading = {commentIsLoading}/>
          }
          </>
        </Grid>
      </Grid>


        </TabPanel>
        <TabPanel value="2">
          <PopularPosts 
          tags={tags} 
          userData={userData} 
          isTagsLoading={isTagsLoading} 
          isPostsLoading={isPostsLoading} 
          isCommentsLoading={isCommentsLoading} 
          comments={comments} 
          SortPosts={SortPosts} 
          commentIsLoading={commentIsLoading}/>
        </TabPanel>
      </TabContext>
      
    </>
  );
};
