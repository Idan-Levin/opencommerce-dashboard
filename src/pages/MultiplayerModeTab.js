import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  HStack,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  VStack,
  Input,
  Textarea,
  Select,
  FormControl,
  FormLabel,
  Spinner,
  Center,
  Tooltip,
  NumberInput,
  NumberInputField,
  Text,
} from "@chakra-ui/react";
import { InfoIcon } from '@chakra-ui/icons';
import { motion } from 'framer-motion';
import { differenceInDays } from 'date-fns';

function MultiplayerModeTab() {
  const [collaborations, setCollaborations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newCollaboration, setNewCollaboration] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    url: '',
    terms: '',
    collaborationType: 'paymentModal',
    pricingOption: 'revenueShare',
    revenueShare: '',
    barterDescription: '',
    barterUrl: '',
    frameUrl: '',
  });

  useEffect(() => {
    // Simulating API call when component mounts
    setTimeout(() => {
      const mockCollaborations = [
        { id: 1, title: "Summer Sale", startDate: "2023-06-01", endDate: "2023-06-30", collaborationType: "paymentModal", url: "https://example.com/summer" },
        { id: 2, title: "Holiday Special", startDate: "2023-12-01", endDate: "2023-12-25", collaborationType: "postBuy", url: "https://example.com/holiday" },
      ];
      setCollaborations(mockCollaborations);
      setIsLoading(false);
    }, 1500);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCollaboration(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCollaborations(prev => [...prev, { ...newCollaboration, id: Date.now() }]);
    setNewCollaboration({
      title: '',
      description: '',
      startDate: '',
      endDate: '',
      url: '',
      terms: '',
      collaborationType: 'paymentModal',
      pricingOption: 'revenueShare',
      revenueShare: '',
      barterDescription: '',
      barterUrl: '',
      frameUrl: '',
    });
    onClose();
  };

  const calculateDuration = (start, end) => {
    if (!start || !end) return '';
    const days = differenceInDays(new Date(end), new Date(start));
    return days > 0 ? `${days} days` : '';
  };

  const viewCollaboration = (collab) => {
    // Implement view functionality here
    console.log("Viewing collaboration:", collab);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box p={5}>
        <HStack justify="space-between" mb={5}>
          <Heading>Multiplayer Mode</Heading>
          <Button colorScheme="purple" onClick={onOpen}>Post Collaboration</Button>
        </HStack>

        {isLoading ? (
          <Center h="200px">
            <Spinner size="xl" color="purple.500" />
          </Center>
        ) : (
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Title</Th>
                <Th>Duration</Th>
                <Th>Type</Th>
                <Th>URL</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {collaborations.map(collab => (
                <Tr key={collab.id}>
                  <Td>{collab.title}</Td>
                  <Td>{calculateDuration(collab.startDate, collab.endDate)}</Td>
                  <Td>{collab.collaborationType}</Td>
                  <Td>{collab.url}</Td>
                  <Td>
                    <Button size="sm" colorScheme="purple" mr={2} onClick={() => viewCollaboration(collab)}>View</Button>
                    <Button size="sm" colorScheme="red">Delete</Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}

        <Modal isOpen={isOpen} onClose={onClose} size="xl">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Post a Collaboration</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack spacing={4} align="stretch">
                <FormControl>
                  <FormLabel>
                    Type of Collaboration 
                    <Tooltip label="Choose the type of collaboration you want to create" placement="top">
                      <InfoIcon ml={2} />
                    </Tooltip>
                  </FormLabel>
                  <Select 
                    name="collaborationType"
                    value={newCollaboration.collaborationType}
                    onChange={handleInputChange}
                  >
                    <option value="paymentModal">Payment Modal (pre-buy)</option>
                    <option value="postBuy">Post-Buy</option>
                  </Select>
                </FormControl>

                <Input 
                  name="title"
                  placeholder="Title"
                  value={newCollaboration.title}
                  onChange={handleInputChange}
                />
                <Textarea 
                  name="description"
                  placeholder="Description"
                  value={newCollaboration.description}
                  onChange={handleInputChange}
                />
                <FormControl>
                  <FormLabel>Start Date</FormLabel>
                  <Input 
                    name="startDate"
                    value={newCollaboration.startDate}
                    onChange={handleInputChange}
                    type="date"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>End Date</FormLabel>
                  <Input 
                    name="endDate"
                    value={newCollaboration.endDate}
                    onChange={handleInputChange}
                    type="date"
                  />
                </FormControl>
                {newCollaboration.startDate && newCollaboration.endDate && (
                  <Text>Duration: {calculateDuration(newCollaboration.startDate, newCollaboration.endDate)}</Text>
                )}
                <Input 
                  name="url"
                  placeholder="Collaboration URL"
                  value={newCollaboration.url}
                  onChange={handleInputChange}
                />
                <FormControl>
                  <FormLabel>
                    Pricing Option
                    <Tooltip label="Choose how you want to price this collaboration" placement="top">
                      <InfoIcon ml={2} />
                    </Tooltip>
                  </FormLabel>
                  <Select 
                    name="pricingOption"
                    value={newCollaboration.pricingOption}
                    onChange={handleInputChange}
                  >
                    <option value="revenueShare">Revenue Share</option>
                    <option value="barter">Barter</option>
                  </Select>
                </FormControl>
                {newCollaboration.pricingOption === 'revenueShare' && (
                  <NumberInput min={0} max={100}>
                    <NumberInputField 
                      name="revenueShare"
                      placeholder="Revenue Share (%)"
                      value={newCollaboration.revenueShare}
                      onChange={handleInputChange}
                    />
                  </NumberInput>
                )}
                {newCollaboration.pricingOption === 'barter' && (
                  <>
                    <Textarea 
                      name="barterDescription"
                      placeholder="Describe your barter offer"
                      value={newCollaboration.barterDescription}
                      onChange={handleInputChange}
                    />
                    <Input 
                      name="barterUrl"
                      placeholder="Barter Frame URL"
                      value={newCollaboration.barterUrl}
                      onChange={handleInputChange}
                    />
                  </>
                )}
                <Input 
                  name="frameUrl"
                  placeholder="Frame URL for Payment Model"
                  value={newCollaboration.frameUrl}
                  onChange={handleInputChange}
                />
                <Textarea 
                  name="terms"
                  placeholder="Terms (optional)"
                  value={newCollaboration.terms}
                  onChange={handleInputChange}
                />
              </VStack>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="purple" mr={3} onClick={handleSubmit}>
                Post
              </Button>
              <Button variant="ghost" onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </motion.div>
  );
}

export default MultiplayerModeTab;