import { Avatar, Box, Flex, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Loading from './Loading'

const Users = () => {

    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)

    const getUsers = () => {
        setLoading(true)
      axios.get(`${process.env.REACT_APP_DEV_BASE_URL}/profile/getAllUsers`)
      .then((res) => {
        console.log(res.data)
        setData(res.data)
        setLoading(false)
      })
      .catch((err) => {
        setLoading(false)
      })
    }
    useEffect(() => {
      document.title = "Facebook | All facebook users"
        getUsers()
    }, [])
    return loading ? (<Loading />) : (
        <>
            <Box 
            bg={'gray.200'}
            borderRadius={'8px'}
            ml={'5'}
            display={{
                base: "none",
                sm: "none",
                md: "flex",
                lg: "flex",
                xl: "flex"
            }}
                width={'40%'}
                p={'10'}
            >
                <Box>
                {data && data.map((el, i) => <Box key={i}>
                    <Link to={`/user-profile/${el._id}`}>
                    <Flex mt='10' gap={'2'} border="1px solid" p='3' > 
                        <Avatar size='sm' src='' name={el.firstname} />
                    <Text>{el.firstname} </Text>
                    <Text>{el.followers.length} Followers </Text>
                    <Text>{el.following.length} Following </Text>
                    </Flex></Link>
                </Box>)}
                </Box>
            </Box>
        </>
    )
}
export default Users