"use client";

import { useEffect, useMemo, useState } from "react";
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
  CheckCircle2,
  ClipboardList,
  FileText,
  Gavel,
  ShieldCheck,
  UploadCloud,
} from "lucide-react";
import styles from "./OpnieuwVerkopenPage.module.scss";

type ListingType = "paard" | "embryo" | "sperma";

type RelistData = {
  isRelist: boolean;
  type: ListingType;
  sourceAuctionId: string;
  title: string;
  subtitle: string;
  lotCode: string;
  originalPrice: number | null;
  reducedPrice: number | null;
};

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

const emptyRelistData: RelistData = {
  isRelist: false,
  type: "paard",
  sourceAuctionId: "",
  title: "",
  subtitle: "",
  lotCode: "",
  originalPrice: null,
  reducedPrice: null,
};

const listingTypeLabels: Record<ListingType, string> = {
  paard: "paard",
  embryo: "embryo",
  sperma: "sperma",
};

const listingTypeFormLabels: Record<ListingType, string> = {
  paard: "Naam van het paard",
  embryo: "Naam / titel van het embryo",
  sperma: "Naam / titel van het sperma",
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
    title: "Gegevens controleren",
    description:
      "Controleer de gegevens van het item dat u opnieuw wilt aanbieden.",
  },
  {
    icon: FileText,
    title: "Documenten toevoegen",
    description:
      "Voeg veterinaire keuringen, röntgenfoto’s, video’s of andere relevante documenten toe.",
  },
  {
    icon: Gavel,
    title: "Opnieuw aanbieden",
    description:
      "De nieuwe startprijs wordt automatisch met 10% verlaagd en doorgestuurd voor beoordeling.",
  },
];

const benefits = [
  "Automatische verlaging van de startprijs met 10%",
  "Persoonlijke begeleiding door het veilingteam",
  "Internationaal bereik onder serieuze kopers",
  "Professionele presentatie van uw veilingitem",
  "Transparante bied- en verkoopprocedure",
];

function parsePriceParam(value: string | null) {
  if (!value) return null;

  const parsed = Number(value.replace(/[^\d]/g, ""));

  return Number.isNaN(parsed) ? null : parsed;
}

function getValidListingType(value: string | null): ListingType {
  if (value === "embryo" || value === "sperma" || value === "paard") {
    return value;
  }

  return "paard";
}

