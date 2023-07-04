import { Avatar, Box, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import { useParams } from "react-router-dom";

const DetailedPostImage = () => {
    
    const params = useParams()
    const imageSrc = params.src
    return (
        <>
            <Box>
                <Image
                src={imageSrc}
                w="100%"
                h="100vh"
                borderRadius={'md'}
                />
            </Box>
        </>
    )
}
export default DetailedPostImage