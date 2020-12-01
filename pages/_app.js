import '../styles/index.css';

import { useUser } from '../hooks/user.hooks';
function MyApp({ Component, pageProps }) {
  const { user } = useUser();

  return <Component {...pageProps} />;
}

export default MyApp;
