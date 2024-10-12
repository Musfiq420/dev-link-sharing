'use client'
import { useRouter } from 'next/navigation';
import styles from './Header.module.css';
import Logo from '@/lib/link.png'
import Image from 'next/image';
import { HiLink } from "react-icons/hi2";
import { CgProfile } from "react-icons/cg";
import { MdOutlineRemoveRedEye } from "react-icons/md";



export default function Header({ id, selectedTab, setSelectedTab }) {
  const router = useRouter();

  const handlePreviewClick = () => {
    router.push(`/preview/${id}`); 
  };
  
  return (
    <div className={styles.header}>
      <div className={styles.title}>
        <Image src={Logo} alt="App Logo" className={styles.logo} />
        <h4  className={styles.titleText}>devlinks</h4>
      </div>
      
      <div className={styles.tabs}>
        <button 
          className={selectedTab === 'Links' ? styles.active : ''} 
          onClick={() => setSelectedTab('Links')}
        >
          <HiLink />

          <span className={styles.titleText}>{"  "+"Links"}</span>
        </button>
        <button 
          className={selectedTab === 'Profile Details' ? styles.active : ''} 
          onClick={() => setSelectedTab('Profile Details')}
        >
          <CgProfile />

          <span className={styles.titleText}>{" "+"Profile Details"}</span>
        </button>
      </div>
      <button onClick={handlePreviewClick}  className={styles.previewButton}>
        <span className={styles.titleText} >Preview</span> 
        <span className={styles.previewIcon} ><MdOutlineRemoveRedEye /></span>
      </button>
    </div>
  );
}
