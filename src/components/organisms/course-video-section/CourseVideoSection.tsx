import { motion } from "framer-motion";
import styles from "./CourseVideoSection.module.css";

export const CourseVideoSection: React.FC = () => {

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

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    return false;
  };

  return (
    <motion.section 
      className={styles.videoSection} 
      initial="visible"
      variants={containerVariants}
    >
      <div className={styles.container}>
        <motion.div className={styles.sectionTitle} variants={titleVariants}>
          <h2>Curso Completo de Trading P2P</h2>
          <p>Domina el arte de la compra y venta de criptomonedas a través de Binance P2P. Aprende estrategias avanzadas, gestión de riesgo y cómo generar ingresos consistentes desde cualquier lugar del mundo.</p>
        </motion.div>

        <motion.div className={styles.videoContainer} variants={itemVariants}>
          <div className={styles.videoWrapper} onContextMenu={handleContextMenu}>
            <video 
              className={styles.video}
              controls
              controlsList="nodownload"
              preload="metadata"
              onContextMenu={handleContextMenu}
            >
              <source src={import.meta.env.VITE_URL_CLOUDFRONT+"cursos/p2p/1-arbitraje-p2p.mp4"} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </motion.div>

        <motion.div className={styles.warningContainer} variants={itemVariants}>
          <div className={styles.warningBox}>
            <span className={styles.warningIcon}>⚠️</span>
            <p className={styles.warningText}>
              <strong>Advertencia de Protección:</strong> Este contenido está protegido mediante firma digital única e invisible. 
              Todo intento de descarga, grabación o distribución no autorizada será rastreado automáticamente, identificando de manera 
              irrefutable al usuario responsable. La divulgación de este material conlleva acciones legales.
            </p>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default CourseVideoSection;
