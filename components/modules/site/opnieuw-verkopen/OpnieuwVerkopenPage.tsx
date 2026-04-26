"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import {
  Button,
  Checkbox,
  Form,
  Input,
  InputNumber,
  Select,
  Upload,
  message,
} from "antd";
import type { UploadFile, UploadProps } from "antd";
import {
  BadgeEuro,
  CheckCircle2,
  ClipboardList,
  FileText,
  Gavel,
  ShieldCheck,
  UploadCloud,
} from "lucide-react";
import styles from "./OpnieuwVerkopenPage.module.scss";

type ResaleFormValues = {
  horseName: string;
  previousLot?: string;
  discipline: string;
  breed?: string;
  age?: number;
  gender?: string;
  location?: string;
  reservePrice?: number;
  currency: string;
  reason?: string;
  notes?: string;
  agree: boolean;
};

const disciplineOptions = [
  { value: "springen", label: "Springen" },
  { value: "dressuur", label: "Dressuur" },
  { value: "eventing", label: "Eventing" },
  { value: "fokkerij", label: "Fokkerij" },
  { value: "recreatie", label: "Recreatie" },
];

const genderOptions = [
  { value: "hengst", label: "Hengst" },
  { value: "merrie", label: "Merrie" },
  { value: "ruin", label: "Ruin" },
];

const currencyOptions = [
  { value: "EUR", label: "EUR €" },
  { value: "USD", label: "USD $" },
  { value: "GBP", label: "GBP £" },
];

const steps = [
  {
    icon: ClipboardList,
    title: "Gegevens invullen",
    description:
      "Vul de basisinformatie in van het paard dat u opnieuw wilt aanbieden.",
  },
  {
    icon: FileText,
    title: "Documenten toevoegen",
    description:
      "Voeg veterinaire keuringen, röntgenfoto’s en prestatiegegevens toe.",
  },
  {
    icon: Gavel,
    title: "Veilingvoorstel ontvangen",
    description:
      "Ons team beoordeelt uw aanvraag en stelt een passende verkoopstrategie voor.",
  },
];

const benefits = [
  "Persoonlijke begeleiding door het veilingteam",
  "Internationaal bereik onder serieuze kopers",
  "Professionele presentatie van uw paard",
  "Transparante bied- en verkoopprocedure",
];

