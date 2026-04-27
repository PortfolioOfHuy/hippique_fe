"use client";

import { useMemo, useState } from "react";
import { Eye, CalendarDays, ChevronDown } from "lucide-react";
import styles from "./RegistrerenPage.module.scss";

type PhoneCountry = {
  code: string;
  name: string;
  dialCode: string;
  example: string;
};

const phoneCountries: PhoneCountry[] = [
  { code: "AF", name: "Afghanistan", dialCode: "+93", example: "070 123 4567" },
  { code: "AL", name: "Albania", dialCode: "+355", example: "066 123 4567" },
  { code: "DZ", name: "Algeria", dialCode: "+213", example: "0551 23 45 67" },
  { code: "AD", name: "Andorra", dialCode: "+376", example: "312 345" },
  { code: "AO", name: "Angola", dialCode: "+244", example: "923 123 456" },
  { code: "AR", name: "Argentina", dialCode: "+54", example: "011 1234 5678" },
  { code: "AM", name: "Armenia", dialCode: "+374", example: "077 123456" },
  { code: "AU", name: "Australia", dialCode: "+61", example: "0412 345 678" },
  { code: "AT", name: "Austria", dialCode: "+43", example: "0664 123456" },
  { code: "AZ", name: "Azerbaijan", dialCode: "+994", example: "050 123 45 67" },
  { code: "BS", name: "Bahamas", dialCode: "+1", example: "(242) 555-1234" },
  { code: "BH", name: "Bahrain", dialCode: "+973", example: "3600 0000" },
  { code: "BD", name: "Bangladesh", dialCode: "+880", example: "01712-345678" },
  { code: "BB", name: "Barbados", dialCode: "+1", example: "(246) 555-1234" },
  { code: "BY", name: "Belarus", dialCode: "+375", example: "029 123 45 67" },
  { code: "BE", name: "Belgium", dialCode: "+32", example: "0470 12 34 56" },
  { code: "BZ", name: "Belize", dialCode: "+501", example: "622-1234" },
  { code: "BJ", name: "Benin", dialCode: "+229", example: "90 01 23 45" },
  { code: "BT", name: "Bhutan", dialCode: "+975", example: "17 12 34 56" },
  { code: "BO", name: "Bolivia", dialCode: "+591", example: "71234567" },
  { code: "BA", name: "Bosnia and Herzegovina", dialCode: "+387", example: "061 123 456" },
  { code: "BW", name: "Botswana", dialCode: "+267", example: "71 123 456" },
  { code: "BR", name: "Brazil", dialCode: "+55", example: "(11) 91234-5678" },
  { code: "BN", name: "Brunei", dialCode: "+673", example: "712 3456" },
  { code: "BG", name: "Bulgaria", dialCode: "+359", example: "088 812 3456" },
  { code: "BF", name: "Burkina Faso", dialCode: "+226", example: "70 12 34 56" },
  { code: "BI", name: "Burundi", dialCode: "+257", example: "79 12 34 56" },
  { code: "KH", name: "Cambodia", dialCode: "+855", example: "012 345 678" },
  { code: "CM", name: "Cameroon", dialCode: "+237", example: "6 71 23 45 67" },
  { code: "CA", name: "Canada", dialCode: "+1", example: "(555) 000-0000" },
  { code: "CV", name: "Cape Verde", dialCode: "+238", example: "991 12 34" },
  { code: "CF", name: "Central African Republic", dialCode: "+236", example: "70 12 34 56" },
  { code: "TD", name: "Chad", dialCode: "+235", example: "63 12 34 56" },
  { code: "CL", name: "Chile", dialCode: "+56", example: "9 1234 5678" },
  { code: "CN", name: "China", dialCode: "+86", example: "131 2345 6789" },
  { code: "CO", name: "Colombia", dialCode: "+57", example: "300 1234567" },
  { code: "KM", name: "Comoros", dialCode: "+269", example: "321 23 45" },
  { code: "CG", name: "Congo", dialCode: "+242", example: "06 123 4567" },
  { code: "CD", name: "Congo DR", dialCode: "+243", example: "081 234 5678" },
  { code: "CR", name: "Costa Rica", dialCode: "+506", example: "8312 3456" },
  { code: "HR", name: "Croatia", dialCode: "+385", example: "091 234 5678" },
  { code: "CU", name: "Cuba", dialCode: "+53", example: "05 1234567" },
  { code: "CY", name: "Cyprus", dialCode: "+357", example: "96 123456" },
  { code: "CZ", name: "Czech Republic", dialCode: "+420", example: "601 123 456" },
  { code: "DK", name: "Denmark", dialCode: "+45", example: "20 12 34 56" },
  { code: "DJ", name: "Djibouti", dialCode: "+253", example: "77 83 10 01" },
  { code: "DM", name: "Dominica", dialCode: "+1", example: "(767) 555-1234" },
  { code: "DO", name: "Dominican Republic", dialCode: "+1", example: "(809) 555-1234" },
  { code: "EC", name: "Ecuador", dialCode: "+593", example: "099 123 4567" },
  { code: "EG", name: "Egypt", dialCode: "+20", example: "0100 123 4567" },
  { code: "SV", name: "El Salvador", dialCode: "+503", example: "7012 3456" },
  { code: "GQ", name: "Equatorial Guinea", dialCode: "+240", example: "222 123 456" },
  { code: "ER", name: "Eritrea", dialCode: "+291", example: "07 123 456" },
  { code: "EE", name: "Estonia", dialCode: "+372", example: "5123 4567" },
  { code: "SZ", name: "Eswatini", dialCode: "+268", example: "7612 3456" },
  { code: "ET", name: "Ethiopia", dialCode: "+251", example: "091 123 4567" },
  { code: "FJ", name: "Fiji", dialCode: "+679", example: "701 2345" },
  { code: "FI", name: "Finland", dialCode: "+358", example: "041 2345678" },
  { code: "FR", name: "France", dialCode: "+33", example: "06 12 34 56 78" },
  { code: "GA", name: "Gabon", dialCode: "+241", example: "06 03 12 34" },
  { code: "GM", name: "Gambia", dialCode: "+220", example: "301 2345" },
  { code: "GE", name: "Georgia", dialCode: "+995", example: "555 12 34 56" },
  { code: "DE", name: "Germany", dialCode: "+49", example: "0151 23456789" },
  { code: "GH", name: "Ghana", dialCode: "+233", example: "024 123 4567" },
  { code: "GR", name: "Greece", dialCode: "+30", example: "691 234 5678" },
  { code: "GD", name: "Grenada", dialCode: "+1", example: "(473) 555-1234" },
  { code: "GT", name: "Guatemala", dialCode: "+502", example: "5123 4567" },
  { code: "GN", name: "Guinea", dialCode: "+224", example: "601 12 34 56" },
  { code: "GW", name: "Guinea-Bissau", dialCode: "+245", example: "955 012 345" },
  { code: "GY", name: "Guyana", dialCode: "+592", example: "609 1234" },
  { code: "HT", name: "Haiti", dialCode: "+509", example: "34 10 1234" },
  { code: "HN", name: "Honduras", dialCode: "+504", example: "9123 4567" },
  { code: "HU", name: "Hungary", dialCode: "+36", example: "20 123 4567" },
  { code: "IS", name: "Iceland", dialCode: "+354", example: "611 1234" },
  { code: "IN", name: "India", dialCode: "+91", example: "98765 43210" },
  { code: "ID", name: "Indonesia", dialCode: "+62", example: "0812 3456 7890" },
  { code: "IR", name: "Iran", dialCode: "+98", example: "0912 345 6789" },
  { code: "IQ", name: "Iraq", dialCode: "+964", example: "0790 123 4567" },
  { code: "IE", name: "Ireland", dialCode: "+353", example: "085 123 4567" },
  { code: "IL", name: "Israel", dialCode: "+972", example: "050 123 4567" },
  { code: "IT", name: "Italy", dialCode: "+39", example: "312 345 6789" },
  { code: "JM", name: "Jamaica", dialCode: "+1", example: "(876) 555-1234" },
  { code: "JP", name: "Japan", dialCode: "+81", example: "090-1234-5678" },
  { code: "JO", name: "Jordan", dialCode: "+962", example: "07 9012 3456" },
  { code: "KZ", name: "Kazakhstan", dialCode: "+7", example: "701 123 4567" },
  { code: "KE", name: "Kenya", dialCode: "+254", example: "0712 345678" },
  { code: "KI", name: "Kiribati", dialCode: "+686", example: "72012345" },
  { code: "KW", name: "Kuwait", dialCode: "+965", example: "500 12345" },
  { code: "KG", name: "Kyrgyzstan", dialCode: "+996", example: "0700 123 456" },
  { code: "LA", name: "Laos", dialCode: "+856", example: "020 23 123 456" },
  { code: "LV", name: "Latvia", dialCode: "+371", example: "2123 4567" },
  { code: "LB", name: "Lebanon", dialCode: "+961", example: "03 123 456" },
  { code: "LS", name: "Lesotho", dialCode: "+266", example: "5012 3456" },
  { code: "LR", name: "Liberia", dialCode: "+231", example: "077 123 4567" },
  { code: "LY", name: "Libya", dialCode: "+218", example: "091 234 5678" },
  { code: "LI", name: "Liechtenstein", dialCode: "+423", example: "660 123 456" },
  { code: "LT", name: "Lithuania", dialCode: "+370", example: "612 34567" },
  { code: "LU", name: "Luxembourg", dialCode: "+352", example: "621 123 456" },
  { code: "MG", name: "Madagascar", dialCode: "+261", example: "032 12 345 67" },
  { code: "MW", name: "Malawi", dialCode: "+265", example: "0991 23 45 67" },
  { code: "MY", name: "Malaysia", dialCode: "+60", example: "012-345 6789" },
  { code: "MV", name: "Maldives", dialCode: "+960", example: "771 2345" },
  { code: "ML", name: "Mali", dialCode: "+223", example: "65 01 23 45" },
  { code: "MT", name: "Malta", dialCode: "+356", example: "9912 3456" },
  { code: "MH", name: "Marshall Islands", dialCode: "+692", example: "235-1234" },
  { code: "MR", name: "Mauritania", dialCode: "+222", example: "22 12 34 56" },
  { code: "MU", name: "Mauritius", dialCode: "+230", example: "5251 2345" },
  { code: "MX", name: "Mexico", dialCode: "+52", example: "55 1234 5678" },
  { code: "FM", name: "Micronesia", dialCode: "+691", example: "350 1234" },
  { code: "MD", name: "Moldova", dialCode: "+373", example: "060 123 456" },
  { code: "MC", name: "Monaco", dialCode: "+377", example: "06 12 34 56 78" },
  { code: "MN", name: "Mongolia", dialCode: "+976", example: "8812 3456" },
  { code: "ME", name: "Montenegro", dialCode: "+382", example: "067 123 456" },
  { code: "MA", name: "Morocco", dialCode: "+212", example: "0612-345678" },
  { code: "MZ", name: "Mozambique", dialCode: "+258", example: "82 123 4567" },
  { code: "MM", name: "Myanmar", dialCode: "+95", example: "09 123 456789" },
  { code: "NA", name: "Namibia", dialCode: "+264", example: "081 123 4567" },
  { code: "NR", name: "Nauru", dialCode: "+674", example: "555 1234" },
  { code: "NP", name: "Nepal", dialCode: "+977", example: "984 1234567" },
  { code: "NL", name: "Netherlands", dialCode: "+31", example: "06 12345678" },
  { code: "NZ", name: "New Zealand", dialCode: "+64", example: "021 123 4567" },
  { code: "NI", name: "Nicaragua", dialCode: "+505", example: "8123 4567" },
  { code: "NE", name: "Niger", dialCode: "+227", example: "93 12 34 56" },
  { code: "NG", name: "Nigeria", dialCode: "+234", example: "0801 234 5678" },
  { code: "KP", name: "North Korea", dialCode: "+850", example: "0192 123 4567" },
  { code: "MK", name: "North Macedonia", dialCode: "+389", example: "070 123 456" },
  { code: "NO", name: "Norway", dialCode: "+47", example: "412 34 567" },
  { code: "OM", name: "Oman", dialCode: "+968", example: "9212 3456" },
  { code: "PK", name: "Pakistan", dialCode: "+92", example: "0301 2345678" },
  { code: "PW", name: "Palau", dialCode: "+680", example: "620 1234" },
  { code: "PS", name: "Palestine", dialCode: "+970", example: "0599 123 456" },
  { code: "PA", name: "Panama", dialCode: "+507", example: "6000-1234" },
  { code: "PG", name: "Papua New Guinea", dialCode: "+675", example: "7012 3456" },
  { code: "PY", name: "Paraguay", dialCode: "+595", example: "0961 123456" },
  { code: "PE", name: "Peru", dialCode: "+51", example: "912 345 678" },
  { code: "PH", name: "Philippines", dialCode: "+63", example: "0917 123 4567" },
  { code: "PL", name: "Poland", dialCode: "+48", example: "512 345 678" },
  { code: "PT", name: "Portugal", dialCode: "+351", example: "912 345 678" },
  { code: "QA", name: "Qatar", dialCode: "+974", example: "3312 3456" },
  { code: "RO", name: "Romania", dialCode: "+40", example: "0712 345 678" },
  { code: "RU", name: "Russia", dialCode: "+7", example: "912 345-67-89" },
  { code: "RW", name: "Rwanda", dialCode: "+250", example: "0788 123 456" },
  { code: "KN", name: "Saint Kitts and Nevis", dialCode: "+1", example: "(869) 555-1234" },
  { code: "LC", name: "Saint Lucia", dialCode: "+1", example: "(758) 555-1234" },
  { code: "VC", name: "Saint Vincent and the Grenadines", dialCode: "+1", example: "(784) 555-1234" },
  { code: "WS", name: "Samoa", dialCode: "+685", example: "72 12345" },
  { code: "SM", name: "San Marino", dialCode: "+378", example: "66 66 12 12" },
  { code: "ST", name: "Sao Tome and Principe", dialCode: "+239", example: "981 2345" },
  { code: "SA", name: "Saudi Arabia", dialCode: "+966", example: "050 123 4567" },
  { code: "SN", name: "Senegal", dialCode: "+221", example: "77 123 45 67" },
  { code: "RS", name: "Serbia", dialCode: "+381", example: "060 1234567" },
  { code: "SC", name: "Seychelles", dialCode: "+248", example: "2 510 123" },
  { code: "SL", name: "Sierra Leone", dialCode: "+232", example: "076 123456" },
  { code: "SG", name: "Singapore", dialCode: "+65", example: "8123 4567" },
  { code: "SK", name: "Slovakia", dialCode: "+421", example: "0912 123 456" },
  { code: "SI", name: "Slovenia", dialCode: "+386", example: "031 123 456" },
  { code: "SB", name: "Solomon Islands", dialCode: "+677", example: "74 12345" },
  { code: "SO", name: "Somalia", dialCode: "+252", example: "061 2345678" },
  { code: "ZA", name: "South Africa", dialCode: "+27", example: "071 123 4567" },
  { code: "KR", name: "South Korea", dialCode: "+82", example: "010-1234-5678" },
  { code: "SS", name: "South Sudan", dialCode: "+211", example: "0912 345 678" },
  { code: "ES", name: "Spain", dialCode: "+34", example: "612 34 56 78" },
  { code: "LK", name: "Sri Lanka", dialCode: "+94", example: "071 234 5678" },
  { code: "SD", name: "Sudan", dialCode: "+249", example: "091 123 4567" },
  { code: "SR", name: "Suriname", dialCode: "+597", example: "741-2345" },
  { code: "SE", name: "Sweden", dialCode: "+46", example: "070-123 45 67" },
  { code: "CH", name: "Switzerland", dialCode: "+41", example: "079 123 45 67" },
  { code: "SY", name: "Syria", dialCode: "+963", example: "0944 567 890" },
  { code: "TW", name: "Taiwan", dialCode: "+886", example: "0912 345 678" },
  { code: "TJ", name: "Tajikistan", dialCode: "+992", example: "917 12 3456" },
  { code: "TZ", name: "Tanzania", dialCode: "+255", example: "0712 345 678" },
  { code: "TH", name: "Thailand", dialCode: "+66", example: "081 234 5678" },
  { code: "TL", name: "Timor-Leste", dialCode: "+670", example: "7721 2345" },
  { code: "TG", name: "Togo", dialCode: "+228", example: "90 12 34 56" },
  { code: "TO", name: "Tonga", dialCode: "+676", example: "771 5123" },
  { code: "TT", name: "Trinidad and Tobago", dialCode: "+1", example: "(868) 555-1234" },
  { code: "TN", name: "Tunisia", dialCode: "+216", example: "20 123 456" },
  { code: "TR", name: "Turkey", dialCode: "+90", example: "0532 123 45 67" },
  { code: "TM", name: "Turkmenistan", dialCode: "+993", example: "8 66 123456" },
  { code: "TV", name: "Tuvalu", dialCode: "+688", example: "901234" },
  { code: "UG", name: "Uganda", dialCode: "+256", example: "0712 345678" },
  { code: "UA", name: "Ukraine", dialCode: "+380", example: "050 123 4567" },
  { code: "AE", name: "United Arab Emirates", dialCode: "+971", example: "050 123 4567" },
  { code: "GB", name: "United Kingdom", dialCode: "+44", example: "07123 456789" },
  { code: "US", name: "United States", dialCode: "+1", example: "(555) 000-0000" },
  { code: "UY", name: "Uruguay", dialCode: "+598", example: "094 123 456" },
  { code: "UZ", name: "Uzbekistan", dialCode: "+998", example: "90 123 45 67" },
  { code: "VU", name: "Vanuatu", dialCode: "+678", example: "591 2345" },
  { code: "VA", name: "Vatican City", dialCode: "+379", example: "06 698 12345" },
  { code: "VE", name: "Venezuela", dialCode: "+58", example: "0412-1234567" },
  { code: "VN", name: "Vietnam", dialCode: "+84", example: "0912 345 678" },
  { code: "YE", name: "Yemen", dialCode: "+967", example: "0712 345 678" },
  { code: "ZM", name: "Zambia", dialCode: "+260", example: "095 1234567" },
  { code: "ZW", name: "Zimbabwe", dialCode: "+263", example: "071 123 4567" },
];

