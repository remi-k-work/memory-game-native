// react native
import { Text } from "react-native";

// components
import { TableHead, TableHeader, TableRow } from "@/components/ui/custom/table";

export default function Header() {
  return (
    <TableHeader>
      <TableRow>
        <TableHead className="w-1/5">
          <Text className="text-center font-bold text-foreground">#</Text>
        </TableHead>
        <TableHead className="w-1/5">
          <Text className="text-center font-bold text-foreground">Name</Text>
        </TableHead>
        <TableHead className="w-2/5">
          <Text className="text-center font-bold text-foreground">Collection</Text>
        </TableHead>
        <TableHead className="w-1/5">
          <Text className="text-center font-bold text-foreground">Turns</Text>
        </TableHead>
      </TableRow>
    </TableHeader>
  );
}
