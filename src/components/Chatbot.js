import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveStudentInfo } from "../features/student/studentInfoSlice";
import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  Container,
  HStack,
  IconButton,
  Input,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import "../index.css"
import { HiArrowLeft } from 'react-icons/hi';
import { GiHamburgerMenu } from 'react-icons/gi';


const Message = ({ message }) => {
  return (
    <HStack
      alignSelf={message?.type === "user" ? "flex-end" : "flex-start"}
      bg={message.type === "user" ? "teal.200" : "gray.300"}
      paddingX="4"
      paddingY="2"
      borderRadius='full'
      borderTopRightRadius={message.type === "user" ? "0" : "full"}
      borderTopLeftRadius={message.type === "user" ? "full" : "0"}
    >
      {message.type !== "user" && (
        <Avatar size="sm">
          <AvatarBadge boxSize="1em" bg="green.500" />
        </Avatar>
      )}

      {message.text === "Loading..." ? (
        <div className="loader">
          <span></span>
          <span></span>
          <span></span>
        </div>
      ) : (
        <Text fontWeight='medium'>{message?.text}</Text>
      )}

      {message.type === "user" && <Avatar size="sm" bg="teal.500" />}
    </HStack>
  );
};

const CustomText =({handleUserResponse})=>{
  return(
    <HStack
    alignSelf="flex-start"
    bg="teal.500"
    paddingX="4"
    paddingY="2"
    borderRadius='full'
    cursor='pointer'
    _hover={{ bg: 'teal.700' }}
    onClick={() => {
        handleUserResponse("Got it!");
      }
    }
  >
  <Text fontWeight='medium' textColor='white'>Got it!</Text>
  </HStack>
  )
}



const Chatbot = () => {
  const divForScroll = useRef(null);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const studentInfo = useSelector((state) => state.student);

  const [messages, setMessages] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [slot, setSlot] = useState("");
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(true);

  const sendBotMessage = (message) => {
    setLoading(true);
    setMessages((prevMessages) => [
      ...prevMessages,
      { type: "bot", text: "Loading..." },
    ]);
    setTimeout(() => {
      setLoading(false);
      setMessages((prevMessages) => [
        ...prevMessages.filter((message) => message.text !== "Loading..."),
        { type: "bot", text: message },
      ]);
    }, 3000);
  };

  const startChat = async () => {
    sendBotMessage("Hello, Welcome to the student info system!");
    setStep(2);
  };

  useEffect(() => {
    setStep(1);
  }, []);

  useEffect(() => {
    if (step > 0 && step < 2) {
      startChat();
    }
  }, [step]);

  const handleUserResponse = (userInput) => {
    let formattedInput = userInput;

    if (step === 3) {
      formattedInput = formatUserInput(userInput);
    }
  
    setMessages((prevMessages) => [
      ...prevMessages,
      { type: "user", text: formattedInput },
    ]);

    console.log(userInput);
    if (step === 2) {
      sendBotMessage("Pick a slot!");
      setStep(3);
    } else if (step === 3) {
      setSlot(userInput);
      sendBotMessage("Enter your Name");
      setStep(4);
    } else if (step === 4) {
      setName(userInput);
      sendBotMessage("Enter your Age");
      setStep(5);
    } else if (step === 5) {
      console.log(userInput, "age");
      setAge(userInput);
      sendBotMessage("Thank you. In 5 seconds, the bot will exit.");

      // Set student information in Redux store
      dispatch(
        saveStudentInfo({
          slot,
          name,
          age: userInput,
        })
      );

      // Redirect to Page3 after 5 seconds
      setTimeout(() => {
        navigate("/exit");
      }, 5000);
    }
  };

  const formatUserInput = (input) => {
    const date = new Date(input);
    const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    const months = [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
    ];
  
    const formattedDate = `${date.getDate()} ${
      months[date.getMonth()]
    }, ${days[date.getDay()]} ${date.getHours()}:${date.getMinutes()}`;
  
    return formattedDate;
  };
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box bgGradient='linear(to-r, cyan.100, red.100)'>
      <Container bg={'white'} h={'100vh'}>
        <VStack h={'100vh'} paddingY={"4"} paddingX={"2"}>
        <HStack
      boxShadow='lg'
      p={2}
      color="white"
      alignItems="center"
      justifyContent="space-between"
      w={'100%'}
    >
      <IconButton bg='transparent' 
        icon={<HiArrowLeft className="text-xl"  />}
        aria-label="Back"
        onClick={() => {
          navigate("/")
        }}
      />
      <IconButton bg='transparent'
        icon={<GiHamburgerMenu />}
        aria-label="Menu"
        onClick={onToggle}
      />
    </HStack>
        <VStack h={'full'} w={'full'} overflowY={'auto'} css={{
                "&::-webkit-scrollbar": {
                  display: "none",
                },
              }}>
        {messages.map((message,index)=>(
          <>
        <Message key={index} message={message} />
        {step === 2 && !loading && <CustomText handleUserResponse={handleUserResponse} />}
        
          </>
        ))} 
        <div ref={divForScroll}></div>
        </VStack>
        {step === 3 && !loading && (
         <div style={{width:'100%'}}>
         <HStack>
           <Input type='datetime-local' onKeyDown={(e) => {
               if (e.key === "Enter" && e.target.value) {
                 handleUserResponse(e.target.value);
                 e.target.value = "";
               }
             }} placeholder="Type your response..."/>
           {!loading ?(
             <Button onClick={() => {
                           const input = document.querySelector("input");
                           if (input && input.value) {
                             handleUserResponse(input.value);
                             input.value = "";
                           }
                         }} colorScheme={'teal'}>Send</Button>
           ):(
             <Button colorScheme={'gray'} cursor={'not-allowed'}>Send</Button>
           )}
           
         </HStack>
         </div>
        )}
        {step >= 4 && step <= 5 && (
         <div style={{width:'100%'}}>
         <HStack>
           <Input onKeyDown={(e) => {
               if (e.key === "Enter" && e.target.value) {
                 handleUserResponse(e.target.value);
                 e.target.value = "";
               }
             }} placeholder="Type your response..."/>
           {!loading ?(
             <Button onClick={() => {
                           const input = document.querySelector("input");
                           if (input && input.value) {
                             handleUserResponse(input.value);
                             input.value = "";
                           }
                         }} colorScheme={'teal'}>Send</Button>
           ):(
             <Button colorScheme={'gray'} cursor={'not-allowed'}>Send</Button>
           )}
           
         </HStack>
         </div>
        )}
       
        </VStack>
      </Container>
    </Box>
  );
};

export default Chatbot;