function getFlagEmoji(countryCode: string) {
  return countryCode
    .toUpperCase()
    .replace(/./g, (char) =>
      String.fromCodePoint(127397 + char.charCodeAt(0)),
    );
}

function PhoneField({
  id,
  label,
  required,
}: {
  id: string;
  label: string;
  required?: boolean;
}) {
  const [selectedCode, setSelectedCode] = useState("US");

  const selectedCountry = useMemo(() => {
    return (
      phoneCountries.find((country) => country.code === selectedCode) ??
      phoneCountries.find((country) => country.code === "US") ??
      phoneCountries[0]
    );
  }, [selectedCode]);

  return (
    <div className={styles.field}>
      <label htmlFor={id}>
        {label}
        {required ? "*" : ""}
      </label>

      <div className={styles.phoneWrap}>
        <select
          className={styles.phoneCountrySelect}
          value={selectedCode}
          aria-label={`${label} country code`}
          onChange={(event) => setSelectedCode(event.target.value)}
        >
          {phoneCountries.map((country) => (
            <option key={country.code} value={country.code}>
              {getFlagEmoji(country.code)} {country.name} {country.dialCode}
            </option>
          ))}
        </select>

        <span className={styles.phoneDialCode}>{selectedCountry.dialCode}</span>

        <input
          id={id}
          name={id}
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder={`${selectedCountry.dialCode} ${selectedCountry.example}`}
          required={required}
        />
      </div>
    </div>
  );
}

