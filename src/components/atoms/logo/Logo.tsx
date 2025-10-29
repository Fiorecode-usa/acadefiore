import React from "react";
import { Link } from "react-router";
import styles from "./Logo.module.css";

interface LogoProps {
  /** Imagen importada o URL */
  img: string;
  /** Texto alternativo para accesibilidad */
  alt?: string;
  /** Ancho en píxeles */
  width?: number | string;
  /** Alto en píxeles */
  height?: number | string;
  /** Clase adicional opcional */
  className?: string;
}

const Logo: React.FC<LogoProps> = ({
  img,
  alt = "FZ Academy Logo",
  width = 40,
  height = "auto",
  className = ""
}) => {
  const imageStyle = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
  };

  return (
    <Link to="/" className={`${styles.logo} ${className}`}>
      <img
        src={img}
        alt={alt}
        style={imageStyle}
        className={styles.logoImage}
      />
      <p className={styles.logoText}>Academy</p>
    </Link>
  );
};

export default Logo;
