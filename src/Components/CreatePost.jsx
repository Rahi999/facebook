import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Box,
    Button,
    Flex,
    Textarea,
    IconButton,
    Image,
    FormControl,
    FormLabel,
    Avatar,
    useToast,
    Text,
    Divider
} from "@chakra-ui/react";
import "./createPost.css"
import { BsFillImageFill } from "react-icons/bs";
import { CloseIcon } from "@chakra-ui/icons";
import Uploading from "./Uploading";
import { getCookies } from "../utils/getData";

const CreatePost = ({ getPosts, inputRef }) => {
    const [text, setText] = useState("");
    const [image, setImage] = useState("");
    const [cloudinaryImage, setCloudinaryImage] = useState("")
    const [loading, setLoading] = useState(false);
    const [currentDateTime, setCurrentDateTime] = useState(new Date());
    const toast = useToast()

    const options = {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    };
    const formattedDateTime = currentDateTime.toLocaleString('en-US', options);

    const handleTextChange = (event) => {
        setText(event.target.value);
    };

    const handleImageChange = async (event) => {
        const selectedImage = event.target.files[0];
        const imageURL = URL.createObjectURL(selectedImage);
        setImage(imageURL);
        console.log(image)
        const formData = new FormData();
        formData.append('file', selectedImage);
        formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_PRESET);
        try {
            setLoading(true);
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
    };

    const handleCreatePost = async () => {
        if (!text && !cloudinaryImage) {
            toast({
                title: "cann't create empty post.",
                position: "top",
                status: 'info',
                duration: 3000,
                isClosable: true,
            })
        }
        else {
            setLoading(true)
            const userId = getCookies('userId')
            const token = getCookies("fb_token")
            console.log(cloudinaryImage)
            try {
                const payload = {
                    type: "POST",
                    text: text,
                    images: cloudinaryImage,
                    date: formattedDateTime,
                    user: userId,
                }
                console.log(payload)
                axios.post(`${process.env.REACT_APP_DEV_BASE_URL}/post/create`, payload)
                    .then((res) => {
                        // toast({
                        //     title: res.data.message,
                        //     position: "top",
                        //     status: 'success',
                        //     duration: 3000,
                        //     isClosable: true,
                        // })
                        setLoading(false)
                        setImage("")
                        setText("")
                        getPosts()
                    })
                    .catch((err) => {
                        setLoading(false)
                        toast({
                            title: err.response.data.message,
                            position: "top",
                            status: 'error',
                            duration: 3000,
                            isClosable: false,
                        })
                    })
            }
            catch (err) {
                setLoading(false)
                console.log(err)
                toast({
                    title: err.response.data.message,
                    position: "top",
                    status: 'error',
                    duration: 3000,
                })
            }
        }

    };

    return (
        <>
            <Box
                p={4}
                width="100%"
                borderRadius="md"
                boxShadow="md"
            >
                <Flex alignItems="center" mb={4} gap="5">
                    <Box>
                        <Avatar src={getCookies("user-profile")} display={{ base: "none", sm: "none", md: "flex", lg: "flex", xl: "flex" }} />
                        <Flex as="label" htmlFor="upload-image" cursor="pointer" display={{ md: "none", lg: "none", xl: "none" }}>
                            <Image className="image" src="https://github.com/Rahi999/Facebook-clone/blob/main/client-codeBase/facebook_frontend_codebase/src/assets/gallery.png?raw=true"
                                size="4rem" title="Choose files" />
                            <Text fontSize={{ base: "12px", sm: "13px", md: '14px', lg: "", xl: "" }} className="create-post-title">Photo</Text>
                        </Flex>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            style={{ display: "none" }}
                            id="upload-image"
                        />
                    </Box>
                    <Textarea
                        ref={inputRef}
                        borderTopRightRadius={'30px'}
                        borderBottomRightRadius={'30px'}
                        borderBottomLeftRadius={'30px'}
                        placeholder="What's on your mind?"
                        value={text}
                        onChange={handleTextChange}
                        resize="none"
                        rows={3}
                        borderColor="gray.300"
                        // borderRadius="md"
                        p={2}
                        flex="1"
                    />
                </Flex>
                <Box height={'1px'} bg={'grey'} display={{ base: "none", sm: "none", md: 'block', lg: "block", xl: "block" }}></Box>
                <Flex justifyContent={'space-evenly'} p='2' display={{ base: "none", sm: "none", md: 'flex', lg: "flex", xl: "flex" }}>

                    <Flex as="label" htmlFor="upload-image" cursor="pointer" >
                        <Image size='3rem' className="image" src="https://raw.githubusercontent.com/Rahi999/Facebook-clone/main/client-codeBase/facebook_frontend_codebase/src/assets/gallery.png" title="Choose files" />
                        <Text fontSize={{ base: "12px", sm: "13px", md: '14px', lg: "", xl: "" }} className="create-post-title">Photo</Text>
                    </Flex>

                    <Flex as="label" htmlFor="upload-image" cursor="pointer" >
                        <Image size="3rem" className="image" src="https://github.com/Rahi999/Facebook-clone/blob/main/client-codeBase/facebook_frontend_codebase/src/assets/video.png?raw=true"
                        />
                        <Text fontSize={{ base: "12px", sm: "13px", md: '14px', lg: "", xl: "" }} className="create-post-title">Video</Text>
                    </Flex>

                    <Flex as="label" htmlFor="upload-image" cursor="pointer" >
                        <Image size="3rem" className="image" src="https://github.com/Rahi999/Facebook-clone/blob/main/client-codeBase/facebook_frontend_codebase/src/assets/happy.png?raw=true" />
                        <Text fontSize={{ base: "12px", sm: "13px", md: '14px', lg: "", xl: "" }} className="create-post-title">
                            Feeling/activity
                        </Text>
                    </Flex>
                </Flex>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: "none" }}
                    id="upload-image"
                />
                <Flex justifyContent="flex-start" >
                    {loading ? <Box width="100%"><Uploading /></Box> : image && (
                        <Box>
                            <Flex justifyContent="flex-end" cursor='pointer' onClick={() => setImage("")} title="Remove selected image">
                                <Image width="8" src="https://github.com/Rahi999/Facebook-clone/blob/main/client-codeBase/facebook_frontend_codebase/src/assets/remove.png?raw=true"
                                    alt="close-icon" />
                            </Flex>
                            <Box
                                as="img"
                                src={image}
                                alt="Preview"
                                maxH="200px"
                                borderRadius="md"
                                mb={4}
                            />
                        </Box>
                    )}
                </Flex>
                <Button title="Click to post" colorScheme="blue" size="sm" width="100%" onClick={handleCreatePost}>
                    Post
                </Button>
            </Box>
        </>
    );
};
export default CreatePost;
