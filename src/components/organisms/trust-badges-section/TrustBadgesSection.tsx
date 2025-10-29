import React from "react";
import { motion } from "framer-motion";
import styles from "./TrustBadgesSection.module.css";

interface TrustBadge {
  icon: string;
  text: string;
  description?: string;
}

interface TrustBadgesSectionProps {
  badges: TrustBadge[];
}

export const TrustBadgesSection: React.FC<TrustBadgesSectionProps> = ({ badges }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        easings: [0.4, 0, 0.2, 1]
      }
    }
  };

  return (
    <motion.div 
      className={styles.trustBadgesSection}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <div className={styles.badgesList}>
        {badges.map((badge, index) => (
          <motion.div
            key={index}
            className={styles.badge}
            variants={itemVariants}
          >
            <div className={styles.icon}>{badge.icon}</div>
            <div className={styles.content}>
              <span className={styles.text}>{badge.text}</span>
              {badge.description && (
                <span className={styles.description}>{badge.description}</span>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default TrustBadgesSection;

