import { useField } from "formik";
//import type { DatePickerProps } from "react-datepicker";
import { DatePicker } from "react-datepicker";
import { Form, Label } from "semantic-ui-react";

interface Props {
  name: string;
  [key: string]: unknown;
}

export default function MyDateInput({ name, ...rest }: Props) {
  const [field, meta, helpers] = useField(name || "");
  return (
    <Form.Field error={meta.touched && !!meta.error}>
      <DatePicker
        //{...field}
        {...rest}
        name={name}
        selected={(field.value && new Date(field.value)) || null}
        onChange={(value) => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
      />
      {meta.touched && meta.error ? (
        <Label basic color="red" style={{ marginTop: "7.5px" }}>
          {meta.error}
        </Label>
      ) : null}
    </Form.Field>
  );
}
