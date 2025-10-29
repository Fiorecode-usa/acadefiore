import React from "react"
import styles from "./Loader.module.css"

interface LoaderProps {
  size: "xs" | "small" | "medium" | "large"
}

const Loader: React.FC<LoaderProps> = ({ size = "small" }) => {
  return <div className={`${styles.loader} ${styles[size]}`}></div>
}

export default Loader
