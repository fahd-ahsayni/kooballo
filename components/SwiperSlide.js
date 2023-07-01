import React, { useState, useEffect } from 'react';
import { View, Dimensions, Image } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { SliderData } from "../data";
import { Skeleton } from "native-base";

const { height } = Dimensions.get("window");

const FadeInView = Animatable.createAnimatableComponent(View);

export default function FadeSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) =>
        prevIndex === SliderData.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change images every 5 seconds

    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <View style={{ marginBottom: -8, paddingHorizontal: 2 }}>
        <Skeleton height={height / 4} borderRadius="lg" />
      </View>
    );
  }

  return (
    <View className="w-full h-full">
      {SliderData.map(({ img }, index) => (
        <FadeInView
          key={index}
          style={{ padding: 10, position: 'absolute', height: '100%', width: '100%' }}
          useNativeDriver
          animation={activeIndex === index ? 'fadeIn' : 'fadeOut'}
          duration={500}
          easing="ease-out"
          iterationCount={1}
        >
          <Image
            source={img}
            style={{ resizeMode: "cover", height: '100%', width: '100%' }}
            className="rounded-lg"
          />
        </FadeInView>
      ))}
    </View>
  );
}
