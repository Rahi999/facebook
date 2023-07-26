import { Box, VStack, Avatar, Text, Input, Button, Flex, Toast, useToast, Image, useUpdateEffect, IconButton } from '@chakra-ui/react';
import React, { useCallback, useEffect, useRef, useState } from "react";
import SideBar from './SideBar';
import { getCookies } from '../utils/getData';
import axios from 'axios';
import "./message.css"
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import Follow from './Follow';
import { MdDelete } from 'react-icons/md';
import { RiSendPlaneFill } from 'react-icons/ri';
import { Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { FiMoreVertical } from 'react-icons/fi';

const Messages = ({ senderId, receiverId }) => {

  const [text, setText] = useState('')
  const [user, setUser] = useState(null)
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const boxRef = useRef(null);
  const inputRef = useRef(null);
  const userId = getCookies("userId")
  const token = getCookies("fb_token")
  const params = useParams()
  const toast = useToast()
  const navigate = useNavigate()
  const theme = localStorage.getItem('chakra-ui-color-mode')
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

  const handleInputChange = useCallback((e) => {
    setText(e.target.value);
  }, []);

  const getMessages = () => {
    setLoading(true)
    axios.get(`${process.env.REACT_APP_DEV_BASE_URL}/chat/get-messages/${userId}/${params.receiverId}`,
      { headers: { "Authorization": `${token}` } })
      .then((res) => {
        setMessages(res.data)
        console.log(res.data)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
  }

  const handleSendMessages = () => {
    if (text) {
      const payload = {
        senderId: userId,
        receiverId: params.receiverId,
        time: formattedDateTime,
        message: text
      };
      console.log("Payload:", payload); // Log the payload before sending the request
      console.log("Formatted DateTime:", formattedDateTime); // Log the value of formattedDateTime

      axios.post(`${process.env.REACT_APP_DEV_BASE_URL}/chat/send-messages`, payload, {
        headers: { "Authorization": `${token}` }
      })
        .then((res) => {
          console.log(res.data);
          setText("");
          getMessages();
          setTimeout(() => {
            scrollToBottom();
          }, 2000);
        })
        .catch((err) => console.log(err));

    } else {
      toast({
        description: "Please type your message",
        position: "top",
        status: "info",
        duration: "3000"
      });
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSendMessages();
      scrollToBottom()
    }
  };

  const scrollToBottom = () => {
    if (boxRef.current) {
      boxRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  };

  useEffect(() => {
    document.title = "Facebook | Send messages to your friends"
    if (loading) {
      scrollToBottom()
    }
    if (userId && params.receiverId) {
      axios.get(`${process.env.REACT_APP_DEV_BASE_URL}/profile/getSingleUser/${params.receiverId}`,
        { headers: { "Authorization": `${token}` } })
        .then((res) => {
          inputRef.current.focus();
          console.log(res.data)
          setUser(res.data)
          getMessages()
          scrollToBottom()
        })
        .catch((err) => console.log)
    }
    else {
      navigate("/dashboard")
    }
  }, [])

  const handleDelete = () => {
    axios.delete(`${process.env.REACT_APP_DEV_BASE_URL}/chat/delete-messages/${userId}/${params.receiverId}`,
      { headers: { "Authorization": `${token}` } }
    )
      .then((res) => {
        toast({
          description: res.data.message,
          position: "top",
          status: "success",
          duration: "3000"
        })
        getMessages()
      })
      .catch((err) => {
        toast({
          description: err.response.data.message,
          position: "top",
          status: "error",
          duration: "3000"
        });
      })

  }
  return (
    <>
      <SideBar
        children={
          <Box
            display="flex"
            flexDirection="column"
            alignItems="stretch"
            width={{ base: "100%", sm: "100%", md: "100%", lg: "50%", xl: "50%" }}
            minHeight="90vh"
            bg="white.100"
            p={4}
            borderRadius="md"
            boxShadow="md"
            mt={{ base: "20", sm: "20", md: "10", lg: "10", xl: "10" }}
            position="relative"
          >
            {/* Header */}
            <Flex position={'sticky'} onClick={() => navigate(`/users-profile/${params.receiverId}`)} gap='2' p='2' align="center" width="100%" boxShadow={'rgba(0, 0, 0, 0.16) 0px 2px 6px'} cursor={'pointer'}>
              <Avatar src={user && user.profile_pic} size="sm" />
              <Text fontWeight="bold">{user && user.firstname + " " + user.surename}</Text>
              <Box>
              </Box>
              {/* <Avatar src={messages && messages[0]?.profile_pic} size="sm" /> */}
            </Flex>

            {/* Chat messages */}
            <VStack
              ref={boxRef}
              width="100%" align="flex-start" spacing={2} overflowY="auto" flex="1" pb={16}
              p='2' boxShadow={'rgba(0, 0, 0, 0.24) 0px 3px 8px'}>
              {messages.length > 1 ?
                messages && messages.map((message) => (
                  <Flex key={message.id} justify={message.senderId == userId ? 'flex-end' : 'flex-start'} width="100%" gap={'1'}>
                    {message.senderId !== userId && (
                      <Avatar
                        cursor={'pointer'}
                        onClick={() => navigate(`/users-profile/${params.receiverId}`)}
                        src={user.profile_pic} size="sm" display={{ base: 'none', md: 'inline' }} />
                    )}
                    <Box className='box'
                      mt={'5'}
                      borderTopRightRadius={message.senderId !== userId ? "20px" : "0px"}
                      borderBottomRightRadius={message.senderId !== userId ? "20px" : "20px"}
                      borderBottomLeftRadius={message.senderId !== userId ? "20px" : "20px"}
                      borderTopLeftRadius={message.senderId === userId ? "20px" : "0px"}
                      bg={message.senderId === userId ? theme == "dark" ? 'grey' : "blue.500" : 'white'}
                      color={message.senderId === userId ? theme == "dark" ? "white" : 'gray.800' : 'black'}
                      p={2.5}
                      // borderRadius="md"
                      boxShadow="md"
                      maxWidth="90%"
                    >
                      <Text>{message.message}</Text>
                      <Text textAlign={message.senderId === userId ? "left" : "right"} fontSize={'9px'}>{message.time && message.time}</Text>
                    </Box>
                    {message.senderId === userId && (
                      <Avatar
                        cursor={'pointer'}
                        onClick={() => navigate(`/users-profile/${userId}`)}
                        src={getCookies('user-profile')}
                        size="sm"
                        display={{ base: 'none', md: 'inline' }}
                      />
                    )}
                  </Flex>
                ))

                :
                <Box m={'auto'} onClick={() => navigate("/users")} cursor={'pointer'}>
                  <Image
                    src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c526.png"
                    alt="No messages yet"
                    borderRadius={'50px'}
                    width={'30%'}
                    m={'auto'}
                  />
                  <Text>No messages yet</Text>
                </Box>
              }
            </VStack>

            {/* Message input */}
            <Box position="sticky" bottom={0} width="100%" p={4} backdropFilter="blur(8px)"
            >
              <Flex gap='1'>
                <Box>
                  <Menu>
                    <MenuButton as={IconButton} icon={<FiMoreVertical />} variant="ghost" />
                    <MenuList>
                      <MenuItem onClick={() => handleDelete()}>Clear chat</MenuItem>
                    </MenuList>
                  </Menu>
                </Box>
                <Input
                  ref={inputRef}
                  placeholder="Type a message"
                  flex="1"
                  mr={2}
                  value={text}
                  onKeyDown={handleKeyDown}
                  onChange={handleInputChange} />
                {/* <Button colorScheme="blue" >Send</Button> */}
                <IconButton
                  textAlign={'center'}
                  onClick={() => handleSendMessages()}
                  colorScheme="blue"
                  size="md"
                  rightIcon={<RiSendPlaneFill />}
                />

              </Flex>
            </Box>
          </Box>
        }
      />
    </>
  )
}

export default Messages;