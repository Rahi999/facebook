import React, { useState } from "react";
import axios from "axios";
import { Box, Text, Button, Image, Tooltip, AvatarGroup, Drawer, Divider, Flex, useToast, Avatar } from "@chakra-ui/react"
import { IconButton } from '@chakra-ui/react';
import { BiCommentDetail } from 'react-icons/bi';
import { AiFillDislike, AiOutlineDislike } from 'react-icons/ai';
import { Link, useNavigate } from "react-router-dom";
import "./Post.css";
import LikeButton from "./Like";
import CreatePost from "./CreatePost";
import { getCookies } from "../utils/getData";
import boopSfx from "../Assets/fb_like.mp3";
import useSound from "use-sound";
import SendMessage from "./SendMessage";
// import "./ImageInput.css";
const PostCard = ({
    user_profile,
    user_name,
    time,
    post_text,
    post_image,
    PostId,
    userId
}) => {

    const toast = useToast()
    const [loading, setLoading] = useState(false)
    const [disliked, setDisLiked] = useState(false)
    const navigate = useNavigate()
    const [selectedImage, setSelectedImage] = useState(null);
    const token = getCookies("fb_token")
    const [play] = useSound(boopSfx);


    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setSelectedImage(URL.createObjectURL(file));
    };

    const handleDislike = () => {
        if (userId && PostId) {
            console.log(userId, PostId)
            setLoading(true)
            const payload = { dislikerId: userId }
            axios.put(`${process.env.REACT_APP_DEV_BASE_URL}/post/dislike/${PostId}`, payload, { headers: { "Authorization": `${token}` } })
                .then((res) => {
                    setLoading(false)
                    play()
                    setTimeout(() => {
                        setDisLiked(true)
                    }, 100)
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
                        setDisLiked(true)
                    }, 100)
                })
        }
    }
    return (
        <Box className="post"
        >
            <Box className="post-header" onClick={() => navigate(`/users-profile/${userId}`)} cursor="pointer">
                <Box className="image-input">
                    <Avatar
                        className="post-avatar"
                        src={user_profile}
                        alt="User Avatar"
                    />
                </Box>
                <Box className="post-info">
                    <h3 className="post-user">{user_name}</h3>
                    <Text className="post-timestamp">{time}</Text>
                </Box>
                {/* <Box ml='40%' width={'40%'}><SendMessage senderId={getCookies("userId")} receiverId={userId} /></Box> */}
            </Box>
            <Box className="post-content">
                <Text className="post-text" fontSize={{ base: "14px", sm: "14px", md: "16px", lg: "16px", xl: "16px" }} maxW={'100%'}>{post_text}</Text>
                <Image className="post-image"
                    src={post_image}
                    objectFit="cover"
                    width="100%"
                    maxHeight="500px"
                    position="relative"
                    alt="Post Image"
                    onClick={() => navigate(`/detailed-image/${encodeURIComponent(post_image)}`)} cursor="pointer"
                />
            </Box>

            {/* <Box className="post-actions"> */}

            <LikeButton postId={PostId} />
            <Box mt="-10" width={{ base: "70%", sm: '70%', md: "55%", lg: "55%", xl: "55%" }} display="flex" textAlign="right" ml={{ base: "30%", sm: "30%", md: "30%", lg: "40%", xl: '40%' }} justifyContent={'space-between'}>
                {/* <Button width={{ base: "70%", sm: "70%", md: "70%", lg: "70%", xl: "30%" }} fontSize={{ base: "12px", sm: "14px", md: "", lg: "", xl: "" }} className="post-share">Share</Button> */}
                <Tooltip label="Dislike" >
                    <IconButton
                        isDisabled={disliked}
                        onClick={handleDislike}
                        aria-label="Dislike"
                        // icon={<AiOutlineDislike />}
                        icon={disliked ? <AiFillDislike /> : <AiOutlineDislike />}
                    //   colorScheme="blue"
                    //   ml={4}
                    />
                </Tooltip>
                {/* <Button width={{ base: "70%", sm: "70%", md: "70%", lg: "70%", xl: "30%" }} fontSize={{ base: "12px", sm: "14px", md: "", lg: "", xl: "" }} className="post-comment">Comment</Button> */}
                <Tooltip label="Comment">
                    <Link to={`/comments/${PostId}`}>
                        <IconButton
                            aria-label="Comment"
                            icon={<BiCommentDetail />}
                        //   colorScheme="blue"
                        //   ml={4}
                        /></Link>
                </Tooltip>
            </Box>
            {/* </Box> */}
        </Box>
    );
};

export default PostCard;
