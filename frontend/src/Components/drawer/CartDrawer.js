import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CounterInput from "react-counter-input";
import { CloseIcon } from "@chakra-ui/icons";

import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Spacer,
  Stack,
  VStack,
  HStack,
  Text,
  Image,
  Box,
  Center,
  Select,
  useMediaQuery,
  FormControl,
  FormLabel,
  useDisclosure,
  Alert,
  CloseButton,
  useConst,
} from "@chakra-ui/react";
import {
  addToCartAction,
  removeFromCartAction,
} from "../../redux/actions/cartActions";

const CartDrawer = ({ product }) => {
  const [isLargerThan768] = useMediaQuery("(min-width:768px)");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = React.useRef();

  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);
  const cartItems = useSelector((state) => state.cartItems);
  const currencies = [
    "USD",
    "AED",
    "AFN",
    "ALL",
    "AMD",
    "ANG",
    "AOA",
    "ARS",
    "AUD",
    "AWG",
    "AZN",
    "BAM",
    "BBD",
    "BDT",
    "BGN",
  ];

  const handleCurrencyChange = (e) => {
    console.log(e.target.value);
  };

  const handleQuantityChange = (productId, quantity) => {
    let cartItems = [];
    if (typeof window !== "undefined") {
      if (localStorage.getItem("cartItems")) {
        cartItems = JSON.parse(localStorage.getItem("cartItems"));
      }

      cartItems.map((item, index) => {
        if (item.id === productId) {
          cartItems[index].qty = quantity;
        }
      });

      dispatch(addToCartAction(cartItems));
    }
  };

  const handleRemoveCartItem = (productId) => {
    dispatch(removeFromCartAction(productId));
  };
  return (
    <>
      <Button
        onClick={onOpen}
        my="3"
        colorScheme="teal"
        width={isLargerThan768 ? "200px" : "100%"}
        size="lg"
        borderRadius="0px"
        bgColor="rgb(75, 85, 72)"
        _hover={{ bg: "#000" }}
        fontSize="14px"
        fontWeight="100px"
        transition="all 0.5s cubic-bezier(0.7,.9,.9,.9)"
      >
        Add to Cart
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        initialFocusRef={firstField}
        onClose={onClose}
        size="md"
        bg="#f5f5f4"
      >
        <DrawerOverlay />
        <DrawerContent bg="#f5f5f4">
          <DrawerCloseButton placement="left" />
          <DrawerHeader my="3">
            <Center>
              <Text fontSize="9px" color="gray" fontWeight="100">
                YOUR CART
              </Text>
            </Center>
          </DrawerHeader>

          <DrawerBody>
            <select
              name="currency"
              id="currency"
              className="form-select mb-3"
              style={{ width: "100px" }}
              onChange={handleCurrencyChange}
            >
              {currencies.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}{" "}
                </option>
              ))}
            </select>

            {cartItems.length === 0 ? (
              <Text>There are no items in your cart.</Text>
            ) : (
              cartItems.map((item) => (
                <Stack key={item.id} mb="3" spacing={3}>
                  <Alert bg="#fff">
                    <VStack>
                      <Box width="40" fontSize="13">
                        {item.title}
                      </Box>
                      <Box width="40" fontSize="10px">
                        Product description here{" "}
                      </Box>
                      <Box border="1px" width="40" fontSize="sm">
                        <CounterInput
                          min={0}
                          max={10}
                          onCountChange={(count) =>
                            handleQuantityChange(item.id, count)
                          }
                          border="1px"
                        />
                      </Box>
                    </VStack>
                    <Spacer />
                    <Box mt="12">NGN {item.price}</Box>
                    <Spacer />
                    <Box p="7">
                      <Image
                        boxSize="60px"
                        objectFit="contain"
                        src={item.image_url}
                        alt=""
                      />
                    </Box>

                    <CloseButton
                      onClick={() => handleRemoveCartItem(item.id)}
                      position="absolute"
                      right="8px"
                      top="8px"
                      position="absolute"
                      right="8px"
                      top="8px"
                    />
                  </Alert>
                </Stack>
              ))
            )}
          </DrawerBody>

          <DrawerFooter>
            <Button
              onClick={onOpen}
              my="3"
              colorScheme="teal"
              width="100%"
              size="lg"
              borderRadius="0px"
              bgColor="rgb(75, 85, 72)"
              _hover={{ bg: "#000" }}
              fontSize="14px"
              fontWeight="100px"
              transition="all 0.5s cubic-bezier(0.7,.9,.9,.9)"
            >
              Proceed to Checkout
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default CartDrawer;
