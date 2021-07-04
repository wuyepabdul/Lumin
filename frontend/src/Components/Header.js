import {
  Box,
  Flex,
  HStack,
  Link,
  IconButton,
  useDisclosure,
  Stack,
  Image,
  Text,
  Select,
  Divider,
  Spacer,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import logo from "../lumin.png";
import shoppingCart from "../shoppinCart.png";
import { useSelector } from "react-redux";

const Links = ["Shop", "Help", "Blog"];
const Options = [
  "Filter By",
  "All Products",
  "New Products",
  "Sets",
  "Skin Care",
  "Hair & Body Care",
  "Accessories",
];
const languages = [
  "AR",
  "FR",
  "EN",
  "ES",
  "DE",
  "HE",
  "ID",
  "ZH-TW",
  "PT",
  "TH",
  "DA",
  "JA",
  "KO",
];

const NavLink = ({ children }) => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      color: "gray.400",
    }}
    href={"#"}
  >
    {children}
  </Link>
);

export default function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cartItems = useSelector((state) => state.cartItems);
  return (
    <Box pt="2" bg="#f5f5f4" alignItems="stretch">
      <Box px="10">
        <Flex
          h={16}
          alignItems={"center"}
          justifyContent={"space-between"}
          color={"black.100"}
          minH={"60px"}
          py={{ base: 2 }}
        >
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Box>
              <Image src={logo} boxSize="150px" objectFit="contain" />
            </Box>
            <HStack
              as={"nav"}
              spacing={6}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </HStack>
          </HStack>
          <HStack spacing={8} alignItems={"center"}>
            <NavLink>Account</NavLink>

            <NavLink>
              {" "}
              <HStack>
                <Image src={shoppingCart} boxSize="50px" objectFit="contain" />
                <sup>{cartItems.length !== 0 && cartItems.length} </sup>
              </HStack>
            </NavLink>
            <Box>
              {" "}
              <HStack> </HStack>
            </Box>
            <Select
              size="sm"
              borderRadius="0"
              borderColor="black"
              defaultChecked="EN"
            >
              {languages.map((language) => (
                <option key={language} value={language}>
                  {language}
                </option>
              ))}
            </Select>
          </HStack>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
      <Divider bgColor="gray.300" orientation="horizontal" />
      <Box px="10" py="15" my="20">
        <HStack spacing={8} alignItems="stretch" py="5">
          <Box>
            <Text> All Products</Text>
            <Text> A 360 look at Lumin</Text>
          </Box>
          <Spacer />
          <Box>
            <Select size="lg" borderRadius="0" borderColor="black">
              {Options.map((Option) => (
                <option key={Option} value="option">
                  {Option}
                </option>
              ))}
            </Select>
          </Box>
        </HStack>
      </Box>
    </Box>
  );
}
