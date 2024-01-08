import { useState } from 'react';
import { Center, Tooltip, UnstyledButton, Stack, rem, Button, useMantineColorScheme } from '@mantine/core';
import {
  IconHome2,
  IconGauge,
  IconDeviceDesktopAnalytics,
  IconFingerprint,
  IconCalendarStats,
  IconUser,
  IconSettings,
  IconLogout,
  IconSwitchHorizontal,
  IconUsers,
} from '@tabler/icons-react';
import classes from './NavbarMinimal.module.css';
import { Link, useLocation } from 'react-router-dom';
import { ActionToggle } from '../ActionToggle/ActionToggle';

interface NavbarLinkProps {
  label: string;
  link: string;
  icon: React.ElementType;
  onclick?: () => void
}

function NavbarLink({ icon: Icon, label, link }: NavbarLinkProps) {
  const location = useLocation();

  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
      <Link to={link}>
        <UnstyledButton className={`${classes.link} ${location.pathname === link ? classes.active : ''}`}>
          <Icon style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
        </UnstyledButton>
      </Link>
    </Tooltip>
  );
}

const routes: NavbarLinkProps[] = [
  { icon: IconHome2, label: 'Home', link: '/' },
  { icon: IconUser, label: 'Jogadores', link: '/jogadores' },
  { icon: IconUsers, label: 'Duplas', link: '/duplas' },
  { icon: IconCalendarStats, label: 'Jogos', link: '/jogos' },
  { icon: IconDeviceDesktopAnalytics, label: 'Análises', link: '/analises' },
  { icon: IconFingerprint, label: 'Segurança', link: '/seguranca' },
  { icon: IconSettings, label: 'Settings', link: '/settings' },
];

export function NavbarMinimal() {

  return (
    <nav className={classes.navbar}>
      <Center>
      </Center>

      <div className={classes.navbarMain}>
        <Stack justify="center" gap={0}>
          {routes.map((link) => (
            <NavbarLink key={link.label} {...link} />
          ))}
        </Stack>
        <ActionToggle/>
      </div>

      <Stack justify="center" gap={0}>
        <NavbarLink icon={IconSwitchHorizontal} label="Change account" link="/change-account" />
        <NavbarLink icon={IconLogout} label="Logout" link="/logout" />
      </Stack>
    </nav>
  );
}
