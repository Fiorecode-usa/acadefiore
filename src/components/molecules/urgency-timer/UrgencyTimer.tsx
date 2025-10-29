import React, { useState, useEffect, useRef } from "react";
import styles from "./UrgencyTimer.module.css";

interface UrgencyTimerProps {
  label: string;
  time: string; // Formato: "HH:MM:SS" o "HH:MM:SS" o "DD:HH:MM:SS"
}

const STORAGE_KEY = "urgency_timer_start";
const DEFAULT_DURATION = 48 * 60 * 60; // 48 horas en segundos

export const UrgencyTimer: React.FC<UrgencyTimerProps> = ({ label, time }) => {
  const [timeLeft, setTimeLeft] = useState<{ hours: number; minutes: number; seconds: number } | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Función para convertir "HH:MM:SS" a segundos totales
  const parseTimeToSeconds = (timeString: string): number => {
    const parts = timeString.split(":");
    
    if (parts.length === 3) {
      // Formato HH:MM:SS
      const hours = parseInt(parts[0], 10);
      const minutes = parseInt(parts[1], 10);
      const seconds = parseInt(parts[2], 10);
      return hours * 3600 + minutes * 60 + seconds;
    } else if (parts.length === 4) {
      // Formato DD:HH:MM:SS
      const days = parseInt(parts[0], 10);
      const hours = parseInt(parts[1], 10);
      const minutes = parseInt(parts[2], 10);
      const seconds = parseInt(parts[3], 10);
      return days * 86400 + hours * 3600 + minutes * 60 + seconds;
    }
    
    return DEFAULT_DURATION;
  };

  // Función para formatear segundos a HH:MM:SS
  const formatSeconds = (totalSeconds: number): { hours: number; minutes: number; seconds: number } => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return { hours, minutes, seconds };
  };

  useEffect(() => {
    const initializeTimer = () => {
      // Convertir el tiempo inicial a segundos
      const totalSeconds = parseTimeToSeconds(time);
      
      // Obtener timestamp guardado o crear uno nuevo
      const savedTimestamp = localStorage.getItem(STORAGE_KEY);
      const now = Date.now();
      
      if (savedTimestamp) {
        const elapsed = Math.floor((now - parseInt(savedTimestamp, 10)) / 1000);
        const remaining = Math.max(0, totalSeconds - elapsed);
        
        if (remaining <= 0) {
          // Si el tiempo se agotó, reiniciar el temporizador
          localStorage.setItem(STORAGE_KEY, now.toString());
          setTimeLeft(formatSeconds(totalSeconds));
        } else {
          setTimeLeft(formatSeconds(remaining));
        }
      } else {
        // Primera visita: guardar timestamp y empezar desde el tiempo inicial
        localStorage.setItem(STORAGE_KEY, now.toString());
        setTimeLeft(formatSeconds(totalSeconds));
      }
    };

    initializeTimer();

    // Actualizar cada segundo
    intervalRef.current = setInterval(() => {
      const savedTimestamp = localStorage.getItem(STORAGE_KEY);
      if (savedTimestamp) {
        const totalSeconds = parseTimeToSeconds(time);
        const now = Date.now();
        const elapsed = Math.floor((now - parseInt(savedTimestamp, 10)) / 1000);
        const remaining = Math.max(0, totalSeconds - elapsed);
        
        if (remaining <= 0) {
          // Tiempo agotado
          setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
        } else {
          setTimeLeft(formatSeconds(remaining));
        }
      }
    }, 1000);

    // Cleanup
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [time]);

  // Función para formatear con ceros a la izquierda
  const formatTime = (value: number): string => {
    return value.toString().padStart(2, "0");
  };

  if (!timeLeft) {
    return null;
  }

  return (
    <div className={styles.timerContainer}>
      <div className={styles.label}>{label}</div>
      <div className={styles.time}>
        {formatTime(timeLeft.hours)}:{formatTime(timeLeft.minutes)}:{formatTime(timeLeft.seconds)}
      </div>
    </div>
  );
};

export default UrgencyTimer;

