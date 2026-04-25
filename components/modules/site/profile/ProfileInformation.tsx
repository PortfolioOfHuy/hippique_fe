"use client";

import { useState } from "react";
import { CheckCircle2, PencilLine } from "lucide-react";
import type { ProfileData } from "./profile-data";
import styles from "./ProfileInformation.module.scss";

type ProfileInformationProps = {
  profile: ProfileData;
  onSaveProfile: (profile: ProfileData) => void;
};

export default function ProfileInformation({
  profile,
  onSaveProfile,
}: ProfileInformationProps) {
  const [draftProfile, setDraftProfile] = useState<ProfileData>(profile);
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState("");

  function startEdit() {
    setDraftProfile(profile);
    setIsEditing(true);
    setMessage("");
  }

  function cancelEdit() {
    setDraftProfile(profile);
    setIsEditing(false);
    setMessage("");
  }

  function saveProfile() {
    onSaveProfile(draftProfile);
    setIsEditing(false);
    setMessage("Je profielgegevens zijn succesvol bijgewerkt.");
  }

  function updateDraft<K extends keyof ProfileData>(
    key: K,
    value: ProfileData[K],
  ) {
    setDraftProfile((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  return (
    <section className={styles.card}>
      <div className={styles.cardHeader}>
        <div>
          <h2>Profielinformatie</h2>
          <p>Bekijk en beheer je persoonlijke gegevens.</p>
        </div>

        {isEditing ? (
          <div className={styles.actionGroup}>
            <button
              type="button"
              className={styles.ghostButton}
              onClick={cancelEdit}
            >
              Annuleren
            </button>

            <button
              type="button"
              className={styles.goldButton}
              onClick={saveProfile}
            >
              <CheckCircle2 size={16} strokeWidth={2.2} />
              <span>Opslaan</span>
            </button>
          </div>
        ) : (
          <button type="button" className={styles.editButton} onClick={startEdit}>
            <PencilLine size={16} strokeWidth={2.2} />
            <span>Profiel bewerken</span>
          </button>
        )}
      </div>

      {message ? <div className={styles.successBox}>{message}</div> : null}

      <div className={styles.infoGrid}>
        <InfoField
          label="Referentie #"
          value={profile.reference}
          draftValue={draftProfile.reference}
          editing={isEditing}
          onChange={(value) => updateDraft("reference", value)}
        />

        <InfoField
          label="Volledige naam"
          value={profile.fullName}
          draftValue={draftProfile.fullName}
          editing={isEditing}
          onChange={(value) => updateDraft("fullName", value)}
        />

        <InfoField
          label="Geboortedatum"
          value={profile.birthDate}
          draftValue={draftProfile.birthDate}
          editing={isEditing}
          onChange={(value) => updateDraft("birthDate", value)}
        />

        <InfoField
          label="E-mail"
          value={profile.email}
          draftValue={draftProfile.email}
          editing={isEditing}
          type="email"
          onChange={(value) => updateDraft("email", value)}
        />

        <InfoField
          label="Taal"
          value={profile.language}
          draftValue={draftProfile.language}
          editing={isEditing}
          onChange={(value) => updateDraft("language", value)}
        />

        <InfoField
          label="Telefoon"
          value={profile.phone}
          draftValue={draftProfile.phone}
          editing={isEditing}
          type="tel"
          onChange={(value) => updateDraft("phone", value)}
        />

        <div className={`${styles.infoItem} ${styles.infoItemFull}`}>
          <span>Primair adres</span>

          {isEditing ? (
            <textarea
              rows={3}
              value={draftProfile.address}
              onChange={(event) => updateDraft("address", event.target.value)}
            />
          ) : (
            <p>{profile.address}</p>
          )}
        </div>
      </div>
    </section>
  );
}

type InfoFieldProps = {
  label: string;
  value: string;
  draftValue: string;
  editing: boolean;
  type?: string;
  onChange: (value: string) => void;
};

function InfoField({
  label,
  value,
  draftValue,
  editing,
  type = "text",
  onChange,
}: InfoFieldProps) {
  return (
    <div className={styles.infoItem}>
      <span>{label}</span>

      {editing ? (
        <input
          type={type}
          value={draftValue}
          onChange={(event) => onChange(event.target.value)}
        />
      ) : (
        <p>{value}</p>
      )}
    </div>
  );
}