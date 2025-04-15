import type { Speaker } from "@/types";

import derekRossProfilePic from "@/assets/images/speaker-profile-pics/derekRoss.png";
import manimeProfilePic from "@/assets/images/speaker-profile-pics/manime.png";
import vicProfilePic from "@/assets/images/speaker-profile-pics/vic.png";
import ericfjAceaSpadesProfilePic from "@/assets/images/speaker-profile-pics/ericfj-aceaspades.png";

export const SPEAKER_DATA: Speaker[] = [
  {
    speakerName: "Derek Ross",
    title: "Nostr OG",
    njumpUrl:
      "https://njump.me/npub18ams6ewn5aj2n3wt2qawzglx9mr4nzksxhvrdc4gzrecw7n5tvjqctp424",
    bio: "A true Nostr OG, and a man who has purple-pilled more than the rest of us combined. He will be giving a captivating talk about the history of Nostr and how it's going to change social media forever.",
    profilePic: derekRossProfilePic,
  },
  {
    speakerName: "Vic",
    title: "Audio Spaces Developer",
    njumpUrl:
      "https://njump.me/npub1yx6pjypd4r7qh2gysjhvjd9l2km6hnm4amdnjyjw3467fy05rf0qfp7kza",
    bio: "A place for artists, devs, and traders to connect and shoot the breeze, Vic is working on the open-source, Nostr and Lightning-enabled audio spaces app.",
    profilePic: vicProfilePic,
  },
  {
    speakerName: "ManiMe",
    title: "Relay Technology Developer",
    njumpUrl:
      "https://njump.me/npub1manlnflyzyjhgh970t8mmngrdytcp3jrmaa66u846ggg7t20cgqqvyn9tn",
    bio: "Working on building the back end of Nostr, Mani has been tirelessly creating new relay technologies to expand the web of trust.",
    profilePic: manimeProfilePic,
  },
  {
    speakerName: "EricFJ & AceaSpades",
    title: "Merchant Protocol Developers",
    njumpUrl:
      "https://njump.me/npub10xvczstpwsljy7gqd2cselvrh5e6mlerep09m8gff87avru0ryqsg2g437",
    bio: "They are writing the common spec of how merchants and customers connect on Nostr and use Sats to buy and sell goods from anywhere.",
    profilePic: ericfjAceaSpadesProfilePic,
  },
];
