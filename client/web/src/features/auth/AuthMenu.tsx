import { Group, GroupProps, NativeSelect, Text } from "@mantine/core";
import { useAuthContext } from "./AuthContext";

export function AuthMenu(props: Partial<GroupProps>) {
  const { customerId, setCustomerId } = useAuthContext();

  return (
    <Group {...props}>
      <Text size="sm">Signed in as:</Text>
      <NativeSelect
        aria-label="Select current user"
        id="userSelect"
        data={["customer-1", "customer-2", "customer-3"]}
        value={customerId}
        onChange={(value) => {
          // Update auth context
          setCustomerId(value.currentTarget.value);
        }}
      />
    </Group>
  );
}
