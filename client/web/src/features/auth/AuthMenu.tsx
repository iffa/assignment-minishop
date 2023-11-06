import { Group, GroupProps, Select, Text } from "@mantine/core";
import { useAuthContext } from "./AuthContext";

export function AuthMenu(props: Partial<GroupProps>) {
  const { customerId, setCustomerId } = useAuthContext();

  return (
    <Group {...props}>
      <Text size="sm">Signed in as:</Text>
      <Select
        clearable={false}
        allowDeselect={false}
        data={["customer-1", "customer-2", "customer-3"]}
        value={customerId}
        onChange={(value) => {
          // Invalid selection, do nothing
          if (!value) {
            return;
          }

          // Update auth context
          setCustomerId(value);
        }}
      />
    </Group>
  );
}
