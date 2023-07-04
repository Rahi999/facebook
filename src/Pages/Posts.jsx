import axios from "axios"
import { Box, Center, Flex, Text, useToast } from "@chakra-ui/react";
import React, { useState, useEffect, useRef } from "react";
import { getCookies } from "../utils/getData";
import { useNavigate } from "react-router-dom"
import PostCard from "../Components/PostCard";
import Loading from "../Components/Loading"
import CreatePost from "../Components/CreatePost";
import Story from "../Components/Story";
import CreateStoryBox from "../Components/CreateStoryBox";

const Posts = () => {

    const [postData, setPostData] = useState(null)
    const navigate = useNavigate()
    const userId = getCookies('userId')
    const token = getCookies('fb_token')
    const theme = localStorage.getItem('chakra-ui-color-mode')
    const toast = useToast()
    const inputRef = useRef(null);

    const getPosts = () => {
        axios.get(`${process.env.REACT_APP_DEV_BASE_URL}/post/get`, { headers: { "Authorization": `${token}` } })
            .then((res) => {
                console.log(res.data)
                setPostData(res.data)
            })
            .catch((err) => {
                toast({
                    title: "User not found.",
                    position: "top",
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                })
                navigate("/login")
            })
    }
    useEffect(() => {
      document.title = "Facebook | Posts by your friends"
        if (userId && token) {
            getPosts()
        }
        else {
            toast({
                title: "User not found.",
                position: "top",
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
            navigate("/login")
        }
    }, [])

    const handleCreateStory = () => {
        const currentScrollY = window.scrollY;
        const targetScrollY = currentScrollY + 150;
        window.scrollTo(0, targetScrollY);
        inputRef.current.focus();

    }

    const boxStyle = {
        border: theme === "light" ? "1px solid white" : "1px solid black"
    };
    return postData ? (
        <Box
          borderRadius="8px"
          width={{ base: "100%", sm: "100%", md: "70%", lg: "55%", xl: "55%" }}
        >
          <Box
            display={{ base: "none", sm: "none", md: "none", lg: "flex", xl: "flex" }}
          >
            <CreateStoryBox handleCreateStory={handleCreateStory} />
            <Story />
          </Box>
          <CreatePost getPosts={getPosts} inputRef={inputRef} />
          {postData &&
            postData.map((el, i) => (
              <Box key={i}>
                {el && el.user && el.user.profile_pic ? (
                  <PostCard
                    user_profile={el.user.profile_pic}
                    user_name={el.user.firstname + " " + el.user.surename}
                    time={el.date}
                    post_text={el.text}
                    post_image={el.images}
                    PostId={el._id}
                    userId={el.user._id}
                  />
                ) : null}
              </Box>
            ))}
        </Box>
      ) : (
        <Loading />
      );
}
export default Posts