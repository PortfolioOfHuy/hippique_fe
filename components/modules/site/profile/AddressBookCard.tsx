import { MapPin, MoreVertical, Plus } from "lucide-react";
import type { AddressItem } from "./profile-data";
import styles from "./AddressBookCard.module.scss";

type AddressBookCardProps = {
  addresses: AddressItem[];
  onAddAddress: () => void;
};

export default function AddressBookCard({
  addresses,
  onAddAddress,
}: AddressBookCardProps) {
  return (
    <section className={styles.card}>
      <div className={styles.cardHeader}>
        <div>
          <h2>Adresboek</h2>
          <p>Beheer je factuur- en afleveradressen.</p>
        </div>

        <button
          type="button"
          className={styles.addButton}
          onClick={onAddAddress}
          aria-label="Adres toevoegen"
        >
          <Plus size={18} strokeWidth={2.2} />
        </button>
      </div>

      <div className={styles.addressList}>
        {addresses.map((address) => (
          <article key={address.id} className={styles.addressBox}>
            <div className={styles.addressTop}>
              <span className={styles.addressTag}>{address.tag}</span>

              <button
                type="button"
                className={styles.moreButton}
                aria-label="Meer opties"
              >
                <MoreVertical size={16} strokeWidth={2.1} />
              </button>
            </div>

            <div className={styles.addressBody}>
              <h3>{address.title}</h3>
              <p>{address.addressLine1}</p>
              <p>{address.addressLine2}</p>
            </div>
          </article>
        ))}

        <button type="button" className={styles.emptyAddress}>
          <MapPin size={22} strokeWidth={2} />
          <span>Nieuw verzendadres toevoegen</span>
        </button>
      </div>
    </section>
  );
}