'use client'
import {
  Box,
  Button,
  HStack,
  Text,
  VStack,
  Image,
  CardBody,
  Card,
  SimpleGrid,
  Link,
  GridItem,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { MdGppGood } from "react-icons/md";
import SusPend from "../../UsersComponents/Suspenmodal";
import DeleteUser from "../../UsersComponents/DeleteModal";
import { AxiosGet } from "@/app/axios/axios";
import { useParams } from "next/navigation";
import { useAdminContext } from "@/app/Admin/Admincontext";
import { Fade } from "react-awesome-reveal";

export default function page() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [key, setKey] = useState(0);
  const reanimationTime = 2000;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const interval = setInterval(() => {
      setKey((prevKey) => prevKey + 1);
    }, reanimationTime);

    return () => clearInterval(interval);
  }, [reanimationTime]);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const params = useParams()
  const userId = params.id as string
  
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { isOpen: isSecondModalOpen, onOpen: onSecondModalOpen, onClose: onSecondModalClose } = useDisclosure();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { isOpen: Deleteisopen, onOpen: DeleteonopenModalOpen, onClose: DeleteoncloseModalclose } = useDisclosure();
  const data = [
    {
      title: "total number payout",
      number: "10.928",
    },
    {
      title: "total sign ups",
      number: "3,493",
    },
  ];
  interface User {
    // Define user properties here
    id: string
    name: string
    // Add other properties as needed
  }
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [user, setUser] = useState<Users | null>(null)
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [loadingUser, setLoadingUser] = useState(false)
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [errorMessage, setErrorMessage] = useState('')
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const {  usersId, setUsersId } = useAdminContext();
  interface Users {
    [key: string]: any;
  }
