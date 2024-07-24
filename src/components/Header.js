import React from 'react';
import { Box, Flex, Button, Image } from "@chakra-ui/react";

function Header() {
  return (
    <Box bg="white" px={8} py={4} borderBottom="1px" borderColor="gray.200">
      <Flex maxW="1200px" mx="auto" alignItems="center">
        <Image src="/logo.png" alt="OpenCommerce Logo" height="30px" />
        <Button colorScheme="purple" variant="solid" size="md" rounded="full" ml="auto">
          Log In
        </Button>
      </Flex>
    </Box>
  );
}

export default Header;
