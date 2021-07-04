import { Box, Image, Center, Text } from "@chakra-ui/react";
import CartDrawer from "./drawer/CartDrawer";

const ProductCard = ({ product }) => {
  return (
    <Box
      maxW="sm"
      borderRadius="lg"
      overflow="hidden"
      alignItems="center"
      my="10"
    >
      <Center>
        <Image
          boxSize="140px"
          objectFit="contain"
          src={product.image_url}
          alt=""
        />
      </Center>

      <Center>
        <Box my="3" lineHeight="tight" isTruncated>
          <Text fontSize="md">{product.title}</Text>
        </Box>
      </Center>
      <Center>
        <Box my="3">
          <Text fontSize="lg">NGN {product.price} </Text>
        </Box>
      </Center>
      <Center>
        <CartDrawer product={product} />
      </Center>
    </Box>
  );
};

export default ProductCard;
