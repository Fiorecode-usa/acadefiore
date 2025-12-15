import React from "react";
import styles from "./NavLinkItem.module.css";
import { NavLink, useNavigate } from "react-router";

interface NavLinkItemProps {
  to: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  routerDom?: boolean;
}

const NavLinkItem: React.FC<NavLinkItemProps> = ({
  to,
  children,
  onClick,
  routerDom = false
}) => {
  const navigate = useNavigate()
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    
    // Si es un hash (#section), hacer scroll suave
    if (to.startsWith('#')) {
      const targetId = to.substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
    
    // Ejecutar onClick si existe
    if (onClick) {
      onClick();
    }
  };

  return (
    <li className={styles["nav-link-item"]}>
      {routerDom ? (
        <NavLink to={to} onClick={() => navigate(to)} className={styles.navLink}>
          {children}
        </NavLink>
      ) : (
        <a href={to} onClick={handleClick} className={styles.navLink}>
          {children}
        </a>
      )}
    </li>
  );
};

export default NavLinkItem;