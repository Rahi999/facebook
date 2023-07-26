import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
    Heading,
    Avatar,
    AvatarBadge,
    Box,
    Center,
    Image,
    Flex,
    Text,
    Stack,
    Button,
    useColorModeValue,
    IconButton,
    Toast,
    useToast,
    useColorMode
} from '@chakra-ui/react';
import { SmallCloseIcon, EditIcon } from '@chakra-ui/icons';
import { getCookies } from "../utils/getData";
import Loading from "./Loading";
import Follow from "./Follow";
import UnFollow from "./Unfollow";
import SideBar from "./SideBar";
import Theme from "./Theme";
import ButtonTheme from "./ButtonTheme";
import { saveCookies } from "../utils/saveCookies";
import Uploading from "./Uploading";

const Profile = () => {

    const [userData, setUserData] = useState(null)
    const [loading, setLoading] = useState(false)
    const toast = useToast()
    const params = useParams()
    const userId = params.userId
    const id = getCookies('userId')
    // console.log(userId, id)
    const token = getCookies('fb_token')
    const navigate = useNavigate()
    const { colorMode, toggleColorMode } = useColorMode();
    const [image, setImage] = useState('');
    const [cloudinaryImage, setCloudinaryImage] = useState("")
    const uploadInputRef = useRef(null);


    const handleImageChange = async (event) => {
        setLoading(true)
        const selectedImage = event.target.files[0];
        const imageURL = URL.createObjectURL(selectedImage);
        setImage(imageURL);
        console.log(image)
        const formData = new FormData();
        formData.append('file', selectedImage);
        formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_PRESET);
        try {
            const res = await axios.post(process.env.REACT_APP_CLOUDINARY_BASE_URL, formData);
            const imageUrl = res.data.secure_url;
            setCloudinaryImage(res.data.secure_url)
            console.log(imageUrl)
            setLoading(false)
        } catch (err) {
            toast({
                title: "Uploading failed",
                position: "top",
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
            setLoading(false)
            console.error(err);
        }
    }

    const handleEditClick = () => {
        if (uploadInputRef.current) {
            uploadInputRef.current.click(); // Trigger the click event on the file input element
        }
    };

    const getUserprofile = () => {
        if (userId && token) {
            setLoading(true)
            axios.get(`${process.env.REACT_APP_DEV_BASE_URL}/profile/getSingleUser/${userId}`, { headers: { "Authorization": `${token}` } })
                .then((res) => {
                    setUserData(res.data)
                    // console.log(res)
                    setLoading(false)
                    console.log(res.data)
                    saveCookies("user-profile", res.data.profile_pic)
                })
                .catch((err) => {
                    setLoading(false)
                    toast({
                        title: "User not found",
                        position: "top",
                        status: 'error',
                        duration: 3000,
                    })
                    navigate("/")
                })
        }
        else {
            navigate("/login")
        }
    }

    useEffect(() => {
        document.title = "Facebook | Personal profile"
        getUserprofile()
    }, [])

    const handleSave = () => {
        if (cloudinaryImage) {
            const payload = {
                profile_pic: cloudinaryImage
            }
            axios.patch(`${process.env.REACT_APP_DEV_BASE_URL}/profile/editUserProfile/${userId}`,
                payload,
                { headers: { "Authorization": `${token}` } }
            )
                .then((res) => {
                    // console.log(res.data)
                    toast({
                        description: res.data.message,
                        position: "top",
                        status: "success",
                        duration: 3000,
                    })
                    getUserprofile()
                })
                .catch((err) => toast({
                    description: err.response.data.message,
                    position: "top",
                    status: 'error',
                    duration: 3000,
                }))
        } else {
            toast({
                title: "Profile cann't edit right now",
                position: "top",
                status: 'error',
                duration: 3000,
            })
        }
    }
    return userData ? (
        <Center py={6} m='auto' w='100%'><Box
            maxW={{ base: "100%", sm: "100%", md: "300px", lg: "300px", xl: '300px' }}
            w={'full'}
            // bg={useColorModeValue('white', 'gray.800')}
            boxShadow={'2xl'}
            rounded={'md'}
            overflow={'hidden'}>
            <Image
                cursor={'pointer'}
                onClick={() => navigate(`/detailed-image/${encodeURIComponent(userData.cover_pic)}`)}
                h={'120px'}
                w={'full'}
                src={userData.cover_pic}
                objectFit={'cover'}
            />
            <Flex justify={'center'} mt={-12}>
                <Avatar
                    // onClick={() => navigate(`/detailed-image/${encodeURIComponent(cloudinaryImage ? cloudinaryImage : userData.profile_pic)}`)}
                    onClick={handleEditClick}
                    cursor={'pointer'}
                    size={'xl'}
                    src={cloudinaryImage ? cloudinaryImage : userData.profile_pic}
                    name={userData.firstname + userData.surename}
                    alt={'User_image'}

                >
                    <AvatarBadge
                        as={IconButton}
                        size="xs"
                        rounded="full"
                        border="0px"
                        top="50px"
                        aria-label="edit Image"
                        icon={<EditIcon />}
                        onClick={handleEditClick}
                    />

                </Avatar>
                <input
                    ref={uploadInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: "none" }}
                    id="upload-image"
                />

            </Flex>
            {loading && <Uploading />}
            {cloudinaryImage && <Button
                onClick={() => handleSave()}
                title="Save"
                marginTop="10%"
                width="70%"
                flex={1}
                fontSize={'sm'}
                rounded={'full'}
                bg={'blue.400'}
                color={'white'}
                _hover={{
                    bg: 'blue.500',
                }}
                _focus={{
                    bg: 'blue.500',
                }}>
                Save
            </Button>}
            <Box p={6}>
                <Stack spacing={0} align={'center'} mb={5}>
                    <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
                        {userData.firstname + " " + userData.surename}
                    </Heading>
                    <Text color={'gray.500'}>{userData.email[0] + userData.email[1] + userData.email[2] + "******@gmail.com"}</Text>
                </Stack>

                <Stack direction={'row'} justify={'center'} spacing={6}>
                    <Stack spacing={0} align={'center'}>
                        <Text fontWeight={600}>{userData.followers.length}</Text>
                        <Text fontSize={'sm'} color={'gray.500'}>
                            Followers
                        </Text>
                    </Stack>
                    <Stack spacing={0} align={'center'}>
                        <Text fontWeight={600}>{userData.following.length}</Text>
                        <Text fontSize={'sm'} color={'gray.500'}>
                            Following
                        </Text>
                    </Stack>
                </Stack>

                {userData && <Follow getUserprofile={getUserprofile} userId={userId} followers={userData.followers} following={userData.following} />}
                {userData && <UnFollow getUserprofile={getUserprofile} userId={userId} followers={userData.followers} />}
                <ButtonTheme />
            </Box>
        </Box></Center>
    ) : (<Loading />)


}
export default Profile