import { Flex } from "antd";
import { EditableTable } from "@/widgets/EditableTable";

export default function Home() {
  return (
    <Flex align="center" justify="center" className="pageCenter">
      <EditableTable />
    </Flex>
  );
}
