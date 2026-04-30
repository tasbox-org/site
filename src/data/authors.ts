export interface AuthorSocials {
  githubUsername: string;
}

export interface Author {
  slug: string;
  name: string;
  title: string;
  avatarUrl: string;
  hasPage: boolean;
  socials: AuthorSocials;
}

export const authors: Author[] = [
  {
    slug: "derpius",
    name: "Derpius",
    title: "Lead Developer",
    avatarUrl: "https://github.com/Derpius.png",
    hasPage: true,
    socials: {
      githubUsername: "Derpius",
    },
  },
  {
    slug: "potato",
    name: "Jason",
    title: "Developer",
    avatarUrl: "https://github.com/yogwoggf.png",
    hasPage: false,
    socials: {
      githubUsername: "yogwoggf",
    },
  },
  {
    slug: "vurv",
    name: "Vurv",
    title: "Developer",
    avatarUrl: "https://github.com/Vurv78.png",
    hasPage: false,
    socials: {
      githubUsername: "Vurv78",
    },
  },
];
