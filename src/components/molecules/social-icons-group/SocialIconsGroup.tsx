import React from "react";
import styles from "./SocialIconsGroup.module.css";
import TelegramIcon from "../../atoms/icons/TelegramIcon";
import TwitterIcon from "../../atoms/icons/TwitterIcon";

interface SocialLink {
  href: string;
  label: string;
  icon: React.ReactNode;
}

const socialLinks: SocialLink[] = [
  {
    href: "https://t.me/blonect",
    label: "Telegram",
    icon: <TelegramIcon color="#ffffff" size={20} />,
  },
  {
    href: "https://twitter.com/blonect",
    label: "Twitter",
    icon: <TwitterIcon color="#ffffff" size={20} />,
  },
];

const SocialIconsGroup: React.FC = () => {
  return (
    <div className={styles.container}>
      {socialLinks.map(({ href, label, icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className={styles.iconWrapper}
        >
          {icon}
        </a>
      ))}
    </div>
  );
};

export default SocialIconsGroup;
