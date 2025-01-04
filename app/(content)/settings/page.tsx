"use client";

import React, { useState, useEffect } from 'react';
import styles from './page.module.scss';
import { useAppSelector } from '@/lib/store/hooks';
import { saveUserSettings } from '@/lib/db/users';
import { selectCurrentUser } from '@/lib/store/user/user.selector';
import { Gender } from "@prisma/client"

import Input from "@/components/inputs/generic-input.component";
import TextArea from "@/components/inputs/generic-textarea.component";
import SelectBox from "@/components/inputs/generic-select.component";
import ImageInput from "@/components/inputs/image-input.component";
import Switch from "@/components/inputs/switch.component";

// Define Gender enum directly in the file
// enum Gender {
//   FEMALE = 'FEMALE',
//   MALE = 'MALE',
//   NOT_SET = 'NOT_SET',
//   NON_BINARY = 'NON_BINARY',
// }


const UserSettings = () => {
    const [text1, setText1] = useState("test");
    const [checkbox, setCheckbox] = useState(false);
    const [isToggled, setIsToggled] = useState(false);

  const user = useAppSelector(selectCurrentUser);

  const [name, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [gender, setGender] = useState<Gender>(Gender.NOT_SET); // Add gender state
  const NAME_CHAR_LIMIT = 50; // Add character limit constant

  useEffect(() => {
    if (user) {
      setUsername(user.name || '');
      setBio(user.description || '');
      setGender((user.gender as Gender) || Gender.NOT_SET); // Initialize gender state
    }
  }, [user]);

  if (!user) {
    return <div className={styles.loading}>Loading...</div>;
  }

  const handleSave = async () => {
    const userSettings = {
      name: name || null,
      description: bio || null,
      gender: gender || Gender.NOT_SET, // Add gender to user settings
    };
    await saveUserSettings(user.id, userSettings);
    console.log('User settings saved:', userSettings);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Ustawienia</h1>
      <form className={styles.form} onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
        <div className={styles.formGroup}>
        <Input
          label="Imię"
          value={name}
          onChange={(e) => setUsername(e.target.value)}
          required
          maxLength={NAME_CHAR_LIMIT}
        />
          {/* <label htmlFor="name" className={styles.label}>Name</label>
          <input
            type="text"
            id="name"
            className={styles.inputText}
            value={name}
            style={{ color: nameColor }}
            maxLength={NAME_CHAR_LIMIT} // Add maxLength attribute
            onChange={(e) => {
              if (isFirstChange) {
                setUsername(e.target.value.slice(-1));
                setIsFirstChange(false);
              } else {
                setUsername(e.target.value);
              }
              setNameColor('black');
            }}
            onBlur={(e) => {
              setUsername(e.target.value);
            }}
          /> */}
        </div>
        <div className={styles.formGroup}>
        <TextArea
          label="Bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
          {/* <label htmlFor="bio" className={styles.label}>Bio</label>
          <textarea
            id="bio"
            className={styles.textarea}
            value={bio}
            style={{ color: bioColor }}
            onChange={(e) => {
              setBio(e.target.value);
              setBioColor('black');
            }}
          /> */}
        </div>
        <div className={styles.formGroup}>
        <SelectBox
          label="Płeć"
          value={gender}
          onChange={(e) => setGender(e.target.value as Gender)}
          options={[
            {
              name: "Nie chcę podawać",
              value: Gender.NOT_SET,
            },
            {
              name: "Kobieta",
              value: Gender.FEMALE,
            },
            {
              name: "Mężczyzna",
              value: Gender.MALE,
            },
            {
                name: "Niebinarny",
                value: Gender.NON_BINARY,
            },
          ]}
        />
          {/* <label htmlFor="gender" className={styles.label}>Gender</label>
          <select
            id="gender"
            className={styles.select}
            value={gender}
            onChange={(e) => setGender(e.target.value as Gender)}
          >
            <option value={Gender.NOT_SET}>Not Set</option>
            <option value={Gender.FEMALE}>Female</option>
            <option value={Gender.MALE}>Male</option>
            <option value={Gender.NON_BINARY}>Non-Binary</option>
          </select> */}
        </div>
        <div className={styles.formGroup}>
        <ImageInput label="Zdjęcie profilowe" />
        </div>
        <Switch
          label="Randkowanie"
          checked={isToggled}
          onChange={setIsToggled}
        ></Switch>
        <button type="submit" className={styles.saveButton}>Save Changes</button>
      </form>
    </div>
  );
};

export default UserSettings;