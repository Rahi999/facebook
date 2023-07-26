import { Box, Flex, Text, IconButton } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import React from "react";

const CreateStoryBox = ( { handleCreateStory} ) => {
    const theme = localStorage.getItem('chakra-ui-color-mode')
    return(<>
     <Box
      onClick={handleCreateStory}
      bg={theme=="light" ? "gray.200" : "gray.600"}
      borderRadius="20px"
      boxShadow="sm"
      p={4}
      cursor="pointer"
      _hover={{ bg: "gray.300" }} 
    //   border={'2px solid red'}
    mt={'8px'}
      width={'125px'}
      height={'205px'}
    >
      <Flex align="center" justify="center" mb={2} 
    //   border={'2px solid'}
      >
        <IconButton
          icon={<AddIcon />}
          size="md"
          bg= {theme=="light" ? "gray.800" : "gray.800"}
          color={'white'}
          borderRadius="full"
          mr={2}
        />
        <Text fontWeight="bold" color={'black'}>Create Story</Text>
      </Flex>
      <Text color="black" >Share your story with friends</Text>
    </Box>
    </>)
}
export default CreateStoryBox