// other libraries
import { cssInterop } from "nativewind";
import Animated from "react-native-reanimated";
import Svg, { Path } from "react-native-svg";

// types
import type { ColorValue } from "react-native";
import type { AnimatedProps, SharedValue } from "react-native-reanimated";
import type { PathProps, SvgProps } from "react-native-svg";

interface WrenchScrewDriverProps extends SvgProps {
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

export default function WrenchScrewDriver({ animatedSvgProps, animatedPathProps, fillSharedValue, ...props }: WrenchScrewDriverProps) {
  return (
    <AnimatedSvg viewBox="0 0 24 24" width={24} height={24} {...props} {...(animatedSvgProps && { animatedProps: animatedSvgProps })}>
      <AnimatedPath
        fillRule="evenodd"
        d="M12 6.75a5.25 5.25 0 0 1 6.775-5.025.75.75 0 0 1 .313 1.248l-3.32 3.319c.063.475.276.934.641 1.299.365.365.824.578 1.3.64l3.318-3.319a.75.75 0 0 1 1.248.313 5.25 5.25 0 0 1-5.472 6.756c-1.018-.086-1.87.1-2.309.634L7.344 21.3A3.298 3.298 0 1 1 2.7 16.657l8.684-7.151c.533-.44.72-1.291.634-2.309A5.342 5.342 0 0 1 12 6.75ZM4.117 19.125a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75h-.008a.75.75 0 0 1-.75-.75v-.008Z"
        clipRule="evenodd"
        {...(animatedPathProps && { animatedProps: animatedPathProps })}
        fill={fillSharedValue}
      />
      <AnimatedPath
        d="m10.076 8.64-2.201-2.2V4.874a.75.75 0 0 0-.364-.643l-3.75-2.25a.75.75 0 0 0-.916.113l-.75.75a.75.75 0 0 0-.113.916l2.25 3.75a.75.75 0 0 0 .643.364h1.564l2.062 2.062 1.575-1.297Z"
        {...(animatedPathProps && { animatedProps: animatedPathProps })}
        fill={fillSharedValue}
      />
      <AnimatedPath
        fillRule="evenodd"
        d="m12.556 17.329 4.183 4.182a3.375 3.375 0 0 0 4.773-4.773l-3.306-3.305a6.803 6.803 0 0 1-1.53.043c-.394-.034-.682-.006-.867.042a.589.589 0 0 0-.167.063l-3.086 3.748Zm3.414-1.36a.75.75 0 0 1 1.06 0l1.875 1.876a.75.75 0 1 1-1.06 1.06L15.97 17.03a.75.75 0 0 1 0-1.06Z"
        clipRule="evenodd"
        {...(animatedPathProps && { animatedProps: animatedPathProps })}
        fill={fillSharedValue}
      />
    </AnimatedSvg>
  );
}
