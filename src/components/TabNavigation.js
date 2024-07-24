import React from 'react';
import { Tabs, TabList, Tab } from "@chakra-ui/react";
import { Link, useLocation } from 'react-router-dom';

function TabNavigation() {
  const location = useLocation();
  const routes = ['/', '/policies', '/hooks', '/history', '/analytics', '/multiplayer'];
  const index = routes.indexOf(location.pathname);

  return (
    <Tabs index={index !== -1 ? index : 0} variant="soft-rounded" colorScheme="purple" mb={8}>
      <TabList justifyContent="center">
        <Tab as={Link} to="/">Products</Tab>
        <Tab as={Link} to="/policies">Policies</Tab>
        <Tab as={Link} to="/hooks">Hooks</Tab>
        <Tab as={Link} to="/history">Transaction History</Tab>
        <Tab as={Link} to="/analytics">Analytics</Tab>
        <Tab as={Link} to="/multiplayer">Multiplayer Mode</Tab>
      </TabList>
    </Tabs>
  );
}

export default TabNavigation;