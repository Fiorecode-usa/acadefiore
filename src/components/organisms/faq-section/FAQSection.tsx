import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./FAQSection.module.css";

interface FAQ {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  title: string;
  subtitle: string;
  faqs: FAQ[];
}

export const FAQSection: React.FC<FAQSectionProps> = ({ title, subtitle, faqs }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
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

  const iconVariants = {
    closed: { rotate: 0 },
    open: { rotate: 45 }
  };

  return (
    <motion.section 
      className={styles.faqSection} 
      id="faq"
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

        <div className={styles.faqList}>
          {faqs.map((faq, index) => (
            <motion.div 
              key={index} 
              className={styles.faqItem}
              variants={itemVariants}
            >
              <button
                className={`${styles.faqQuestion} ${openIndex === index ? styles.open : ''}`}
                onClick={() => toggleFAQ(index)}
                aria-expanded={openIndex === index}
              >
                <span className={styles.questionText}>{faq.question}</span>
                <motion.span 
                  className={styles.icon}
                  variants={iconVariants}
                  animate={openIndex === index ? 'open' : 'closed'}
                  transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                >
                  +
                </motion.span>
              </button>
              
              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    initial="collapsed"
                    animate="open"
                    exit="collapsed"
                    variants={{
                      open: { 
                        height: 'auto',
                        opacity: 1,
                        transition: {
                          height: {
                            duration: 0.4,
                            ease: [0.04, 0.62, 0.23, 0.98]
                          },
                          opacity: {
                            duration: 0.3,
                            ease: [0.4, 0, 0.2, 1]
                          }
                        }
                      },
                      collapsed: { 
                        height: 0,
                        opacity: 0,
                        transition: {
                          height: {
                            duration: 0.35,
                            ease: [0.04, 0.62, 0.23, 0.98]
                          },
                          opacity: {
                            duration: 0.2,
                            ease: [0.4, 0, 0.2, 1]
                          }
                        }
                      }
                    }}
                    className={styles.faqAnswer}
                  >
                    <div className={styles.answerContent}>
                      <p>{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default FAQSection;

