export interface ProjectLink {
  label: string;
  href: string;
}

export interface Project {
  id: string;
  title: string;        // contains HTML entities
  year: string;         // e.g. "2022–2026"
  description: string;  // contains HTML
  tags: string[];
  categories: string[];
  catLabels: string[];
  links: ProjectLink[];
  image?: string;
  video?: string;
  component?: Array<string|undefined>;
}

export interface Link {
  label: string;
  sublabel?: string;
  href: string;
}
