"use client";

import { useMemo, useState } from "react";
import { Button, Input, Modal } from "antd";
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

type VerificationId = "email" | "phone" | "deposit";

type MissingVerification = {
  id: VerificationId;
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

  const [emailStep, setEmailStep] = useState<"confirm" | "sent">("confirm");
  const [phoneStep, setPhoneStep] = useState<"phone" | "otp">("phone");
  const [phoneNumber, setPhoneNumber] = useState(profile.phone || "");
  const [otpCode, setOtpCode] = useState("");
  const [verificationMessage, setVerificationMessage] = useState("");
  const [verificationMessageType, setVerificationMessageType] = useState<
    "success" | "error"
  >("success");

  const missingVerifications = useMemo<MissingVerification[]>(() => {
    const items: MissingVerification[] = [];

    if (!verificationStatus.emailVerified) {
      items.push({
        id: "email",
        text: "Verifieer uw e-mailadres.",
        title: "E-mailadres verifiëren",
        description:
          "Uw e-mailadres is nog niet bevestigd. Bevestig dat u een verificatie-e-mail wilt ontvangen.",
        actionLabel: "Verificatie-e-mail verzenden",
      });
    }

    if (!verificationStatus.phoneVerified) {
      items.push({
        id: "phone",
        text: "Verifieer uw telefoonnummer.",
        title: "Telefoonnummer verifiëren",
        description:
          "Uw telefoonnummer is nog niet geverifieerd. Voer uw telefoonnummer in om een OTP-code te ontvangen.",
        actionLabel: "OTP-code verzenden",
      });
    }

    if (!verificationStatus.depositVerified) {
      items.push({
        id: "deposit",
        text: "Voltooi uw biedingsdeposito.",
        title: "Biedingsdeposito toevoegen",
        description:
          "Uw biedingsdeposito is nog niet voltooid. Voeg een deposito toe om volledig toegang te krijgen tot de veilingen.",
        actionLabel: "Deposit toevoegen",
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

  function setSuccessMessage(value: string) {
    setVerificationMessageType("success");
    setVerificationMessage(value);
  }

  function setErrorMessage(value: string) {
    setVerificationMessageType("error");
    setVerificationMessage(value);
  }

  function resetVerificationState() {
    setEmailStep("confirm");
    setPhoneStep("phone");
    setPhoneNumber(profile.phone || "");
    setOtpCode("");
    setVerificationMessage("");
    setVerificationMessageType("success");
  }

  function openVerificationModal(item: MissingVerification) {
    resetVerificationState();
    setSelectedVerification(item);
  }

  function closeVerificationModal() {
    setSelectedVerification(null);
    resetVerificationState();
  }

  function handleEmailVerificationSend() {
    setEmailStep("sent");
    setSuccessMessage(
      "De verificatie-e-mail is verzonden. Controleer uw inbox en klik op de bevestigingslink.",
    );
  }

  function handlePhoneNumberSubmit() {
    const cleanPhoneNumber = phoneNumber.trim();

    if (!cleanPhoneNumber) {
      setErrorMessage("Voer eerst uw telefoonnummer in.");
      return;
    }

    if (cleanPhoneNumber.length < 8) {
      setErrorMessage("Voer een geldig telefoonnummer in.");
      return;
    }

    setOtpCode("");
    setPhoneStep("otp");
    setSuccessMessage(
      `De OTP-code is verzonden naar ${cleanPhoneNumber}. Voer de code hieronder in.`,
    );
  }

  function handleOtpConfirm() {
    const cleanOtpCode = otpCode.trim();

    if (!cleanOtpCode) {
      setErrorMessage("Voer eerst de OTP-code in om verder te gaan.");
      return;
    }

    if (cleanOtpCode.length < 4) {
      setErrorMessage("De OTP-code is te kort. Controleer de code opnieuw.");
      return;
    }

    setSuccessMessage(
      "Uw OTP-code is ontvangen. In een echte omgeving wordt deze code nu gecontroleerd.",
    );
  }

  function handleDepositAdd() {
    setSuccessMessage(
      "U wordt doorgestuurd naar de depositostap. In een echte omgeving opent hier de betaal- of depositomodule.",
    );
  }

  function renderVerificationMessage() {
    if (!verificationMessage) return null;

    return (
      <div
        className={
          verificationMessageType === "error"
            ? styles.errorBox
            : styles.successBox
        }
      >
        {verificationMessage}
      </div>
    );
  }

  function renderVerificationModalContent() {
    if (!selectedVerification) return null;

    if (selectedVerification.id === "email") {
      return (
        <div className={styles.modalContent}>
          <div className={styles.modalIcon}>
            <Mail size={30} strokeWidth={2.3} />
          </div>

          <h3>{selectedVerification.title}</h3>

          {emailStep === "confirm" ? (
            <>
              <p>
                Wilt u een verificatie-e-mail ontvangen op{" "}
                <strong>{profile.email}</strong>?
              </p>

              <div className={styles.modalActions}>
                <Button
                  type="primary"
                  className={styles.modalPrimaryButton}
                  onClick={handleEmailVerificationSend}
                >
                  Bevestigen
                </Button>

                <Button
                  type="default"
                  className={styles.modalGhostButton}
                  onClick={closeVerificationModal}
                >
                  Sluiten
                </Button>
              </div>
            </>
          ) : (
            <>
              <p>
                Controleer uw e-mail. We hebben een verificatielink verzonden
                naar <strong>{profile.email}</strong>.
              </p>

              {renderVerificationMessage()}

              <div className={styles.modalActions}>
                <Button
                  type="primary"
                  className={styles.modalPrimaryButton}
                  onClick={closeVerificationModal}
                >
                  Ik controleer mijn e-mail
                </Button>

                <Button
                  type="default"
                  className={styles.modalGhostButton}
                  onClick={handleEmailVerificationSend}
                >
                  Opnieuw verzenden
                </Button>
              </div>
            </>
          )}
        </div>
      );
    }

    if (selectedVerification.id === "phone") {
      return (
        <div className={styles.modalContent}>
          <div className={styles.modalIcon}>
            <Phone size={30} strokeWidth={2.3} />
          </div>

          <h3>{selectedVerification.title}</h3>

          {phoneStep === "phone" ? (
            <>
              <p>
                Voer uw telefoonnummer in. Wij sturen daarna een OTP-code per
                sms.
              </p>

              <div className={styles.phoneField}>
                <Input
                  size="large"
                  value={phoneNumber}
                  placeholder="Voer uw telefoonnummer in"
                  onChange={(event) => {
                    setPhoneNumber(event.target.value);
                    setVerificationMessage("");
                    setVerificationMessageType("success");
                  }}
                />
              </div>

              {renderVerificationMessage()}

              <div className={styles.modalActions}>
                <Button
                  type="primary"
                  className={styles.modalPrimaryButton}
                  onClick={handlePhoneNumberSubmit}
                >
                  OTP-code verzenden
                </Button>

                <Button
                  type="default"
                  className={styles.modalGhostButton}
                  onClick={closeVerificationModal}
                >
                  Sluiten
                </Button>
              </div>
            </>
          ) : (
            <>
              <p>
                Voer de OTP-code in die naar{" "}
                <strong>{phoneNumber.trim()}</strong> is verzonden.
              </p>

              <div className={styles.otpField}>
                <Input
                  size="large"
                  value={otpCode}
                  maxLength={6}
                  placeholder="Voer OTP-code in"
                  onChange={(event) => {
                    setOtpCode(event.target.value);
                    setVerificationMessage("");
                    setVerificationMessageType("success");
                  }}
                />
              </div>

              {renderVerificationMessage()}

              <div className={styles.modalActions}>
                <Button
                  type="primary"
                  className={styles.modalPrimaryButton}
                  onClick={handleOtpConfirm}
                >
                  OTP bevestigen
                </Button>

                <Button
                  type="default"
                  className={styles.modalGhostButton}
                  onClick={handlePhoneNumberSubmit}
                >
                  Code opnieuw verzenden
                </Button>

                <Button
                  type="default"
                  className={styles.modalGhostButton}
                  onClick={() => {
                    setPhoneStep("phone");
                    setOtpCode("");
                    setVerificationMessage("");
                    setVerificationMessageType("success");
                  }}
                >
                  Nummer wijzigen
                </Button>
              </div>
            </>
          )}
        </div>
      );
    }

    return (
      <div className={styles.modalContent}>
        <div className={styles.modalIcon}>
          <WalletCards size={30} strokeWidth={2.3} />
        </div>

        <h3>{selectedVerification.title}</h3>

        <p>{selectedVerification.description}</p>

        {renderVerificationMessage()}

        <div className={styles.modalActions}>
          <Button
            type="primary"
            className={styles.modalPrimaryButton}
            onClick={handleDepositAdd}
          >
            Deposit toevoegen
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
    );
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
        width={540}
        className={styles.verificationModal}
        destroyOnHidden
      >
        {renderVerificationModalContent()}
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
