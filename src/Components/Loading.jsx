import React from 'react'
import { Box, SkeletonCircle, SkeletonText } from '@chakra-ui/react'

const Loading = () => {
    return (
        <>
            <Box mt="10" padding='10' boxShadow='xl' bg='' height="100vh" width={'100%'}>
                <SkeletonCircle size='20' />
                <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='5' />
            </Box>
        </>
    )
}
export default Loading