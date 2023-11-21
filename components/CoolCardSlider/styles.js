import { StyleSheet, Dimensions, useColorScheme } from "react-native";
export const { width } = Dimensions.get("window");

export const paddingHorizontal = 20;
export const WIDTH = width - paddingHorizontal * 2;
export const HEIGHT = 100;

export const strokeWidth = 10;
export const radius = 20;
export const borderLength = WIDTH * 2 + HEIGHT * 2 - 65;

export const BALL_SIZES = { SMALL: 40, LARGE: 60 };
export const WAVE_RADIUS = { SMALL: 40, LARGE: 70 };
export const cardRadius = 20;

// export const cardColor = "#1f2c34";
// export const ballColor = "#1f2c34";

export default StyleSheet.create({});
