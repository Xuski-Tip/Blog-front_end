import React from "react";
import styles from './Tags.module.scss'
import { useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom"
import axios from "../../axios";
import Grid from '@mui/material/Grid';
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { TagsPosts } from "../../components";
import { fetchGetAllTags } from "../../redux/slices/getTags";
export const Tags = () => {
    const {id} = useParams()
    const {tags} = useSelector(state => state.tags)
    const dispatch = useDispatch()
    const isTagsLoading = tags.status === 'loading'
    useEffect(()=>{ 
        dispatch(fetchGetAllTags(id))
    }, [])
    
    return (
        <>

            <div className={styles.logo}>{id}</div>
            <div className={styles.wrapper_posts}>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {(( isTagsLoading ? [...Array(5)] : tags.items)).map((item, index) => (
                    isTagsLoading ? (

                        <Grid className={styles.border} item xs={2} sm={4} md={4}>
                            <TagsPosts  isLoading = {true} key={index}>
                            </TagsPosts>
                        </Grid>
                    ) :
                    (<Grid className={styles.border} item xs={2} sm={4} md={4} >
                        <TagsPosts commentsCount={item.commentsCount} viewsCount={item.viewsCount} key={index} title = {item.title} user={item.user} id={item._id} createdAt = {item.createdAt} tags={item.tags} imageUrl = {item.imageUrl ? `${process.env.REACT_APP_API_URL}${item.imageUrl}` : '' }>

                        <ReactMarkdown children={item.text}></ReactMarkdown>
                        </TagsPosts>
                    </Grid>)
                ))}
            </Grid>
            </div>

      </>
    )
}