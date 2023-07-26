import { Avatar, Box, Flex, Text, Image } from "@chakra-ui/react";
import React from "react";
import "./Post.css";
import { useNavigate } from "react-router-dom";

const AllComments = ({ id, userId, comment, date, username, profile_pic }) => {
    const navigate = useNavigate()
    return (<>
        <Box borderRadius={'8px'} mt="10px" p='1' boxShadow={'rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px'}>
            <Flex align="center" mb={2}>
                <Box className="post-header" onClick={() => navigate(`/users-profile/${userId}`)} cursor="pointer">
                    <Box className="image-input">
                        <Image
                            className="post-avatar"
                            src={profile_pic}
                            alt="User Avatar"
                        />
                    </Box>
                    <Box className="post-info">
                        <h3 className="post-user">{username}</h3>
                        <Text className="post-timestamp">{date}</Text>
                    </Box>

                </Box>


            </Flex>
            <Box pl='3'>
                <Text fontWeight={'medium'} className="post-text" fontSize={{ base: "16px", sm: "16px", md: "17px", lg: "17px", xl: "17px" }} maxW={'100%'}>{comment}</Text>

            </Box>
        </Box>
    </>)
}
export default AllComments