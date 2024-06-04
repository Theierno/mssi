// src/pages/_app.js
import { UserProvider } from '@/services/auth';
import '@/styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}

export default MyApp;
