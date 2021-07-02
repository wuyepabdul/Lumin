import React from "react";
import { Skeleton, Box, HStack } from "@chakra-ui/react";
const LoadingSkeleton = () => {
  return (
    <>
      <HStack>
        <Skeleton height="100px">
          <Box />{" "}
        </Skeleton>
        <Skeleton height="20px">
          <Box />{" "}
        </Skeleton>
        <Skeleton height="20px">
          <Box />{" "}
        </Skeleton>
        <Skeleton height="30px">
          <Box />{" "}
        </Skeleton>
      </HStack>
    </>
  );
};

export default LoadingSkeleton;
