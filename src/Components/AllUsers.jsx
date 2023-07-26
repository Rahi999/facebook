import React, { useEffect, useState } from "react";
import { Box, VStack, Avatar, Text } from '@chakra-ui/react';
import ChatLists from "./ChatLists";
import axios from "axios";
import { getCookies } from "../utils/getData";
import { Navigate, useNavigate } from "react-router-dom";
import Loading from "./Loading";
import ChatList from "./ChatList";

const AllUsers = () => {

    const [users, setUsers] = useState(null);
    const [loading, setLoading] = useState(null)
    const token = getCookies("fb_token")
    const userId = getCookies("userId")
    const navigate = useNavigate()

    useEffect(() => {
        if (token) {
            setLoading(true);
            axios.get(`${process.env.REACT_APP_DEV_BASE_URL}/profile/getAllUsers`, { headers: { "Authorization": `${token}` } })
                .then((res) => {
                    setUsers(res.data.reverse())
                    console.log(res.data)
                    setLoading(false)
                })
                .catch((err) => {
                    console.log(err)
                    setLoading(false)
                })
        }
        else {
            navigate("/login")
        }
    }, [])

    // const users = [
    //     { id: "1", firstname: "Name", surename: "lastname", profile_pic: "demo_img.png" },
    //     { id: "2", firstname: "Name", surename: "lastname", profile_pic: "demo_img.png" }
    // ]
    return loading ? (<Loading />) : (<>
        <Box>
            {users && <ChatLists users={users} />}
        </Box>
    </>)

}
export default AllUsers