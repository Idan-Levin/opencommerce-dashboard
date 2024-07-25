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
  Image,
  Text,
  Flex,
  Spinner,
  Center,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Badge,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Switch,
} from "@chakra-ui/react";
import { motion } from 'framer-motion';

const PaymentModal = ({ isOpen, onClose }) => (
  <Modal isOpen={isOpen} onClose={onClose} size="md">
    <ModalOverlay />
    <ModalContent bg="gray.900" color="white">
      <ModalCloseButton />
      <ModalBody p={6}>
        <VStack spacing={4} align="stretch">
          <Flex justify="space-between" align="center">
            <Text fontWeight="bold">OpenCommerce</Text>
          </Flex>
          <Text fontSize="2xl" fontWeight="bold" textAlign="center">Pay 1.00 USD</Text>
          <Text fontSize="sm" textAlign="center" color="gray.400">To Merchant</Text>
          <Box bg="gray.800" p={4} borderRadius="md">
            <Flex justify="space-between" align="center">
              <Flex align="center">
                <Box bg="blue.500" w={8} h={8} borderRadius="full" mr={3} display="flex" alignItems="center" justifyContent="center">
                  <Text>Ξ</Text>
                </Box>
                <Box>
                  <Text fontWeight="medium">Pay with</Text>
                  <Text fontSize="sm">ETH</Text>
                </Box>
              </Flex>
              <Flex align="center">
                <Text color="green.400" mr={2} fontSize="sm">Approved</Text>
                <Text fontWeight="medium" mr={2}>$24.39</Text>
                <Text>▼</Text>
              </Flex>
            </Flex>
          </Box>
          <Image src="/api/placeholder/400/200" alt="Collaborative Ad" borderRadius="md" />
          <Button colorScheme="purple" size="lg">Pay Now</Button>
        </VStack>
      </ModalBody>
    </ModalContent>
  </Modal>
);

const PostBuyModal = ({ isOpen, onClose }) => (
  <Modal isOpen={isOpen} onClose={onClose} size="md">
    <ModalOverlay />
    <ModalContent bg="gray.800" color="white">
      <ModalCloseButton />
      <ModalBody p={6}>
        <VStack spacing={6} align="stretch">
          <Text fontSize="2xl" fontWeight="bold" textAlign="center">MINT SUCCESSFUL!</Text>
          <Box position="relative" width="100%" height="150px">
            <Image 
              src="/api/placeholder/400/150" 
              alt="Mockup Ad" 
              objectFit="cover" 
              width="100%" 
              height="100%" 
            />
            <Button 
              position="absolute" 
              bottom="4" 
              right="4" 
              colorScheme="blue" 
              size="sm"
            >
              BUY
            </Button>
          </Box>
        </VStack>
      </ModalBody>
    </ModalContent>
  </Modal>
);

