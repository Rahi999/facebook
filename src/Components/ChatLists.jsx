import React from "react";
import {Link, useNavigate, useParams} from "react-router-dom"
import axios from "axios"
import { Box, VStack, Avatar, Text, IconButton, Flex } from '@chakra-ui/react';
import { BiCommentDetail } from "react-icons/bi";
import Follow from "./Follow";
import { getCookies } from "../utils/getData";
import SideBar from "./SideBar";
import "./chatList.css"

const ChatLists = ({users}) => {

    const navigate = useNavigate()
    const params = useParams()
    // const senderId = params.serderId;
    // const receiverId = params.receiverId;

    const senderId = getCookies("userId");
    const receiverId = "6495c422e94b5545318eb3ec";
    
    return (<>
        <SideBar children={
            <Box width={{base: "100%", sm: "100%", md: "100%", lg: "50%", xl: "50%"}}  mt={{base: "20", sm: "20", md: "10", lg: "10", xl: "10"}}>
            <VStack align="start" spacing={4} >
                {users.map((user) => (
                    <Box justifyContent={'space-between'} width="100%"  key={user._id}
                    className="vstack"
                    title="Chat with the person"
                    cursor={'pointer'}
                    onClick={() => navigate(`/messages/${senderId}/${user._id}`)}
                    display="flex" alignItems="center"
                    // boxShadow={'rgba(0, 0, 0, 0.24) 0px 3px 8px'}
                    p='3'
                    borderRadius={'8px'}
                    >
                        <Flex >
                        <Avatar size={{base: "xs", sm: "xs", md: "md", lg: "md", xl: "md"}} src={user.profile_pic} />
                        <Text ml={2} mt={{base:'', sm:'', md: "10px", lg: "10px", xl: "10px"}}>{`${user.firstname} ${user.surename}`}</Text>
                        </Flex>
                        <Box>
                        <IconButton 
                            aria-label="Comment"
                            icon={<BiCommentDetail />}
                        />
                        </Box>
                       
                      
                    </Box>
                ))}
            </VStack>
        </Box>
        } />
    </>)
}
export default ChatLists