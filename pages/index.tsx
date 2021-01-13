import Head from 'next/head'
import { useAuth } from '../lib/auth'
import styles from '../styles/Home.module.css'

export default function Home() {
  const auth = useAuth()
  console.log('user', auth?.user)
  return (
    <div className={styles.container}>
      <Head>
        <title>Feedback Loop</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Feedback Loop</a>
        </h1>
        <button onClick={() => auth.signInWithGitHub()}>Sign In</button>
        <div>{auth?.user?.email}</div>
        <button onClick={() => auth.signOut()}>Sign Out</button>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}
