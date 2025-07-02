// other libraries
import { cssInterop } from "nativewind";
import Animated from "react-native-reanimated";
import Svg, { Path } from "react-native-svg";

// types
import type { ColorValue } from "react-native";
import type { AnimatedProps, SharedValue } from "react-native-reanimated";
import type { PathProps, SvgProps } from "react-native-svg";

interface CheckCircleProps extends SvgProps {
  animatedSvgProps?: AnimatedProps<SvgProps>;
  animatedPathProps?: AnimatedProps<PathProps>;
  fillSharedValue?: SharedValue<ColorValue | undefined>;
}

// Create styled versions of both the svg and the path components (for components that expect style attributes as props)
const StyledSvg = cssInterop(Svg, { className: { target: false, nativeStyleToProp: { height: true, width: true } } });
const StyledPath = cssInterop(Path, { className: { target: false, nativeStyleToProp: { fill: true, stroke: true } } });

// Create animated versions of both the svg and the path components
const AnimatedSvg = Animated.createAnimatedComponent(StyledSvg);
const AnimatedPath = Animated.createAnimatedComponent(StyledPath);

export default function CheckCircle({ animatedSvgProps, animatedPathProps, fillSharedValue, ...props }: CheckCircleProps) {
  return (
    <AnimatedSvg viewBox="0 0 24 24" width={24} height={24} {...props} {...(animatedSvgProps && { animatedProps: animatedSvgProps })}>
      <AnimatedPath
        fillRule="evenodd"
        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
        clipRule="evenodd"
        {...(animatedPathProps && { animatedProps: animatedPathProps })}
        fill={fillSharedValue}
      />
    </AnimatedSvg>
  );
}