export default function OpnieuwVerkopenPage() {
  const [form] = Form.useForm<ResaleFormValues>();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const uploadProps = useMemo<UploadProps>(
    () => ({
      multiple: true,
      fileList,
      beforeUpload: () => false,
      onChange(info) {
        setFileList(info.fileList);
      },
      onRemove(file) {
        setFileList((current) =>
          current.filter((item) => item.uid !== file.uid),
        );
      },
    }),
    [fileList],
  );

  async function handleSubmit(values: ResaleFormValues) {
    setSubmitting(true);

    await new Promise((resolve) => {
      window.setTimeout(resolve, 700);
    });

    console.log("Resale request:", {
      ...values,
      files: fileList.map((file) => ({
        name: file.name,
        size: file.size,
        type: file.type,
      })),
    });

    message.success("Uw aanvraag voor opnieuw verkopen is ontvangen.");

    form.resetFields();
    setFileList([]);
    setSubmitting(false);
  }

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.inner}>
          <div className={styles.heroGrid}>
            <div className={styles.heroContent}>
              <span className={styles.eyebrow}>Opnieuw verkopen</span>

              <h1 className={styles.title}>
                Bied uw paard opnieuw aan via Hippique Auctions
              </h1>

              <p className={styles.subtitle}>
                Heeft u eerder een paard gekocht of aangeboden en wilt u het nu
                opnieuw verkopen? Dien eenvoudig uw aanvraag in. Ons team neemt
                contact met u op voor beoordeling, documentatie en de beste
                veilingstrategie.
              </p>

              <div className={styles.heroActions}>
                <a href="#resale-form" className={styles.primaryLink}>
                  Aanvraag starten
                </a>

                <a href="#werkwijze" className={styles.secondaryLink}>
                  Bekijk werkwijze
                </a>
              </div>
            </div>

            <div className={styles.heroVisual}>
              <div className={styles.heroImageWrap}>
                <Image
                  src="/img/home/elite/horse-1.webp"
                  alt="Opnieuw verkopen via Hippique Auctions"
                  fill
                  priority
                  className={styles.heroImage}
                  sizes="(max-width: 991px) 100vw, 44vw"
                />
              </div>

              <div className={styles.floatingCard}>
                <BadgeEuro size={22} strokeWidth={1.9} />
                <div>
                  <span>Veilingadvies</span>
                  <strong>Persoonlijk voorstel</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="werkwijze" className={styles.stepsSection}>
        <div className={styles.inner}>
          <div className={styles.sectionHeading}>
            <span className={styles.sectionEyebrow}>Zo werkt het</span>
            <h2 className={styles.sectionTitle}>
              In drie stappen opnieuw aanbieden
            </h2>
          </div>

          <div className={styles.stepsGrid}>
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <article key={step.title} className={styles.stepCard}>
                  <div className={styles.stepTop}>
                    <span className={styles.stepNumber}>
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className={styles.stepIcon}>
                      <Icon size={24} strokeWidth={1.9} />
                    </span>
                  </div>

                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="resale-form" className={styles.formSection}>
        <div className={styles.inner}>
          <div className={styles.formGrid}>
            <aside className={styles.infoPanel}>
              <span className={styles.sectionEyebrow}>Aanvraagformulier</span>

              <h2 className={styles.panelTitle}>
                Vertel ons meer over het paard
              </h2>

              <p className={styles.panelText}>
                Vul de gegevens zo volledig mogelijk in. Hoe meer informatie wij
                ontvangen, hoe sneller wij een passend veilingvoorstel kunnen
                maken.
              </p>

              <div className={styles.benefitList}>
                {benefits.map((item) => (
                  <div key={item} className={styles.benefitItem}>
                    <CheckCircle2 size={18} strokeWidth={2} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className={styles.trustBox}>
                <ShieldCheck size={22} strokeWidth={1.9} />
                <div>
                  <strong>Veilig en vertrouwelijk</strong>
                  <span>
                    Uw gegevens worden alleen gebruikt voor de beoordeling van
                    uw verkoopaanvraag.
                  </span>
                </div>
              </div>
            </aside>

            <div className={styles.formCard}>
              <Form
                form={form}
                layout="vertical"
                requiredMark={false}
                initialValues={{
                  currency: "EUR",
                  agree: false,
                }}
                onFinish={handleSubmit}
                className={styles.form}
              >
                <div className={styles.formTwoColumns}>
                  <Form.Item
                    label="Naam van het paard"
                    name="horseName"
                    rules={[
                      {
                        required: true,
                        message: "Vul de naam van het paard in.",
                      },
                    ]}
                  >
                    <Input placeholder="Bijv. Imperial Majesty" />
                  </Form.Item>

                  <Form.Item label="Vorige lotnummer" name="previousLot">
                    <Input placeholder="Bijv. Lot #04" />
                  </Form.Item>
                </div>

                <div className={styles.formTwoColumns}>
                  <Form.Item
                    label="Discipline"
                    name="discipline"
                    rules={[
                      {
                        required: true,
                        message: "Selecteer een discipline.",
                      },
                    ]}
                  >
                    <Select
                      placeholder="Kies discipline"
                      options={disciplineOptions}
                    />
                  </Form.Item>

                  <Form.Item label="Stamboek / ras" name="breed">
                    <Input placeholder="Bijv. KWPN, Hannoveraan, Zangersheide" />
                  </Form.Item>
                </div>

                <div className={styles.formThreeColumns}>
                  <Form.Item label="Leeftijd" name="age">
                    <InputNumber min={1} max={35} placeholder="6" />
                  </Form.Item>

                  <Form.Item label="Geslacht" name="gender">
                    <Select placeholder="Kies geslacht" options={genderOptions} />
                  </Form.Item>

                  <Form.Item label="Huidige locatie" name="location">
                    <Input placeholder="Bijv. Nederland" />
                  </Form.Item>
                </div>

                <div className={styles.formTwoColumns}>
<Form.Item label="Gewenste minimumprijs" name="reservePrice">
  <InputNumber<number>
    min={0}
    step={500}
    placeholder="65000"
    formatter={(value) =>
      value ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".") : ""
    }
    parser={(value) => {
      if (!value) return 0;

      const parsed = Number(value.replace(/[^\d]/g, ""));

      return Number.isNaN(parsed) ? 0 : parsed;
    }}
  />
</Form.Item>

                  <Form.Item label="Valuta" name="currency">
                    <Select options={currencyOptions} />
                  </Form.Item>
                </div>

                <Form.Item label="Reden van opnieuw verkopen" name="reason">
                  <Input.TextArea
                    rows={4}
                    placeholder="Bijv. wijziging in sportplanning, fokkerijstrategie of investering."
                  />
                </Form.Item>

                <Form.Item label="Aanvullende opmerkingen" name="notes">
                  <Input.TextArea
                    rows={4}
                    placeholder="Vermeld relevante informatie over prestaties, gezondheid, karakter of training."
                  />
                </Form.Item>

                <div className={styles.uploadBlock}>
                  <div className={styles.uploadHeader}>
                    <UploadCloud size={22} strokeWidth={1.9} />
                    <div>
                      <strong>Documenten uploaden</strong>
                      <span>
                        Voeg keuringen, röntgenfoto’s, video’s of
                        prestatiebestanden toe.
                      </span>
                    </div>
                  </div>

                  <Upload.Dragger {...uploadProps} className={styles.uploader}>
                    <p className={styles.uploadIcon}>
                      <UploadCloud size={32} strokeWidth={1.8} />
                    </p>

                    <p className={styles.uploadText}>
                      Klik of sleep bestanden naar dit vak
                    </p>

                    <p className={styles.uploadHint}>
                      PDF, JPG, PNG, MP4 of andere relevante documenten
                    </p>
                  </Upload.Dragger>
                </div>

                <Form.Item
                  name="agree"
                  valuePropName="checked"
                  rules={[
                    {
                      validator: (_, value) =>
                        value
                          ? Promise.resolve()
                          : Promise.reject(
                              new Error(
                                "U moet akkoord gaan met de voorwaarden.",
                              ),
                            ),
                    },
                  ]}
                >
                  <Checkbox>
                    Ik bevestig dat de ingevulde informatie correct is en ga
                    akkoord met beoordeling door Hippique Auctions.
                  </Checkbox>
                </Form.Item>

                <Button
                  type="primary"
                  htmlType="submit"
                  loading={submitting}
                  className={styles.submitButton}
                >
                  Aanvraag verzenden
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}