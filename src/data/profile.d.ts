export interface Profile {
  name: string;
  title: string;
  slogan: string;
  profilePic: string;
  resume: string;
  github: string;
  bio: string;
  linkedin?: string;
  leetcode?: string;
  behance?: string;
  telegram?: string;
  huggingface?: string;
  email?: string;
  location?: string;
}

export const profile: Profile;
