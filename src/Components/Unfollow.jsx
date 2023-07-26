import React, { useState } from "react";
import axios from "axios";
import { Box, Button, useToast } from "@chakra-ui/react";
import { FaUserMinus } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import { getCookies } from "../utils/getData";

const UnFollow = ({ getUserprofile, userId, followers }) => {

    const [loading, setLoading] = useState(false)
    const toast = useToast()
    const navigate = useNavigate()
    const myId = getCookies("userId");
    const token = getCookies("fb_token")
    // console.log(token)

    // console.log(followers)
    // console.log(following)

    const handleUnFollow = () => {
        if (myId && userId) {
            setLoading(true)
            const payload = {
                userId: myId
            }
            axios.put(`${process.env.REACT_APP_DEV_BASE_URL}/user/unfollow/${userId}`, payload)
                .then((res) => {
                    toast({
                        description: res.data.message,
                        position: "top",
                        status: "success",
                        duration: "3000"
                    })
                    setLoading(false)
                    getUserprofile()
                })
                .catch((err) => {
                    setLoading(false)
                    toast({
                        description: err.response.data.message,
                        position: "top",
                        status: "error",
                        duration: "3000"
                    })
                })

        }
        else {
            toast({
                description: "User not found",
                position: "top",
                status: "error",
                duration: "3000"
            })
            navigate("/dashboard")
        }
    }
    return (<>
        <Box>
            <Button
                onClick={handleUnFollow}
                isDisabled={!followers.includes(myId)}
                title="Unfollow"
                marginTop="10%"
                width="70%"
                flex={1}
                fontSize={'sm'}
                rounded={'full'}
                bg={'red.400'}
                color={'white'}
                boxShadow={
                    '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
                }
                _hover={{
                    bg: 'red.500',
                }}
                _focus={{
                    bg: 'red.500',
                }}>
                {loading ? "Please wait..." : "Unfollow"}
                {/* Unfollow */}

            </Button>
        </Box>
    </>)
}
export default UnFollow