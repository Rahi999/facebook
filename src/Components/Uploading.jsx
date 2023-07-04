import React, { useState } from 'react';
import {
    Progress,
    Box,
    ButtonGroup,
    Button,
    Heading,
    Flex,
    FormControl,
    GridItem,
    FormLabel,
    Input,
    Select,
    SimpleGrid,
    InputLeftAddon,
    InputGroup,
    Textarea,
    FormHelperText,
    InputRightElement,
} from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';

const Uploading = () => {
    const toast = useToast();
    const [step, setStep] = useState(1);
    const [progress, setProgress] = useState(100);
    return (
        <>
            <Box
                rounded="lg"
                maxWidth={800}
                p={6}
                as="form">
                <Progress
                    borderRadius={'lg'}
                    hasStripe
                    value="50"
                    isAnimated></Progress>
                <ButtonGroup w="100%">
                    Uploading...
                </ButtonGroup>
            </Box>
        </>
    );
}
export default Uploading