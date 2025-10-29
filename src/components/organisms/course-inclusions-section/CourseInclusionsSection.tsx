import React from "react";
import { motion } from "framer-motion";
import styles from "./CourseInclusionsSection.module.css";

interface Inclusion {
  icon: string;
  title: string;
  description: string;
}

interface CourseInclusionsSectionProps {
  title: string;
  subtitle: string;
  inclusions: Inclusion[];
}

export const CourseInclusionsSection: React.FC<CourseInclusionsSectionProps> = ({ title, subtitle, inclusions }) => {
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
      className={styles.courseInclusionsSection} 
      id="incluye"
      initial="visible"
      variants={containerVariants}
    >
      <div className={styles.container}>
        <motion.div className={styles.header} variants={itemVariants}>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.subtitle}>{subtitle}</p>
        </motion.div>

        <div className={styles.inclusionsGrid}>
          {inclusions.map((inclusion, index) => (
            <motion.div 
              key={index} 
              className={styles.inclusionCard}
              variants={itemVariants}
            >
              <div className={styles.iconContainer}>
                <span className={styles.icon}>{inclusion.icon}</span>
              </div>
              <h3 className={styles.cardTitle}>{inclusion.title}</h3>
              <p className={styles.cardDescription}>{inclusion.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default CourseInclusionsSection;

