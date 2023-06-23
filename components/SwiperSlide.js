import React, { useState, useEffect } from "react";
import { View, Dimensions,  ImageBackground, Image } from "react-native";
import Swiper from "react-native-swiper";
import Icon from "react-native-vector-icons/Ionicons";
import { SliderData } from "../data";
import { Skeleton } from "native-base";


const { height } = Dimensions.get("window");

export default function SwiperSlide() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <View style={{ marginBottom: -8, paddingHorizontal: 2 }}>
        <Skeleton height={height / 4} borderRadius="lg" />
      </View>
    );
  }

  return (
    <Swiper
      style={{ height: "100%" }}
      showsButtons={true}
      centeredSlides={true}
      showsPagination={false}
      loop={true}
      autoplay={true}
      autoplayTimeout={10}
      nextButton={<Icon name="chevron-forward" size={28} color="#fff" />}
      prevButton={<Icon name="chevron-back" size={28} color="#fff" />}
    >
      {SliderData.map(({ img }, key) => (
        <Image
          key={key}
          className="rounded-lg h-full w-full"
          source={img}
          style={{ resizeMode: "cover" }}
        />
      ))}
    </Swiper>
  );
}
