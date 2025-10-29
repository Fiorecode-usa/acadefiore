import React from "react";
import styles from "./FeatureItem.module.css";

interface FeatureItemProps {
  title: string;
  description: string;
}

export const FeatureItem: React.FC<FeatureItemProps> = ({ title, description }) => {
  return (
    <div className={styles.featureItem}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
    </div>
  );
};

export default FeatureItem;

