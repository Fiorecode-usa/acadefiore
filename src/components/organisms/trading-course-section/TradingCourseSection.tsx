import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { appData } from "../../../data/appData";
import { useCourse } from "../../../context/CourseContext";
import styles from "./TradingCourseSection.module.css";

export const TradingCourseSection: React.FC = () => {
  const { selectedLessonId } = useCourse();
  const urlBaseCourse = import.meta.env.VITE_URL_CLOUDFRONT+'cursos/trading/futuros/modulo-1/'
  

  // Seleccionar la primera lección por defecto si no hay ninguna seleccionada
  useEffect(() => {
    if (appData.tradingModule1Syllabus.length > 0 && !selectedLessonId) {
      const firstLesson = appData.tradingModule1Syllabus[0].lessons[0];
      if (firstLesson) {
        // Esto se manejará desde el CourseSidebar
      }
    }
  }, [selectedLessonId]);

  // Obtener la URL del video para la lección seleccionada
  const getVideoUrl = (lessonId: string): string => {
    // Por ahora, usar el mismo video base para todas las lecciones
    // En el futuro, cada lección puede tener su propia URL específica
    // El usuario puede actualizar estas URLs en appData.ts agregando videoUrl a cada lesson
    const baseUrl = 'https://impkable.com/wp-content/uploads/2025/10/trading-modulo-1';
    
    // Buscar si la lección tiene una URL específica en los datos
    for (const section of appData.tradingModule1Syllabus) {
      const lesson = section.lessons.find(l => l.id === lessonId);
      if (lesson && lesson.videoUrl) {
        return urlBaseCourse+lesson.videoUrl;
      }
    }
    
    // Si no tiene URL específica, usar la URL base con el ID de la lección
    return `${baseUrl}-${lessonId}.mp4`;
  };

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

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    return false;
  };

  // Obtener el título de la lección seleccionada
  const getSelectedLessonTitle = (): string => {
    if (!selectedLessonId) return '';
    
    for (const section of appData.tradingModule1Syllabus) {
      const lesson = section.lessons.find(l => l.id === selectedLessonId);
      if (lesson) return lesson.title;
    }
    return '';
  };

  return (
    <motion.section 
      className={styles.videoSection} 
      initial="visible"
      variants={containerVariants}
    >
      <div className={styles.contentArea}>
        <div className={styles.videoContent}>
            {selectedLessonId && (
              <>
                <motion.div className={styles.lessonTitle} variants={itemVariants}>
                  <h3>{getSelectedLessonTitle()}</h3>
                </motion.div>

                <motion.div className={styles.videoContainer} variants={itemVariants}>
                  <div className={styles.videoWrapper} onContextMenu={handleContextMenu}>
                    <video 
                      key={selectedLessonId}
                      className={styles.video}
                      controls
                      controlsList="nodownload"
                      preload="metadata"
                      onContextMenu={handleContextMenu}
                    >
                      <source src={getVideoUrl(selectedLessonId)} type="video/mp4" />
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
              </>
        )}
        </div>
      </div>
    </motion.section>
  );
};

export default TradingCourseSection;

