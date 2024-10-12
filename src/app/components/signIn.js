'use client'
import React from 'react'
import styles from '@/app/Page.module.css'
import { signIn } from 'next-auth/react'
import { FaGoogle } from "react-icons/fa6";

const SignIn = () => {
  return (
    <div>
      <button className={styles.loginButton} onClick={() => signIn('google')}>
      <FaGoogle />
      <p className={styles.loginCaption}>Login with Google</p>
        </button>
    </div>
  )
}

export default SignIn