import { state, after, when } from '@granularjs/core';
import { Button, Flex, Stack, Text, TextInput, Icon, ActionIcon, Chip, List } from '@granularjs/ui';
import { todoStore, toggleTodo, removeTodo, moveTodoUp, moveTodoDown } from '../stores/todo.store.js';

export const TodoItem = (todo, index) => {
  const input = state(null);
  const editing = state(false);
  const temporaryText = state(todo.text);

  const edit = () => {
    editing.set(!editing.get());
    if (editing.get()) input.get().focus();
  };
  const toggle = () => toggleTodo(todo.get().id);
  const remove = () => removeTodo(todo.get().id);
  const save = () => {
    todo.set().text = temporaryText.get();
    editing.set(false);
  };
  const cancel = () => {
    temporaryText.set(todo.text);
    editing.set(false);
  };

  const canMoveUp = after(index).compute((i) => i > 0);
  const canMoveDown = after(index).compute((i) => i < todoStore.length - 1);
  const chipColor = after(todo.done).compute((done) => (done ? 'success' : 'primary'));

  return List.Item({
    title: when(
      editing,
      () => <TextInput node={input} value={temporaryText} size="sm" />,
      () => (
        <Stack gap="xs">
          {when(
            todo.done,
            () => <Text color="muted" decoration="line-through">{todo.text}</Text>,
            () => <Text>{todo.text}</Text>,
          )}
          <Flex gap="sm" onDblClick={edit}>
            <Text color="muted" size="xs">Created at: {todo.createdAt}</Text>
            {when(todo.updatedAt, () => <Text color="muted" size="xs">Updated at: {todo.updatedAt}</Text>)}
          </Flex>
        </Stack>
      ),
    ),
    leftSection: (
      <Flex gap="sm">
        <div style={{ width: '22px' }}>
          {when(todo.done, () => <Icon color="success">check</Icon>)}
        </div>
        <Chip color={chipColor}>{todo.id}</Chip>
      </Flex>
    ),
    rightSection: when(
      editing,
      () => (
        <Flex gap="sm">
          <Button color="success" size="xs" onClick={save} leftSection={<Icon>edit</Icon>}>Save</Button>
          <Button color="danger" size="xs" onClick={cancel} leftSection={<Icon>cancel</Icon>}>Cancel</Button>
        </Flex>
      ),
      () => (
        <Flex gap="sm">
          {when(canMoveDown,
            () => <ActionIcon variant="outline" onClick={() => moveTodoDown(todo.get().id)}><Icon>arrow_downward</Icon></ActionIcon>,
            () => null,
          )}
          {when(canMoveUp,
            () => <ActionIcon variant="outline" onClick={() => moveTodoUp(todo.get().id)}><Icon>arrow_upward</Icon></ActionIcon>,
            () => null,
          )}
          {when(todo.done,
            () => <ActionIcon color="warning" onClick={toggle}><Icon>cancel</Icon></ActionIcon>,
            () => <ActionIcon color="success" onClick={toggle}><Icon>check_circle</Icon></ActionIcon>,
          )}
          <ActionIcon color="primary" onClick={edit}><Icon>edit</Icon></ActionIcon>
          <ActionIcon color="danger" onClick={remove}><Icon>delete</Icon></ActionIcon>
        </Flex>
      ),
    ),
    withBorder: true,
  });
};
