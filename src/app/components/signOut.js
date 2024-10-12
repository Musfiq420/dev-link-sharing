'use client'
import React from 'react'
import styles from '@/app/Page.module.css'
import { signOut } from 'next-auth/react'

const SignOut = () => {
  return (
    <div>
      <button className={styles.logoutButton} onClick={() => signOut()}>
          Log Out
        </button>
    </div>
  )
}

export default SignOut