import { Box, Button } from "@chakra-ui/react";
import { FaFacebookMessenger } from 'react-icons/fa';
import React from "react";
import { useNavigate } from "react-router-dom";

const SendMessage = ({senderId, receiverId}) => {
    
    const navigate = useNavigate()
    return (
        <>
        <Box>
            <Button 
            onClick={() => navigate(`/messages/${senderId}/${receiverId}`)}
            title="Send message..."
            leftIcon={<FaFacebookMessenger />}
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
                  Send Message
            </Button>
        </Box>
        </>
    )
}
export default SendMessage