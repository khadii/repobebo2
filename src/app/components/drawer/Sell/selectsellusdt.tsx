import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  GridItem,
  Input,
  SimpleGrid,
  Text,
  Button,
  InputGroup,
  InputLeftAddon,
  HStack,
  Image,
  InputRightAddon,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Formik, Field, Form, FieldProps } from "formik";
import Select from "react-select";
import * as Yup from "yup";
import { MarketRate } from "../Buy/NotificationBuy";
import { useCryptoContext } from "../Buy/usecontextbuy";
import { AxiosGet } from "@/app/axios/axios";
//   import NotificationBuy, { MarketRate

const validationSchema = Yup.object().shape({
  // asset: Yup.string().required("Asset is required"),
  USDT: Yup.number()
    .typeError("Total amount must be a number")
    .required("Total amount is required"),
});

export default function SelectUSDT({
  setStep,
  // handleclick,
}: {
  setStep: any;
  // handleclick: any;
}) {
  const toast = useToast();
  const {
    setblockchain,
    sellRate,
    setsellRate,
    sellimage,
    setsellimage,
    sellsymbol,
    setsellsymbol,
    sellConversion2,
    setsellConversion2,
    selectedsellNetwork,
    setSelectedsellNetwork,
    blockchain,
    sellvalueusdt,
    setsellvalueusdt,
  } = useCryptoContext();
  const [Value, setValue] = useState(null);
  const updateNetworkOptions = (USDT: number) => {
    const currentPrice = parseFloat(sellRate); // Assuming 'rate' is the current price

    if (currentPrice > 0 && USDT > 0) {
      const value = USDT * currentPrice;
      const formattedValue = parseFloat(value.toFixed(20));
      setsellConversion2(formattedValue);
    }
  };

  const handleProceed = (values: any) => {
    setsellvalueusdt(values.USDT)
    setStep(4);
  };
  const url = "wallet/assets"; // API URL
  const [errorMessage, setErrorMessage] = useState("");
  const getUpdatedPrice = async (
    networkName: string,
    retryCount: number = 0
  ): Promise<void> => {
    // const maxRetries = 10; // Set maximum number of retries
    // const retryInterval = 2000; // 2 seconds

    try {
      const res = await AxiosGet(url);
      if (res) {
        const updatedNetwork = res.data.find(
          (network: any) => network.name === networkName
        );
        if (updatedNetwork && selectedsellNetwork) {
          // Check if the price has changed
          if (
            updatedNetwork.current_price !== selectedsellNetwork.current_price
          ) {
            // Show toast if price has changed
            toast({
              title: "Rate Updated",
              description: `${selectedsellNetwork.name}'s rate is now ${updatedNetwork.current_price}`,
              status: "info",
              duration: 5000,
              isClosable: true,
            });

            // Update sell rate and selected network price
            setsellRate(updatedNetwork.current_price);
            setSelectedsellNetwork((prevNetwork: any) => ({
              ...prevNetwork!,
              current_price: updatedNetwork.current_price,
            }));
          }
          return; // Exit after successful update
        }
      }
    } catch (err: any) {
      console.log("Error updating price:", err);
      setErrorMessage("Failed to update rate. Please try again.");
    }
  };
  useEffect(() => {
    if (selectedsellNetwork && selectedsellNetwork.name !== null) {
      const interval = setInterval(() => {
        getUpdatedPrice(selectedsellNetwork.name);
      }, 6000);

      return () => clearInterval(interval); // Cleanup the interval
    }
  }, [selectedsellNetwork]);
  return (
    <Formik
      initialValues={{
      
        USDT: "",
       
      }}
      validationSchema={validationSchema}
      onSubmit={handleProceed}
    >
      {({ errors, touched, setFieldValue, isValid, dirty }) => (
        <Form>
          <Box p={4}>
            <SimpleGrid columns={1}>
              <GridItem colSpan={1}>
                <Text fontWeight="600" fontSize="25px">
                  Select asset
                </Text>
              </GridItem>
              <GridItem colSpan={1} mt={"18px"}>
                <Text fontWeight="600" fontSize="15px" color="#666666">
                  Select amount of asset you want to buy
                </Text>
              </GridItem>

              {/* <GridItem colSpan={1} mt={"40px"}>
                  <FormControl isInvalid={!!errors.asset && touched.asset}>
                    <FormLabel fontSize="16px" fontWeight="600">
                      Select asset to buy
                    </FormLabel>
                    <Field name="asset">
                      {({ field }: FieldProps) => (
                        <Select
                          {...field}
                          id="asset"
                          options={networkOptions}
                          isSearchable
                          placeholder="Select asset"
                          value={Value}
                          onChange={(selectedOption: any) => {
                            handleValueChange(selectedOption, setFieldValue);
                          }}
                        />
                      )}
                    </Field>
                    <FormErrorMessage>{errors.asset}</FormErrorMessage>
                  </FormControl>
                </GridItem> */}

              <GridItem colSpan={1} mb={"28px"} mt={"18px"}>
                {/* <FormControl isInvalid={!!errors.naira && touched.naira}> */}
                <FormLabel fontSize="16px" fontWeight="600">
                  My Rate
                </FormLabel>
                <InputGroup>
                  <Field
                    // variant='unstyled'
                    as={Input}
                    disabled
                    h={["50px", "50px", "44px"]}
                    type="text"
                    id={"rate"}
                    name={"rate"}
                    placeholder={sellRate}
                    color="black"
                    _placeholder={{ color: "black.700" }}
                    borderColor={"#cbd5e1"}
                    value={new Intl.NumberFormat("en-NG", {
                      // style: 'currency',
                      // currency: 'NGN',
                    }).format(sellRate)}
                    style={{
                      borderRight: "none",
                      borderTopRightRadius: 0,
                      borderBottomRightRadius: 0,
                    }}
                  />
                  <InputRightAddon h={["50px", "50px", "44px"]}>
                    <HStack>
                      <Image
                        boxSize="25px"
                        objectFit="cover"
                        src={sellimage}
                        // width="18"
                        // height="14"
                        alt="bebo"
                      ></Image>
                      <Text fontWeight={"600"} fontSize={"16px"}>
                        {" "}
                        {sellsymbol.toUpperCase()}
                      </Text>
                    </HStack>
                  </InputRightAddon>
                </InputGroup>
                {/* <FormErrorMessage>{errors.naira}</FormErrorMessage> */}
                {/* </FormControl> */}
                <Text
                  fontSize={"10px"}
                  fontWeight={"500"}
                  color={"grey"}
                  mt={"10px"}
                  mb={"5px"}
                >
                  Generic Market Rate
                </Text>
                <Box
                  w={"fit-content"}
                  bg={"#E7F6EC"}
                  p={"3px"}
                  borderRadius={"5px"}
                >
                  <Text fontSize={"12px"} fontWeight={"600"}>
                    1 {blockchain} = {sellRate} Naira
                  </Text>
                </Box>
              </GridItem>
              <GridItem colSpan={1} mb={"28px"}>
                <FormControl isInvalid={!!errors.USDT && touched.USDT}>
                  <FormLabel fontSize="16px" fontWeight="600">
                    Total amount of {blockchain} i want to sell
                  </FormLabel>
                  <InputGroup>
                    <Field
                      h={["50px", "50px", "44px"]}
                      as={Input}
                      type="text"
                      id={"USDT"}
                      name={"USDT"}
                      placeholder={"10.00"}
                      style={{
                        borderRight: "none",
                        borderTopRightRadius: 0,
                        borderBottomRightRadius: 0,
                      }}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        let inputValue = e.target.value;

                        // Remove any non-numeric characters except for the decimal point
                        inputValue = inputValue.replace(/[^0-9.]/g, "");

                        // Ensure only one decimal point is allowed
                        const parts = inputValue.split(".");
                        if (parts.length > 2) {
                          inputValue = parts[0] + "." + parts.slice(1).join("");
                        }

                        // Limit the total length of input to 10 characters (including the decimal point)
                        if (inputValue.length > 10) {
                          inputValue = inputValue.slice(0, 10);
                        }

                        // If input starts with a decimal point, prepend a zero
                        if (inputValue.startsWith(".")) {
                          inputValue = "0" + inputValue;
                        }

                        // Update the Formik field and any other state
                        setFieldValue("USDT", inputValue);
                        const USDT = parseFloat(inputValue);
                       
                        // setsellConversion2(inputValue); // Ensure this is the correct state update
                        updateNetworkOptions(USDT);
                      }}
                    />
                    <InputRightAddon h={["50px", "50px", "44px"]}>
                      <HStack>
                        <Image
                          boxSize="25px"
                          objectFit="cover"
                          src={sellimage}
                          alt="bebo"
                        ></Image>
                        <Text fontWeight={"600"} fontSize={"16px"}>
                          {" "}
                          {sellsymbol.toUpperCase()}
                        </Text>
                      </HStack>
                    </InputRightAddon>
                  </InputGroup>
                  <FormErrorMessage>{errors.USDT}</FormErrorMessage>
                </FormControl>
              </GridItem>
              <GridItem colSpan={1} mb={"28px"}>
                {/* <FormControl isInvalid={!!errors.naira && touched.naira}> */}
                <FormLabel fontSize="16px" fontWeight="600">
                  Amount of {blockchain} value in naira
                </FormLabel>
                <Field
                  placeholder="converted value"
                  disabled
                  as={Input}
                  h={["50px", "50px", "44px"]}
                  type="text"
                  value={new Intl.NumberFormat("en-NG", {
                      // style: 'currency',
                      // currency: 'NGN',
                    }).format(sellConversion2)}
                  borderColor={"#cbd5e1"}
                />

                {/* </FormControl> */}
              </GridItem>
              {/* <GridItem
                cursor={"pointer"}
                mt={""}
                mb={""}
                display={"flex"}
                justifyContent={"right"}
              >
                <Button onClick={handleclick}>
                  <Text fontWeight={"600"} fontSize={"16px"} color={"#0CBF94"}>
                    {"sell in naira"}
                  </Text>
                </Button>
              </GridItem> */}
              <GridItem colSpan={1} mt={"30px"}>
                <Button
                  type="submit"
                  w={"full"}
                  h={["50px", "50px", "44px"]}
                  bg={isValid ? "#0CBF94" : "gray.400"}
                  fontSize={"16px"}
                  fontWeight={"600"}
                  color={isValid ? "#021D17" : "gray.600"}
                  isDisabled={!isValid || !dirty}
                  _hover={{
                    bg: isValid ? "#0CBF94" : "gray.400",
                  }}
                >
                  Swap
                </Button>
              </GridItem>
            </SimpleGrid>
          </Box>
        </Form>
      )}
    </Formik>
  );
}
