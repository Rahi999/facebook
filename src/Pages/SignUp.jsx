import React from "react"
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  useDisclosure
} from "@chakra-ui/react"
import SignUpForm from "../Components/SignUpForm"
import "./signup.css"

const SignUp = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)

  return (
    <>
      <Button
        onClick={onOpen}
        bg={'#42b72a'}
        color={'white'}
        _hover={{
          bg: 'green.500',
        }}>
        Create new account
      </Button>
      {/* <Modal 
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        border='2px solid'
      >
        <ModalOverlay  />
        <ModalContent borderRadius="md" border='3px solid red' size='xl'>
          <ModalCloseButton />
           <SignUpForm  />
        </ModalContent>
      </Modal> */}
      <Modal
        isCentered
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        size={{ base: "sm", sm: "sm", md: "md", lg: "lg", xl: 'xl' }}
      >
        <ModalOverlay />
        <ModalContent borderRadius="md">
          {/* <ModalHeader> </ModalHeader> */}
          <ModalCloseButton />
          <ModalBody>
            <SignUpForm />

          </ModalBody>
          <ModalFooter>

            {/* <Button variant="ghost" onClick={}>
                      Close
                    </Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
export default SignUp