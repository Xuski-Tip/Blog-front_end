import React from "react";
import Grid from '@mui/material/Grid';
import { useSelector, useDispatch } from 'react-redux';
import { Post } from '../../components/Post';
import { TagsBlock } from '../../components/TagsBlock';
import { CommentsBlock } from '../../components/CommentsBlock';
import {fetchSortPosts } from '../../redux/slices/posts.js';
export const PopularPosts = ({ isTagsLoading, userData, tags, isCommentsLoading,isPostsLoading, SortPosts, comments,  commentIsLoading}) => {
    
    const dispatch = useDispatch()
    React.useEffect(() => {
        dispatch(fetchSortPosts())
    }, [])
    return (
        <Grid container spacing={4}>
        <Grid xs={8} item>
          {( isPostsLoading ? [...Array(5)] : SortPosts.items).map((obj, index) => 
          isPostsLoading ? (<Post 
          isLoading = {true}
          key={index}
          >

          </Post>) 
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
    )
}