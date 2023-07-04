import { Avatar, Box, Button, Flex, Input, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { getCookies } from "../utils/getData";
import axios from "axios";

const AddComment = ({postId, profile_pic, getPost}) => {

  const [loading, setLoading] = useState(false)
  const [newComment, setNewComment] = useState("");
  const toast = useToast()
  const userId = getCookies("userId")
  const token = getCookies('fb_token')

  const [currentDateTime, setCurrentDateTime] = useState(new Date());
    const options = {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    };
    const formattedDateTime = currentDateTime.toLocaleString('en-US', options);

    useEffect(() => {
      document.title = "Facebook | Add comments to your frient's post"
    }, [])

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };
  console.log("profile_pix: ", profile_pic)

  const handleAddComment = () => {
    if(newComment){
      setLoading(true)
        const payload = {
            comment: newComment,
            postId: postId,
            user: userId,
            commentAt: formattedDateTime
        }
        axios.put(`${process.env.REACT_APP_DEV_BASE_URL}/post/comment`, payload, { headers: { "Authorization": `${token}` } })
        .then((res) => {
          getPost()
          setLoading(false)
        })
        .catch((err) => {
            toast({
                description: err.response.data.message,
                position: "top",
                status: "error",
                duration: 3000,
                isClosable: true
            })
            setLoading(false)
        })
    }
    else{
        toast({
            description: "Can't create empty comment",
            position: "top",
            status: "info",
            duration: "3000",
            isClosable: false
        })
    }
    
  };
    
    return (
        <>
        <Box>
        <Flex mb={4}>
        <Avatar src={profile_pic} size="sm" mr={2} />
        <Input
          flex="1"
          // bg="white"
          borderRadius="full"
          borderWidth="1px"
          borderColor="gray.200"
          placeholder="Write a comment..."
          value={newComment}
          onChange={handleCommentChange}
        />
        <Button
          colorScheme="blue"
          borderRadius="full"
          px={6}
          ml={4}
          onClick={handleAddComment}
          disabled={loading}
        >
          {loading ? "Commenting..." : "Comment"}
        </Button>
      </Flex>
        </Box>
        </>
    )
}
export default AddComment