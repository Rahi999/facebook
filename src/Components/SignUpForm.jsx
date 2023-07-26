import { useNavigate } from "react-router-dom"
import axios from "axios"
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  Radio,
  RadioGroup,
  useToast,
  useDisclosure,
  InputLeftAddon
} from '@chakra-ui/react';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  PinInput,
  PinInputField,
  VStack,
  Center,
} from "@chakra-ui/react";

import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import "./signupform.css"
import { saveCookies } from "../utils/saveCookies"

const SignUpForm = () => {

  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [dob, setDOB] = useState('')
  const [gender, setGender] = useState('Male')
  const navigate = useNavigate()
  const toast = useToast()
  const { DEV_BASE_URL } = process.env


  const { isOpen, onOpen, onClose } = useDisclosure();
  const [otp, setOtp] = useState("");

  const handleChange = (value) => {
    setOtp(value);
  };

  const handleVerify = () => {
    if (!firstName || !lastName) {
      toast({
        title: 'Name is required.',
        description: "Please enter first & last name.",
        position: "top",
        status: 'info',
        duration: 5000,
        isClosable: true,
      })
    }
    else if (!email) {
      toast({
        // title: 'Email is required.',
        description: "Please enter an email.",
        position: "top",
        status: 'info',
        duration: 5000,
        isClosable: true,
      })
    }
    else if (!phone || phone.length < 10 || phone[0] < 5 || phone.length > 10) {
      toast({
        // title: 'Phone is required.',
        description: "Please enter a valid phone number.",
        position: "top",
        status: 'info',
        duration: 5000,
        isClosable: true,
      })
    }
    else if (!password) {
      toast({
        title: 'Password is required.',
        description: "Please set a password.",
        position: "top",
        status: 'info',
        duration: 5000,
        isClosable: true,
      })
    }
    else if (!dob) {
      toast({
        title: 'DOB is required.',
        description: "Please select you date of birth.",
        position: "top",
        status: 'info',
        duration: 5000,
        isClosable: true,
      })
    }
    else {
      setLoading(true)
      const payload = {
        phoneNumber: `91${phone}`
      }
      onOpen()
      axios.post(`${process.env.REACT_APP_DEV_BASE_URL}/otp/send-otp`, payload)
        .then((res) => {
          toast({
            description: res.data.message,
            position: "top",
            status: 'success',
            duration: 3000,
            isClosable: true,
          })
          setLoading(false)
        })
        .catch((err) => {
          setLoading(false)
          toast({
            description: err.response.data.message,
            position: "top",
            status: 'error',
            duration: 3000,
            isClosable: true,
          })
        })
    }

  };

  const handleSubmit = () => {
    setLoading(true)
    const payload = {
      firstname: firstName,
      surename: lastName,
      mobile: phone,
      email: email,
      password: password,
      day: dob[8] + dob[9],
      month: dob[5] + dob[6],
      year: dob[0] + dob[1] + dob[2] + dob[3],
      gender: gender
    }
    axios.post(`${process.env.REACT_APP_DEV_BASE_URL}/users/signup`, payload)
      .then((res) => {
        toast({
          title: "Account created.",
          description: `${res.data.message}`,
          position: "top",
          status: 'success',
          duration: 5000,
          isClosable: true,
        })
        saveCookies('fb_token', res.data.token)
        saveCookies('userId', res.data.userId)
        saveCookies("user-profile", res.data.profile_pic)
        setLoading(false)
        navigate('/dashboard')
      })
      .catch((err) => {
        setLoading(false)
        toast({
          description: `${err.response.data.message}`,
          position: "top",
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
        onClose()
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
          toast({
            title: `${res.data.message}`,
            position: "top",
            status: 'success',
            duration: 3000,
            isClosable: true,
          })
          setLoading(false)
          onClose()
          handleSubmit()
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

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={0} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Sign Up
          </Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            It's quick and easy.
          </Text>
        </Stack>
        <hr />
        <Box
          rounded={'lg'}
          bg={useColorModeValue('gray.50', 'gray.800')}
          //   boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <Box id="firstlastnamebox">
              <Box>
                <FormControl id="firstName" isRequired>
                  <Input type="text"
                    placeholder='First name'
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />

                </FormControl>
              </Box>
              <Box>
                <FormControl id="lastName" >
                  <Input type="text"
                    placeholder='Last name'
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </FormControl>
              </Box>
            </Box>
            <FormControl id="email" isRequired>
              <Input type="email"
                placeholder='Email address'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl id="phone" isRequired>
              <InputGroup>
                <InputLeftAddon children='+91' />
                <Input type='number'
                  placeholder='Phone number'
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </InputGroup>
              {/* <Input type="tel"
                placeholder='Phone number'
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              /> */}
            </FormControl>
            <FormControl id="password" isRequired>
              <InputGroup>
                <Input type={showPassword ? 'text' : 'password'}
                  placeholder='New password'
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
              <br />
              <Text>Date of birth?</Text>
              <Input type="date" placeholder='DD / MM / YYYY'
                value={dob}
                onChange={(e) => setDOB(e.target.value)}
              />

              <br />
              <br />
              <Text>Gender?</Text>
              <RadioGroup defaultValue='Male' onChange={setGender} value={gender}>
                <Stack spacing={5} direction='row' id="RadioBox">
                  <Box id="GenderRadio">
                    <Radio colorScheme='blue' value='Female' >
                      Female
                    </Radio>
                  </Box>
                  <Box id="GenderRadio">
                    <Radio colorScheme='blue' value='Male'>
                      Male
                    </Radio>
                  </Box>
                  <Box id="GenderRadio">
                    <Radio colorScheme='blue' value='Custom'>
                      Custom
                    </Radio>
                  </Box>
                </Stack>
              </RadioGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>

              <Box textAlign={'center'}>
                {/* <Button >Open Modal</Button> */}
                {!loading ?
                  <Button
                    disabled={loading === true}
                    w='100%'
                    onClick={handleVerify}
                    // isLoading
                    // loadingText='Registering...'
                    colorScheme='blue'
                    spinnerPlacement='end'
                    size="lg"
                    bg={'blue.400'}
                    color={'white'}
                    _hover={{
                      bg: 'blue.500',
                    }}

                  // onClick={handleSubmit}
                  >
                    Register
                  </Button> :
                  <Button
                    isLoading
                    loadingText='Registering'
                    colorScheme='blue'
                    variant='outline'
                  >
                    Submit
                  </Button>
                }
                <Modal
                  motionPreset="scale"
                  isOpen={isOpen}
                  // onClose={onClose}
                  isCentered
                  size="sm"
                >
                  <ModalOverlay />
                  <ModalContent borderRadius="md">
                    <ModalHeader>Enter OTP</ModalHeader>
                    {/* <ModalCloseButton /> */}
                    <ModalBody>
                      <Text>Enter otp sent to {phone}</Text><br />
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
                      </Center>
                    </ModalBody>
                    <ModalFooter>
                      {!loading ? <Box justifyContent={'space-evenly'}>
                        <Button
                          colorScheme="blue"
                          mr={3}
                          onClick={handleVerifyOtp}
                          isDisabled={otp.length !== 6}
                        >
                          Verify
                        </Button>
                        <Button
                          // variant={''}
                          colorScheme="green"
                          mr={3}
                          onClick={handleSubmit}
                        // isDisabled={otp.length !== 6}
                        // fontSize={{base: "12px", sm: "12px", md: "13px"}}
                        >
                          Ignore OTP Verification
                        </Button>
                      </Box> :
                        <Button
                          isLoading
                          loadingText='Please wait'
                          colorScheme='blue'
                          variant='outline'
                        >
                          Verify
                        </Button>
                      }
                      {/* <Button variant="ghost" onClick={}>
                      Close
                    </Button> */}
                    </ModalFooter>
                  </ModalContent>
                </Modal>
              </Box>

            </Stack>
            <Stack pt={6}>
              <Text align={'center'}>
                Already a user? <Link color={'blue.400'} >Login</Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}

export default SignUpForm