// react native
import { Image, Pressable } from "react-native";

// expo
import { Link } from "expo-router";

export default function PixaBayBanner() {
  return (
    <Link href="https://pixabay.com" asChild>
      <Pressable>
        <Image source={require("@/assets/images/pixabay-banner.png")} />
      </Pressable>
    </Link>
  );
}
