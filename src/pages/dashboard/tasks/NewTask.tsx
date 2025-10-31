import DatePickerInput from '@/src/components/DatePickerInput';
import Grid from '@/src/components/Grid/Grid';
import ImageDropzone from '@/src/components/ImageDropzone';
import Priority from '@/src/components/Priority';
import TextInput from '@/src/components/TextInput';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { Form, useActionData, type ActionFunctionArgs } from 'react-router';

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

const TitleInput = styled(TextInput)`
  width: calc(50% - var(--grid-gap));
`;

const DateInput = styled(DatePickerInput)`
  width: calc(50% - var(--grid-gap));
`;

const DescriptionTextInput = styled(TextInput)`
  & textarea {
    height: 155px;
  }
`;

const ValidatorMessages = {
  isRequired: (field: string) => `${field} field is required`,
};

type ValidatorResultType = {
  value: FormDataEntryValue | string | null;
  error: string | null;
};

class Validators {
  private static text(value: string | undefined, name: string) {
    const newValue = !value ? '' : value.trim();

    if (newValue.length === 0) {
      return {
        error: ValidatorMessages.isRequired(name),
        value: newValue,
      };
    }

    return {
      error: null,
      value: newValue,
    };
  }

  static title(value: string | undefined) {
    return this.text(value, 'Title');
  }

  static description(value: string | undefined) {
    return this.text(value, 'Description');
  }
}

type formActionResultType<T extends string = string> = Record<
  T,
  ValidatorResultType
>;

const FIELDS = ['title', 'description'] as const;

type FieldsType = (typeof FIELDS)[number];

export const formAction: ({
  request,
}: ActionFunctionArgs<any>) => Promise<formActionResultType> = async ({
  request,
}) => {
  const formData = await request.formData();
  const result: formActionResultType = {};

  FIELDS.forEach((field) => {
    result[field] = Validators[field](formData.get(field) as any);
  });

  return result;
};

export const NewTask: React.FC = () => {
  const actionData = useActionData<formActionResultType<FieldsType>>();
  const [data, setData] = useState<typeof actionData>(actionData);

  useEffect(() => {
    setData(actionData);
  }, [actionData]);

  const resetError = (name: FieldsType) =>
    data && setData({ ...data, [name]: { ...data[name], error: null } });

  return (
    <Form method="POST">
      <Header />
      <Grid gap={20}>
        <Grid.Col span={12}>
          <TitleInput
            label="Title"
            name="title"
            onChange={() => resetError('title')}
            error={data && data.title.error}
          />
        </Grid.Col>
        <Grid.Col span={12}>
          <DateInput
            label="Date"
            name="date"
            error="This is an error message"
          />
        </Grid.Col>
        <Grid.Col span={12}>
          <Priority
            name="priority"
            label="Priority"
            error="This is a priority error"
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <DescriptionTextInput
            placeholder="Start writing here"
            label="Description"
            textarea={{ resizable: 'vertical' }}
            name="description"
            onChange={() => resetError('description')}
            error={data && data.description.error}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <ImageDropzone
            name="picture"
            label="Picture"
            error="This is an error"
            hint="Attach as many files as you like, each file should not exceed 5mb"
          />
        </Grid.Col>
      </Grid>
    </Form>
  );
};

export default NewTask;
