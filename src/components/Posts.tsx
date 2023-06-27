import {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Post} from "./Post"
import styled from '@emotion/styled';
import {checkForNewPost, getFirstPosts} from '../redux/slices/posts.slice';
import {AppDispatch, RootStore} from '../redux/store';
import ProfilePicture from './../assets/icons/Ellipse 1.svg'
import {AnimatePresence} from 'framer-motion';
import {IPost} from '../interfaces/store.interface';

const List = styled.ul`
  display: flex;
  flex-direction: column;
  width: 890px;
  gap: 1rem;
  margin: auto;
  list-style: none;
  padding-top: 1rem;
  height: 100vh;
  overflow: auto;
  padding-right: .5rem;
  border-radius: 5px;
`;

export const Posts = () => {
	const [isLoading, setIsLoading] = useState(false);
	const dispatch = useDispatch<AppDispatch>();
	const posts = useSelector((store: RootStore) => store.posts.data.posts)
	const lastPostId = useRef(0);
	const timerId = useRef<number>(0);

	useEffect(() => {
		setIsLoading(true);
		dispatch(getFirstPosts()).then(() => setIsLoading(false));
		timerId.current = setInterval(
			() => dispatch(checkForNewPost({messageId: lastPostId.current + ''}))
			, 5000
		);
		return () => clearInterval(timerId.current);
	}, [dispatch])

	return <List>
		{
			isLoading ?
				<span>Loading Posts!</span> :
				<AnimatePresence>
					{
						posts.map((post: IPost, index: number) => {
							lastPostId.current = lastPostId.current < post.id ? post.id : lastPostId.current;
							return <Post
								key={post.id}
								id={post.id + ''}
								postIndex={index}
								postDescription={post.channel}
								postContent={post.content}
								postMedia={
									post.attachments.length ?
										{
											type: post.attachments[post.attachments.length - 1].type,
											url: post.attachments[post.attachments.length - 1].url
										}
										: null
								}
								postTime={post.date.slice(11, 16)}
								profilePictureURL={ProfilePicture}
								tags={[]}
								username={post.author}
								isFavorite={post.isFavorite}
							/>
						})
					}
				</AnimatePresence>
		}
	</List>
}