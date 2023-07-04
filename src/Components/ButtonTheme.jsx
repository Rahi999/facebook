import { Box, Button, useColorMode } from "@chakra-ui/react";
import React from "react";
import Theme from "./Theme";

const ButtonTheme = () => {

    const { colorMode, toggleColorMode } = useColorMode();
    return (
        <>
            <Box>
                <Button
                    title="Change theme"
                    marginTop="10%"
                    width="70%"
                    flex={1}
                    fontSize={'sm'}
                    rounded={'full'}
                    boxShadow={
                        '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
                    }
                    bg={colorMode === "light" ? "gray.200" : "gray.800"}
                    color={colorMode === "light" ? "black" : "white"}
                    _hover={{ bg: colorMode === "light" ? "gray.300" : "gray.700" }}
                >
                    <Theme />
                </Button>
            </Box>
        </>
    )
}
export default ButtonTheme