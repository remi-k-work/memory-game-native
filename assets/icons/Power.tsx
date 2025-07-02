// other libraries
import { cssInterop } from "nativewind";
import Animated from "react-native-reanimated";
import Svg, { Path } from "react-native-svg";

// types
import type { ColorValue } from "react-native";
import type { AnimatedProps, SharedValue } from "react-native-reanimated";
import type { PathProps, SvgProps } from "react-native-svg";

interface PowerProps extends SvgProps {
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

export default function Power({ animatedSvgProps, animatedPathProps, fillSharedValue, ...props }: PowerProps) {
  return (
    <AnimatedSvg viewBox="0 0 24 24" width={24} height={24} {...props} {...(animatedSvgProps && { animatedProps: animatedSvgProps })}>
      <AnimatedPath
        fillRule="evenodd"
        d="M12 2.25a.75.75 0 0 1 .75.75v9a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM6.166 5.106a.75.75 0 0 1 0 1.06 8.25 8.25 0 1 0 11.668 0 .75.75 0 1 1 1.06-1.06c3.808 3.807 3.808 9.98 0 13.788-3.807 3.808-9.98 3.808-13.788 0-3.808-3.807-3.808-9.98 0-13.788a.75.75 0 0 1 1.06 0Z"
        clipRule="evenodd"
        {...(animatedPathProps && { animatedProps: animatedPathProps })}
        fill={fillSharedValue}
      />
    </AnimatedSvg>
  );
}
