// components
import BodyScrollView from "@/components/BodyScrollView";
import FlippingTitle from "@/components/FlippingTitle";
import HighScoreTabs from "@/components/HighScoreTabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/custom/card";

export default function Screen() {
  return (
    <BodyScrollView>
      <Card>
        <CardHeader>
          <CardTitle>
            <FlippingTitle icon="Trophy" text="Hall of Fame" />
          </CardTitle>
          <CardDescription>High Scores</CardDescription>
        </CardHeader>
        <CardContent className="bg-transparent">
          <HighScoreTabs />
        </CardContent>
      </Card>
    </BodyScrollView>
  );
}
