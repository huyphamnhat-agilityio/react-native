import { create } from "zustand";
import { LayoutChangeEvent, Dimensions } from "react-native";

type ScreenDimensionsState = {
  screenWidth: number;
  screenHeight: number;
  onLayout: (e: LayoutChangeEvent) => void;
};

export const useScreenDimensions = create<ScreenDimensionsState>((set) => ({
  screenWidth: Dimensions.get("window").width,
  screenHeight: Dimensions.get("window").height,

  onLayout: (e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout;
    set({ screenWidth: width, screenHeight: height });
  },
}));
