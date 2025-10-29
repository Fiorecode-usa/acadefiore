import React from "react";
import { motion } from "framer-motion";
import styles from "./ProblemSolutionSection.module.css";
import FeatureItem from "../../molecules/feature-item/FeatureItem";

interface ProblemSolutionData {
  title: string;
  subtitle: string;
  before: {
    title: string;
    features: Array<{ title: string; description: string }>;
  };
  after: {
    title: string;
    features: Array<{ title: string; description: string }>;
  };
}

interface ProblemSolutionSectionProps {
  data: ProblemSolutionData;
}

export const ProblemSolutionSection: React.FC<ProblemSolutionSectionProps> = ({ data }) => {
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
      className={styles.problemSolutionSection} 
      id="problema-solucion"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1, margin: "0px 0px -100px 0px" }}
      variants={containerVariants}
    >
      <div className={styles.container}>
        <motion.div className={styles.header} variants={itemVariants}>
          <h2 className={styles.title}>{data.title}</h2>
          <p className={styles.subtitle}>{data.subtitle}</p>
        </motion.div>

        <div className={styles.comparison}>
          {/* Problema */}
          <motion.div className={`${styles.side} ${styles.before}`} variants={itemVariants}>
            <div className={styles.sideHeader}>
              <div className={styles.badgeBefore}>{data.before.title}</div>
            </div>
            <div className={styles.featuresList}>
              {data.before.features.map((feature, index) => (
                <FeatureItem
                  key={index}
                  title={feature.title}
                  description={feature.description}
                />
              ))}
            </div>
          </motion.div>

          {/* Solución */}
          <motion.div className={`${styles.side} ${styles.after}`} variants={itemVariants}>
            <div className={styles.sideHeader}>
              <div className={styles.badgeAfter}>{data.after.title}</div>
            </div>
            <div className={styles.featuresList}>
              {data.after.features.map((feature, index) => (
                <FeatureItem
                  key={index}
                  title={feature.title}
                  description={feature.description}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default ProblemSolutionSection;

