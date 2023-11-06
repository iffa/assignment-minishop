import { Anchor, AppShell, Burger, Group, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Link, Outlet, useLocation } from "react-router-dom";
import { AuthMenu } from "./features/auth/AuthMenu";

export function NavLinks() {
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/" && (
        <Anchor component={Link} to="/">
          Back to shop
        </Anchor>
      )}
      {location.pathname !== "/orders" && (
        <Anchor component={Link} to="/orders">
          My orders
        </Anchor>
      )}
    </>
  );
}

export function Layout() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 64 }}
      padding="md"
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { desktop: true, mobile: !opened },
      }}
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between" wrap="nowrap">
          <Group>
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />
            <Title order={1}>Minishop</Title>
          </Group>
          <AuthMenu visibleFrom="sm" />
          <Group visibleFrom="sm">
            <NavLinks />
          </Group>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar px="md" py="md">
        <AuthMenu />
        <NavLinks />
      </AppShell.Navbar>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
