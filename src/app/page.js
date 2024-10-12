import { getServerSession } from 'next-auth';
import styles from './Page.module.css'; // Add any custom CSS here
import { authOptions } from './api/auth/[...nextauth]/route';
import SignIn from './components/signIn';
import Logo from '@/lib/link.png'
import Image from 'next/image';
import { redirect } from 'next/navigation';



export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect('/editor');
  }

  return (
    <div className={styles.container}>
      <div className={styles.loginContainer}>
        <div className={styles.title}>
          <Image src={Logo} alt="App Logo" className={styles.logo} />
          <h4  className={styles.titleText}>Devlinks</h4>
        </div>
        <div className={styles.loginCard}>
          <h3  className={styles.loginText}>Login</h3>
          <p  className={styles.loginSubText}>Login below to get back into the app</p>
            {!session ? (
              <SignIn />
            ) : (
              <p>Redirecting to editor...</p>
            )}
        </div>
      </div>
    </div>
  );
}
