import type { Entertainment, FAQ, Speaker } from "@/types";
// Speaker Images
import derekRossProfilePic from "@/assets/images/speaker-profile-pics/derekRoss.png";
import manimeProfilePic from "@/assets/images/speaker-profile-pics/manime.png";
import vicProfilePic from "@/assets/images/speaker-profile-pics/vic.png";
import ericfjAceaSpadesProfilePic from "@/assets/images/speaker-profile-pics/ericfj-aceaspades.png";
// Entertainment Images
// import brooksImage from "@/assets/images/entertainment/brooks-hubbert.png";
import skydiveImage from "@/assets/images/entertainment/skydive-ostrich.png";
import partyImage from "@/assets/images/entertainment/party.png";
import bandImage from "@/assets/images/entertainment/band.png";
import beachImage from "@/assets/images/entertainment/beach.png";
import talkImage from "@/assets/images/entertainment/talk.png";
import vrImage from "@/assets/images/entertainment/vr.jpg";

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
    bio: "Vic is building CornyChat.com, A place for artists, devs, and traders to connect and shoot the breeze, Vic is working on the open-source, Nostr and Lightning-enabled audio spaces app.",
    profilePic: vicProfilePic,
  },
  {
    speakerName: "ManiMe",
    title: "Relay Technology Developer",
    njumpUrl:
      "https://njump.me/npub1manlnflyzyjhgh970t8mmngrdytcp3jrmaa66u846ggg7t20cgqqvyn9tn",
    bio: "Working on building Web-of-Trust protocols that enhance the user experience across relays, Mani has been building Grapevine.me and Nostrmeet.me.",
    profilePic: manimeProfilePic,
  },
  {
    speakerName: "EricFJ & AceaSpades",
    title: "Merchant Protocol Developers",
    njumpUrl:
      "https://njump.me/npub10xvczstpwsljy7gqd2cselvrh5e6mlerep09m8gff87avru0ryqsg2g437",
    bio: "Buidling ConduitBTC, a common spec of how merchants and customers can connect on Nostr and use Sats to buy and sell goods from anywhere.",
    profilePic: ericfjAceaSpadesProfilePic,
  },
];

// duplicate items for Swiper JS Loop option to work properly
export const ENTERTAINMENT_DATA: Entertainment[] = [
  {
    title: "Nostr Talks",
    date: "The Haberdasher. Tuesday, 15th July, 7pm.",
    description:
      "Starting things off we will hear some great tech talks, including a History of Nostr by Derek Ross, Vic will discuss CornyChatt, Aceaspades and EricFJ will talk about ConduitBTC, and ManiMe will discuss web-of-trust with Grapevine.",
    image: talkImage,
  },
  {
    title: "Live Music With Brooks Hubber",
    date: "The Haberdasher. Tuesday, 15th July, 10pm.",
    description:
      "Brooks Hubbert III is a musician, singer and songwriter from Pensacola, Florida. At a time when so many acts insist their sound cannot be categorized, Hubbert manages to effortlessly span genres including psychedelic rock, reggae, blues, country, and bluegrass in the creation of music that is both technically impressive and easily accessible",
    url: "https://soundslikebrooks.bandcamp.com/",
    image: bandImage,
  },
  {
    title: "Skydive The Gulf With DankSwoops",
    date: "Orange Beach, AL. Thursday 17th, All Day.",
    description:
      "Daredevil Nostriches will have the option of a tandem skydive with a professional instructor through Sky Dive the Gulf (DankSwoops is coordinating; Message him if you'd like to jump!)",
    image: skydiveImage,
  },
  {
    title: "Dining and bar-hopping",
    date: "Starting at Red or White 1104 Dauphin St. Wednesday, July 16th, 7pm.",
    description:
      "After the arcade, we will enjoy a dinner at Red or White, before bar hopping through downtown Mobile until the early morning hours.  ",
    image: partyImage,
  },
  {
    title: "Beach Day!",
    date: "Orange Beach, AL. Thursday 17th July, All Day",
    description:
      "Soak up the sun and catch some waves with other Nostriches at beautiful Orange Beach, hang out at the historic Flora-Bama bar, and watch the skydivers fall!",
    image: beachImage,
  },
  {
    title: "Virtual Reality!",
    date: "AI VR Experience.  Downtown Mobile, AL.  Wednesday, 16th July, 2pm.",
    description:
      "After we've all recovered from the party, we meet at Sith’s AI VR lab to experience firsthand the process of creating digital avatars of real people using AI.  Play a VR game with characters made from real nostriches!",
    image: vrImage,
  },
  // Duplicates from here on - WHY IS THIS?!?  - nevermind i get it now

{
    title: "Nostr Talks",
    date: "The Haberdasher. Tuesday, 15th July, 7pm.",
    description:
      "Starting things off we will hear some great tech talks, including a History of Nostr by Derek Ross, Vic will discuss CornyChatt, Aceaspades and EricFJ will talk about ConduitBTC, and ManiMe will discuss web-of-trust with Grapevine.",
    image: talkImage,
  },
  {
    title: "Live Music With Brooks Hubber",
    date: "The Haberdasher. Tuesday, 15th July, 10pm.",
    description:
      "Brooks Hubbert III is a musician, singer and songwriter from Pensacola, Florida. At a time when so many acts insist their sound cannot be categorized, Hubbert manages to effortlessly span genres including psychedelic rock, reggae, blues, country, and bluegrass in the creation of music that is both technically impressive and easily accessible",
    url: "https://soundslikebrooks.bandcamp.com/",
    image: bandImage,
  },
  {
    title: "Skydive The Gulf With DankSwoops",
    date: "Orange Beach, AL. Thursday 17th, All Day.",
    description:
      "Daredevil Nostriches will have the option of a tandem skydive with a professional instructor through Sky Dive the Gulf (DankSwoops is coordinating; Message him if you'd like to jump!)",
    image: skydiveImage,
  },
  {
    title: "Dining and bar-hopping",
    date: "Starting at Red or White 1104 Dauphin St. Wednesday, July 16th, 7pm.",
    description:
      "After the arcade, we will enjoy a dinner at Red or White, before bar hopping through downtown Mobile until the early morning hours.  ",
    image: partyImage,
  },
  {
    title: "Beach Day!",
    date: "Orange Beach, AL. Thursday 17th July, All Day",
    description:
      "Soak up the sun and catch some waves with other Nostriches at beautiful Orange Beach, hang out at the historic Flora-Bama bar, and watch the skydivers fall!",
    image: beachImage,
  },
  {
    title: "Virtual Reality!",
    date: "AI VR Experience.  Downtown Mobile, AL.  Wednesday, 16th July, 2pm.",
    description:
      "After we've all recovered from the party, we meet at Sith’s AI VR lab to experience firsthand the process of creating digital avatars of real people using AI.  Play a VR game with characters made from real nostriches!",
    image: vrImage,
  },
];

export const FAQS: FAQ[] = [
  {
    question: "How do I book a ticket?",
  },
];
