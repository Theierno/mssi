import React, { useState, useEffect } from 'react';
import { Container, Image, Button } from '@nextui-org/react';
import Navbar from '@/components/Navbar';
import { useRouter } from 'next/router';
import { getCandidates, voteForCandidate } from '@/services/voteServices';

import '@/app/globals.css';

const CountdownTimer = ({ hoursMinSecs }) => {
  const { hours = 0, minutes = 0, seconds = 0 } = hoursMinSecs;
  const [[hrs, mins, secs], setTime] = useState([hours, minutes, seconds]);

  const tick = () => {
    if (hrs === 0 && mins === 0 && secs === 0) {
      reset();
    } else if (mins === 0 && secs === 0) {
      setTime([hrs - 1, 59, 59]);
    } else if (secs === 0) {
      setTime([hrs, mins - 1, 59]);
    } else {
      setTime([hrs, mins, secs - 1]);
    }
  };

  const reset = () => setTime([hours, minutes, seconds]);

  useEffect(() => {
    const timerId = setInterval(() => tick(), 1000);
    return () => clearInterval(timerId);
  }, [hrs, mins, secs]);

  return (
    <div style={styles.timerContainer}>
      <p style={styles.timerText}>Temps restant</p>
      <div style={styles.timer}>
        <span>{String(hrs).padStart(2, '0')}</span>:
        <span>{String(mins).padStart(2, '0')}</span>:
        <span>{String(secs).padStart(2, '0')}</span>
      </div>
      <div style={styles.timerLabels}>
        <span>Heures</span>
        <span>Minutes</span>
        <span>Secondes</span>
      </div>
    </div>
  );
};

export default function MonVote() {
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [phone, setPhone] = useState(null);
  const [candidats, setCandidats] = useState([]);

  const handleSelectCandidate = (id) => {
    setSelectedCandidate(id);
    console.log('Selected candidate:', id);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setPhone("+" + parsedUser.phone);

      const fetchCandidates = async () => {
        const data = await getCandidates();
        setCandidats(data);
      };

      fetchCandidates();
    } else {
      console.log("No user found in local storage in mon-vote");
    }
  }, [router]);

  const handleVote = async () => {
    if (!selectedCandidate) {
      alert('Veuillez sélectionner un candidat');
      return;
    }

    try {
      await voteForCandidate(phone, selectedCandidate);
      alert('Vote effectué avec succès');
      router.push('/vote/results'); // Redirect to the results page
    } catch (error) {
      console.error('Error voting for candidate:', error.message);
    }
  };

  return (
    <>
      <Navbar />
      <div style={styles.container}>
        <div style={styles.sectionContainer}>
          <div style={styles.leftSection}>
            <CountdownTimer hoursMinSecs={{ hours: 1, minutes: 25, seconds: 45 }} />
            <h1 style={styles.title}>Choisissez votre candidat</h1>
            <div style={styles.candidateList}>
              {candidats.map((candidat) => (
                <div
                  key={candidat.id}
                  style={{
                    ...styles.candidateCard,
                    borderColor: selectedCandidate === candidat.id ? '#0070f3' : '#e0e0e0',
                    borderWidth: selectedCandidate === candidat.id ? '2px' : '1px',
                  }}
                  onClick={() => handleSelectCandidate(candidat.id)}
                >
                  <Image
                    src={candidat.url_image}
                    alt={candidat.name}
                    style={styles.candidateImage}
                  />
                  <div style={styles.candidateInfo}>
                    <h2 style={styles.candidateName}>{candidat.first_name} {candidat.last_name}</h2>
                    <p style={styles.candidateDescription}>{candidat.function}</p>
                  </div>
                  {selectedCandidate === candidat.id && (
                    <div style={styles.selectedIndicator}>✔</div>
                  )}
                </div>
              ))}
              <Button style={styles.submitButton} onPress={handleVote}>Valider mon Vote</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const styles = {
  container: {
    display: 'flex',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  sectionContainer: {
    display: 'flex',
    width: '100vw',
    padding: '50px',
    margin: '0 auto',
  },
  leftSection: {
    flex: 3,
    padding: '20px',
  },
  rightSection: {
    flex: 1,
    padding: '20px',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderLeft: '1px solid #e0e0e0',
  },
  timerContainer: {
    textAlign: 'center',
    marginBottom: '20px',
    backgroundColor: '#62bbff',
    padding: '20px',
  },
  timerText: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  timer: {
    fontSize: '48px',
    fontWeight: 'bold',
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
  },
  timerLabels: {
    display: 'flex',
    justifyContent: 'center',
    gap: '40px',
    marginTop: '10px',
    fontSize: '16px',
  },
  title: {
    marginBottom: '30px',
    fontSize: '24px',
    textAlign: 'center',
    marginTop: '30px',
    fontWeight: 'bold',
  },
  candidateList: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    margin: '0 auto',
  },
  candidateCard: {
    display: 'flex',
    alignItems: 'center',
    padding: '20px',
    borderRadius: '10px',
    backgroundColor: '#fff',
    cursor: 'pointer',
    transition: 'border-color 0.3s',
    position: 'relative',
  },
  candidateInfo: {
    flex: 1,
  },
  candidateImage: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    marginRight: '20px',
    // image fit
    objectFit: 'cover',
  },
  candidateName: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: 'black',
    margin: 0,
  },
  candidateDescription: {
    fontSize: '14px',
    color: '#555',
    margin: 0,
  },
  selectedIndicator: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    fontSize: '24px',
    color: '#0070f3',
  },
  submitButton: {
    marginTop: '20px',
    padding: '40px 25px',
    width: '70%',
    fontSize: '16px',
    backgroundColor: '#3babfe',
    color: '#fff',
    border: 'none',
    borderRadius: '15px',
    cursor: 'pointer',
    alignSelf: 'center',
  },
};
