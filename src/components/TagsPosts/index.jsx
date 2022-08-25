import React from "react";
import styles from './TagsPosts.module.scss'
import clsx from 'clsx';
import CommentIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import EyeIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import {Link} from "react-router-dom"
import { UserInfo } from "../UserInfo";
import { PostSkeleton } from "../Post/Skeleton";

export const TagsPosts = ({title, isLoading, isFullPost, user, id, createdAt, imageUrl, tags, children, viewsCount,  commentsCount}) => {
    if (isLoading) {
        return <PostSkeleton />;
    }
    return (
        <div className={clsx(styles.root, { [styles.rootFull]: isFullPost })}>
                  {imageUrl && (
                    <img
                    className={clsx(styles.image, { [styles.imageFull]: isFullPost })}
                    src={imageUrl}
                    alt={title}
                    />
                    )}
            <div className={styles.wrapper}>
                <UserInfo {...user} additionalText={createdAt} />
                <div className={styles.indention}>

                    <h2 className={clsx(styles.title, { [styles.titleFull]: isFullPost })}>
                        {isFullPost ? title : <Link to={`/posts/${id}`}>{title}</Link>}
                    </h2>
                    <ul className={styles.tags}>
                        {tags.map((name) => (
                        <li key={name}>
                            <Link to={`/tag/${name}`}>#{name}</Link>
                        </li>
                        ))}
                    </ul>
                        <ul className={styles.postDetails}>
                            <li>
                            <EyeIcon />
                            <span>{viewsCount}</span>
                            </li>
                            <li>
                            <CommentIcon />
                            <span>{commentsCount}</span>
                            </li>
                        </ul>
                </div>
            </div>
        </div>
    )
}