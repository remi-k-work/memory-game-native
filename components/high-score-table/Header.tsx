// react native
import { Text } from "react-native";

// components
import { TableHead, TableHeader, TableRow } from "@/components/ui/custom/table";

export default function Header() {
  return (
    <TableHeader>
      <TableRow>
        <TableHead className="w-1/5">
          <Text className="text-center font-bold text-foreground sm:text-lg md:text-xl lg:text-2xl">#</Text>
        </TableHead>
        <TableHead className="w-1/5">
          <Text className="text-center font-bold text-foreground sm:text-lg md:text-xl lg:text-2xl">Name</Text>
        </TableHead>
        <TableHead className="w-2/5">
          <Text className="text-center font-bold text-foreground sm:text-lg md:text-xl lg:text-2xl">Collection</Text>
        </TableHead>
        <TableHead className="w-1/5">
          <Text className="text-center font-bold text-foreground sm:text-lg md:text-xl lg:text-2xl">Turns</Text>
        </TableHead>
      </TableRow>
    </TableHeader>
  );
}
