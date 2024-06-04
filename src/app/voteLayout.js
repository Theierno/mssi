// src/layouts/VoteLayout.js
import React from 'react';
import Navbar from '@/components/Navbar';
import { Container } from '@nextui-org/react';

const VoteLayout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <Container style={{ paddingTop: '20px' }}>
        {children}
      </Container>
    </div>
  );
};

export default VoteLayout;
