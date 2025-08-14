export interface profileItem {
  _id: string;
  website?: string;
  status: string;
  company?: string;
  location?: string;
  skills: string[];
  user: {
    _id: string;
    name: string;
    avatar: string;
  };
  socials?: {
    twitter?: string;
    facebook?: string;
    linkedin?: string;
    youtube?: string;
    instagram?: string;
  };
}
export interface Education {
  _id: string;
  institute: string;
  degree: string;
  fieldofstudy: string;
  from: Date;
  to?: Date;
  description: string;
}
export interface Experience {
  _id: string;
  title: string;
  location: string;
  company: string;
  from: Date;
  to?: Date;
  description: string;
}