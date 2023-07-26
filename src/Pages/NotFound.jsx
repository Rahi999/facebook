import { Box, Heading, Text, Button, Image, Center } from '@chakra-ui/react';
import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const NotFound = () => {

    const navigate = useNavigate()
    useEffect(() => {
        document.title = "Facebook | 404 page not found..."
    }, [])
    return (<>
        <Box textAlign="center" py={10} px={6}>
            <Center justifyContent="center" widht='100%'>
                <Image

                    width={'30%'}
                    src='https://static.xx.fbcdn.net/rsrc.php/y8/r/dF5SId3UHWd.svg'
                    alt='Facebook logo'
                />
            </Center>
            <Heading
                display="inline-block"
                as="h2"
                size="2xl"
                bgGradient="linear(to-r, blue.400, blue.600)"
                backgroundClip="text">
                404
            </Heading>
            <Text fontSize="18px" mt={3} mb={2}>
                Page Not Found
            </Text>
            <Text color={'gray.500'} mb={6}>
                The page you're looking for does not seem to exist
            </Text>

            <Button onClick={() => navigate("/dashboard")}
                colorScheme="blue"
                bgGradient="linear(to-r, blue.400, blue.500, blue.600)"
                color="white"
                variant="solid">
                Go to Home
            </Button>
        </Box>

    </>)
}
export default NotFound