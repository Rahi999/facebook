import { Box } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import axios from "axios";
import { getCookies } from "../utils/getData";
import { useNavigate } from "react-router-dom";
import PostCard from "./PostCard";
import AllComments from "./AllComments";
import AddComment from "./AddComment";

const CommentsList = ({ postId }) => {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(false)
    const [comments, setComments] = useState(null)
    const token = getCookies("fb_token")
    const navigate = useNavigate()

    const getPost = () => {
        setLoading(true)
        axios.get(`${process.env.REACT_APP_DEV_BASE_URL}/post/get/${postId}`, { headers: { "Authorization": `${token}` } })
            .then((res) => {
                console.log(res.data)
                setPost(res.data)
                setComments(res.data.comments.reverse())
                console.log(res.data.comments.reverse())
                setLoading(false)
            })
            .catch((err) => {
                setLoading(false)
                navigate("/dashboard")
            })
    }

    useEffect(() => {
        getPost()
        // console.log(post.comments)
    }, [])

    return loading ? (<Loading />) : (<>
        <Box mt="20" pr={{ base: "0", sm: "0", md: "30", lg: "80", xl: "80" }}
            pb="40"
        >
            {post && <PostCard
                user_profile={post.user.profile_pic}
                user_name={post.user.firstname + " " + post.user.surename}
                time={post.date}
                post_text={post.text}
                post_image={post.images}
                PostId={post._id}
                userId={post.user._id}
            />}
            <AddComment postId={postId} profile_pic={post && post.user.profile_pic} getPost={getPost} />
            {comments && comments.map((el) => <AllComments
                id={el._id}
                userId={el.user._id}
                comment={el.comment}
                date={el.commentAt}
                username={el.user.firstname + " " + el.user.surename}
                profile_pic={el.user.profile_pic}
            />)}
        </Box>
    </>)
}
export default CommentsList