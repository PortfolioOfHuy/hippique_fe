"use client";

import { useMemo, useState } from "react";
import { Button, Modal } from "antd";
import {
  AlertCircle,
  CalendarDays,
  CheckCircle2,
  Languages,
  LockKeyhole,
  Mail,
  PencilLine,
  Phone,
  Settings,
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

type VerificationStatus = {
  emailVerified: boolean;
  phoneVerified: boolean;
  depositVerified: boolean;
};

type MissingVerification = {
  id: "email" | "phone" | "deposit";
  text: string;
  title: string;
  description: string;
  actionLabel: string;
};

const verificationStatus: VerificationStatus = {
  emailVerified: false,
  phoneVerified: false,
  depositVerified: false,
};

export default function ProfileInformation({
  profile,
  onSaveProfile,
}: ProfileInformationProps) {
  const [draftProfile, setDraftProfile] = useState<ProfileData>(profile);
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedVerification, setSelectedVerification] =
    useState<MissingVerification | null>(null);

  const missingVerifications = useMemo<MissingVerification[]>(() => {
    const items: MissingVerification[] = [];

    if (!verificationStatus.emailVerified) {
      items.push({
        id: "email",
        text: "Verifieer uw e-mailadres.",
        title: "E-mailadres verifiëren",
        description:
          "Uw e-mailadres is nog niet bevestigd. Controleer uw inbox en klik op de verificatielink om uw account volledig te activeren.",
        actionLabel: "E-mail opnieuw verzenden",
      });
    }

    if (!verificationStatus.phoneVerified) {
      items.push({
        id: "phone",
        text: "Verifieer uw telefoonnummer.",
        title: "Telefoonnummer verifiëren",
        description:
          "Uw telefoonnummer is nog niet geverifieerd. Verifieer uw nummer om beveiligingsmeldingen en veilingupdates te ontvangen.",
        actionLabel: "Telefoonnummer verifiëren",
      });
    }

    if (!verificationStatus.depositVerified) {
      items.push({
        id: "deposit",
        text: "Voltooi uw biedingsdeposito.",
        title: "Biedingsdeposito voltooien",
        description:
          "Uw biedingsdeposito is nog niet voltooid. U kunt pas deelnemen aan veilingen wanneer alle verificatiestappen zijn afgerond.",
        actionLabel: "Depositostap openen",
      });
    }

    return items;
  }, []);

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
    setMessage("Uw profielgegevens zijn succesvol bijgewerkt.");
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

  function openVerificationModal(item: MissingVerification) {
    setSelectedVerification(item);
  }

  function closeVerificationModal() {
    setSelectedVerification(null);
  }

  return (
    <div className={styles.page}>
      {missingVerifications.length > 0 ? (
        <div className={styles.alertList}>
          {missingVerifications.map((item) => (
            <div key={item.id} className={styles.alertBox}>
              <AlertCircle size={21} strokeWidth={2.4} />

              <p>
                {item.text}{" "}
                <button
                  type="button"
                  className={styles.alertLink}
                  onClick={() => openVerificationModal(item)}
                >
                  Klik hier
                </button>
              </p>
            </div>
          ))}
        </div>
      ) : null}

      <header className={styles.pageHeader}>
        <h1>Mijn profiel</h1>
        <p>Persoonlijke gegevens en accountbeheer</p>
      </header>

      <section className={styles.requirementBox}>
        <div className={styles.requirementIcon}>
          <Settings size={24} strokeWidth={2.4} />
        </div>

        <div>
          <span>Vereisten voor veilingtoegang</span>
          <p>
            Voltooi de vereiste accountcontroles voordat u kunt deelnemen aan
            premium veilingen. Uw e-mail, telefoonnummer en biedingsdeposito
            moeten allemaal zijn geverifieerd.
          </p>
        </div>
      </section>

      <section className={styles.readinessSection}>
        <h2>Accountstatus</h2>

        <div className={styles.readinessGrid}>
          <article className={styles.readinessCard}>
            <div className={styles.readinessTop}>
              <span>E-mailstatus</span>
              <strong className={styles.statusUnverified}>
                Niet geverifieerd
              </strong>
            </div>

            <div className={styles.readinessIcon}>
              <Mail size={26} strokeWidth={2} />
            </div>

            <h3>E-mailverificatie</h3>

            <p>
              Uw e-mailadres is nog niet bevestigd. Verifieer uw e-mailadres om
              uw account volledig te activeren.
            </p>

            <div className={styles.warningText}>
              <AlertCircle size={17} strokeWidth={2.3} />
              <span>Verifieer uw e-mailadres om verder te gaan.</span>
            </div>
          </article>

          <article className={styles.readinessCard}>
            <div className={styles.readinessTop}>
              <span>Telefoonstatus</span>
              <strong className={styles.statusUnverified}>
                Niet geverifieerd
              </strong>
            </div>

            <div className={styles.readinessIcon}>
              <Phone size={26} strokeWidth={2} />
            </div>

            <h3>Telefoonverificatie</h3>

            <p>
              Uw telefoonnummer is nog niet geverifieerd. Verifieer uw nummer
              om beveiligingsmeldingen en veilingupdates te ontvangen.
            </p>

            <div className={styles.warningText}>
              <AlertCircle size={17} strokeWidth={2.3} />
              <span>Verifieer uw telefoonnummer.</span>
            </div>
          </article>

          <article className={styles.readinessCard}>
            <div className={styles.readinessTop}>
              <span>Depositostatus</span>
              <strong className={styles.statusUnverified}>
                Niet voltooid
              </strong>
            </div>

            <div className={styles.readinessIcon}>
              <WalletCards size={26} strokeWidth={2} />
            </div>

            <h3>Biedingsdeposito</h3>

            <p>
              Uw biedingsdeposito is nog niet voltooid. U kunt pas deelnemen aan
              veilingen wanneer alle verificatiestappen zijn afgerond.
            </p>

            <div className={styles.warningText}>
              <AlertCircle size={17} strokeWidth={2.3} />
              <span>Voltooi uw biedingsdeposito om mee te kunnen bieden.</span>
            </div>
          </article>
        </div>
      </section>

      <section className={styles.card}>
        <div className={styles.cardHeader}>
          <div>
            <h2>Profielgegevens</h2>

            <p className={styles.secureNote}>
              <LockKeyhole size={14} strokeWidth={2.2} />
              Sommige gevoelige gegevens zijn beveiligd en kunnen alleen via
              ondersteuning worden gewijzigd.
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
                <span>Annuleren</span>
              </button>

              <button
                type="button"
                className={styles.editButton}
                onClick={saveProfile}
              >
                <CheckCircle2 size={15} strokeWidth={2.4} />
                <span>Profiel opslaan</span>
              </button>
            </div>
          ) : (
            <button
              type="button"
              className={styles.editButton}
              onClick={startEdit}
            >
              <PencilLine size={15} strokeWidth={2.4} />
              <span>Profiel bewerken</span>
            </button>
          )}
        </div>

        {message ? <div className={styles.successBox}>{message}</div> : null}

        <div className={styles.infoGrid}>
          <InfoField
            icon={<LockKeyhole size={14} strokeWidth={2.2} />}
            label="Referentie #"
            value={profile.reference}
            draftValue={draftProfile.reference}
            editing={isEditing}
            onChange={(value) => updateDraft("reference", value)}
          />

          <InfoField
            icon={<UserRound size={14} strokeWidth={2.2} />}
            label="Volledige naam"
            value={profile.fullName}
            draftValue={draftProfile.fullName}
            editing={isEditing}
            onChange={(value) => updateDraft("fullName", value)}
          />

          <InfoField
            icon={<CalendarDays size={14} strokeWidth={2.2} />}
            label="Geboortedatum"
            value={profile.birthDate}
            draftValue={draftProfile.birthDate}
            editing={isEditing}
            onChange={(value) => updateDraft("birthDate", value)}
          />

          <InfoField
            icon={<Mail size={14} strokeWidth={2.2} />}
            label="E-mail"
            value={profile.email}
            draftValue={draftProfile.email}
            editing={isEditing}
            type="email"
            onChange={(value) => updateDraft("email", value)}
          />

          <InfoField
            icon={<Languages size={14} strokeWidth={2.2} />}
            label="Taal"
            value={profile.language}
            draftValue={draftProfile.language}
            editing={isEditing}
            onChange={(value) => updateDraft("language", value)}
          />

          <InfoField
            icon={<Phone size={14} strokeWidth={2.2} />}
            label="Telefoon"
            value={profile.phone}
            draftValue={draftProfile.phone}
            editing={isEditing}
            type="tel"
            onChange={(value) => updateDraft("phone", value)}
          />
        </div>
      </section>

      <Modal
        open={Boolean(selectedVerification)}
        onCancel={closeVerificationModal}
        footer={null}
        centered
        width={520}
        className={styles.verificationModal}
      >
        {selectedVerification ? (
          <div className={styles.modalContent}>
            <div className={styles.modalIcon}>
              <AlertCircle size={30} strokeWidth={2.3} />
            </div>

            <h3>{selectedVerification.title}</h3>

            <p>{selectedVerification.description}</p>

            <div className={styles.modalActions}>
              <Button
                type="primary"
                className={styles.modalPrimaryButton}
                onClick={closeVerificationModal}
              >
                {selectedVerification.actionLabel}
              </Button>

              <Button
                type="default"
                className={styles.modalGhostButton}
                onClick={closeVerificationModal}
              >
                Sluiten
              </Button>
            </div>
          </div>
        ) : null}
      </Modal>
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