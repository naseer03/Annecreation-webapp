'use client';

import React, { useEffect, useState } from 'react';
import { Container, Tabs, Tab } from '@mui/material';
import BreadCrum from '@/components/BreadCrum/BreadCrum';
import MyProfile from './MyProfile';
import OrderHistory from './OrderHistory';
import Downloads from './Downloads';
import PropTypes from 'prop-types';

// Tab panel component
function TabPanel({ children, value, current }) {
  return (
    <div hidden={value !== current} role="tabpanel">
      {value === current && <div className="w-full">{children}</div>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  value: PropTypes.string.isRequired,
  current: PropTypes.string.isRequired,
};

// Tab configuration (explicit, stable)
const tabConfig = [
  { label: 'My Profile', key: 'profile', component: <MyProfile /> },
  { label: 'Order History', key: 'orders', component: <OrderHistory /> },
  { label: 'Downloads', key: 'downloads', component: <Downloads /> },
];

export default function AccountTabs() {
  const [tabKey, setTabKey] = useState('profile');

  // On load, set tab from URL query
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const tabParam = urlParams.get('tab');
      const foundTab = tabConfig.find((tab) => tab.key === tabParam);
      if (foundTab) setTabKey(foundTab.key);
    }
  }, []);

  const handleChange = (_, newValue) => {
    setTabKey(newValue);
  };

  return (
    <>
      <BreadCrum
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'Profile', href: '/Profile' },
        ]}
      />

      <Container className="my-20">
        <div className="flex flex-col lg:flex-row w-full gap-0">
          {/* Sidebar Tabs */}
          <div className="w-full h-[220px] lg:w-1/4 border-2 border-[var(--primary)] rounded-md">
            <p className="border-b-2 border-[var(--primary)] text-center text-transparent bg-clip-text bg-[linear-gradient(to_left,_#996E19_10%,_var(--primary))] font-bold py-3">
              Account
            </p>

            <Tabs
              orientation={
                typeof window !== 'undefined' && window.innerWidth < 1024
                  ? 'horizontal'
                  : 'vertical'
              }
              value={tabKey}
              onChange={handleChange}
              variant="scrollable"
              sx={{
                '.MuiTabs-indicator': { display: 'none' },
              }}
            >
              {tabConfig.map((tab) => (
                <Tab
                  key={tab.key}
                  label={tab.label}
                  value={tab.key}
                  sx={{
                    textAlign: 'left',
                    color: '#000',
                    alignItems: 'flex-start',
                    px: 2,
                    '&.Mui-selected': {
                      color: 'var(--primary)',
                      fontWeight: 'bold',
                    },
                  }}
                />
              ))}
            </Tabs>
          </div>

          {/* Tab Content */}
          <div className="w-full">
            {tabConfig.map((tab) => (
              <TabPanel key={tab.key} value={tabKey} current={tab.key}>
                {tab.component}
              </TabPanel>
            ))}
          </div>
        </div>
      </Container>
    </>
  );
}
