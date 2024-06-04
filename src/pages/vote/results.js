// pages/vote/results.js
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getCandidates, getVotes } from '@/services/voteServices';
import '@/app/globals.css';

const VoteResults = () => {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        // Fetch candidates and votes
        const candidatesData = await getCandidates();
        const votesData = await getVotes();
        
        // Calculate the number of votes and percentage for each candidate
        const candidatesWithVotes = candidatesData.map((candidate) => {
          const candidateVotes = votesData.filter((vote) => vote.candidate_id === candidate.id);
          const voteCount = candidateVotes.length;
          const votePercentage = (voteCount / votesData.length) * 100;
          return {
            ...candidate,
            vote_count: voteCount,
            vote_percentage: votePercentage.toFixed(2),
          };
        });

        // Sort candidates by vote percentage
        const sortedCandidates = candidatesWithVotes.sort((a, b) => b.vote_percentage - a.vote_percentage);

        // Set the sorted candidates with vote percentages
        setCandidates(sortedCandidates);
      } catch (error) {
        console.error('Error fetching results:', error);
      }
    };

    fetchResults();
  }, []);

  return (
    <>
      <Navbar />
      <div style={styles.resultsContainer}>
        <h2 style={styles.resultsTitle}>Résultats en temps réel des votes</h2>
        <div style={styles.resultsList}>
          {candidates.map((candidate) => (
            <div key={candidate.id} style={styles.resultItem}>
              <img src={candidate.url_image} alt={candidate.name} style={styles.resultImage} />
              <div style={styles.resultInfo}>
                <h3 style={styles.resultName}>{candidate.first_name} {candidate.last_name}</h3>
                <p style={styles.resultDescription}>{candidate.function}</p>
                <div style={styles.resultVotes}>
                  <span style={styles.votePercentage}>
                    {candidate.vote_percentage > 0 ? `${candidate.vote_percentage}%` : '0%'}                                            
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={styles.totalVotes}>
          <p style={styles.voteInfo}>Nombres de votant(s) : {candidates.reduce((acc, candidate) => acc + candidate.vote_count, 0)}</p>
        </div>
      </div>
      <Footer />
    </>
  );
};

const styles = {
  resultsContainer: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    margin: '30px auto',
    backgroundColor: '#fff', // White background
    padding: '20px', // Padding around the content
    borderRadius: '10px', // Rounded corners
  },
  resultsTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '40px',

    color: 'black'
  },
  resultsList: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
  },
  resultItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '20px',
    width: '80%',
    borderRadius: '10px',
    backgroundColor: '#eeeeee', // Light background for each item
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Slight shadow for depth
  },
  resultImage: {
    width: '70px',
    height: '70px',
    borderRadius: '50%',
    marginRight: '10px',
    objectFit: 'cover',
  },
  resultInfo: {
    flex: 1,
    textAlign: 'left',
    marginLeft: '50px',
    padding: '10px',
  },
  resultName: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: 'black',
    margin: 0,
  },
  resultDescription: {
    fontSize: '14px',
    color: '#555',
    width: '70%',
    margin: 0,
  },
  resultVotes: {
    textAlign: 'right',
  },
  votePercentage: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: 'black'
  },
  totalVotes: {
    marginTop: '20px',
    fontSize: '16px',
    color: '#555',
    padding: '20px',
  },
  voteInfo: {
    margin: 0,
  },
};

export default VoteResults;
