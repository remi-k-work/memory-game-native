// other libraries
import { cssInterop } from "nativewind";
import Animated from "react-native-reanimated";
import Svg, { Path } from "react-native-svg";

// types
import type { ColorValue } from "react-native";
import type { AnimatedProps, SharedValue } from "react-native-reanimated";
import type { PathProps, SvgProps } from "react-native-svg";

interface StarProps extends SvgProps {
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

export default function Star({ animatedSvgProps, animatedPathProps, fillSharedValue, ...props }: StarProps) {
  return (
    <AnimatedSvg viewBox="0 0 24 24" width={24} height={24} {...props} {...(animatedSvgProps && { animatedProps: animatedSvgProps })}>
      <AnimatedPath
        fillRule="evenodd"
        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
        clipRule="evenodd"
        {...(animatedPathProps && { animatedProps: animatedPathProps })}
        fill={fillSharedValue}
      />
    </AnimatedSvg>
  );
}
