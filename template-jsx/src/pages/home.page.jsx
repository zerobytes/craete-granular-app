import { state, list } from '@granularjs/core';
import { Button, Stack, Text, Title, TextInput, Flex, List } from '@granularjs/ui';
import { todoStore, addTodo } from '../stores/todo.store.js';
import { TodoItem } from '../components/todo-item.component.jsx';

export const Home = () => {
  const task = state('');

  const add = () => {
    const text = task.get().trim();
    if (text === '') return;
    addTodo(text);
    task.set('');
  };

  return (
    <Stack gap="xl">
      <Title order={1} className="wellcome">Welcome to Granular</Title>
      <Text size="lg" color="muted">
        A JS-first framework with granular reactivity. No VDOM, JSX optional via @granularjs/jsx.
      </Text>
      <Stack gap="md">
        <Title order={4}>Task List</Title>
        <Flex direction="row" gap="sm" align="end">
          <TextInput placeholder="Type your task..." value={task} />
          <Button onClick={add}>Add</Button>
        </Flex>
        <List>
          {list(todoStore, TodoItem)}
        </List>
      </Stack>
    </Stack>
  );
};