const Url =`users/${userId}`

  const getUserById = async (): Promise<boolean> => {
    setLoadingUser(true)
    try {
      const response = await AxiosGet(Url)
      setLoadingUser(false)
     
      if (response.data) {
        console.log('data',response.data)
        setUsersId(userId)
        setUser(response.data)
        setErrorMessage('')
        return true
      } else {
        return false
      }
    } catch (err: any) {
      setLoadingUser(false)
      let message = "Check your Network and try again."
      if (err.response && err.response.data && err.response.data.message) {
        message = err.response.data.message
      }
      setErrorMessage(message)
      return false
    }
  }
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    getUserById()
  }, [])
  if (loadingUser) {
    return (
      <Box>
        <HStack
          gap={["15px", "40px"]}
          display={"flex"}
          justifyContent={"center"}
        >
          <Fade key={key} cascade damping={0.1}>
            <Text
              fontSize={["20px", "60px"]}
              fontWeight={"700"}
              color={"#0AA07C"}
            >
              B
            </Text>
            <Text
              fontSize={["20px", "60px"]}
              fontWeight={"700"}
              color={"#0AA07C"}
            >
              E
            </Text>
            <Text
              fontSize={["20px", "60px"]}
              fontWeight={"700"}
              color={"#0AA07C"}
            >
              B
            </Text>
            <Text
              fontSize={["20px", "60px"]}
              fontWeight={"700"}
              color={"#0AA07C"}
            >
              O
            </Text>
            <Text
              fontSize={["20px", "60px"]}
              fontWeight={"700"}
              color={"#0AA07C"}
            >
              .
            </Text>
            <Text
              fontSize={["20px", "60px"]}
              fontWeight={"700"}
              color={"#0AA07C"}
            >
              .
            </Text>
            <Text
              fontSize={["20px", "60px"]}
              fontWeight={"700"}
              color={"#0AA07C"}
            >
              .
            </Text>
            <Text
              fontSize={["20px", "60px"]}
              fontWeight={"700"}
              color={"#0AA07C"}
            >
              .
            </Text>
            <Text
              fontSize={["20px", "60px"]}
              fontWeight={"700"}
              color={"#0AA07C"}
            >
              .
            </Text>
          </Fade>
        </HStack>
      </Box>
    );
  }
  return (
    <Box w={"full"}>
      <Box pb={"24px"} w={"full"}>
        <Text fontSize={"16px"} fontWeight={"700"}>
          Users
        </Text>
      </Box>
      {/* <VStack w={"full"}> */}
      <HStack
        w={"full"}
        justifyContent={"space-between"}
        display={"flex"}
        pb={"36px"}
      >
        <HStack w={"full"} gap={"8px"}>
          <Image
            boxSize="56px"
            rounded="100%"
            src= {user?.email || "https://bit.ly/dan-abramov"}
            alt="Simon the pensive"
            mr="12px"
          />
          <VStack w={"full"} gap={"1px"}>
            <Box w={"full"}>
              <Text fontWeight={"800"} fontSize={"18px"}>
              {user?.firstName}  {user?.lastName}
              </Text>
            </Box>
            <Box w={"full"}>
              <Text fontWeight={"400"} fontSize={"12px"}>
              {user?.email}
              </Text>
            </Box>
          </VStack>
        </HStack>
        <HStack>
          {/* <Box>
            <Button
              fontSize={"14px"}
              fontWeight={"500"}
              color={"#FFFFFF"}
              bg={"#023436"}
              onClick={onSecondModalOpen}
            >
              Suspend user
            </Button>
          </Box> */}
          <Box>
            <Button
              fontSize={"14px"}
              fontWeight={"500"}
              color={"#FF4834"}
              bg={"transparent"}
              border={"1px"}
              borderColor={"#FF4834"}
              onClick={DeleteonopenModalOpen}
            >
              Suspend user
            </Button>
          </Box>
        </HStack>
      </HStack>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 2 }}
        spacing={6}
        width="100%"
        pb={"24px"}
      >
        {data.map((item, index) => (
          <Card
            border="1px"
            borderColor="gray.200"
            borderRadius="md"
            key={index}
            cursor="pointer"
            bg={"white"}
            _hover={{
              bg: "#ECECEC",
              transform: "scale(1.1)",
            }}
            transition="transform 0.5s ease-in-out, background-color 0.7s ease"
          >
            <CardBody>
              <Box>
                <Text fontSize="11px" fontWeight="500" color={"#71717A"}>
                  {item.title}
                </Text>
                <Text fontSize="18px" fontWeight="700">
                  {item.number}
                </Text>
              </Box>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>
      {/* </VStack> */}
      <Box w={"full"}>
        <HStack w={"full"} display={"flex"} justifyContent={"space-between"}>
          <VStack w={"full"}>
            <Box w={"full"}>
              <Text fontWeight={"500"} fontSize={"11px"} color={"#A1A1AA"}>
                KYC LEVEL
              </Text>
            </Box>
            <HStack w={"full"}>
              <HStack gap={"1px"}>
                <Text fontWeight={"500"} fontSize={"14px"}>
                KycStatus
                </Text>{" "}
                {/* <MdGppGood
                  style={{
                    display: "inline",
                    marginLeft: "8px",
                    color: "green",
                  }}
                /> */}
              </HStack>
              <HStack gap={"1px"}>
                <Text fontWeight={"500"} fontSize={"14px"} color={user?.kycStatus==='NOT-STARTED'||'PENDING'?"ORANGE":'green'} >
                 {user?.kycStatus}
                </Text>
                <MdGppGood
                  style={{
                    display: "inline",
                    marginLeft: "8px",
                    color: user?.kycStatus==='NOT-STARTED'||'PENDING'?"ORANGE":'green',
                  }} 
                 />
              </HStack>
            </HStack>
          </VStack>
          <Box w={"full"} display={"flex"} justifyContent={"end"}>
            <Link fontWeight={"500"} fontSize={"12px"} color={"#4F46E5"}>
              View documents
            </Link>
          </Box>
        </HStack>
      </Box>
      <SimpleGrid w={"40%"}>
        <GridItem w={"full"} pb={"16px"}>
          <Text fontWeight={"500"} fontSize={"11px"} color={"#A1A1AA"}>
            BANK DETAILS
          </Text>
        </GridItem>
        <GridItem w={"full"} pb={"24px"}>
            <VStack w={"full"}>
              <Box w={"full"}>
                <Text fontWeight={"500"} fontSize={"12px"}>
                {user?.firstName}  {user?.lastName}
                </Text>
              </Box>
              <HStack w={"full"}>
                <Text fontWeight={"500"} fontSize={"12px"} color={"#A1A1AA"}>
                  3092764731 | FIRSTBANK PLC
                </Text>
                <Button
            // w={'full'}
            size='xs'
            rounded={'10px'}
              bg={"transparent"}
              border={"1px"}
              borderColor={"#A1A1AA"}
              fontWeight={"400"}
              fontSize={"10px"}
            >
              Primary
            </Button>
              </HStack>
              
            </VStack>
        </GridItem>

        <GridItem w={"full"} pb={"24px"}>
            <VStack w={"full"}>
              <Box w={"full"}>
                <Text fontWeight={"500"} fontSize={"12px"}>
                  MATTHEW OLA OLUKOJU
                </Text>
              </Box>
              <Box w={"full"}>
                <Text fontWeight={"500"} fontSize={"12px"} color={"#A1A1AA"}>
                  3092764731 | FIRSTBANK PLC
                </Text>
              
              </Box>
              
            </VStack>
        </GridItem>
<SusPend isOpen={isSecondModalOpen} onClose={onSecondModalClose}/>
<DeleteUser isOpen={Deleteisopen} onClose={DeleteoncloseModalclose}/>
      </SimpleGrid>
    </Box>
  );
}
