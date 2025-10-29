import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./UrgencyNotification.module.css";

interface Notification {
  id: number;
  message: string;
}

const notifications: Notification[] = [
  { id: 1, message: "María compró hace 3 minutos desde Caracas" },
  { id: 2, message: "Carlos adquirió el curso hace 12 minutos desde Bogotá" },
  { id: 3, message: "Ana se unió hace 8 minutos desde México" },
  { id: 4, message: "Luis compró hace 5 minutos desde Lima" },
  { id: 5, message: "Solo quedan 23 cupos disponibles" },
  { id: 6, message: "12 personas están viendo esta página ahora" },
  { id: 7, message: "Alejandra completó su compra hace 2 minutos" },
  { id: 8, message: "Diego se unió a la comunidad hace 15 minutos" },
  { id: 9, message: "Roberto compró hace 4 minutos desde Buenos Aires" },
  { id: 10, message: "Laura adquirió el curso hace 7 minutos" },
  { id: 11, message: "Carmen se unió hace 10 minutos desde Chile" },
  { id: 12, message: "Ricardo completó su compra hace 1 minuto" },
  { id: 13, message: "15 personas están viendo esta página ahora" },
  { id: 14, message: "Patricia se unió hace 6 minutos desde Colombia" },
  { id: 15, message: "Fernando compró hace 3 minutos desde Ecuador" },
  { id: 16, message: "Solo quedan 20 cupos disponibles" },
  { id: 17, message: "Andrea adquirió el curso hace 9 minutos" },
  { id: 18, message: "Miguel se unió a la comunidad hace 11 minutos" },
];

export const UrgencyNotification: React.FC = () => {
  const [currentNotification, setCurrentNotification] = useState<Notification>(notifications[0]);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timeouts: ReturnType<typeof setTimeout>[] = [];

    const showNextNotification = () => {
      const timeout1 = setTimeout(() => {
        // Cambiar a una nueva notificación aleatoria
        const randomIndex = Math.floor(Math.random() * notifications.length);
        setCurrentNotification(notifications[randomIndex]);
        
        // Esperar un momento antes de mostrar para que la animación de salida termine
        const timeout2 = setTimeout(() => {
          // Mostrar notificación después del delay
          setIsVisible(true);
          
          const timeout3 = setTimeout(() => {
            // Ocultar notificación después de 5 segundos
            setIsVisible(false);
            
            const timeout4 = setTimeout(() => {
              // Esperar 10 segundos antes de mostrar la siguiente
              showNextNotification();
            }, 5000);
            
            timeouts.push(timeout4);
          }, 5000);
          
          timeouts.push(timeout3);
        }, 500); // Delay de 500ms para que la animación de salida termine
        
        timeouts.push(timeout2);
      }, 300); // Pequeño delay inicial
      
      timeouts.push(timeout1);
    };

    // Mostrar la primera notificación inmediatamente
    setIsVisible(true);
    
    // Iniciar el ciclo después de 5 segundos
    const firstTimeout = setTimeout(() => {
      setIsVisible(false);
      const secondTimeout = setTimeout(() => {
        showNextNotification();
      }, 10000);
      timeouts.push(secondTimeout);
    }, 5000);
    
    timeouts.push(firstTimeout);

    // Cleanup
    return () => {
      timeouts.forEach(timeout => clearTimeout(timeout));
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          key={currentNotification.id}
          className={styles.notification}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.4 }}
        >
          <div className={styles.icon}>🔔</div>
          <div className={styles.message}>{currentNotification.message}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default UrgencyNotification;

