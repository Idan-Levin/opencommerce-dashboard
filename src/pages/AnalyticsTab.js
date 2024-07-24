import React from 'react';
import {
  Box,
  Heading,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
} from "@chakra-ui/react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

// Mock data for analytics
const dailySales = [
  { name: 'Mon', sales: 4000 },
  { name: 'Tue', sales: 3000 },
  { name: 'Wed', sales: 2000 },
  { name: 'Thu', sales: 2780 },
  { name: 'Fri', sales: 1890 },
  { name: 'Sat', sales: 2390 },
  { name: 'Sun', sales: 3490 },
];

const monthlySales = [
  { name: 'Jan', sales: 4000 },
  { name: 'Feb', sales: 3000 },
  { name: 'Mar', sales: 2000 },
  { name: 'Apr', sales: 2780 },
  { name: 'May', sales: 1890 },
  { name: 'Jun', sales: 2390 },
];

const productSales = [
  { name: 'Product A', value: 400 },
  { name: 'Product B', value: 300 },
  { name: 'Product C', value: 300 },
  { name: 'Product D', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

function AnalyticsTab() {
  const totalSales = dailySales.reduce((sum, day) => sum + day.sales, 0);
  const averageDailySales = totalSales / dailySales.length;
  const topSellingProduct = productSales.reduce((max, product) => max.value > product.value ? max : product);

  return (
    <Box p={5}>
      <Heading mb={5}>Analytics</Heading>

      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10} mb={10}>
        <Stat>
          <StatLabel>Total Sales</StatLabel>
          <StatNumber>${totalSales.toLocaleString()}</StatNumber>
          <StatHelpText>For the past week</StatHelpText>
        </Stat>
        <Stat>
          <StatLabel>Average Daily Sales</StatLabel>
          <StatNumber>${averageDailySales.toLocaleString()}</StatNumber>
          <StatHelpText>For the past week</StatHelpText>
        </Stat>
        <Stat>
          <StatLabel>Top Selling Product</StatLabel>
          <StatNumber>{topSellingProduct.name}</StatNumber>
          <StatHelpText>{topSellingProduct.value} units sold</StatHelpText>
        </Stat>
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={10}>
        <Box>
          <Heading size="md" mb={4}>Daily Sales</Heading>
          <BarChart width={500} height={300} data={dailySales}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="sales" fill="#8884d8" />
          </BarChart>
        </Box>

        <Box>
          <Heading size="md" mb={4}>Monthly Sales Trend</Heading>
          <LineChart width={500} height={300} data={monthlySales}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="sales" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </Box>

        <Box>
          <Heading size="md" mb={4}>Product Sales Distribution</Heading>
          <PieChart width={400} height={400}>
            <Pie
              data={productSales}
              cx={200}
              cy={200}
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {productSales.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </Box>
      </SimpleGrid>
    </Box>
  );
}

export default AnalyticsTab;