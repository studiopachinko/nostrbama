export type Speaker = {
  speakerName: string;
  title: string;
  njumpUrl: string;
  bio: string;
  profilePic: ImageMetadata;
}

export type Entertainment = {
  image: ImageMetadata;
  title: string;
  url?: string;
  date: string;
  description: string;
}

export type FAQ = {
  question: string;
}
