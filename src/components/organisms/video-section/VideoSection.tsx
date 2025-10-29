import React from "react";
import { motion } from "framer-motion";
import styles from "./VideoSection.module.css";
import VideoPoster from "../../../assets/images/poster-video.webp";

export const VideoSection: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7
      }
    }
  };

  return (
    <motion.section 
      className={styles.videoSection} 
      id="video"
      initial="visible"
      variants={containerVariants}
    >
      <div className={styles.container}>
        <motion.div className={styles.sectionTitle} variants={titleVariants}>
          <h2>De Emigrante a Libertad Financiera: Mi Historia</h2>
          <p>Después de trabajar 15 horas al día como emigrante en Estados Unidos (construcción, delivery, limpieza, taxista, pintor), descubrí cómo generar $100 diarios trabajando solo unas horas desde casa con P2P. Este es mi testimonio personal de cómo transformé mi vida.</p>
        </motion.div>

        <motion.div className={styles.videoContainer} variants={itemVariants}>
          <div className={styles.videoWrapper}>
            <video 
              className={styles.video}
              controls
              poster={VideoPoster}
              preload="metadata"
            >
              <source src="https://impkable.com/wp-content/uploads/2025/10/mi-historia.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </motion.div>

        <motion.div className={styles.videoInfo} variants={itemVariants}>
          <div className={styles.infoItem}>
            <h3>Antes: 15 Horas de Trabajo</h3>
            <p>Construcción, delivery, limpieza, taxista, pintor... trabajos duros por sueldos bajos que me robaban todo mi tiempo</p>
          </div>
          <div className={styles.infoItem}>
            <h3>Ahora: Libertad de Tiempo</h3>
            <p>Trabajo menos horas, gano más dinero y tengo tiempo para enfocarme en lo que realmente me hace feliz</p>
          </div>
          <div className={styles.infoItem}>
            <h3>El Curso Completo</h3>
            <p>Aprende el sistema exacto que uso para generar $100+ diarios con P2P. Inversión: $97 una sola vez</p>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default VideoSection;
