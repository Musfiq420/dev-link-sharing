'use client'
import { useRouter } from "next/navigation";
import { useState } from 'react';
import styles from '@/app/preview/[id]/Preview.module.css';
import { AiFillGithub } from "react-icons/ai";
import { RiYoutubeLine } from "react-icons/ri";
import { FaArrowRight, FaLinkedin } from "react-icons/fa";

const platformMap = {
  "GitHub": {
    "icon": <AiFillGithub />,
    "color": "black"
  },
  "YouTube": {
    "icon": <RiYoutubeLine />,
    "color": "red"
  },
  "LinkedIn": {
    "icon": <FaLinkedin />,
    "color": "#0077B5"
  },
}

export default function PreviewComponent({data}) {
  const router = useRouter();
  const [toastVisible, setToastVisible] = useState(false);

  const handleClick = (link) => {
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  const handleShareLink = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  return (
    <div className={styles.container}>
      <div className={styles.background}></div>
      <div className={styles.topbar}>
      <button className={styles.backButton} onClick={() => router.push('/editor')}>Back to Editor</button>
        <button className={styles.shareButton} onClick={handleShareLink}>Share Link</button>
      </div>
      <div className={styles.profile}>
        <div className={styles.screen}>
            <div className={styles.content}>
              <img className={styles.roundImage} src={data.profile.proPic} />
              <p className={styles.name}>{data.profile.firstName+" "+data.profile.lastName}</p>
              <p className={styles.email}>{data.profile.email}</p>
            </div>
            <div className={styles.content}>
              {data.linkList.map((link) => 
                <button onClick={() => handleClick(link.url)} className={styles.button} style={{ '--platform-color': platformMap[link.platform].color }}>
                  <p>
                    {platformMap[link.platform].icon}
                    {" "+link.platform}
                  </p>
                    <FaArrowRight color="white" />
                </button>
              )}
              
            </div>
          </div>
        </div>
    </div>
  );
}
