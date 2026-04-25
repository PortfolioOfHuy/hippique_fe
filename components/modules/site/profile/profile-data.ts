import {
  CircleDollarSign,
  Gavel,
  History,
  LogOut,
  Sprout,
  UserRound,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type ProfileTabKey =
  | "profiel"
  | "paardenveilingen"
  | "embryoveilingen"
  | "spermaveilingen"
  | "veilinggeschiedenis"
  | "stortingen-terugbetalingen";

export type ProfileMenuItem = {
  key: ProfileTabKey;
  label: string;
  icon: LucideIcon;
};

export type ProfileData = {
  reference: string;
  fullName: string;
  birthDate: string;
  email: string;
  phone: string;
  language: string;
  address: string;
};

export type AddressItem = {
  id: number;
  tag: string;
  title: string;
  addressLine1: string;
  addressLine2: string;
};

export const profileMenuItems: ProfileMenuItem[] = [
  {
    key: "profiel",
    label: "Mijn profiel",
    icon: UserRound,
  },
  {
    key: "paardenveilingen",
    label: "Paardenveilingen",
    icon: Gavel,
  },
  {
    key: "embryoveilingen",
    label: "Embryoveilingen",
    icon: Sprout,
  },
  {
    key: "spermaveilingen",
    label: "Spermaveilingen",
    icon: Sprout,
  },
  {
    key: "veilinggeschiedenis",
    label: "Veilinggeschiedenis",
    icon: History,
  },
  {
    key: "stortingen-terugbetalingen",
    label: "Stortingen & terugbetalingen",
    icon: CircleDollarSign,
  },
];

export const logoutItem = {
  label: "Uitloggen",
  icon: LogOut,
};

export const initialProfileData: ProfileData = {
  reference: "EC-9920-X12",
  fullName: "Maximiliaan van Dressage",
  birthDate: "14 mei 1982",
  email: "m.dressage@heritage-equine.com",
  phone: "+44 (0) 7700 900542",
  language: "Nederlands (NL)",
  address:
    "Highgrove Estate, Tetbury, Gloucestershire, GL8 8TN, United Kingdom",
};

export const initialAddresses: AddressItem[] = [
  {
    id: 1,
    tag: "Factuuradres standaard",
    title: "Heritage Stable Management",
    addressLine1: "42 Chancery Lane",
    addressLine2: "London, WC2A 1JF",
  },
];