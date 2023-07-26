import { Box, Flex, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import SideBar from "./SideBar";
import { getCookies } from "../utils/getData";
import Loading from "./Loading";

const Trending = () => {
  const [videos, setVideos] = useState(null);
  const [loading, setLoading] = useState(false)
  const token = getCookies("fb_token");

  useEffect(() => {
    setLoading(true)
    axios
      .get(`${process.env.REACT_APP_DEV_BASE_URL}/story/getAll`, {
        headers: { Authorization: `${token}` },
      })
      .then((res) => {
        setVideos(res.data);
        // console.log(res.data);
        setLoading(false)
      })
      .catch((err) => setLoading(false));
  }, []);

  const videoRefs = useRef([]);
  const [isPlaying, setIsPlaying] = useState([]);

  const handleVideoClick = (index) => {
    const newIsPlaying = [...isPlaying];
    newIsPlaying[index] = !newIsPlaying[index];
    setIsPlaying(newIsPlaying);
  };

  useEffect(() => {
    document.title = "Facebook | Trending stories by the creators"
    videoRefs.current.forEach((videoRef, index) => {
      if (isPlaying[index]) {
        videoRef.play();
      } else {
        videoRef.pause();
      }
    });
  }, [isPlaying]);

  return loading ? (<Loading />) : (
    <>
      <SideBar
        children={
          <Box
            mt="20"
            w={{ base: "100%", sm: "100%", md: "100%", lg: "50%", xl: "50%" }}
            display={{
              base: "block",
              sm: "block",
              md: "grid",
              lg: "grid",
              xl: "grid",
            }}
            gridTemplateColumns={"repeat(2, 1fr)"}
          >
            {videos &&
              videos.map((video, index) => (
                <Box
                  key={video.id}
                  m="auto"
                  bg=""
                  borderRadius="md"
                  boxShadow=""
                  p={4}
                  width={{
                    base: "100%",
                    sm: "100%",
                    md: "400px",
                    lg: "400px",
                    xl: "400px",
                  }}
                  textAlign="center"
                >
                  <Box
                    bg="gray.800"
                    borderRadius="md"
                    overflow="hidden"
                    position="relative"
                  >
                    <Box
                      borderRadius={"8px"}
                      width="100%"
                      height={{ base: "90vh", sm: "90vh", md: "400px", lg: "550px", xl: "550px" }}
                      padding="1%"
                      paddingBottom="" // Aspect ratio of 16:9 (9 / 16 * 100%)
                      position="relative"
                      onClick={() => handleVideoClick(index)}
                      style={{ cursor: "pointer" }}
                    >
                      <video
                        borderRadius={"8px"}
                        ref={(el) => (videoRefs.current[index] = el)}
                        src={video.url}
                        controls={false}
                        autoPlay={false}
                        muted={false}
                        loop={true}
                        style={{ width: "100%", height: "100%" }}
                      />
                      {!isPlaying[index] && (
                        <Box
                          position="absolute"
                          top={0}
                          left={0}
                          width="100%"
                          height="100%"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="white"
                            width="72px"
                            height="72px"
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </Box>
                      )}
                      <Flex align="center" mt={2} justifyContent="center">
                        <Text color="black" fontWeight="">
                          {/* {video.userProfile.name} */}
                        </Text>
                      </Flex>
                    </Box>
                  </Box>
                </Box>
              ))}
          </Box>
        }
      />
    </>
  );
};

export default Trending;
