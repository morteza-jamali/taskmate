import DatePickerInput from '@/src/components/DatePickerInput';
import Grid from '@/src/components/Grid/Grid';
import ImageDropzone from '@/src/components/ImageDropzone';
import Priority from '@/src/components/Priority';
import TextInput from '@/src/components/TextInput';
import { css } from '@emotion/react';
import React, { useActionState } from 'react';

const headerRootStyles = css`
  display: flex;
  justify-content: space-between;
  align-items: center;

  & > button {
    background-color: #12b886;
    border-radius: 4px;
    border: none;
    font-size: 14px;
    font-weight: 600;
    line-height: 14px;
    padding: 10px 15px;
    cursor: pointer;
    color: #fff;

    &:hover {
      background-color: #0ca678;
    }
  }
`;

const Header: React.FC = () => (
  <div css={headerRootStyles}>
    <h3>Add New Task</h3>
    <button type="submit">Create</button>
  </div>
);

const createNewTask = (_: any, queryData: FormData) => {
  console.log(queryData.get('priority'));
};

export const NewTask: React.FC = () => {
  const [message, formAction] = useActionState(createNewTask, null);

  return (
    <form action={formAction}>
      <Header />
      <Grid gap={20}>
        <Grid.Col span={8}>
          <TextInput label="Title" name="title" />
        </Grid.Col>
        <Grid.Col span={8}>
          <DatePickerInput label="Date" name="date" />
        </Grid.Col>
        <Grid.Col span={8}>
          <Priority name="priority" label="Priority" />
        </Grid.Col>
        <Grid.Col span={8}>
          <TextInput
            placeholder="Start writing here"
            label="Description"
            textarea
            name="description"
          />
        </Grid.Col>
        <Grid.Col span={4}>
          <ImageDropzone hint="Attach as many files as you like, each file should not exceed 5mb" />
        </Grid.Col>
      </Grid>
    </form>
  );
};

export default NewTask;
