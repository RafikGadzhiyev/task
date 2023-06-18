import styled from '@emotion/styled'
import { Text } from '../elements/Text';
import { OutlinedButton, TextButton } from '../elements/Buttons';
import { TbArrowBarToRight } from 'react-icons/tb'
import { BiMessageAltMinus } from 'react-icons/bi'
import { IoSettingsOutline, IoStarOutline, IoStar } from 'react-icons/io5'
import { motion } from 'framer-motion'
import { IMedia } from '../interfaces/store.interface';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { toggleFavorite } from '../redux/slices/posts.slice';

const Container = styled.div`
    border-radius: 5px;
    background-color: rgb(255 255 255 / 1);
    min-height: 100px;
    padding: .5rem .5rem 1rem;  
`

const Header = styled.header`
    display: flex;
    align-items: flex-start;
    gap: .65rem;
`;

const Main = styled.main`
    display: grid;
    grid-template-columns: auto 1fr;
    margin-top: .25rem;
    gap: 0 .5rem;
`;

const Footer = styled.footer`
    margin-top: .5rem;
`;

const TagsContainer = styled.div`
    display: flex;
    gap: .4rem;
    align-items: center;
`;

const AuthorInfo = styled.div`
    margin-right: auto;
    display: flex;
    flex-direction: column;
`;

const ButtonsContainer = styled.div`
    display: flex;
    height: 100%;
    align-items: center;
    gap: .5rem;
`
const IconsContainer = styled.div`
    display: flex;
    align-items: center;
    height: 100%;
    margin-left: .75rem;
    color: #cdcdcd;
    font-size: 1.25rem;
    gap: .15rem;
`;

const MediaContentContainer = styled(motion.div)`
    border-radius: 10px;
    width: 260px;
    height: 150px;
    background-color: #808080;
    grid-column: 2/-1;
    margin-top: .25rem;
`;

const OptionIcon = styled.span`
    cursor: pointer;
    transition: 300ms ease-in;

    &:hover {
        color: #0088ee;
    }
`

const PostTimeBlock = styled.div`
`
const MediaImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`

const MediaVideo = styled.video`
    width: 100%;
    height: 100%;
`;

interface IProps {
    profilePictureURL: string
    username: string
    postDescription: string
    postContent: string
    tags: Array<{ id: string, value: string }>
    postMedia: IMedia | null,
    postTime: string
    postIndex: number,
    isFavorite: boolean
    id: string
}

export const Post: React.FC<IProps> = ({ postContent, postDescription, postMedia, profilePictureURL, tags, username, postTime, postIndex, isFavorite, id }) => {
    const dispatch = useDispatch<AppDispatch>();

    return <>
        <motion.li
            initial={{
                scale: 0,
                opacity: 0
            }}
            animate={{
                scale: 1,
                opacity: 1
            }}
            exit={{
                scale: 0,
                opacity: 0
            }}
            layout
        >
            <Container>
                <Header>
                    <img src={profilePictureURL} alt='user profile icon' />
                    <AuthorInfo>
                        <Text
                            color='#808080'
                            fontSize='md'
                            fontStyle='normal'
                        >
                            {username}
                        </Text>
                        <Text
                            color='#808080'
                            fontSize='s'
                            fontStyle='italic'
                        >
                            {postDescription}
                        </Text>
                    </AuthorInfo>
                    <ButtonsContainer>
                        <OutlinedButton
                            color='#0088ee'
                            fontSize='s'
                            fontStyle='normal'
                        >Левый</OutlinedButton>
                        <OutlinedButton
                            color='#0088ee'
                            fontStyle='normal'
                            fontSize='s'
                        >Центр</OutlinedButton>
                        <OutlinedButton
                            color='#0088ee'
                            fontStyle='normal'
                            fontSize='s'
                        >Правый</OutlinedButton>
                    </ButtonsContainer>
                    <IconsContainer>
                        <OptionIcon>
                            <TbArrowBarToRight />
                        </OptionIcon>
                        <OptionIcon>
                            <BiMessageAltMinus />
                        </OptionIcon>
                        <OptionIcon>
                            <IoSettingsOutline />
                        </OptionIcon>
                        <OptionIcon
                            onClick={() => dispatch(toggleFavorite(id))}
                            style={isFavorite ? { color: "#0088ee" } : {}}
                        >
                            {
                                isFavorite ? <IoStar /> : <IoStarOutline />
                            }
                        </OptionIcon>
                    </IconsContainer>
                </Header>
                <Main>
                    <PostTimeBlock>
                        <Text
                            color='#808080'
                            fontSize='s'
                        >{postTime}</Text>
                    </PostTimeBlock>
                    <Text
                        color='#000'
                    >{postContent}</Text>
                    <div
                        style={{
                            gridColumn: '2/-1'
                        }}
                    >
                        <TextButton
                            color='#808080'
                            fontSize='s'
                        >Далее</TextButton>
                    </div>
                    {
                        postMedia &&
                        <MediaContentContainer
                            layoutId={postIndex + ''}
                        >
                            {postMedia.type === 'image' && <MediaImage src={postMedia.url} alt='post image' />}
                            {postMedia.type === 'video' &&
                                <MediaVideo src={postMedia.url} preload='true' controls></MediaVideo>}
                        </MediaContentContainer>
                    }
                </Main>
                <Footer>
                    <TagsContainer>
                        {
                            tags.map(tag => <Text
                                color='#0088ee'
                                fontSize='s'
                                key={tag.id}
                            >{tag.value}</Text>)
                        }
                    </TagsContainer>
                </Footer>
            </Container>
        </motion.li>


    </>
}