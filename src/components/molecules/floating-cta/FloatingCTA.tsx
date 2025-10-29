import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./FloatingCTA.module.css";

interface FloatingCTAProps {
  text: string;
  onClick: () => void;
}

export const FloatingCTA: React.FC<FloatingCTAProps> = ({ text, onClick }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      // Mostrar después de scroll 300px
      if (currentScrollY > 300 && currentScrollY < document.documentElement.scrollHeight - windowHeight - 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={styles.floatingCta}
          initial={{ opacity: 0, y: 100, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 100, scale: 0.8 }}
          transition={{ 
            duration: 0.3
          }}
        >
          <button onClick={onClick} className={styles.button}>
            <span className={styles.text}>{text}</span>
            <span className={styles.icon}>💳</span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingCTA;