function formatEuro(value: number) {
  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

function getRelistReason(type: ListingType) {
  const label = listingTypeLabels[type];

  return `Opnieuw aanbieden omdat de vorige veiling van dit ${label} zonder winnaar is geëindigd.`;
}

export default function OpnieuwVerkopenPage() {
  const [form] = Form.useForm<ResaleFormValues>();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [relistData, setRelistData] = useState<RelistData>(emptyRelistData);

  const listingLabel = listingTypeLabels[relistData.type];
  const listingNameLabel = listingTypeFormLabels[relistData.type];

  useEffect(() => {
    if (typeof window === "undefined") return;

    const searchParams = new URLSearchParams(window.location.search);

    const mode = searchParams.get("mode");
    const type = getValidListingType(searchParams.get("type"));
    const title = searchParams.get("title") ?? "";
    const subtitle = searchParams.get("subtitle") ?? "";
    const lotCode = searchParams.get("lotCode") ?? "";
    const sourceAuctionId = searchParams.get("sourceAuctionId") ?? "";

    const originalPrice = parsePriceParam(searchParams.get("originalPrice"));
    const passedStartPrice = parsePriceParam(searchParams.get("startPrice"));

    const reducedPrice = originalPrice
      ? Math.round(originalPrice * 0.9)
      : passedStartPrice;

    const nextRelistData: RelistData = {
      isRelist: mode === "relist",
      type,
      sourceAuctionId,
      title,
      subtitle,
      lotCode,
      originalPrice,
      reducedPrice,
    };

    setRelistData(nextRelistData);

    if (nextRelistData.isRelist) {
      form.setFieldsValue({
        horseName: nextRelistData.title,
        previousLot: nextRelistData.lotCode,
        reservePrice: nextRelistData.reducedPrice ?? undefined,
        currency: "EUR",
        reason: getRelistReason(type),
      });
    }
  }, [form]);

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
      mode: relistData.isRelist ? "relist" : "new_request",
      listingType: relistData.type,
      sourceAuctionId: relistData.sourceAuctionId,
      originalPrice: relistData.originalPrice,
      reducedPrice: relistData.reducedPrice,
      discountPercent: relistData.isRelist ? 10 : 0,
      files: fileList.map((file) => ({
        name: file.name,
        size: file.size,
        type: file.type,
      })),
    });

    message.success(
      relistData.isRelist
        ? "Uw aanvraag om opnieuw aan te bieden is ontvangen."
        : "Uw aanvraag voor opnieuw verkopen is ontvangen.",
    );

    form.resetFields();
    setFileList([]);
    setSubmitting(false);
  }

  return (
    <main className={styles.page}>

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
                Controleer de gegevens voor herplaatsing
              </h2>

              <p className={styles.panelText}>
                Vul de gegevens zo volledig mogelijk in. Bij opnieuw aanbieden
                wordt de startprijs automatisch 10% lager gezet dan de vorige
                prijs.
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
              {relistData.isRelist ? (
                <div className={styles.relistSummary}>
                  <div className={styles.relistInfo}>
                    <span>Opnieuw aanbieden</span>
                    <strong>{relistData.title || "Veilingitem"}</strong>

                    {relistData.subtitle ? <p>{relistData.subtitle}</p> : null}

                    {relistData.lotCode ? (
                      <small>Vorige lotnummer: {relistData.lotCode}</small>
                    ) : null}
                  </div>

                  <div className={styles.relistPriceBox}>
                    <div>
                      <span>Vorige prijs</span>
                      <strong>
                        {relistData.originalPrice
                          ? formatEuro(relistData.originalPrice)
                          : "Niet bekend"}
                      </strong>
                    </div>

                    <div>
                      <span>Korting</span>
                      <strong>-10%</strong>
                    </div>

                    <div>
                      <span>Nieuwe startprijs</span>
                      <strong>
                        {relistData.reducedPrice
                          ? formatEuro(relistData.reducedPrice)
                          : "Niet bekend"}
                      </strong>
                    </div>
                  </div>
                </div>
              ) : null}

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
                    label={listingNameLabel}
                    name="horseName"
                    rules={[
                      {
                        required: true,
                        message: `Vul de naam of titel van het ${listingLabel} in.`,
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
                    <Input placeholder="Bijv. KWPN, Hannoveraan, Hippique" />
                  </Form.Item>
                </div>

                <div className={styles.formThreeColumns}>
                  <Form.Item label="Leeftijd" name="age">
                    <InputNumber min={1} max={35} placeholder="6" />
                  </Form.Item>

                  <Form.Item label="Geslacht" name="gender">
                    <Select
                      placeholder="Kies geslacht"
                      options={genderOptions}
                    />
                  </Form.Item>

                  <Form.Item label="Huidige locatie" name="location">
                    <Input placeholder="Bijv. Nederland" />
                  </Form.Item>
                </div>

                <div className={styles.formTwoColumns}>
                  <Form.Item
                    label={
                      relistData.isRelist
                        ? "Nieuwe startprijs (-10%)"
                        : "Gewenste minimumprijs"
                    }
                    name="reservePrice"
                  >
                    <InputNumber<number>
                      disabled={
                        relistData.isRelist &&
                        Boolean(relistData.reducedPrice)
                      }
                      min={0}
                      step={500}
                      placeholder="65000"
                      formatter={(value) =>
                        value
                          ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                          : ""
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
                  {relistData.isRelist
                    ? "Opnieuw aanbieden verzenden"
                    : "Aanvraag verzenden"}
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}