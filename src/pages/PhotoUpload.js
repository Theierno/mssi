import React, { useState, useRef, useCallback } from 'react';
import Webcam from 'react-webcam';
import { Button, CircularProgress, Typography, Box } from '@mui/material';
import { useRouter } from 'next/router';

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: 'user',
};

const PhotoUpload = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState([
    'Vérification de la carte d\'identité...',
    'Analyse du visage...',
    'Comparaison des données...',
    'Finalisation ...',
    'Validation d\'accès...',
    'Redirection en cours...'
  ]);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [capturedImages, setCapturedImages] = useState([]);
  const webcamRef = useRef(null);
  const router = useRouter();

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImages([...capturedImages, imageSrc]);
    nextStep();
  }, [webcamRef, capturedImages]);

  const nextStep = () => {
    if (step === 2) {
      setLoading(true);
      let index = 0;
      const interval = setInterval(() => {
        setCurrentMessageIndex(index);
        index += 1;
        if (index >= loadingMessages.length) {
          clearInterval(interval);
          router.push('/vote/mon-vote');
        }
      }, 2000);
    } else {
      setStep(step + 1);
    }
  };

  return (
    <Box sx={styles.container}>
        <h1 style={
            {
                color: 'black',
                fontSize: '30px',
                fontWeight: 'bold',
                marginBottom: '20px',
            }}
        >Vérification de l'identité</h1>
      {loading ? (
        <Box sx={styles.loaderContainer}>
          <CircularProgress />
          <Typography variant="h6" sx={styles.loadingText}>{loadingMessages[currentMessageIndex]}</Typography>
        </Box>
      ) : (
        <>
          <Box sx={styles.webcamContainer}>
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
              style={styles.webcam}
            />
            {step === 1 && <Box sx={styles.frameID}></Box>}
            {step === 2 && <Box sx={styles.frameFace}></Box>}
          </Box>
          <Box sx={styles.floatingBar}>
            <Typography variant="h6" sx={styles.stepText}>
              {step === 1 ? 'Étape 1: Placez votre carte d\'identité dans le cadre' : 'Étape 2: Centrer votre visage dans le cadre'}
            </Typography>
            <Button variant="contained"  style={{backgroundColor : 'white', color: 'black', padding: 10}} onClick={capture} sx={styles.captureButton}>
              Capturer
            </Button>
          </Box>
        </>
      )}
      {step === 3 && (
        <Box sx={styles.reviewContainer}>
          <Typography variant="h6" sx={styles.reviewText}>Révision des images capturées</Typography>
          <Box sx={styles.capturedImages}>
            {capturedImages.map((image, index) => (
              <img key={index} src={image} alt={`Capture ${index + 1}`} style={styles.capturedImage} />
            ))}
          </Box>
          <CircularProgress />
          <Typography variant="h6" sx={styles.loadingText}>{loadingMessages[currentMessageIndex]}</Typography>
        </Box>
      )}
    </Box>
  );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f0f0f0',
    },
    webcamContainer: {
        position: 'relative',
        width: '80%',
        height: '60%',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        borderRadius: '10px',
        justifyContent: 'center',
        alignItems: 'center', // Added this line to center the frame
    },
    webcam: {
        width: '100%',
        height: '100%',
        height: 'auto',
        objectFit: 'cover',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
    frameID: {
        position: 'absolute',
        top: '20%',
        left: '15%',
        width: '70%',
        height: '70%',
        border: '5px dashed rgba(255, 255, 255, 0.4)',
        borderRadius: '5px',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        zIndex: 2,
    },
    frameFace: {
        position: 'absolute',
        top: '10%',
        left: '30%',
        width: '40%',
        height: '85%',
        border: '5px dashed rgba(255, 255, 255, 0.8)',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        borderRadius: '100%',
        zIndex: 2,
    },
    floatingBar: {
        position: 'absolute',
        bottom: '5%',
        width: '80%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'black',
        padding: '15px 20px',
        borderRadius: '10px',
    },
    stepText: {
        color: '#fff',
    },
    captureButton: {
        marginLeft: '20px',
        backgroundColor: '#3babfe',
    },
    loaderContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
    },
    loadingText: {
        marginTop: '20px',
        fontSize: '18px',
        color: '#000',
    },
    reviewContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
    },
    reviewText: {
        fontSize: '20px',
        marginBottom: '20px',
    },
    capturedImages: {
        display: 'flex',
        gap: '20px',
        marginBottom: '20px',
    },
    capturedImage: {
        width: '200px',
        height: 'auto',
        borderRadius: '10px',
    },
};

export default PhotoUpload;
