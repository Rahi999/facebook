import { Box, Text } from "@chakra-ui/react"
import React from "react"
import { useParams } from "react-router-dom"
import SideBar from "../Components/SideBar"
import CommentsList from "../Components/CommentsList"

const Comments = () => {
    const params = useParams()
    return (<>
        <Box>
            <SideBar children={<CommentsList postId={params.postId} />}/>
        </Box>
    </>)
}
export default Comments