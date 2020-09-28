import React, { FC } from "react";
import Yup from "src/utils/validatorUtils";
import { Button, Form } from "semantic-ui-react";
import { FormikInputFieldWithError } from "src/utils/formUtils";
import { Formik, FormikProps } from "formik";

type LoginFormValues = {
  email: string;
  password: string;
};

type OwnProps = {
  loading?: boolean;
  initialValues?: LoginFormValues;
  onSubmit: (values: LoginFormValues) => void;
};
type Props = OwnProps;

const LoginForm: FC<Props> = (props: Props & FormikProps<LoginFormValues>) => {
  const { loading } = props;

  return (
    <div className="form-wrapper" style={{ height: "100%" }}>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validateOnBlur={false}
        validateOnChange
        validationSchema={Yup.object().shape<LoginFormValues>({
          email: Yup.string()
            .required("Email is required")
            .email("Email is wrong"),
          password: Yup.string().required("Password is required"),
        })}
        onSubmit={(values) => {
          props.onSubmit(values);
        }}
      >
        {({ handleSubmit }) => (
          <Form
            noValidate
            size="large"
            onSubmit={handleSubmit}
            loading={loading}
          >
            <FormikInputFieldWithError
              defaultValue=""
              autoComplete="email"
              inlineError
              name="email"
              type="email"
              placeholder="Email"
            />

            <FormikInputFieldWithError
              inlineError
              defaultValue=""
              autoComplete="password"
              name="password"
              type="password"
              placeholder="Password"
            />
            <Button
              color="teal"
              fluid
              size="large"
              type="submit"
              disabled={loading}
            >{`Login`}</Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
