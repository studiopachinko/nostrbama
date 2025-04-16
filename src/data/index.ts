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

// duplicate items for Swiper JS Loop option to work properly
export const ENTERTAINMENT_DATA: Entertainment[] = [
  {
    title: "Nostr Talks",
    date: "The Haberdasher. Tuesday 14th July.",
    description:
      "It might be a tall order to justify four days of fun in Alabama to your workplace/significant other without some veneer of education or technical discussion so we've had to include some talks. We've ordered them to keep it short and sweet.",
    image: talkImage,
  },
  {
    title: "Live Music With Brooks Hubber",
    date: "The Haberdasher. Tuesday 14th July.",
    description:
      "Brooks Hubbert III is a musician, singer and songwriter from Pensacola, Florida. At a time when so many acts insist their sound cannot be categorized, Hubbert manages to effortlessly span genres including psychedelic rock, reggae, blues, country, and bluegrass in the creation of music that is both technically impressive and easily accessible",
    url: "https://soundslikebrooks.bandcamp.com/",
    image: bandImage,
  },
  {
    title: "Skydive The Gulf With DankSwoops",
    date: "Orange Beach, AL. Afternoon Thursday 17th in the sky.",
    description:
      "Do people actually believe Dank can do sky-diving? You Americans are more trusting than us Europoors. I’d sooner strap myself to a fridge and fuck myse lf out of a plane than to whatever creature calling itself DankSwoops any day. But you do you, whatever.",
    image: skydiveImage,
  },
  {
    title: "Dining and bar-hopping",
    date: "1104 Dauphin St. Wednesday July 16th.",
    description:
      "Let loose on the streets of Mobile, Alabama. Get taken to all the best spots by bonafide locals. Leave shame, diggity and cares at the door and drink alcohol. Maybe something more. Sounds like it could get nasty very quickly. Good luck to all.",
    image: partyImage,
  },
  {
    title: "Beach Day!",
    date: "Orange Beach, AL. Morning Thursday, July 17th.",
    description:
      "Come to Orange Beach, AL in the morning to soak up the sun with fellow Nostr-users. Listen: sand, sea, sun, being out doors in general. All of that shit sucks but the pros are seeing your Nostr pals in their swim suits/budgie smugglers and filling the annual Vit D quota before we retreat back to our respective computer dungeons for the rest of the year. ",
    image: beachImage,
  },
  {
    title: "Virtual Reality!",
    date: "Orange Beach, AL. Morning Thursday, July 17th.",
    description:
      "Because God knows this one isn't up to much lately. Let's escape this oppressive 'reality' and find liberation, adventure and the true desires of our hearts in the VR Cafe. (Don't worry, it's right next door to a wine bar for true escape in the event the VR world doesn't work out).",
    image: vrImage,
  },
  // Duplicates from here on

  {
    title: "Nostr Talks",
    date: "The Haberdasher. Tuesday 14th July.",
    description:
      "It might be a tall order to justify four days of fun in Alabama to your workplace/significant other without some veneer of education or technical discussion so we've had to include some talks. We've ordered them to keep it short and sweet.",
    image: talkImage,
  },
  {
    title: "Live Music With Brooks Hubber",
    date: "The Haberdasher. Tuesday 14th July.",
    description:
      "Brooks Hubbert III is a musician, singer and songwriter from Pensacola, Florida. At a time when so many acts insist their sound cannot be categorized, Hubbert manages to effortlessly span genres including psychedelic rock, reggae, blues, country, and bluegrass in the creation of music that is both technically impressive and easily accessible",
    url: "https://soundslikebrooks.bandcamp.com/",
    image: bandImage,
  },
  {
    title: "Skydive The Gulf With DankSwoops",
    date: "Orange Beach, AL. Afternoon Thursday 17th in the sky.",
    description:
      "Do people actually believe Dank can do sky-diving? You Americans are more trusting than us Europoors. I’d sooner strap myself to a fridge and fuck myse lf out of a plane than to whatever creature calling itself DankSwoops any day. But you do you, whatever.",
    image: skydiveImage,
  },
  {
    title: "Dining and bar-hopping",
    date: "1104 Dauphin St. Wednesday July 16th.",
    description:
      "Let loose on the streets of Mobile, Alabama. Get taken to all the best spots by bonafide locals. Leave shame, diggity and cares at the door and drink alcohol. Maybe something more. Sounds like it could get nasty very quickly. Good luck to all.",
    image: partyImage,
  },
  {
    title: "Beach Day!",
    date: "Orange Beach, AL. Morning Thursday, July 17th.",
    description:
      "Come to Orange Beach, AL in the morning to soak up the sun with fellow Nostr-users. Listen: sand, sea, sun, being out doors in general. All of that shit sucks but the pros are seeing your Nostr pals in their swim suits/budgie smugglers and filling the annual Vit D quota before we retreat back to our respective computer dungeons for the rest of the year. ",
    image: beachImage,
  },
  {
    title: "Virtual Reality!",
    date: "Orange Beach, AL. Morning Thursday, July 17th.",
    description:
      "Because God knows this one isn't up to much lately. Let's escape this oppressive 'reality' and find liberation, adventure and the true desires of our hearts in the VR Cafe. (Don't worry, it's right next door to a wine bar for true escape in the event the VR world doesn't work out).",
    image: vrImage,
  },
];

export const FAQS: FAQ[] = [
  {
    question: "How do I book a ticket?",
  },
];
