import React from 'react'
import styles from './LandingTemplate.module.css'
import { Outlet } from 'react-router'
import Header from '../../organisms/header/Header'
import Footer from '../../organisms/footer/Footer'

const LandingTemplate: React.FC = () => {
  return (
    <div className={styles.layout}>
      <div className={styles.animatedBackground}></div>
      <Header/>

      <main className={styles.ctn_content}>
        <Outlet/>
      </main>
      
      <Footer/>
    </div>
  )
}

export default LandingTemplate