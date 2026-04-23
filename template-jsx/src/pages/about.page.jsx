import { Stack, Title, Text, List, Anchor, Card } from '@granularjs/ui';

export const About = () => {
  return (
    <Stack gap="xl">
      <Title order={1}>About Granular</Title>
      <Text size="lg" color="muted">
        Granular is a modern JavaScript framework built for performance and simplicity.
      </Text>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Stack gap="md">
          <Title order={3}>Key Features</Title>
          <List type="ordered">
            {List.Item('JS-first UI: DOM tags are functions')}
            {List.Item('Granular updates: only changed nodes update')}
            {List.Item('Explicit reactivity: signal, state, after, before, context, computed, persist, observableArray')}
            {List.Item('JSX optional via @granularjs/jsx (this template), or pure JS factories')}
            {List.Item('No build required for runtime: pure ESM (build only for JSX/CSS pipelines)')}
            {List.Item('Zero dependency overhead')}
          </List>
        </Stack>
      </Card>
      <Text color="muted">
        Learn more at <Anchor href="https://granular.web.app" target="_blank">granular.web.app</Anchor>
      </Text>
    </Stack>
  );
};