export default function RegistrerenPage() {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    window.location.href = "/inloggen";
  }

  return (
    <main className={styles.page}>
      <form className={styles.formShell} onSubmit={handleSubmit}>
        <section className={styles.formSection}>
          <div className={styles.sectionTitle}>
            <span>01</span>
            <h2>Account Information</h2>
          </div>

          <div className={styles.panel}>
            <div className={styles.field}>
              <label htmlFor="email">Email address*</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                autoComplete="email"
              />
            </div>

            <div className={styles.twoColumns}>
              <div className={styles.field}>
                <label htmlFor="password">Password*</label>

                <div className={styles.passwordWrap}>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Create password"
                    autoComplete="new-password"
                  />

                  <button
                    type="button"
                    className={styles.eyeButton}
                    aria-label="Show password"
                  >
                    <Eye size={15} strokeWidth={1.8} />
                  </button>
                </div>
              </div>

              <div className={styles.field}>
                <label htmlFor="confirmPassword">Confirm password*</label>

                <div className={styles.passwordWrap}>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm password"
                    autoComplete="new-password"
                  />

                  <button
                    type="button"
                    className={styles.eyeButton}
                    aria-label="Show confirm password"
                  >
                    <Eye size={15} strokeWidth={1.8} />
                  </button>
                </div>
              </div>
            </div>

            <p className={styles.helperText}>
              Password must be at least 8 characters and include 1 uppercase
              letter and 1 number.
            </p>
          </div>
        </section>

        <section className={styles.formSection}>
          <div className={styles.sectionTitle}>
            <span>02</span>
            <h2>Personal Information</h2>
          </div>

          <div className={styles.panel}>
            <div className={styles.field}>
              <label htmlFor="title">Title*</label>

              <div className={styles.selectWrap}>
                <select id="title" name="title" defaultValue="">
                  <option value="" disabled>
                    Select title
                  </option>
                  <option value="mr">Mr.</option>
                  <option value="mrs">Mrs.</option>
                  <option value="ms">Ms.</option>
                  <option value="dr">Dr.</option>
                </select>

                <ChevronDown size={16} strokeWidth={1.8} />
              </div>
            </div>

            <div className={styles.twoColumns}>
              <div className={styles.field}>
                <label htmlFor="firstName">First name*</label>
                <input id="firstName" name="firstName" type="text" />
              </div>

              <div className={styles.field}>
                <label htmlFor="lastName">Last name*</label>
                <input id="lastName" name="lastName" type="text" />
              </div>
            </div>

            <div className={styles.field}>
              <label htmlFor="dateOfBirth">Date of birth * (+18)</label>

              <div className={styles.dateWrap}>
                <input
                  id="dateOfBirth"
                  name="dateOfBirth"
                  type="text"
                  placeholder="mm/dd/yyyy"
                />

                <CalendarDays size={16} strokeWidth={1.8} />
              </div>
            </div>

            <div className={styles.twoColumns}>
              <div className={styles.field}>
                <label htmlFor="language">Language*</label>

                <div className={styles.selectWrap}>
                  <select id="language" name="language" defaultValue="english">
                    <option value="english">English</option>
                    <option value="dutch">Dutch</option>
                    <option value="german">German</option>
                    <option value="french">French</option>
                  </select>

                  <ChevronDown size={16} strokeWidth={1.8} />
                </div>
              </div>

              <div className={styles.field}>
                <label htmlFor="timezone">Time zone*</label>

                <div className={styles.selectWrap}>
                  <select id="timezone" name="timezone" defaultValue="est">
                    <option value="est">EST (Eastern Standard Time)</option>
                    <option value="cet">CET (Central European Time)</option>
                    <option value="gmt">GMT (Greenwich Mean Time)</option>
                    <option value="ict">ICT (Indochina Time)</option>
                  </select>

                  <ChevronDown size={16} strokeWidth={1.8} />
                </div>
              </div>
            </div>

            <div className={styles.field}>
              <label htmlFor="businessType">Business type*</label>

              <div className={styles.selectWrap}>
                <select id="businessType" name="businessType" defaultValue="">
                  <option value="" disabled>
                    Select a type
                  </option>
                  <option value="private">Private buyer</option>
                  <option value="stable">Stable</option>
                  <option value="breeder">Breeder</option>
                  <option value="agent">Agent</option>
                </select>

                <ChevronDown size={16} strokeWidth={1.8} />
              </div>
            </div>
          </div>
        </section>

        <section className={styles.formSection}>
          <div className={styles.sectionTitle}>
            <span>03</span>
            <h2>Contact Details</h2>
          </div>

          <div className={styles.panel}>
            <div className={styles.field}>
              <label htmlFor="street">Street and number*</label>
              <input id="street" name="street" type="text" />
            </div>

            <div className={styles.twoColumns}>
              <div className={styles.field}>
                <label htmlFor="postalCode">Postal code*</label>
                <input id="postalCode" name="postalCode" type="text" />
              </div>

              <div className={styles.field}>
                <label htmlFor="city">City*</label>
                <input id="city" name="city" type="text" />
              </div>
            </div>

            <div className={styles.field}>
              <label htmlFor="country">Country*</label>

              <div className={styles.selectWrap}>
                <select id="country" name="country" defaultValue="US">
                  {phoneCountries.map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.name}
                    </option>
                  ))}
                </select>

                <ChevronDown size={16} strokeWidth={1.8} />
              </div>
            </div>

            <div className={styles.twoColumns}>
              <PhoneField id="phone1" label="Phone 1" required />
              <PhoneField id="phone2" label="Phone 2" />
            </div>

            <PhoneField id="fax" label="Fax" />
          </div>
        </section>

        <section className={styles.termsBox}>
          <label className={styles.checkboxRow}>
            <input type="checkbox" name="membership" />

            <span>
              I wish to become a member of the Studbook Zangersheide.
              Membership is €74,20 per year in Europe, €95,40 per year for the
              rest of the world.{" "}
              <a href="/informatie" target="_blank">
                More information
              </a>
            </span>
          </label>

          <label className={styles.checkboxRow}>
            <input type="checkbox" name="privacy" />

            <span>
              I agree that my personal data will be processed in accordance with
              the <a href="/privacybeleid">Privacy Policy</a> and{" "}
              <a href="/cookies">Cookie Policy</a>.
            </span>
          </label>
        </section>

        <button type="submit" className={styles.submitButton}>
          SIGN UP
          <span>→</span>
        </button>
      </form>
    </main>
  );
}