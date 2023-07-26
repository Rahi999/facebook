import React, { useEffect, useState } from "react";
import axios from 'axios'
import useSound from "use-sound";
import boopSfx from "../Assets/fb_like.mp3";
import { ListItem, UnorderedList, Box, Button, useToast, IconButton, Tooltip, Text, Flex, AvatarGroup, Avatar } from "@chakra-ui/react";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import Theme from "./Theme";
import "./LikeButton.css"
import { getCookies } from "../utils/getData"
import { Link, useNavigate } from "react-router-dom"

const LikeButton = ({ postId }) => {

    const navigate = useNavigate()
    const userId = getCookies("userId")
    const token = getCookies("fb_token")
    const toast = useToast()
    const [play] = useSound(boopSfx);
    const [liked, setLiked] = useState(false);
    const [loading, setLoading] = useState(false)
    const [like, setLike] = useState(null)
    const [dislike, setDisLike] = useState(null)
    const [comment, setComment] = useState(null)

    useEffect(() => {
        if (!userId) {
            toast({
                title: 'User not found',
                position: "top",
                status: 'error',
                duration: 3000,
            })
            navigate("/dashboard")
        }
    }, [])

    const getPost = () => {
        axios.get(`${process.env.REACT_APP_DEV_BASE_URL}/post/get/${postId}`, { headers: { "Authorization": `${token}` } })
            .then((res) => {
                setLike(res.data.likes)
                setDisLike(res.data.dislikes)
                setComment(res.data.comments)
                // console.log(res.data)
            })
            .catch((err) => {
                toast({
                    title: err.response.data.message,
                    position: "top",
                    status: 'error',
                    duration: 3000,
                })
            })
    }

    useEffect(() => {
        getPost()
    }, [])
    const isLiked = like && like.includes(userId)
    // console.log(isLiked)

    const handleClick = () => {
        if (userId && postId) {
            console.log(userId, postId)
            setLoading(true)
            const payload = { likerId: userId }
            axios.put(`${process.env.REACT_APP_DEV_BASE_URL}/post/like/${postId}`, payload, { headers: { "Authorization": `${token}` } })
                .then((res) => {
                    setLoading(false)
                    play();
                    setTimeout(() => {
                        setLiked(true)
                    }, 100)
                    // navigate("/dashboard")
                    getPost()
                })
                .catch((err) => {
                    setLoading(false)
                    toast({
                        title: err.response.data.message,
                        position: "top",
                        status: 'info',
                        duration: 3000,
                    })
                    setTimeout(() => {
                        setLiked(true)
                    }, 100)
                })
        }
    };
    return (<>
        <Box >
            <Flex justifyContent={'space-between'} width={{ base: "100%", sm: "100%", md: "100%", lg: "100%", xl: "100%" }}>
                <Flex gap={'1'}>
                    <Avatar size="xs" src="https://raw.githubusercontent.com/Rahi999/Facebook-clone/b662483f94dd7d11f03a0fc4c2b807f8ca375bd1/client-codeBase/facebook_frontend_codebase/src/assets/like.svg" />
                    <Text fontWeight={'medium'} color={'gray.600'} fontSize={{ base: "12px", sm: "14px", md: "14px", lg: "16px", xl: "16px" }}>{like && like.length}</Text>
                </Flex>
                <Text fontWeight={'medium'} color={'gray.600'} fontSize={{ base: "12px", sm: "14px", md: "14px", lg: "16px", xl: "16px" }}>{dislike && dislike.length} Dislikes</Text>
                <Link to={`/comments/${postId}`}>
                    <Text fontWeight={'medium'} color={'gray.600'} fontSize={{ base: "12px", sm: "14px", md: "14px", lg: "16px", xl: "16px" }}>{comment && comment.length} Comments</Text>
                </Link>
            </Flex>
            <Box bg="grey" height='2px' borderRadius='50px' mt="10px" ></Box>
            <Box>
                <Box className="react" padding={'1'}>
                    <Box className="react-me">
                        {/* <Button width="28%" fontSize={{ base: "12px", sm: "14px", md: "", lg: "", xl: "" }} className="button"
                        // colorScheme={isLiked || liked ? 'green' : 'blue'}
                        >
                            {isLiked || liked ? 'Liked' : 'Like'}
                            </Button> */}
                        {/* <Tooltip label="Like"> */}
                        <Flex textAlign='left'>
                            <Tooltip label='Like'>
                                <IconButton
                                    isDisabled={isLiked || liked}
                                    className="button"
                                    aria-label="Like"
                                    icon={isLiked || liked ? <AiFillLike /> : <AiOutlineLike />}
                                // colorScheme={isLiked || liked ? "blue" : undefined}

                                />
                            </Tooltip>
                        </Flex>
                        {/* </Tooltip> */}

                        <Box className="inner" onClick={handleClick}>

                            <Box className="react-box" >
                                {isLiked || liked ? null : (<UnorderedList  >
                                    <ListItem className="like" data-hover="like"></ListItem>
                                    <ListItem className="love" data-hover="love"></ListItem>
                                    <ListItem className="haha" data-hover="haha"></ListItem>
                                    <ListItem className="wow" data-hover="wow"></ListItem>
                                    <ListItem className="sad" data-hover="sad"></ListItem>
                                    <ListItem className="angry" data-hover="like"></ListItem>
                                </UnorderedList>)}
                            </Box>

                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    </>)
}
export default LikeButton