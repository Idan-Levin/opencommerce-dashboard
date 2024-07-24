import React, { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
  Select,
  HStack,
} from "@chakra-ui/react";

// Mock data for transactions
const mockTransactions = [
  { id: 1, date: '2024-07-01', txId: 'TX1001', payer: '0x123...abc', amount: '1.0 ETH', policies: 'Discount Policy' },
  { id: 2, date: '2024-07-02', txId: 'TX1002', payer: '0x124...bcd', amount: '2.0 ETH', policies: 'VIP Policy' },
  { id: 3, date: '2024-07-03', txId: 'TX1003', payer: '0x125...cde', amount: '0.5 ETH', policies: 'General Policy' },
  { id: 4, date: '2024-07-04', txId: 'TX1004', payer: '0x126...def', amount: '1.5 ETH', policies: 'Multiplayer Policy' },
  { id: 5, date: '2024-07-05', txId: 'TX1005', payer: '0x127...efg', amount: '3.0 ETH', policies: 'Discount Policy' },
];

function TransactionHistoryTab() {
  const [transactions, setTransactions] = useState(mockTransactions);
  const [filteredTransactions, setFilteredTransactions] = useState(mockTransactions);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('date');
  const [sortDirection, setSortDirection] = useState('desc');

  useEffect(() => {
    // Filter transactions based on search term
    const filtered = transactions.filter(tx => 
      tx.txId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.payer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.policies.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Sort filtered transactions
    const sorted = [...filtered].sort((a, b) => {
      if (a[sortField] < b[sortField]) return sortDirection === 'asc' ? -1 : 1;
      if (a[sortField] > b[sortField]) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    setFilteredTransactions(sorted);
  }, [searchTerm, sortField, sortDirection, transactions]);

  const handleSort = (field) => {
    setSortDirection(current => current === 'asc' ? 'desc' : 'asc');
    setSortField(field);
  };

  return (
    <Box p={5}>
      <Heading mb={5}>Transaction History</Heading>

      <HStack mb={5}>
        <Input 
          placeholder="Search transactions..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Select 
          value={`${sortField}-${sortDirection}`}
          onChange={(e) => {
            const [field, direction] = e.target.value.split('-');
            setSortField(field);
            setSortDirection(direction);
          }}
        >
          <option value="date-desc">Date (Newest First)</option>
          <option value="date-asc">Date (Oldest First)</option>
          <option value="amount-desc">Amount (Highest First)</option>
          <option value="amount-asc">Amount (Lowest First)</option>
        </Select>
      </HStack>

      <Table variant="simple">
        <Thead>
          <Tr>
            <Th onClick={() => handleSort('date')} cursor="pointer">Date {sortField === 'date' && (sortDirection === 'asc' ? '▲' : '▼')}</Th>
            <Th>Transaction ID</Th>
            <Th>Payer</Th>
            <Th onClick={() => handleSort('amount')} cursor="pointer">Amount {sortField === 'amount' && (sortDirection === 'asc' ? '▲' : '▼')}</Th>
            <Th>Policies Applied</Th>
          </Tr>
        </Thead>
        <Tbody>
          {filteredTransactions.map(tx => (
            <Tr key={tx.id}>
              <Td>{tx.date}</Td>
              <Td>{tx.txId}</Td>
              <Td>{tx.payer}</Td>
              <Td>{tx.amount}</Td>
              <Td>{tx.policies}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}

export default TransactionHistoryTab;