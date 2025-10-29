import React from "react";
import styles from "./TestimonialCard.module.css";

interface TestimonialCardProps {
  name: string;
  role: string;
  content: string;
  image?: string;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({ name, role, content, image }) => {
  return (
    <div className={styles.testimonialCard}>
      <div className={styles.stars}>⭐⭐⭐⭐⭐</div>
      <p className={styles.content}>"{content}"</p>
      <div className={styles.author}>
        {image && <img src={image} alt={name} className={styles.avatar} />}
        <div className={styles.authorInfo}>
          <h4 className={styles.name}>{name}</h4>
          <p className={styles.role}>{role}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;

