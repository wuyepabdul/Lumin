import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import CounterInput from "react-counter-input";
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
  Text,
  Flex,
  Image,
  Box,
  Center,
  useMediaQuery,
  useDisclosure,
  Alert,
  CloseButton,
} from "@chakra-ui/react";
import {
  addToCartAction,
  changeQuantityAction,
  removeFromCartAction,
} from "../../redux/actions/cartActions";
import { LOAD_CURRENCY } from "../../Graphql/Queries";

const CartDrawer = ({ product }) => {
  const { data } = useQuery(LOAD_CURRENCY);
  const [isLargerThan768] = useMediaQuery("(min-width:768px)");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = React.useRef();

  const dispatch = useDispatch();
  const [currencyList, setCurrencyList] = useState([]);

  const cartItems = useSelector((state) => state.cart.cartItems);

  useEffect(() => {
    if (data !== "undefined") {
      createListOfCurrencies();
    }
    // eslint-disable-next-line
  }, [data]);

  const createListOfCurrencies = () => {
    let listOfCurrencies = [];

    if (data) {
      data.__type.currencies.forEach((currency) => {
        let combinedString = "";
        for (let item in currency) {
          combinedString += currency[item] + "";
        }
        listOfCurrencies.push(combinedString.slice(11, 14));
      });
    }

    setCurrencyList(listOfCurrencies);
  };

  const handleCurrencyChange = (e) => {
    console.log(e.target.value);
  };

  const handleAddToCart = () => {
    console.log(product);
    const item = {
      id: product.id,
      title: product.title,
      price: product.price,
      image_url: product.image_url,
      qty: 1,
    };
    dispatch(addToCartAction(item));
  };

  const handleQuantityChange = (item, quantity) => {
    dispatch(changeQuantityAction(item, quantity));
  };

  const handleRemoveCartItem = (item) => {
    dispatch(removeFromCartAction(item));
  };
  return (
    <>
      <Button
        onClick={() => {
          onOpen();
          handleAddToCart();
        }}
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
              {currencyList.map((currency) => (
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
                          count={item.qty}
                          min={0}
                          max={10}
                          onCountChange={(count) =>
                            count === 0
                              ? handleRemoveCartItem(item)
                              : handleQuantityChange(item, count)
                          }
                          border="1px"
                        />
                      </Box>
                    </VStack>
                    <Spacer />
                    <Box mt="12">NGN {item.price * item.qty}</Box>
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
                      onClick={() => handleRemoveCartItem(item)}
                      position="absolute"
                      right="8px"
                      top="8px"
                    />
                  </Alert>
                </Stack>
              ))
            )}
          </DrawerBody>
          <Flex>
            {" "}
            <Text> </Text>
            <Text></Text>
            <Box p="4">Subtotal</Box>
            <Spacer />
            <Box p="4">
              {cartItems.reduce(
                (prevItem, nextItem) =>
                  prevItem + nextItem.qty * nextItem.price,
                0
              )}{" "}
            </Box>
          </Flex>

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
