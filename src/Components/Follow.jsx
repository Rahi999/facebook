import React, { useState } from "react"
import axios from "axios"
import { Box, Button, Toast, useToast } from "@chakra-ui/react"
import { getCookies } from "../utils/getData"
import {useNavigate} from "react-router-dom"

const Follow = ({getUserprofile, userId, followers, following}) => {


    const [loading, setLoading] = useState(false)
    const toast = useToast()
    const navigate = useNavigate()
    const myId = getCookies("userId");
    const token = getCookies("fb_token")
    // console.log(token)

    console.log(followers)
    console.log(following)

    const handleFollow = () => {
        if(myId && userId){
            setLoading(true)
            const payload = {
                userId : myId
            }
            axios.put(`${process.env.REACT_APP_DEV_BASE_URL}/user/follow/${userId}`,payload)
            .then((res) => {
                toast({
                    description: res.data.message,
                    position: "top",
                    status: "success",
                    duration: "3000"
                })
                setLoading(false)
                getUserprofile && getUserprofile()
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
        else{
            toast({
                description: "User not found",
                position: "top",
                status: "error",
                duration: "3000"
            })
            navigate("/dashboard")
        }
    }
    return (
        <>
        <Box>
            <Button onClick={handleFollow}
            isDisabled={followers.includes(myId)}
            title="Follow"
                marginTop="10%"
                width="70%"
                flex={1}
                fontSize={'sm'}
                rounded={'full'}
                bg={'blue.400'}
                color={'white'}
                boxShadow={
                    '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
                }
                _hover={{
                    bg: 'blue.500',
                }}
                _focus={{
                    bg: 'blue.500',
                }}>
                {loading ? "Please wait..." : followers.includes(myId) ? "Following": "Follow" }
            </Button>
        </Box>
        </>
    )
}
export default Follow