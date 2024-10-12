import React from "react";
import styles from "./MobileMockup.module.css"; 
import { AiFillGithub } from "react-icons/ai";
import { RiYoutubeLine } from "react-icons/ri";
import { FaLinkedin } from "react-icons/fa";

import { FaArrowRight } from "react-icons/fa";

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

const MobileMockup = ({ profilePic, firstName, lastName, email, links }) => {
  return (
      <div className={styles.mobilePhone}>
        <div className={styles.brove}></div>
        <div className={styles.screen}>
          <div className={styles.content}>
            <img className={styles.roundImage} src={profilePic} />
            <p className={styles.name}>{firstName+" "+lastName}</p>
            <p className={styles.email}>{email}</p>
          </div>
          <div className={styles.content}>
            {links.map((link) => 
              <button className={styles.button} style={{ '--platform-color': platformMap[link.platform].color }}>
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
  );
};

export default MobileMockup;
