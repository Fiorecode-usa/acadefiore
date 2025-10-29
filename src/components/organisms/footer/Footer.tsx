import styles from "./Footer.module.css";
import SocialIconsGroup from "../../molecules/social-icons-group/SocialIconsGroup";
import ImgLogo from '../../../assets/images/isotipo-2d.png'
import Logo from "../../atoms/logo/Logo";
import { footerData } from "../../../data/appData";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <Logo img={ImgLogo} alt="FZ Academy Logo" width={40} height="auto" />
        <SocialIconsGroup />
      </div>
      
      <div className={styles.copySection}>
        <p className={styles.tagline}>{footerData.description}</p>
        <p className={styles.copyright}>{footerData.copyright}</p>
      </div>
    </footer>
  );
};

export default Footer;
