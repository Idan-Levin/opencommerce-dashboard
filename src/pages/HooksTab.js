import React, { useState } from 'react';
import {
  Box,
  Button,
  Heading,
  VStack,
  HStack,
  Input,
  Textarea,
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

function HooksTab() {
  const [hooks, setHooks] = useState([]);
  const [newHook, setNewHook] = useState({
    name: '',
    contractAddress: '',
    functionCall: '',
    functionDescription: ''
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editingHook, setEditingHook] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewHook(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingHook) {
      setHooks(prev => prev.map(h => h.id === editingHook.id ? { ...newHook, id: h.id } : h));
      setEditingHook(null);
    } else {
      setHooks(prev => [...prev, { ...newHook, id: Date.now() }]);
    }
    setNewHook({
      name: '',
      contractAddress: '',
      functionCall: '',
      functionDescription: ''
    });
    onClose();
  };

  const handleEdit = (hook) => {
    setEditingHook(hook);
    setNewHook(hook);
    onOpen();
  };

  const handleDelete = (id) => {
    setHooks(prev => prev.filter(h => h.id !== id));
  };

  return (
    <Box p={5}>
      <HStack justify="space-between" mb={5}>
        <Heading>Hooks</Heading>
        <Button colorScheme="blue" onClick={() => { setEditingHook(null); onOpen(); }}>Add Hook</Button>
      </HStack>

      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Contract Address</Th>
            <Th>Function Call</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {hooks.map(hook => (
            <Tr key={hook.id}>
              <Td>{hook.name}</Td>
              <Td>{hook.contractAddress}</Td>
              <Td>{hook.functionCall}</Td>
              <Td>
                <Button size="sm" colorScheme="yellow" mr={2} onClick={() => handleEdit(hook)}>Edit</Button>
                <Button size="sm" colorScheme="red" onClick={() => handleDelete(hook.id)}>Delete</Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{editingHook ? 'Edit Hook' : 'Add New Hook'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Input 
                name="name"
                placeholder="Hook Name"
                value={newHook.name}
                onChange={handleInputChange}
              />
              <Input 
                name="contractAddress"
                placeholder="Contract Address"
                value={newHook.contractAddress}
                onChange={handleInputChange}
              />
              <Input 
                name="functionCall"
                placeholder="Function Call"
                value={newHook.functionCall}
                onChange={handleInputChange}
              />
              <Textarea 
                name="functionDescription"
                placeholder="Function Description"
                value={newHook.functionDescription}
                onChange={handleInputChange}
              />
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
              {editingHook ? 'Update' : 'Save'}
            </Button>
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default HooksTab;