function MultiplayerModeTab() {
  const [projects, setProjects] = useState([]);
  const [showActiveOnly, setShowActiveOnly] = useState(false);
  const [opportunities, setOpportunities] = useState([]);
  const [activeCollaborations, setActiveCollaborations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isPostBuyModalOpen, setIsPostBuyModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [newOpportunity, setNewOpportunity] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    url: '',
    terms: '',
    type: 'spaceRequest',
    collaborationType: 'paymentModal',
    pricingType: 'percentage',
    percentage: '',
    barterDescription: '',
  });

  useEffect(() => {
    // Simulating API call for projects data
    setTimeout(() => {
      const categories = ['DeFi', 'NFT', 'GameFi', 'SocialFi'];
      const mockProjects = Array.from({ length: 10 }, (_, i) => ({
        id: i + 1,
        name: `Crypto Project ${i + 1}`,
        category: categories[Math.floor(Math.random() * categories.length)],
        website: `https://project${i + 1}.crypto`,
        hasActiveOffer: Math.random() > 0.5,
        offer: Math.random() > 0.5 ? {
          title: `Offer from Project ${i + 1}`,
          description: `This is a collaboration opportunity with Project ${i + 1}`,
          type: Math.random() > 0.5 ? 'spaceRequest' : 'spaceOffering',
          collaborationType: Math.random() > 0.5 ? 'paymentModal' : 'postBuy',
          pricingType: Math.random() > 0.5 ? 'percentage' : 'barter',
          percentage: Math.floor(Math.random() * 20) + 5,
          barterDescription: 'Exchanging ad space for tokens',
          startDate: new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          endDate: new Date(Date.now() + (30 + Math.random() * 60) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        } : null,
      }));
      setProjects(mockProjects);
      setIsLoading(false);
    }, 1500);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewOpportunity(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setOpportunities(prev => [...prev, { ...newOpportunity, id: Date.now() }]);
    setNewOpportunity({
      title: '',
      description: '',
      startDate: '',
      endDate: '',
      url: '',
      terms: '',
      type: 'spaceRequest',
      collaborationType: 'paymentModal',
      pricingType: 'percentage',
      percentage: '',
      barterDescription: '',
    });
    onClose();
  };

  const pingProject = (project) => {
    setSelectedProject(project);
    onOpen();
  };

  const acceptOffer = (offer) => {
    setActiveCollaborations(prev => [...prev, { ...offer, startDate: new Date().toISOString() }]);
    setProjects(prev => prev.map(p => 
      p.id === offer.id ? { ...p, hasActiveOffer: false } : p
    ));
  };

  const renderProjectTable = () => (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>Name</Th>
          <Th>Category</Th>
          <Th>Website</Th>
          <Th>Offer Details</Th>
          <Th>Actions</Th>
        </Tr>
      </Thead>
      <Tbody>
        {projects
          .filter(p => !showActiveOnly || p.hasActiveOffer)
          .map(project => (
            <Tr key={project.id}>
              <Td>{project.name}</Td>
              <Td>{project.category}</Td>
              <Td>{project.website}</Td>
              <Td>
                {project.offer ? (
                  <VStack align="start">
                    <Text><strong>Type:</strong> {project.offer.type}</Text>
                    <Text><strong>Collaboration:</strong> {project.offer.collaborationType}</Text>
                    <Text><strong>Pricing:</strong> {project.offer.pricingType === 'percentage' ? `${project.offer.percentage}% of revenues` : 'Barter'}</Text>
                    <Text><strong>Start:</strong> {project.offer.startDate}</Text>
                    <Text><strong>End:</strong> {project.offer.endDate}</Text>
                  </VStack>
                ) : (
                  <Text>No active offer</Text>
                )}
              </Td>
              <Td>
                <HStack spacing={2}>
                  <Button size="sm" colorScheme="blue" onClick={() => pingProject(project)}>
                    {project.offer ? 'View Offer' : 'Suggest Offer'}
                  </Button>
                  {project.offer && (
                    <Button size="sm" colorScheme="green" onClick={() => acceptOffer(project)}>
                      Accept
                    </Button>
                  )}
                </HStack>
              </Td>
            </Tr>
          ))}
      </Tbody>
    </Table>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box p={5}>
        <HStack justify="space-between" mb={5}>
          <Heading>Frame Exchange</Heading>
        </HStack>

        {isLoading ? (
          <Center h="200px">
            <Spinner size="xl" color="purple.500" />
          </Center>
        ) : (
          <Tabs defaultIndex={1}>
            <TabList>
              <Tab>Post Opportunities</Tab>
              <Tab>Discovery</Tab>
              <Tab>Active</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <Button colorScheme="purple" onClick={onOpen} mb={4}>Create New Opportunity</Button>
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>Title</Th>
                      <Th>Type</Th>
                      <Th>Collaboration Type</Th>
                      <Th>Pricing</Th>
                      <Th>Start Date</Th>
                      <Th>End Date</Th>
                      <Th>Actions</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {opportunities.map(opportunity => (
                      <Tr key={opportunity.id}>
                        <Td>{opportunity.title}</Td>
                        <Td>{opportunity.type}</Td>
                        <Td>{opportunity.collaborationType}</Td>
                        <Td>{opportunity.pricingType === 'percentage' ? `${opportunity.percentage}% of revenues` : 'Barter'}</Td>
                        <Td>{opportunity.startDate}</Td>
                        <Td>{opportunity.endDate}</Td>
                        <Td>
                          <Button size="sm" colorScheme="blue">View</Button>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TabPanel>
              <TabPanel>
                <HStack justify="space-between" mb={4}>
                  <Text>Showing {showActiveOnly ? 'active' : 'all'} projects</Text>
                  <HStack>
                    <Text>Show Active Only</Text>
                    <Switch isChecked={showActiveOnly} onChange={() => setShowActiveOnly(!showActiveOnly)} />
                  </HStack>
                </HStack>
                {renderProjectTable()}
              </TabPanel>
              <TabPanel>
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>Project</Th>
                      <Th>Type</Th>
                      <Th>Collaboration Type</Th>
                      <Th>Pricing</Th>
                      <Th>Start Date</Th>
                      <Th>Status</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {activeCollaborations.map(collab => (
                      <Tr key={collab.id}>
                        <Td>{collab.name}</Td>
                        <Td>{collab.offer.type}</Td>
                        <Td>{collab.offer.collaborationType}</Td>
                        <Td>{collab.offer.pricingType === 'percentage' ? `${collab.offer.percentage}% of revenues` : 'Barter'}</Td>
                        <Td>{new Date(collab.startDate).toLocaleDateString()}</Td>
                        <Td>
                          <Badge colorScheme="green">Active</Badge>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TabPanel>
            </TabPanels>
          </Tabs>
        )}

        <Modal isOpen={isOpen} onClose={onClose} size="xl">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Create New Opportunity</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack spacing={4} align="stretch">
                <FormControl>
                  <FormLabel>Exchange Type</FormLabel>
                  <Select 
                    name="type"
                    value={newOpportunity.type}
                    onChange={handleInputChange}
                  >
                    <option value="spaceRequest">Space Request</option>
                    <option value="spaceOffering">Space Offering</option>
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel>Collaboration Type</FormLabel>
                  <Select 
                    name="collaborationType"
                    value={newOpportunity.collaborationType}
                    onChange={handleInputChange}
                  >
                    <option value="paymentModal">Payment Modal (pre-buy)</option>
                    <option value="postBuy">Post-Buy</option>
                  </Select>
                </FormControl>
                <Input 
                  name="title"
                  placeholder="Title"
                  value={newOpportunity.title}
                  onChange={handleInputChange}
                />
                <Textarea 
                  name="description"
                  placeholder="Description"
                  value={newOpportunity.description}
                  onChange={handleInputChange}
                />
                <FormControl>
                  <FormLabel>Start Date</FormLabel>
                  <Input 
                    name="startDate"
                    value={newOpportunity.startDate}
                    onChange={handleInputChange}
                    type="date"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>End Date</FormLabel>
                  <Input 
                    name="endDate"
                    value={newOpportunity.endDate}
                    onChange={handleInputChange}
                    type="date"
                  />
                </FormControl>
                <Input 
                  name="url"
                  placeholder="Frame URL or Space URL"
                  value={newOpportunity.url}
                  onChange={handleInputChange}
                />
                <FormControl>
                  <FormLabel>Pricing Type</FormLabel>
                  <Select 
                    name="pricingType"
                    value={newOpportunity.pricingType}
                    onChange={handleInputChange}
                  >
                    <option value="percentage">Percentage of Revenues</option>
                    <option value="barter">Barter</option>
                  </Select>
                </FormControl>
                {newOpportunity.pricingType === 'percentage' ? (
                  <FormControl>
                    <FormLabel>Percentage of Revenues</FormLabel>
                    <NumberInput min={0} max={100}>
                      <NumberInputField 
                        name="percentage"
                        value={newOpportunity.percentage}
                        onChange={handleInputChange}
                      />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </FormControl>
                ) : (
                  <Textarea 
                    name="barterDescription"
                    placeholder="Describe your barter offer"
                    value={newOpportunity.barterDescription}
                    onChange={handleInputChange}
                  />
                )}
                <Textarea 
                  name="terms"
                  placeholder="Terms (optional)"
                  value={newOpportunity.terms}
                  onChange={handleInputChange}
                />
              </VStack>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="purple" mr={3} onClick={handleSubmit}>
                Create
              </Button>
              <Button variant="ghost" onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        <Modal isOpen={isPaymentModalOpen} onClose={() => setIsPaymentModalOpen(false)}>
          <PaymentModal isOpen={isPaymentModalOpen} onClose={() => setIsPaymentModalOpen(false)} />
        </Modal>
        <Modal isOpen={isPostBuyModalOpen} onClose={() => setIsPostBuyModalOpen(false)}>
          <PostBuyModal isOpen={isPostBuyModalOpen} onClose={() => setIsPostBuyModalOpen(false)} />
        </Modal>
      </Box>
    </motion.div>
  );
}

export default MultiplayerModeTab;