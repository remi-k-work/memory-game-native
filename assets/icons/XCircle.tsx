// other libraries
import { cssInterop } from "nativewind";
import Animated from "react-native-reanimated";
import Svg, { Path } from "react-native-svg";

// types
import type { ColorValue } from "react-native";
import type { AnimatedProps, SharedValue } from "react-native-reanimated";
import type { PathProps, SvgProps } from "react-native-svg";

interface XCircleProps extends SvgProps {
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

export default function XCircle({ animatedSvgProps, animatedPathProps, fillSharedValue, ...props }: XCircleProps) {
  return (
    <AnimatedSvg viewBox="0 0 24 24" width={24} height={24} {...props} {...(animatedSvgProps && { animatedProps: animatedSvgProps })}>
      <AnimatedPath
        fillRule="evenodd"
        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
        clipRule="evenodd"
        {...(animatedPathProps && { animatedProps: animatedPathProps })}
        fill={fillSharedValue}
      />
    </AnimatedSvg>
  );
}
