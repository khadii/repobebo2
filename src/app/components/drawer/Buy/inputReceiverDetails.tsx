import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  GridItem,
  SimpleGrid,
  Text,
  Button,
  Input,
  HStack,
  Spinner,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Formik, Field, Form, FieldProps } from "formik";
import Select from "react-select";
import * as Yup from "yup";
import NotificationBuy from "./NotificationBuy";
import { AxiosGet } from "@/app/axios/axios";
import { Image } from '@chakra-ui/react';

const validationSchema = Yup.object().shape({
  Network: Yup.string().required("Network is required"),
  Walletaddress: Yup.string().required("Wallet address is required"),
});

export default function InputReceiverDetails({
  setStep,
  setNetwork,
  setWalletaddress,
  setName,
  settoprice,
  Network,
  setSymbol,
  setcurrentsImage,
  setcurrentsName,
}: {
  setStep: any;
  setNetwork: any;
  setWalletaddress: any;
  setName: any;
  settoprice: any;
  Network: any;
  setSymbol: any;
  setcurrentsImage: any;
  setcurrentsName: any;
}) {
  const [Value, setValue] = useState(null);
  const [NetValue, setNetValue] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [currentPrice, setCurrentPrice] = useState(0);
  const [currentSymbol, setcurrentSymbol] = useState("");
  const [currentImage, setcurrentImage] = useState("");
  const [currentName, setcurrentName] = useState("");

  const handleValueChange = (selectedOption: any, setFieldValue: any) => {
    setFieldValue("Network", selectedOption ? selectedOption.value : "");
    setValue(selectedOption);
    setCurrentPrice(selectedOption ? selectedOption.current_price : 0);
    setcurrentSymbol(selectedOption ? selectedOption.symbol : "");
    setcurrentImage(selectedOption ? selectedOption.image : "");
    setcurrentName(selectedOption ? selectedOption.name : "");
  };

  const handleProceed = (values: any) => {
    setNetwork(values.Network);
    setWalletaddress(values.Walletaddress);
    setName(values.Network);
    settoprice(currentPrice);
    setSymbol(currentSymbol);
    setcurrentsImage(currentImage);
    setcurrentsName(currentName);
    // console.log('price',currentPrice)
    // alert(
    //   `Network: ${values.Network}, Wallet Address: ${values.Walletaddress}, Current Price: ${currentPrice}`
    // );
    setStep(2);
  };

  const url = "wallet/assets";
  const updateNetworkOptions = (data: any) => {
    const updatedOptions = data.map((item: any) => ({
      value: item.name,
      label: (
        <HStack>
          <Image
            boxSize="22px"
            objectFit="cover"
            src={item.image}
            alt={item.name}
          />
          <Text>{item.name}</Text>
        </HStack>
      ),
      current_price: item.current_price,
      symbol: item.symbol,
      image: item.image,
      name: item.name,
    }));
    setNetworkOptions(updatedOptions);
  };

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | undefined = undefined;// Typing timeoutId as NodeJS.Timeout
    const fetchData = async () => {
      const success = await getnetwork();
      if (!success) {
        setTimeout(fetchData, 2000); // Retry after 2 seconds if failed
      }
    };

    fetchData(); // Initial call
    return () => {
      // Cleanup function to clear the timeout if it was set
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  const getnetwork = async () => {
    setLoading(true);
    try {
      const res = await AxiosGet(url);
      setLoading(false);
      if (res) {
        console.log(res.data);
        setNetValue(res.data);
        updateNetworkOptions(res.data);
        setLoading(false);
        setErrorMessage(""); // Clear error message on success
        return true;
      }
    } catch (err: any) {
      setLoading(false);
      let message = "Check your Network and try again.";
      if (err.response && err.response.data && err.response.data.message) {
        message = err.response.data.message;
      }
      setErrorMessage(message);
    }
  };

  const [networkOptions, setNetworkOptions] = useState([]);

  return (
    <Formik
      initialValues={{
        Network: "",
        Walletaddress: "",
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
                  Input receiver details
                </Text>
              </GridItem>

              <GridItem colSpan={1} mt={"10px"}>
                <Text
                  fontWeight="600"
                  fontSize={["15px", "15px"]}
                  color="#666666"
                >
                  Input details of where you want your crypto sent to
                </Text>
              </GridItem>
              <GridItem colSpan={1} mt={"18px"}>
                <NotificationBuy />
              </GridItem>
              <GridItem colSpan={1} mb={"10px"}>
                <Button
                  fontWeight="600"
                  bg={'#F8F8F8'}
                  fontSize="16px"
                  width="full"
                  h={["50px", "50px", "44px"]}
                >
                  Only Accept USDT TRC20
                </Button>
              </GridItem>
              <GridItem colSpan={1} mb={"28px"}>
                <FormControl isInvalid={!!errors.Network && touched.Network}>
                  <FormLabel fontSize="16px" fontWeight="600">
                    Crypto
                  </FormLabel>
                  <Field name="Network">
                    {({ field }: FieldProps) => (
                      <Select
                        {...field}
                        id="Network"
                        options={networkOptions}
                        isSearchable
                        isLoading={loading}
                        placeholder="Select Crypto"
                        value={Value}
                        noOptionsMessage={() => errorMessage}
                        onChange={(selectedOption: any) => {
                          handleValueChange(selectedOption, setFieldValue);
                        }}
                        styles={{
                          control: (provided) => ({
                            ...provided,
                            height: "50px", // Default for mobile screens
                            [`@media (min-width: 768px)`]: {
                              height: "50px", // Medium screens
                            },
                            [`@media (min-width: 992px)`]: {
                              height: "44px", // Large screens
                            },
                          }),
                        }}
                      />
                    )}
                  </Field>
                  <FormErrorMessage>{errors.Network}</FormErrorMessage>
                </FormControl>
              </GridItem>
              <GridItem colSpan={1} mb={"28px"}>
                <FormControl
                  isInvalid={!!errors.Walletaddress && touched.Walletaddress}
                >
                  <FormLabel fontSize="16px" fontWeight="600">
                    Wallet address
                  </FormLabel>
                  <Field
                    as={Input}
                    h={["50px", "50px", "44px"]}
                    type="text"
                    name="Walletaddress"
                    placeholder="Enter wallet address"
                  />
                  <FormErrorMessage>{errors.Walletaddress}</FormErrorMessage>
                </FormControl>
              </GridItem>
              <GridItem colSpan={1} mt={"30px"}>
                <Button
                  h={["50px", "50px", "44px"]}
                  type="submit"
                  w={"full"}
                  bg={isValid ? "#0CBF94" : "gray.400"}
                  fontSize={"16px"}
                  fontWeight={"600"}
                  color={isValid ? "#021D17" : "gray.600"}
                  isDisabled={!isValid || !dirty}
                  _hover={{
                    bg: isValid ? "#0CBF94" : "gray.400",
                  }}
                >
                  Continue
                </Button>
              </GridItem>
            </SimpleGrid>
          </Box>
        </Form>
      )}
    </Formik>
  );
}
