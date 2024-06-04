'use client';

import Head from "next/head";
import styles from "./page.module.css";
import Link from 'next/link';

export default function Home() {
  const ticTacToeUrl = process.env.TIC_TAC_TOE_URL;

  return (
    <>
      <Head>
        <title>遊び場 GAMES</title>
      </Head>
      <main className={styles.main}>
        <h1>遊び場 GAMES にようこそ！</h1>
        <a href={ticTacToeUrl}>Go to TicTacToe</a>
        <Link href="/login">
          <a>Go to Login</a>
        </Link>
      </main>
    </>
  );
}
