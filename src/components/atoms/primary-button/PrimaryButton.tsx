import React, { useCallback, useMemo } from "react";
import styles from "./PrimaryButton.module.css";
import Loader from "../loader/Loader";

interface PrimaryButtonProps {
  /** Tipo de botón: útil para formularios */
  type?: "button" | "submit" | "reset";
  /** Variante del boton: primary: con background, secondary:Solo con Bordes */
  variant: "primary" | "secondary";
  /** Ancho: puede ser "full", "auto" o cualquier valor CSS válido como "300px" o "50%" */
  width?: "full" | "auto" | string;
  /** Texto visible en el botón */
  text: string;
  /** Estado de carga: muestra un loader y bloquea clics */
  isLoading?: boolean;
  /** Tamaño del loader */
  sizeLoader?: "xs" | "small" | "medium" | "large";
  /** Deshabilita el botón */
  disabled?: boolean;
  /** Función al hacer clic */
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  /** Clases CSS extra */
  className?: string;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  type = "button",
  variant = "primary",
  width = "auto",
  text,
  isLoading = false,
  sizeLoader = "small",
  disabled = false,
  onClick,
  className = ""
}) => {
  // Manejo seguro del clic
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled || isLoading) return; // Evita ejecutar si está deshabilitado o cargando
      onClick?.(e); // Llama a la función si existe
    },
    [disabled, isLoading, onClick]
  );

  // Determina el ancho dinámico
  const widthStyle = useMemo<React.CSSProperties>(() => {
    if (width === "full") return { width: "100%" };
    if (width === "auto") return { width: "auto" };
    return { width }; // acepta cualquier string como "300px", "50%", "10rem"
  }, [width]);

  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={disabled || isLoading}
      style={widthStyle}
      className={`${styles["primary-button"]} ${styles[variant]} ${className}`}
    >
      {isLoading ? (
        <Loader size={sizeLoader} />
      ) : (
        <>
          <span className={styles["button-text"]}>{text}</span>
          <div className={styles["button-shine"]}></div>
        </>
      )}
    </button>
  );
};

export default PrimaryButton;
