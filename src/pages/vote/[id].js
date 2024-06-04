// pages/vote/candidat/[id].js
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getCandidateById } from '@/services/voteServices';
import '@/app/globals.css';

const CandidateDetailPage = () => {
  const [candidate, setCandidate] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      const fetchCandidate = async () => {
        const data = await getCandidateById(id);
        setCandidate(data);
      };

      fetchCandidate();
    }
  }, [id]);

  if (!candidate) return <div>Loading...</div>;

  return (
    <>
      <Navbar />
      <div style={styles.detailContainer}>
        <h2 style={styles.candidateName}>{candidate.first_name} {candidate.last_name}</h2>
        <img src={candidate.url_image} alt={`${candidate.first_name} ${candidate.last_name}`} style={styles.candidateImage} />
        <p style={styles.candidateFunction}>{candidate.function}</p>
        <p style={styles.candidateBio}>{candidate.biography}</p>
        <h3 style={styles.programTitle}>Programme</h3>
        <p style={styles.candidateProgram}>{candidate.program}</p>
      </div>
      <Footer />
    </>
  );
};

const styles = {
  detailContainer: {
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  candidateName: {
    textAlign: 'center',
    fontSize: '2rem',
    margin: '20px 0',
  },
  candidateImage: {
    width: '100%',
    height: 'auto',
    borderRadius: '8px',
  },
  candidateFunction: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    textAlign: 'center',
    margin: '10px 0',
  },
  candidateBio: {
    fontSize: '1rem',
    lineHeight: '1.5',
    margin: '20px 0',
  },
  programTitle: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    margin: '20px 0 10px',
  },
  candidateProgram: {
    fontSize: '1rem',
    lineHeight: '1.5',
  },
};

export default CandidateDetailPage;
