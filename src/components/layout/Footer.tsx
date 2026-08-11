import {
  FacebookIcon,
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
  TwitterIcon,
} from "@/components/ui/icons";

const SOCIAL_LINKS = [
  { label: "Facebook", href: "https://facebook.com/yourprofile", Icon: FacebookIcon },
  { label: "Instagram", href: "https://instagram.com/yourprofile", Icon: InstagramIcon },
  { label: "Twitter", href: "https://twitter.com/yourprofile", Icon: TwitterIcon },
  { label: "LinkedIn", href: "https://linkedin.com/in/yourprofile", Icon: LinkedinIcon },
  { label: "GitHub", href: "https://github.com/muhammadumairamir12-del", Icon: GithubIcon },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-team">WEBXPRO</div>
      <p style={{ color: "#aaa", marginBottom: 20, fontSize: "1.1rem" }}>
        Professional • Affordable • Fast Development | Serving Global Clients
      </p>
      <div className="social-links">
        {SOCIAL_LINKS.map(({ label, href, Icon }) => (
          <a key={label} href={href} target="_blank" rel="noopener noreferrer" title={label}>
            <Icon className="h-5 w-5" />
          </a>
        ))}
      </div>
      <p style={{ color: "#666", fontSize: "0.9rem", marginTop: 20 }}>
        © 2026 WEBXPRO. All rights reserved. | Delivering Excellence Worldwide
      </p>
    </footer>
  );
}
