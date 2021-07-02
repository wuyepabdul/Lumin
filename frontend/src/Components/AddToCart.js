import React from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Stack,
  Text,
  Image,
  Box,
  Center,
  Select,
  useMediaQuery,
  FormControl,
  FormLabel,
  useDisclosure,
  InputRightAddon,
} from "@chakra-ui/react";
import CartDrawer from "./drawer/CartDrawer";
import lodash from "lodash";
import { addToCartAction } from "../redux/actions/cartActions";
import { useDispatch } from "react-redux";

const AddToCart = ({ product }) => {
  const [isLargerThan768] = useMediaQuery("(min-width:768px)");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = React.useRef();
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    let cartItems = [];
    if (typeof window !== "undefined") {
      if (localStorage.getItem("cartItems")) {
        cartItems = JSON.parse(localStorage.getItem("cartItems"));
      }
      cartItems.push({ ...product, qty: 1 });

      let uniqueItem = lodash.uniqWith(cartItems, lodash.isEqual);
      console.log("uniqueItem", uniqueItem);

      dispatch(addToCartAction(uniqueItem));
    }
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
              <Image
                boxSize="60px"
                objectFit="contain"
                src={product.image_url}
                alt=""
              />
            </Center>
          </DrawerHeader>

          <DrawerBody>
            <Stack spacing={3}>
              <Box>
                <Text fontSize="2xl">First, let's personalize.</Text>

                <Text fontSize="sm">
                  Products that you receive may vary according to your age
                  bracket & skin type to optimize results.
                </Text>
              </Box>
              <Box pt="10">
                <Text fontSize="xs">Personalization Details</Text>

                <Box>
                  <FormControl id="country" py="3">
                    <FormLabel fontSize="xs">Skin Type</FormLabel>
                    <Select
                      size="lg"
                      bg="#fff"
                      fontSize="xs"
                      placeholder="Select Option"
                      borderRadius="0px"
                      _focus={{
                        border: "0",
                        boxShadow:
                          "0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)",
                      }}
                    >
                      <option>Option 1</option>
                      <option>Option 2</option>
                    </Select>
                  </FormControl>
                  <FormControl id="country">
                    {" "}
                    <FormLabel fontSize="xs">Country</FormLabel>
                    <Select
                      size="lg"
                      bg="#fff"
                      fontSize="xs"
                      placeholder="Select Option"
                      borderRadius="0px"
                    >
                      <option>Option 1</option>
                      <option>Option 1</option>
                    </Select>
                  </FormControl>
                </Box>
              </Box>
            </Stack>
          </DrawerBody>

          <DrawerFooter>
            {/*   <Button
              onClick={handleAddToCart}
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
              Add to Carts
            </Button> */}
            <CartDrawer product={product} />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default AddToCart;
