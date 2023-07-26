import { Box, Text } from "@chakra-ui/react"
import React from "react"
import { useParams } from "react-router-dom"
import SideBar from "./SideBar"
import CommentsList from "./CommentsList"

const Comment = () => {
    const params = useParams()
    return (<>
        <Box>
            <SideBar children={<CommentsList postId={params.postId} />} />
        </Box>
    </>)
}
export default Comment