'use client'
import { useState } from 'react';
import Header from './Header';
import LinkList from './LinkList';
import ProfileForm from './ProfileForm';
import styles from './EditorPage.module.css';
import MobileMockup from './MobileMockup';


export default function EditorPage ({data, updateLinkList, updateProfile}) {
  const [selectedTab, setSelectedTab] = useState('Links');

  return (
    <div className={styles.container}>
      <Header id={data._id} selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      <div className={styles.body}>
        <div className={styles.mobileContainer}>
          <MobileMockup 
            profilePic={data.profile.proPic}
            firstName={data.profile.firstName}
            lastName={data.profile.lastName}
            email={data.profile.email}
            links={data.linkList}
          />
        </div>
        <div className={styles.formContainer}>
          {selectedTab === 'Links' ? <LinkList linkList={data["linkList"]} updateLinkList={updateLinkList} /> 
          : <ProfileForm userProfile={data["profile"]} updateProfile={updateProfile} />}
        </div>
      </div>
    </div>
  )
}
