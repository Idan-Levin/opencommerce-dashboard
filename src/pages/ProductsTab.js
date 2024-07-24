import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Heading,
  VStack,
  HStack,
  Input,
  Textarea,
  Select,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Spinner,
  Center,
} from "@chakra-ui/react";

function ProductsTab() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    type: 'offchain',
    price: '',
    currency: 'ETH',
    chain: 'Ethereum',
    contractAddress: '',
    functionCall: '',
    functionDescription: '',
    eoaAddress: ''
  });
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    // Simulating API call when component mounts
    setTimeout(() => {
      const mockProducts = [
        { id: 1, name: 'Product A', description: 'Description A', type: 'digital', price: '10', currency: 'ETH', chain: 'Ethereum' },
        { id: 2, name: 'Product B', description: 'Description B', type: 'physical', price: '20', currency: 'USDC', chain: 'Polygon' },
      ];
      setProducts(mockProducts);
      setIsLoading(false);
    }, 1500);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setProducts(prev => [...prev, { ...newProduct, id: Date.now() }]);
    setNewProduct({
      name: '',
      description: '',
      type: 'offchain',
      price: '',
      currency: 'ETH',
      chain: 'Ethereum',
      contractAddress: '',
      functionCall: '',
      functionDescription: '',
      eoaAddress: ''
    });
    onClose();
  };

  return (
    <Box p={5}>
      <HStack justify="space-between" mb={5}>
        <Heading>Products</Heading>
        <Button colorScheme="purple" onClick={onOpen}>Add Product</Button>
      </HStack>

      {isLoading ? (
        <Center h="200px">
          <Spinner size="xl" color="purple.500" />
        </Center>
      ) : (
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Description</Th>
              <Th>Type</Th>
              <Th>Price</Th>
              <Th>Chain</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {products.map(product => (
              <Tr key={product.id}>
                <Td>{product.name}</Td>
                <Td>{product.description}</Td>
                <Td>{product.type}</Td>
                <Td>{`${product.price} ${product.currency}`}</Td>
                <Td>{product.chain}</Td>
                <Td>
                  <Button size="sm" colorScheme="yellow" mr={2}>Edit</Button>
                  <Button size="sm" colorScheme="red">Delete</Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4} align="stretch">
              <Input 
                name="name" 
                placeholder="Product Name" 
                value={newProduct.name} 
                onChange={handleInputChange} 
              />
              <Textarea 
                name="description" 
                placeholder="Description" 
                value={newProduct.description} 
                onChange={handleInputChange} 
              />
              <Select 
                name="type" 
                value={newProduct.type} 
                onChange={handleInputChange}
              >
                <option value="offchain">Off-Chain</option>
                <option value="onchain">On-Chain</option>
              </Select>
              <Input 
                name="price" 
                placeholder="Price" 
                value={newProduct.price} 
                onChange={handleInputChange} 
                type="number"
              />
              <Select 
                name="currency" 
                value={newProduct.currency} 
                onChange={handleInputChange}
              >
                <option value="ETH">ETH</option>
                <option value="USDC">USDC</option>
                <option value="DAI">DAI</option>
              </Select>
              <Select 
                name="chain" 
                value={newProduct.chain} 
                onChange={handleInputChange}
              >
                <option value="Ethereum">Ethereum</option>
                <option value="Polygon">Polygon</option>
                <option value="Base">Base</option>
              </Select>
              {newProduct.type === 'onchain' && (
                <>
                  <Input 
                    name="contractAddress" 
                    placeholder="Contract Address" 
                    value={newProduct.contractAddress} 
                    onChange={handleInputChange} 
                  />
                  <Input 
                    name="functionCall" 
                    placeholder="Function Call" 
                    value={newProduct.functionCall} 
                    onChange={handleInputChange} 
                  />
                  <Textarea 
                    name="functionDescription" 
                    placeholder="Function Description" 
                    value={newProduct.functionDescription} 
                    onChange={handleInputChange} 
                  />
                </>
              )}
              {newProduct.type === 'offchain' && (
                <Input 
                  name="eoaAddress" 
                  placeholder="EOA Address" 
                  value={newProduct.eoaAddress} 
                  onChange={handleInputChange} 
                />
              )}
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="purple" mr={3} onClick={handleSubmit}>
              Save
            </Button>
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default ProductsTab;