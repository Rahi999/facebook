import axios from 'axios';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Text,
  useColorModeValue,
  SimpleGrid,
  Image,
  InputRightElement,
  InputGroup,
  useToast,
  useDisclosure,
  InputLeftAddon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  PinInput,
  PinInputField,
  Center
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import "./login.css"
import { Link, useNavigate } from 'react-router-dom';
import SignUp from './SignUp';
import { useEffect, useState } from 'react';
import { saveCookies } from "../utils/saveCookies";
import { getCookies } from '../utils/getData';

const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [sendOtp, setSendOtp] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate()
  const toast = useToast()
  const token = getCookies("fb_token")
  const userId = getCookies("userId")
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (userId && token) {
      navigate("/dashboard")
    }
    document.title = "Facebook | Login or SignUp"
  }, [])

  const handleLogin = (email, password) => {
    if (email && password) {
      setLoading(true);
      const paylod = {
        email: email,
        password: password
      }
      axios.post(`${process.env.REACT_APP_DEV_BASE_URL}/users/signin`, paylod)
        .then((res) => {
          toast({
            description: `${res.data.message}`,
            position: "top",
            status: 'success',
            duration: 3000,
          })
          saveCookies("fb_token", res.data.token)
          saveCookies("userId", res.data.userId)
          saveCookies("user-profile", res.data.profile_pic)
          setLoading(false)
          navigate("/dashboard")
        })
        .catch((err) => {
          setLoading(false)
          toast({
            description: `${err.response.data ? err.response.data.message : "Server error"}`,
            position: "top",
            status: 'error',
            duration: 5000,
            isClosable: true,
          })
        }
        )
    }
    else {
      toast({
        title: 'Email or password missing',
        description: "Please enter your email & Password",
        position: "top",
        status: 'info',
        duration: 5000,
        isClosable: true,
      })
    }
  }

  const handleChange = (value) => {
    setOtp(value);
  };

  const handleLoginByPhone = (email, password) => {
    setLoading(true);
    const paylod = {
      email: email,
      password: password
    }
    axios.post(`${process.env.REACT_APP_DEV_BASE_URL}/users/signin`, paylod)
      .then((res) => {
        toast({
          description: 'Login Succeed!!',
          position: "top",
          status: 'success',
          duration: 3000,
        })
        saveCookies("fb_token", res.data.token)
        saveCookies("userId", res.data.userId)
        saveCookies("user-profile", res.data.profile_pic)
        setLoading(false)
        navigate("/dashboard")
      })
      .catch((err) => {
        toast({
          description: `${err.response.data ? err.response.data.message : "Server error"}`,
          position: "top",
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
        setLoading(false)
      }
      )
  }

  const get = (phone) => {
    setLoading(true)
    const payload = {
      phoneNumber: phone
    }
    axios.post(`${process.env.REACT_APP_DEV_BASE_URL}/profile/getusercredentialsbyphonenumber`, payload)
      .then((res) => {
        setLoading(false)
        handleLoginByPhone(res.data.email, res.data.password)
      })
      .catch((err) => {
        toast({
          description: err.response.data.message,
          position: "top",
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
        setLoading(false)
      })
  }

  const handleVerifyOtp = () => {
    if (otp.length == 6) {
      setLoading(true)
      const payload = {
        phoneNumber: `91${phone}`,
        otp: otp
      }
      setLoading(true)
      axios.post(`${process.env.REACT_APP_DEV_BASE_URL}/otp/verify`, payload)
        .then((res) => {
          setLoading(false)
          toast({
            title: `${res.data.message}`,
            position: "top",
            status: 'success',
            duration: 3000,
            isClosable: true,
          })
          get(phone)
        })
        .catch((err) => {
          setLoading(false)
          toast({
            title: `${err.response.data.message}`,
            position: "top",
            status: 'error',
            duration: 5000,
            isClosable: true,
          })
        })
    } else {
      setLoading(false)
      toast({
        title: "Please enter the OTP",
        position: "top",
        status: 'info',
        duration: 3000,
        isClosable: false,
      })
    }
  }

  const handleSendOtp = () => {
    if (!phone || phone.length < 10 || phone[0] <= 5 || phone.length > 10) {
      toast({
        description: "Please enter a valid phone number.",
        position: "top",
        status: 'info',
        duration: 5000,
        isClosable: true,
      })
    }
    else {
      setLoading(true)
      setSendOtp(true)
      const payload = {
        phoneNumber: `91${phone}`
      }
      axios.post(`${process.env.REACT_APP_DEV_BASE_URL}otp/send-otp`, payload)
        .then((res) => {
          setLoading(false)
          toast({
            description: res.data.message,
            position: "top",
            status: 'success',
            duration: 3000,
            isClosable: true,
          })
        })
        .catch((err) => {
          setLoading(false)
          toast({
            description: "API Limit exceeded!",
            position: "top",
            status: 'error',
            duration: 3000,
            isClosable: true,
          })
        })
    }
  }
  return (<>
    <SimpleGrid id="loginGrid"
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Box id="loginFirst">
        <Link to="/" >
          <Image id="LoginLogo" src="https://raw.githubusercontent.com/Rahi999/Facebook-clone/b662483f94dd7d11f03a0fc4c2b807f8ca375bd1/client-codeBase/facebook_frontend_codebase/src/assets/fb_login_logo.svg" alt="Login Logo" />
        </Link>
        <Text id="LoginText">
          Facebook helps you connect and share with the people in your life.
        </Text>
      </Box>
      <Box id="loginSecond"
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}
          >
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input type="email" placeholder='Email adress' onChange={(e) => setEmail(e.target.value)} />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input type={showPassword ? 'text' : 'password'}
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }>
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}>
                  <Checkbox>Remember me</Checkbox>
                  <Text cursor={'pointer'} onClick={onOpen} color={'blue.400'}>Login with phone</Text>
                  <Modal
                    motionPreset="scale"
                    isOpen={isOpen}
                    onClose={onClose}
                    isCentered
                    size="sm"
                  >
                    <ModalOverlay />
                    <ModalContent borderRadius="md">
                      {!sendOtp ? <ModalHeader>Your Phone number*</ModalHeader>
                        : <ModalHeader>Your OTP*</ModalHeader>
                      }
                      <ModalCloseButton />
                      <ModalBody>
                        {/* <Input  type='tel' /> */}
                        {!sendOtp ? <Box>
                          <InputGroup>
                            <InputLeftAddon children='+91' />
                            <Input type='number'
                              placeholder='Enter your phone number'
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                            />
                          </InputGroup>
                          <br />{
                            !loading ? <Button
                              bg={'#1877f2'}
                              color={'white'}
                              _hover={{
                                bg: 'blue.500',
                              }}
                              onClick={() => handleSendOtp()}
                            >Send OTP</Button> :
                              <Button
                                isLoading
                                loadingText='Please wait...'
                                colorScheme='blue'
                                variant='outline'
                              >
                                Send OTP
                              </Button>
                          }
                        </Box> :
                          <Box>
                            <Center gap={4} textAlign="center">
                              <PinInput
                                // size={{ base: "xs", sm: "sm", md: "md", lg: "md", xl: "md" }}
                                size="md"
                                otp={otp}
                                onChange={handleChange}
                                autoFocus={true}
                              >
                                <PinInputField />
                                <PinInputField />
                                <PinInputField />
                                <PinInputField />
                                <PinInputField />
                                <PinInputField />
                              </PinInput>
                            </Center> <br />
                            {
                              !loading ? <Button
                                bg={'#1877f2'}
                                color={'white'}
                                _hover={{
                                  bg: 'blue.500',
                                }}
                                onClick={() => handleVerifyOtp()}
                              >Verify & Login</Button> :
                                <Button
                                  isLoading
                                  loadingText='Please wait...'
                                  colorScheme='blue'
                                  variant='outline'
                                >
                                  Verify
                                </Button>
                            }
                          </Box>
                        }
                      </ModalBody>
                      <ModalFooter>
                      </ModalFooter>
                    </ModalContent>
                  </Modal>
                </Stack>
                {!loading ? (<Button
                  bg={'#1877f2'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }} onClick={() => handleLogin(email, password)}
                >
                  Log in
                </Button>) : (<Button
                  isLoading
                  loadingText='Logging'
                  colorScheme='blue'
                  spinnerPlacement='end'
                  bg={'#1877f2'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }} onClick={() => handleLogin(email, password)}
                >
                  Log in
                </Button>)}

                <hr />
                <SignUp />
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Box>
    </SimpleGrid>
  </>
  );
}
export default Login