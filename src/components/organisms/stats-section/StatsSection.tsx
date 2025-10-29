import React from "react";
import { motion } from "framer-motion";
import styles from "./StatsSection.module.css";

interface StatItem {
  number: string;
  label: string;
  icon?: string;
}

interface StatsSectionProps {
  stats: StatItem[];
}

export const StatsSection: React.FC<StatsSectionProps> = ({ stats }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        easings: [0.4, 0, 0.2, 1]
      }
    }
  };

  return (
    <motion.section 
      className={styles.statsSection} 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2, margin: "0px 0px -50px 0px" }}
      variants={containerVariants}
    >
      <div className={styles.container}>
        <div className={styles.statsGrid}>
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className={styles.statCard}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
            >
              {stat.icon && (
                <div className={styles.icon}>{stat.icon}</div>
              )}
              <div className={styles.number}>{stat.number}</div>
              <div className={styles.label}>{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default StatsSection;

