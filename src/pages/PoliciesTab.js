import React, { useState } from 'react';
import {
  Box,
  Button,
  Heading,
  VStack,
  HStack,
  Input,
  Select,
  Checkbox,
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
} from "@chakra-ui/react";

// Dummy product list - replace this with actual product data in a real application
const products = [
  { id: 1, name: "Product A" },
  { id: 2, name: "Product B" },
  { id: 3, name: "Product C" },
];

function PoliciesTab() {
  const [policies, setPolicies] = useState([]);
  const [newPolicy, setNewPolicy] = useState({
    type: 'product',
    detail: {
      productId: '',
      discount: false,
      quantityDiscount: false,
      minQuantity: '',
      discountPercentage: '',
      accessControl: false,
      nftAddress: '',
      accessControlDiscountPercentage: '',
      dynamicPricing: false,
      discountDays: '',
      dynamicDiscountPercentage: '',
      compliance: false,
      multiplayerPolicy: ''
    }
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editingPolicy, setEditingPolicy] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewPolicy(prev => ({
      ...prev,
      detail: {
        ...prev.detail,
        [name]: type === 'checkbox' ? checked : value
      }
    }));
  };

  const handleTypeChange = (e) => {
    setNewPolicy(prev => ({ 
      type: e.target.value, 
      detail: {
        ...prev.detail,
        productId: '' // Reset productId when changing policy type
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingPolicy) {
      setPolicies(prev => prev.map(p => p.id === editingPolicy.id ? { ...newPolicy, id: p.id } : p));
      setEditingPolicy(null);
    } else {
      setPolicies(prev => [...prev, { ...newPolicy, id: Date.now() }]);
    }
    setNewPolicy({
      type: 'product',
      detail: {
        productId: '',
        discount: false,
        quantityDiscount: false,
        minQuantity: '',
        discountPercentage: '',
        accessControl: false,
        nftAddress: '',
        accessControlDiscountPercentage: '',
        dynamicPricing: false,
        discountDays: '',
        dynamicDiscountPercentage: '',
        compliance: false,
        multiplayerPolicy: ''
      }
    });
    onClose();
  };

  const handleEdit = (policy) => {
    setEditingPolicy(policy);
    setNewPolicy(policy);
    onOpen();
  };

  const handleDelete = (id) => {
    setPolicies(prev => prev.filter(p => p.id !== id));
  };

  return (
    <Box p={5}>
      <HStack justify="space-between" mb={5}>
        <Heading>Policies</Heading>
        <Button colorScheme="blue" onClick={() => { setEditingPolicy(null); onOpen(); }}>Add Policy</Button>
      </HStack>

      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Type</Th>
            <Th>Details</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {policies.map(policy => (
            <Tr key={policy.id}>
              <Td>{policy.type}</Td>
              <Td>{JSON.stringify(policy.detail)}</Td>
              <Td>
                <Button size="sm" colorScheme="yellow" mr={2} onClick={() => handleEdit(policy)}>Edit</Button>
                <Button size="sm" colorScheme="red" onClick={() => handleDelete(policy.id)}>Delete</Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{editingPolicy ? 'Edit Policy' : 'Add New Policy'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4} align="stretch">
              <Select 
                name="type" 
                value={newPolicy.type} 
                onChange={handleTypeChange}
              >
                <option value="product">Product-Specific Policy</option>
                <option value="general">General Policy</option>
                <option value="multiplayer">Multiplayer Mode Policy</option>
              </Select>

              {newPolicy.type === 'product' && (
                <>
                  <Select
                    name="productId"
                    value={newPolicy.detail.productId}
                    onChange={handleInputChange}
                    placeholder="Select a product"
                  >
                    {products.map(product => (
                      <option key={product.id} value={product.id}>
                        {product.name}
                      </option>
                    ))}
                  </Select>
                  <Checkbox 
                    name="discount" 
                    isChecked={newPolicy.detail.discount} 
                    onChange={handleInputChange}
                  >
                    Discount
                  </Checkbox>
                  {newPolicy.detail.discount && (
                    <>
                      <Checkbox 
                        name="quantityDiscount" 
                        isChecked={newPolicy.detail.quantityDiscount} 
                        onChange={handleInputChange}
                      >
                        Quantity Discount
                      </Checkbox>
                      {newPolicy.detail.quantityDiscount && (
                        <>
                          <Input 
                            name="minQuantity" 
                            placeholder="Minimum Quantity" 
                            value={newPolicy.detail.minQuantity} 
                            onChange={handleInputChange} 
                            type="number"
                          />
                          <Input 
                            name="discountPercentage" 
                            placeholder="Discount Percentage" 
                            value={newPolicy.detail.discountPercentage} 
                            onChange={handleInputChange} 
                            type="number"
                          />
                        </>
                      )}
                    </>
                  )}
                  <Checkbox 
                    name="accessControl" 
                    isChecked={newPolicy.detail.accessControl} 
                    onChange={handleInputChange}
                  >
                    Access Control
                  </Checkbox>
                  {newPolicy.detail.accessControl && (
                    <>
                      <Input 
                        name="nftAddress" 
                        placeholder="NFT Address" 
                        value={newPolicy.detail.nftAddress} 
                        onChange={handleInputChange} 
                      />
                      <Input 
                        name="accessControlDiscountPercentage" 
                        placeholder="Access Control Discount Percentage" 
                        value={newPolicy.detail.accessControlDiscountPercentage} 
                        onChange={handleInputChange} 
                        type="number"
                      />
                    </>
                  )}
                  <Checkbox 
                    name="dynamicPricing" 
                    isChecked={newPolicy.detail.dynamicPricing} 
                    onChange={handleInputChange}
                  >
                    Dynamic Pricing
                  </Checkbox>
                  {newPolicy.detail.dynamicPricing && (
                    <>
                      <Input 
                        name="discountDays" 
                        placeholder="Discount Days" 
                        value={newPolicy.detail.discountDays} 
                        onChange={handleInputChange} 
                        type="number"
                      />
                      <Input 
                        name="dynamicDiscountPercentage" 
                        placeholder="Dynamic Discount Percentage" 
                        value={newPolicy.detail.dynamicDiscountPercentage} 
                        onChange={handleInputChange} 
                        type="number"
                      />
                    </>
                  )}
                </>
              )}

              {newPolicy.type === 'general' && (
                <>
                  <Checkbox 
                    name="compliance" 
                    isChecked={newPolicy.detail.compliance} 
                    onChange={handleInputChange}
                  >
                    Compliance
                  </Checkbox>
                  <Checkbox 
                    name="accessControl" 
                    isChecked={newPolicy.detail.accessControl} 
                    onChange={handleInputChange}
                  >
                    Access Control
                  </Checkbox>
                  {newPolicy.detail.accessControl && (
                    <>
                      <Input 
                        name="nftAddress" 
                        placeholder="NFT Address" 
                        value={newPolicy.detail.nftAddress} 
                        onChange={handleInputChange} 
                      />
                    </>
                  )}
                </>
              )}

              {newPolicy.type === 'multiplayer' && (
                <Select 
                  name="multiplayerPolicy" 
                  value={newPolicy.detail.multiplayerPolicy} 
                  onChange={handleInputChange}
                >
                  <option value="degen">Degen Club</option>
                  <option value="pudgy">Pudgy Penguin Club</option>
                  <option value="farcaster">Farcaster Cool Kids Club</option>
                </Select>
              )}
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
              {editingPolicy ? 'Update' : 'Save'}
            </Button>
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default PoliciesTab;