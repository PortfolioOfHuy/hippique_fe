"use client";

import { useState } from "react";
import {
  AlertCircle,
  CalendarDays,
  CheckCircle2,
  KeyRound,
  Languages,
  LockKeyhole,
  Mail,
  PencilLine,
  Phone,
  Settings,
  ShieldCheck,
  UserRound,
  WalletCards,
  X,
} from "lucide-react";
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
    setMessage("Your profile information has been updated successfully.");
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
    <div className={styles.page}>
      <div className={styles.alertBox}>
        <AlertCircle size={21} strokeWidth={2.4} />
        <p>
          Please verify your phone number. <a href="#phone-verification">Click here</a>
        </p>
      </div>

      <header className={styles.pageHeader}>
        <h1>My Profile</h1>
        <p>Detailed information and account management</p>
      </header>

      <section className={styles.requirementBox}>
        <div className={styles.requirementIcon}>
          <Settings size={24} strokeWidth={2.4} />
        </div>

        <div>
          <span>Auction access requirements</span>
          <p>
            Complete <strong>2 of 3</strong> requirements. Verify your phone
            number and maintain an active bidding deposit to participate in
            premium auctions.
          </p>
        </div>
      </section>

      <section className={styles.readinessSection}>
        <h2>Account readiness</h2>

        <div className={styles.readinessGrid}>
          <article className={styles.readinessCard}>
            <div className={styles.readinessTop}>
              <span>Email status</span>
              <strong className={styles.statusVerified}>Verified</strong>
            </div>

            <div className={styles.readinessIcon}>
              <Mail size={26} strokeWidth={2} />
            </div>

            <h3>Email Verification</h3>

            <p>
              Your email address has been confirmed and is active on your
              account.
            </p>

            <button type="button">Manage email</button>
          </article>

          <article className={styles.readinessCard} id="phone-verification">
            <div className={styles.readinessTop}>
              <span>Phone status</span>
              <strong className={styles.statusPending}>Pending</strong>
            </div>

            <div className={styles.readinessIcon}>
              <Phone size={26} strokeWidth={2} />
            </div>

            <h3>Phone Verification</h3>

            <p>
              Please verify your phone number to secure your account and receive
              auction-related updates.
            </p>

            <button type="button">Verify phone</button>
          </article>

          <article className={styles.readinessCard}>
            <div className={styles.readinessTop}>
              <span>Deposit status</span>
              <strong className={styles.statusActive}>Active</strong>
            </div>

            <div className={styles.readinessIcon}>
              <WalletCards size={26} strokeWidth={2} />
            </div>

            <h3>Bidding Deposit</h3>

            <p>
              Your bidding deposit fee has been received and your account is
              eligible for auction participation once all verification steps are
              complete.
            </p>

            <button type="button">Manage deposit</button>
          </article>
        </div>
      </section>

      <section className={styles.card}>
        <div className={styles.cardHeader}>
          <div>
            <h2>Profile Information</h2>

            <p className={styles.secureNote}>
              <LockKeyhole size={14} strokeWidth={2.2} />
              Some sensitive information is encrypted and can only be changed by
              contacting support.
            </p>
          </div>

          {isEditing ? (
            <div className={styles.actionGroup}>
              <button
                type="button"
                className={styles.ghostButton}
                onClick={cancelEdit}
              >
                <X size={15} strokeWidth={2.4} />
                <span>Cancel</span>
              </button>

              <button
                type="button"
                className={styles.editButton}
                onClick={saveProfile}
              >
                <CheckCircle2 size={15} strokeWidth={2.4} />
                <span>Save profile</span>
              </button>
            </div>
          ) : (
            <button type="button" className={styles.editButton} onClick={startEdit}>
              <PencilLine size={15} strokeWidth={2.4} />
              <span>Edit profile</span>
            </button>
          )}
        </div>

        {message ? <div className={styles.successBox}>{message}</div> : null}

        <div className={styles.infoGrid}>
          <InfoField
            icon={<LockKeyhole size={14} strokeWidth={2.2} />}
            label="Reference #"
            value={profile.reference}
            draftValue={draftProfile.reference}
            editing={isEditing}
            onChange={(value) => updateDraft("reference", value)}
          />

          <InfoField
            icon={<UserRound size={14} strokeWidth={2.2} />}
            label="Full name"
            value={profile.fullName}
            draftValue={draftProfile.fullName}
            editing={isEditing}
            onChange={(value) => updateDraft("fullName", value)}
          />

          <InfoField
            icon={<CalendarDays size={14} strokeWidth={2.2} />}
            label="Birth date"
            value={profile.birthDate}
            draftValue={draftProfile.birthDate}
            editing={isEditing}
            onChange={(value) => updateDraft("birthDate", value)}
          />

          <InfoField
            icon={<Mail size={14} strokeWidth={2.2} />}
            label="Email"
            value={profile.email}
            draftValue={draftProfile.email}
            editing={isEditing}
            type="email"
            onChange={(value) => updateDraft("email", value)}
          />

          <InfoField
            icon={<Languages size={14} strokeWidth={2.2} />}
            label="Language"
            value={profile.language}
            draftValue={draftProfile.language}
            editing={isEditing}
            onChange={(value) => updateDraft("language", value)}
          />

          <InfoField
            icon={<Phone size={14} strokeWidth={2.2} />}
            label="Phone"
            value={profile.phone}
            draftValue={draftProfile.phone}
            editing={isEditing}
            type="tel"
            onChange={(value) => updateDraft("phone", value)}
          />
        </div>
      </section>

      <section className={styles.card}>
        <div className={styles.passwordHeader}>
          <h2>Security & Password</h2>
          <ShieldCheck size={24} strokeWidth={2.2} />
        </div>

        <div className={styles.passwordBlock}>
          <h3>Change Password</h3>

          <div className={styles.passwordGrid}>
            <label className={styles.passwordField}>
              <span>Current password</span>
              <input type="password" placeholder="********" />
            </label>

            <label className={styles.passwordField}>
              <span>New password</span>
              <input type="password" placeholder="Min. 12 characters" />
            </label>

            <label className={styles.passwordField}>
              <span>Confirm password</span>
              <input type="password" />
            </label>
          </div>

          <button type="button" className={styles.updatePasswordButton}>
            <KeyRound size={15} strokeWidth={2.3} />
            <span>Update password</span>
          </button>
        </div>
      </section>
    </div>
  );
}

type InfoFieldProps = {
  icon: React.ReactNode;
  label: string;
  value: string;
  draftValue: string;
  editing: boolean;
  type?: string;
  onChange: (value: string) => void;
};

function InfoField({
  icon,
  label,
  value,
  draftValue,
  editing,
  type = "text",
  onChange,
}: InfoFieldProps) {
  return (
    <div className={styles.infoItem}>
      <span className={styles.infoLabel}>
        {icon}
        {label}
      </span>

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