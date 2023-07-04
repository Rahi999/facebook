import React, { useEffect, useState } from "react";
import { Box, VStack, Avatar, Text } from '@chakra-ui/react';
import ChatLists from "./ChatLists";
import axios from "axios";
import { getCookies } from "../utils/getData";
import { Navigate, useNavigate } from "react-router-dom";
import Loading from "./Loading";
import ChatList from "./ChatList";

const Chat = () => {

    const [users, setUsers] = useState(null);
    const [following, setFollowing] = useState(null)
    const [loading, setLoading] = useState(null)
    const token = getCookies("fb_token")
    const userId = getCookies("userId")
    const navigate = useNavigate()

    useEffect(() => {
      document.title = "Facebook | Chat with your friends"
        if(token){
            setLoading(true);
        axios.get(`${process.env.REACT_APP_DEV_BASE_URL}/profile/getAllUsers`, { headers: { "Authorization": `${token}` } })
        .then((res) => {
            setUsers(res.data.reverse())
            // setFollowing(res.data.following.reverse())
            console.log(res.data)
            setLoading(false)
        })
        .catch((err) => {
            console.log(err)
            setLoading(false)
        })
        }
        else{
            navigate("/login")
        }
    }, [])

    // const users = [
    //     { id: "1", firstname: "Name", surename: "lastname", profile_pic: "demo_img.png" },
    //     { id: "2", firstname: "Name", surename: "lastname", profile_pic: "demo_img.png" }
    // ]
    return loading ? (<Loading />):  (<>
        <Box>
            {users && <ChatList users={users} />}
            {/* { following && <ChatList users={following} />} */}
        </Box>
    </>) 
    // : 
    // (
    //     <Box mt='20'  textAlign={'left'}>
    //     <Text fontSize={{base: "14px", sm: "15px", md: "16px", lg: "18px", xl: "18px"}}>
    //         Please follow someone to chat with him
    //     </Text>
    // </Box>
    // )
}
export default Chat