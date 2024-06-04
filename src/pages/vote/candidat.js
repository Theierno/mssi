// pages/vote/candidat/index.js
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CandidateCard from '@/components/CandidateCard';
import { getCandidates } from '@/services/voteServices';
import '@/app/globals.css';
import { color } from 'framer-motion';

const CandidatesPage = () => {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    const fetchCandidates = async () => {
      const data = await getCandidates();
      setCandidates(data);
    };

    fetchCandidates();
  }, []);

  return (
    <>
      <Navbar />
      <div style={styles.pageContainer}>
        <h2 style={styles.pageTitle}>Liste des candidats</h2>
        <div style={styles.cardGrid}>
          {candidates.map((candidate) => (
            <CandidateCard key={candidate.id} candidate={candidate} />
          ))}
        </div>
      </div>
      <div/>
      <Footer />
    </>
  );
};

const styles = {
  pageContainer: {
    padding: '20px',
    backgroundColor: '#f5f5f5',
    marginBottom: '20px',
  },
  pageTitle: {
    textAlign: 'center',
    fontSize: '2rem',
    margin: '40px 0',
    paddingBottom: '20px',
    color: 'black',
  },
  cardGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '20px',
  },
};

export default CandidatesPage;
