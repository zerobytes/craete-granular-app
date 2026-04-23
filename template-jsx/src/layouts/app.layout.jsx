import { state, after } from '@granularjs/core';
import { ActionIcon, AppBar, Button, Container, Text, Icon, setThemeMode, getThemeMode } from '@granularjs/ui';
import { router } from '../router.jsx';

export const AppLayout = (outlet) => {
  const themeMode = state(getThemeMode());

  const toggleTheme = () => {
    setThemeMode(themeMode.get() === 'light' ? 'dark' : 'light');
    themeMode.set(getThemeMode());
  };

  const themeIcon = after(themeMode).compute((mode) => (mode === 'light' ? 'brightness_5' : 'dark_mode'));

  return (
    <div className="app">
      <AppBar position="sticky">
        <Text size="lg" weight="bold">My Granular App</Text>
        <div style={{ flex: 1 }} />
        <ActionIcon onClick={toggleTheme}>
          <Icon>{themeIcon}</Icon>
        </ActionIcon>
        <Button variant="subtle" onClick={() => router.navigate('/')}>Home</Button>
        <Button variant="subtle" onClick={() => router.navigate('/about')}>About</Button>
      </AppBar>
      <Container size="md" style={{ paddingTop: '24px', paddingBottom: '48px' }}>
        {outlet}
      </Container>
    </div>
  );
};
