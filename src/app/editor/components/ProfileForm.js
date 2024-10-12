'use client'
import { useState } from 'react';
import styles from './ProfileForm.module.css';
import { CiImageOn } from "react-icons/ci";
import SignOut from '@/app/components/signOut';


export default function ProfileForm({userProfile, updateProfile}) {
  
  const [profile, setProfile] = useState({proPic:userProfile.proPic, firstName: userProfile.firstName, lastName: userProfile.lastName, email: userProfile.email});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };


  const handleSelectImage = (event) => {
    const file = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.addEventListener("load", () => {
        setProfile((prev) => ({ ...prev, "proPic": fileReader.result }));
    });
    
    fileReader.readAsDataURL(file);
}

  return (
    <div className={styles.profileForm}>
      <h3 className={styles.title} >Profile Details</h3>
      <p className={styles.subTitle}>Add your details to create a personalized touch to your profile</p>
      <label className={styles.imageInputLabel}>
        <p className={styles.imageText}>Profile Picture</p>
        <div>
          <input 
            type="file" 
            onChange={handleSelectImage} 
            className={styles.imageInput} 
            accept="image/*" 
          />
          <div className={styles.imageContainer}>
            <img src={profile.proPic} alt="Profile" className={styles.profileImage} />
            <div className={styles.overlay}>
              <CiImageOn size={32} color='white' /> 
              <div className={styles.overlayText}>Change Image</div>
            </div>
          </div>
        </div>
        <div className={styles.imageText}>
          <p>Image must be taken 1024x1024px <br/>Use PNG, JPG or BMP format </p>
        </div>
        
      </label>
      <label>
        <p className={styles.imageText}>First Name:</p>
        
        <input  type="text" name="firstName" value={profile.firstName} onChange={handleChange} />
      </label>
      <label>
      <p className={styles.imageText}>Last Name:</p>
        
        <input type="text" name="lastName" value={profile.lastName} onChange={handleChange} />
      </label>
      <label>
        <p className={styles.imageText}>Email:</p>
        <input type="email" name="email" value={profile.email} onChange={handleChange} />
      </label>
      <SignOut />
      <div className={styles.spaceHolder}></div>
      <hr color="lightgray" />
      <div className={styles.saveContainer}>
        <button
          className={styles.saveButton }
          onClick={async() => await updateProfile(profile)}
        >Save</button>
      </div>
      
    </div>
    
  );
}
