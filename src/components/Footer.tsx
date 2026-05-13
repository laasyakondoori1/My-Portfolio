import { Github, Linkedin, Mail, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/30 px-6 py-12">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6">
        <div className="flex items-center gap-4">
          <a
            href="mailto:laasyakondoori@gmail.com"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
            aria-label="Email"
          >
            <Mail size={16} />
          </a>
          <a
            href="tel:+917981173765"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
            aria-label="Phone"
          >
            <Phone size={16} />
          </a>
          <a
            href="https://www.linkedin.com/in/laasya-kondoori-6b69b92a0/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
            aria-label="LinkedIn"
          >
            <Linkedin size={16} />
          </a>
          <a
            href="https://github.com/laasyakondoori1"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
            aria-label="GitHub"
          >
            <Github size={16} />
          </a>
        </div>
        <p className="font-mono text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Kondoori Laasya Priya. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
