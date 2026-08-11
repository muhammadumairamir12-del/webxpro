import {
  EnvelopeIcon,
  PhoneIcon,
  WhatsAppIcon,
} from "@/components/ui/icons";

const WHATSAPP_LINK =
  "https://wa.me/923188791637?text=Hi!%20I%20want%20to%20discuss%20a%20project";

const WIDGETS = [
  {
    label: "WhatsApp",
    value: "0318 8791637",
    href: WHATSAPP_LINK,
    external: true,
    Icon: WhatsAppIcon,
    id: "sidebarWhatsapp",
  },
  {
    label: "Call Us",
    value: "0318 4195665",
    href: "tel:+923184195665",
    external: false,
    Icon: PhoneIcon,
    id: "sidebarCall",
  },
  {
    label: "Email",
    value: "infoskyeagle12@gmail.com",
    href: "mailto:infoskyeagle12@gmail.com",
    external: false,
    Icon: EnvelopeIcon,
    id: "sidebarEmail",
  },
];

export default function ContactSidebar() {
  return (
    <div className="contact-sidebar">
      {WIDGETS.map(({ label, value, href, external, Icon, id }) => (
        <a
          key={id}
          id={id}
          className="contact-widget"
          href={href}
          {...(external
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
          <span className="pulse-dot" />
          <Icon className="h-6 w-6" />
          <span className="contact-info-text">
            <span className="label">{label}</span>
            <span className="number">{value}</span>
          </span>
        </a>
      ))}
    </div>
  );
}
