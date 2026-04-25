import Link from "next/link";
import { BadgeCheck, ShieldCheck } from "lucide-react";
import {
  logoutItem,
  profileMenuItems,
  type ProfileTabKey,
} from "./profile-data";
import styles from "./ProfileSidebar.module.scss";

type ProfileSidebarProps = {
  activeTab: ProfileTabKey;
  onChangeTab: (tab: ProfileTabKey) => void;
};

export default function ProfileSidebar({
  activeTab,
  onChangeTab,
}: ProfileSidebarProps) {
  const LogoutIcon = logoutItem.icon;

  return (
    <aside className={styles.sidebar}>
      <div className={styles.memberBox}>
        <span className={styles.memberStatus}>Geauthenticeerd</span>
        <h2>Premium lid</h2>
        <p>Geverifieerde curator</p>

        <div className={styles.memberBadges}>
          <span>
            <BadgeCheck size={15} strokeWidth={2.2} />
            Premium
          </span>

          <span>
            <ShieldCheck size={15} strokeWidth={2.2} />
            Geverifieerd
          </span>
        </div>
      </div>

      <nav className={styles.sideNav} aria-label="Profielnavigatie">
        {profileMenuItems.map((item) => {
          const Icon = item.icon;
          const active = activeTab === item.key;

          return (
            <button
              key={item.key}
              type="button"
              className={`${styles.sideNavItem} ${
                active ? styles.sideNavItemActive : ""
              }`}
              onClick={() => onChangeTab(item.key)}
            >
              <Icon size={18} strokeWidth={2.1} />
              <span>{item.label}</span>
            </button>
          );
        })}

        <Link href="/inloggen" className={styles.logoutButton}>
          <LogoutIcon size={18} strokeWidth={2.1} />
          <span>{logoutItem.label}</span>
        </Link>
      </nav>
    </aside>
  );
}