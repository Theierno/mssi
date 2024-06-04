import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '@/utils/supabaseClient';
import { Container, Image, Button, Input } from '@nextui-org/react';
import { Stepper, Step, StepLabel } from '@mui/material';
import { inscription, verifyOTP } from '@/services/auth';

export default function Login() {
  const [formData, setFormData] = useState({
    email: 'example@gmail.com',
    ElecNumber: '',
    phoneNumber: '',
    name: '',
    birthDate: '',
    cni: '',
    acceptTerms: false,
  });
  const [step, setStep] = useState(0);
  const [otp, setOtp] = useState('');
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, ElecNumber, phoneNumber, name, birthDate, cni, acceptTerms } = formData;

    if (!email || !ElecNumber || !phoneNumber || !name || !birthDate || !cni || !acceptTerms) {
      alert('Veuillez remplir tous les champs requis.');
      return;
    } else {
      const { data, error } = await inscription(
        `+221${formData.phoneNumber}`,
        name,
        cni,
        birthDate,
        acceptTerms,
        ElecNumber
      );

      if (error) {
        console.error('Error in signing in:', error);
        alert('Une erreur s\'est produite lors de l\'inscription.', error.message);
        return;
      } else {
        handleNextStep();
        alert('Inscription réussie! Veuillez vérifier votre téléphone pour le code OTP.');
      }
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    if (otp.length === 6) {
      const { data, error } = await verifyOTP(`+221${formData.phoneNumber}`, otp);
      if (error) {
        console.error('Error verifying OTP:', error);
        alert('Erreur lors de la vérification du code OTP.', error.message);
        return;
      } else {
        alert('Code OTP vérifié avec succès!');
        router.push('/PhotoUpload');
      }
    } else {
      alert('** Veuillez saisir un code de vérification valide.');
    }
  };

  const steps = ['Informations Personnelles', 'Informations de Connexion', 'Vérification'];

  return (
    <div style={styles.container}>
      <div style={styles.leftContainer}>
        <Image
          src="https://img.20mn.fr/tMOJ6DM5Q4-MFBZ3-98OrSk/1444x920_supporters-of-senegal-s-current-president-rally-to-support-their-leader-in-dakar-on-february-24-2024-as-president-macky-sall-has-faced-uproar-since-he-postponed-the-vote-that-was-scheduled-for-february-25-triggering-one-the-west-african-nation-s-worst-political-crises-several-hundred-people-demonstrated-in-dakar-calling-on-the-president-to-set-a-date-to-elect-his-successor-before-his-term-ends-on-april-2-the-constitutional-council-overturned-the-delay-and-called-last-week-for-the-vote-to-be-held-as-soon-as-possible-photo-by-john-wessels-afp"
          alt="NextUI Album Cover"
          style={styles.image}
        />
      </div>
      <div style={styles.rightContainer}>
        <div style={styles.formContainer}>
          <h1 style={styles.title}>Connexion au portail</h1>
          <h2 style={styles.subtitle}>Veuillez entrer vos informations pour continuer</h2>
          <Stepper activeStep={step} style={styles.stepper}>
            {steps.map((label, index) => (
              <Step key={label} style={styles.step}>
                <StepLabel StepIconProps={{ classes: { root: styles.stepIcon, completed: styles.completedStepIcon, active: styles.activeStepIcon } }}>{label}</StepLabel>
                {index < steps.length - 1 && <div style={styles.stepConnector} />}
              </Step>
            ))}
          </Stepper>
          {step === 0 && (
            <form style={styles.form}>
              <Input
                type="text"
                placeholder="Prénom & Nom"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                style={styles.input}
              />
              <Input
                type="date"
                placeholder="Date de naissance"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleChange}
                required
                style={styles.input}
              />
              <Button onClick={handleNextStep} style={styles.button}>
                Suivant
              </Button>
            </form>
          )}
          {step === 1 && (
            <form onSubmit={handleLogin} style={styles.form}>
              <Input
                type="text"
                placeholder="Numéro de CNI"
                name="cni"
                value={formData.cni}
                onChange={handleChange}
                required
                style={styles.input}
              />
              <Input
                type="text"
                placeholder="Numéro de téléphone"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
                style={styles.input}
              />
              <Input
                type="text"
                placeholder="N° carte électeur"
                name="ElecNumber"
                value={formData.ElecNumber}
                onChange={handleChange}
                required
                style={styles.input}
              />
              <div style={styles.checkboxContainer}>
                <input
                  type="checkbox"
                  name="acceptTerms"
                  checked={formData.acceptTerms}
                  onChange={handleChange}
                  required
                  style={styles.checkbox}
                />
                <label style={styles.label}>
                  J'accepte les <a href="/terms" style={styles.link}>conditions de vote</a>
                </label>
              </div>
              <Button type="submit" style={styles.button}>
                Suivant
              </Button>
              <Button onClick={handlePreviousStep} style={styles.button}>
                Précédent
              </Button>
            </form>
          )}
          {step === 2 && (
            <form onSubmit={handleVerifyOTP} style={styles.verificationContainer}>
              <h3>Vérification</h3>
              <p>Veuillez entrer le code OTP envoyé à votre téléphone.</p>
              <Input
                type="text"
                placeholder="Code OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                style={styles.input}
              />
              <Button type="submit" style={styles.button}>
                Valider
              </Button>
            </form>
          )}
          <p style={styles.assistance}>Numéro d'assistance : +221 33 123 45 67</p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    height: '100vh',
    alignItems: 'center',
    justifyContent: 'center', // Assurer que le contenu est centré
  },
  leftContainer: {
    width: '50%',
    backgroundColor: 'black',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  image: {
    objectFit: 'cover',
  },
  rightContainer: {
    width: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
  },
  formContainer: {
    width: '100%',
    maxWidth: '400px',
    textAlign: 'center',
  },
  title: {
    fontSize: '32px',
    marginBottom: '9px',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: '18px',
    marginBottom: '70px',
    color: '#555',
  },
  stepper: {
    backgroundColor: 'transparent',
    marginBottom: '20px',
  },
  step: {
    position: 'relative',
    color: 'white',
  },
  stepConnector: {
    position: 'absolute',
    top: '12px',
    left: '50%',
    right: '50%',
    height: '2px',
    width: 'calc(100% - 24px)',
    backgroundColor: '#fff',
    color: 'white',
    zIndex: '-1',
  },
  stepIcon: {
    color: '#fff',
  },
  activeStepIcon: {
    color: '#0070f3',
  },
  completedStepIcon: {
    color: '#0070f3',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
  },
  input: {
    width: '90%',
    padding: '5%',
    margin: '10px 0',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  checkboxContainer: {
    display: 'flex',
    alignItems: 'center',
    margin: '10px 0',
  },
  checkbox: {
    marginRight: '10px',
  },
  label: {
    fontSize: '14px',
  },
  link: {
    color: '#0070f3',
    textDecoration: 'underline',
  },
  button: {
    width: '100%',
    padding: '15px',
    margin: '10px 0',
    fontSize: '16px',
    backgroundColor: '#0070f3',
    color: '#fff',
    border: 'none',
    borderRadius: '14px',
    cursor: 'pointer',
  },
  assistance: {
    marginTop: '20px',
    color: '#888',
  },
  verificationContainer: {
    display: 'flex',
    backgroundColor: '#eeee',
    margin: 10,
    padding: 70,
    borderRadius: '14px',
    flexDirection: 'column',
    alignItems: 'center',
  },
};
