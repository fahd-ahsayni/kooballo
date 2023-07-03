import chateau from "../assets/icons/chateau.png";
import wallet from "../assets/icons/wallet.png";
import order from "../assets/icons/cargo.png";
import support from "../assets/icons/support.png";
import share from "../assets/icons/network.png";
import logout from "../assets/icons/switch.png";

import ImageSlide1 from "../assets/swiper/01.png";
import ImageSlide2 from "../assets/swiper/02.png";
import ImageSlide3 from "../assets/swiper/03.png";


export const dataHeaderCards = [
  {
    navigate: "tanks",
    title: "Chateau",
    icon: chateau,
    color: "#0ea5e9",
  },
  {
    navigate: "orders",
    title: "Orders",
    icon: order,
    color: "#0ea5e9",
  },
  {
    navigate: "solde",
    title: "Solde",
    icon: wallet,
    color: "#0ea5e9",
  },
];

export const dataBottomCards = [
  {
    title: "LogOut",
    icon: logout,
    color: "#e11d48",
  },
  {
    navigate: "support",
    title: "Support",
    icon: support,
    color: "#0ea5e9",
  },
  {
    navigate: "share",
    title: "Share",
    icon: share,
    color: "#0ea5e9",
  },
];

const bgs = ["#be185d", "#ea580c", "#16a34a", "#0284c7", "#facc15"];

export const SliderData = [
  {
    img: ImageSlide1,
  },
  {
    img: ImageSlide2,
  },
  {
    img: ImageSlide3,
  },
];
