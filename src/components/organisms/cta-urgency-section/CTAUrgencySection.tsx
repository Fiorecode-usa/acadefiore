import React from "react";
import { motion } from "framer-motion";
import styles from "./CTAUrgencySection.module.css";
import PrimaryButton from "../../atoms/primary-button/PrimaryButton";
import UrgencyTimer from "../../molecules/urgency-timer/UrgencyTimer";

interface CTAUrgencySectionProps {
  title: string;
  subtitle: string;
  price: string;
  originalPrice?: string;
  buttonText: string;
  urgencyLabel?: string;
  urgencyTime?: string;
}

export const CTAUrgencySection: React.FC<CTAUrgencySectionProps> = ({ 
  title, 
  subtitle, 
  price, 
  originalPrice,
  buttonText,
  urgencyLabel,
  urgencyTime 
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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

  return (
    <motion.section 
      className={styles.ctaUrgencySection} 
      id="comprar"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1, margin: "0px 0px -100px 0px" }}
      variants={containerVariants}
    >
      <div className={styles.container}>
        <motion.div className={styles.header} variants={itemVariants}>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.subtitle}>{subtitle}</p>
        </motion.div>

        <motion.div className={styles.ctaBox} variants={itemVariants}>
          {urgencyTime && (
            <UrgencyTimer 
              label={urgencyLabel || "Oferta termina en:"}
              time={urgencyTime}
            />
          )}

          <div className={styles.pricing}>
            {originalPrice && (
              <div className={styles.originalPrice}>
                <span className={styles.originalLabel}>Precio original:</span>
                <span className={styles.originalAmount}>{originalPrice}</span>
              </div>
            )}
            <div className={styles.currentPrice}>
              <span className={styles.currentLabel}>Precio de lanzamiento:</span>
              <span className={styles.currentAmount}>{price}</span>
            </div>
          </div>

          <PrimaryButton 
            text={buttonText}
            variant="primary"
            onClick={() => window.open("https://t.me/PasquaFZ?text=Quiero%20comprar%20el%20curso%20de%20P2P", "_blank")}
          />

          <p className={styles.guarantee}>✓ Garantía 30 días - Te ayudo a generar ingresos o evalúo tu caso</p>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default CTAUrgencySection;

