import styled from "@emotion/styled";
import classNames from "classnames";
import {ErrorMessage, Field, FieldProps, getIn} from "formik";
import React, {FC, ReactElement, SyntheticEvent} from "react";
import ReactSelect from "react-select";
import {Props as ReactSelectProps} from "react-select/base";
import {Button, Card, CardProps, Checkbox, CheckboxProps, Dropdown, DropdownProps, Form, FormCheckboxProps, FormFieldProps, IconProps, Image, Input, InputOnChangeData, InputProps, Message, MessageProps, Rating, RatingProps, Select, SelectProps, SemanticICONS, TextArea, TextAreaProps} from "semantic-ui-react";
import {isNill} from "./appUtils";
{/* import { dateUtils } from "./date"; */}
{/* import JoditEditor from "jodit-react"; */}

export function createErrorMessage({
  name,
  dirty,
  touched,
  errors
}: MessageProps) {
  return (
    dirty &&
    touched[name] && (
      <Message
        error={!errors[name]}
        negative
        content={errors[name]}
        header={name.toUpperCase()}
      />
    )
  );
}
const objectPath = (obj: any, path: string) =>
  (path || "").split(".").reduce((p, c) => (p && p[c]) || null, obj);

const safeName = (name: string) =>
  name.toLowerCase().replace(/[\s.,@#~><]+/gi, "-");

export function createFormField({ dirty, touched, errors }: FormFieldProps) {
  return ({ name, ...rest }: FormFieldProps) => (
    <div key={name}>
      <Form.Field error={!!errors[name]}>
        <label>{name}</label>
        <Field
          name={name}
          {...rest}
          className={classNames({
            dirty,
            test: true,
            touched: touched[name]
          })}
        />
      </Form.Field>
      {createErrorMessage({ name, dirty, touched, errors })}
    </div>
  );
}

export function fsInputField({
  touched,
  errors,
  values,
  handleBlur,
  handleChange
}: FormFieldProps) {
  return ({ name, type, ...rest }: FormFieldProps) => {
    return (
      <Form.Field
        name={name}
        control={Input}
        type={type}
        error={touched && touched[name] && !!errors[name]}
        onChange={handleChange}
        onBlur={handleBlur}
        value={values[name]}
        {...rest}
      />
    );
  };
}

export const formikInputProps = (name: string) => {
  return (
    props: FormFieldProps & { errorUntouched?: boolean; inlineError?: boolean }
  ) => {
    const {
      onChange,
      handleChange,
      handleBlur,
      setFieldValue,
      values,
      errors,
      touched
      // errorUntouched
    } = props;
    const value = objectPath(values, name);
    // const error = objectPath(errors, name);
    // const touch = errorUntouched || objectPath(touched, name);
    return {
      autoComplete: name,
      control: Input,
      error: touched[name] && !!errors[name],
      iconPosition: "left",
      id: name.toLowerCase().replace(/\s/gi, "-"),
      name,
      onBlur: handleBlur,
      onChange: (e: any, data: any) => {
        const { value: val } = data;
        if (onChange) {
          onChange(val);
        }
        handleChange(e);
        setFieldValue(name, val);
        // setTimeout(() => setFieldValue(name, val), 100);
      },
      value: value || ""
    };
  };
};

export const formikCheckboxProps = (name: string) => ({
  handleBlur,
  values,
  errors,
  id,
  inverted,
  onChange,
  setFieldValue
}: FormFieldProps & { inverted?: boolean }) => {
  const invert = typeof inverted !== "undefined" ? inverted : false;
  const value = objectPath(values, name);
  const nextValue = invert ? !value : !!value;
  const error = objectPath(errors, name);
  return {
    autoComplete: name,
    checked: nextValue,
    control: Checkbox,
    error: !!error,
    id: id || safeName(name),
    name,
    onBlur: handleBlur,
    onChange: (
      _e: React.FormEvent<HTMLElement>,
      checkboxProps: CheckboxProps
    ) => {
      const { checked } = checkboxProps;
      const nextCheck = invert ? !checked : checked;
      setFieldValue(name, nextCheck);
      setTimeout(() => setFieldValue(name, nextCheck), 100);
      if(onChange) {
        onChange(_e, checkboxProps);
      }
    }
  };
};

export const formikCheckboxStarProps = (name: string) => ({
  values,
  errors,
  id,
  setFieldValue
}: FormFieldProps) => {
  const value = objectPath(values, name);
  const error = objectPath(errors, name);
  return {
    autoComplete: name,
    checked: !!value,
    control: Rating,
    error: !!error,
    id: id || safeName(name),
    name,
    onRate: (_e: React.FormEvent<HTMLElement>, props: RatingProps) => {
      const { rating } = props;
      const val = rating === 0 ? false : true;
      setFieldValue(name, val);
      setTimeout(() => setFieldValue(name, val), 100);
    }
  };
};

export const formikCheckboxGroupProps = (
  name: string,
  fieldValue: string | number | boolean
) => ({
  handleBlur,
  values,
  errors,
  touched,
  onCheckedChange,
  defaultValues,
  id,
  setFieldTouched,
  setFieldValue
}: FormFieldProps) => {
  const value = objectPath(values, name);
  const touch = getIn(touched, name);
  const fieldValues = Array.isArray(value)
    ? value
    : isNill(value)
    ? defaultValues || []
    : [value];
  const error = objectPath(errors, name);

  if (!touch && isNill(value) && !isNill(defaultValues)) {
    setTimeout(() => {
      setFieldValue(name, defaultValues);
    });
  }
  const isChecked = (fieldValues || []).includes(fieldValue);

  return {
    autoComplete: name,
    checked: isChecked,
    control: Checkbox,
    error: !!error,
    id: id || safeName(name),
    name,
    onBlur: handleBlur,
    onChange: (
      _: React.FormEvent<HTMLElement>,
      checkboxProps: CheckboxProps
    ) => {
      const { checked, value: cValue } = checkboxProps;
      const nextValues = checked
        ? [...fieldValues, cValue]
        : fieldValues.filter((v: any) => v !== cValue);
      setFieldValue(name, nextValues);
      setFieldTouched(name, true);
      if (onCheckedChange) {
        onCheckedChange(name, nextValues);
      }
      setTimeout(() => {
        setFieldValue(name, nextValues);
        setFieldTouched(name, true);
      }, 100);
    }
  };
};

export const formikMultipleSelectProps = (name: string) => (
  {
    values,
    errors,
    setFieldValue,
    touched,
    onChange,
    onSearchChange,
    errorUntouched = false
  }: DropdownProps & { errorUntouched?: boolean },
  ownProps: DropdownProps
) => {
  // const value = objectPath(values, name);
  const error = objectPath(errors, name);
  const touch = errorUntouched || objectPath(touched, name);
  const res = {
    ...ownProps,
    autoComplete: name,
    control: Dropdown,
    error: !!touch && !!error,
    id: safeName(name),
    name,
    onBlur: null,
    onChange: (e: React.FormEvent<HTMLElement>, data: DropdownProps) => {
      const { value } = data;
      // console.log(data);
      if (onChange) {
        onChange(e, data);
      }
      setFieldValue(name, value);
      setTimeout(() => setFieldValue(name, value), 100);
    },
    onSearchChange,
    value: values[name]
  };
  return res;
};

export const formikSelectProps = (name: string) => ({
  values,
  errors,
  setFieldValue,
  touched,
  onChange,
  onSearchChange,
  errorUntouched = false
}: SelectProps & { errorUntouched: boolean }) => {
  const error = objectPath(errors, name);
  const touch = errorUntouched || objectPath(touched, name);
  return {
    autoComplete: name,
    control: Select,
    error: !!touch && !!error,
    id: name.toLowerCase().replace(/\s/gi, "-"),
    name,
    onBlur: null,
    onChange: (e: React.FormEvent<HTMLElement>, data: SelectProps) => {
      const { value } = data;
      setFieldValue(name, value);
      setTimeout(() => setFieldValue(name, value), 20);
      if (onChange) {
        onChange(e, data);
      }
    },
    onSearchChange,
    value: values[name]
  };
};

type FormikReactSelectPropsType = {
  name: string;
  errorUntouched?: boolean;
} & FormFieldProps &
  ReactSelectProps<{ value: string; label: string }>;

export const formikReactSelectProps = (name: string) => (
  props: FormikReactSelectPropsType
) => {
  // const { errors, setFieldValue, onChange, focusOption }: FormikReactSelectPropsType = props;
  const {
    errors,
    setFieldValue,
    onChange,
    options,
    isMulti,
    values,
    focusOption
  }: // errorUntouched
  // touched
  FormikReactSelectPropsType = props;
  const elValue = objectPath(values, name);
  let selectedOptions: string | any[] = "";

  if (Array.isArray(options) && isMulti && Array.isArray(elValue)) {
    selectedOptions = (options as any).filter(
      (o: any) => elValue.findIndex(e => e === o.value) !== -1
    );
  }

  if (Array.isArray(options) && !isMulti && elValue) {
    selectedOptions = (options as any).find((o: any) => elValue === o.value);
  }
  const error = objectPath(errors, name);

  return {
    autoComplete: name,
    control: ReactSelect,
    error: !!error,
    focusOption,
    id: safeName(name),
    ...props,
    name,
    onBlur: null,
    onChange: (e: any) => {
      const value = e ? (Array.isArray(e) ? e.map(v => v.value) : e.value) : "";
      if (onChange) {
        onChange(e, value);
      }
      setFieldValue(name, value);
      setTimeout(() => setFieldValue(name, value), 100);
    },
    styles: {
      control: (styles: any) => ({
        ...styles,
        backgroundColor: "none"
      })
    },
    // onInputChange,
    value: selectedOptions
  };
};

type FormikInputFieldWithErrorProps = Omit<InputProps, "icon"> & {
  defaultValue?: string;
  disabled?: boolean;
  errorUntouched?: boolean;
  inlineError?: boolean;
  icon?: SemanticICONS | ReactElement<IconProps>;
  getRef?: (input: Input | null) => void;
  onChange?: (
    e: SyntheticEvent<HTMLInputElement>,
    data: InputOnChangeData
  ) => void;
};

export const FormikInputFieldWithError: FC<
  FormikInputFieldWithErrorProps
> = props => {
  const {
    errorUntouched,
    getRef,
    inlineError,
    focus,
    name,
    disabled = false,
    defaultValue,
    ...rest
  } = props;
  // console.group(name);
  // console.log('name', name);
  // console.log('errorUntouched', errorUntouched);
  const {
    onChange,
    label,
    required,
    icon,
    iconPosition,
    inline,
    ...remaining
  } = rest;
  return (
    <Field
      className="formik-input-field"
      required={required}
      name={name}
      render={(p: FieldProps) => {
        // console.log("p", p);
        const {
          setFieldValue,
          setFieldTouched,
          values,
          errors,
          touched,
          handleBlur,
          handleChange
        } = p.form;
        const error = getIn(errors, name);
        const touch = getIn(touched, name);
        let value = getIn(values, name) || "";
        if (!value && defaultValue && !touch) {
          setFieldValue(name, defaultValue);
        }
        if (!touch) {
          value = value || defaultValue;
        }
        const hasError = errorUntouched ? !!error : !!error && !!touch;

        return (
          <Form.Field required={required} error={hasError} inline={inline}>
            {label && <label>{label}</label>}
            <Input
              {...remaining}
              name={name}
              icon={icon}
              ref={c => {
                if (getRef) {
                  getRef(c);
                }
              }}
              iconPosition={iconPosition ? iconPosition : undefined}
              disabled={disabled}
              error={hasError}
              onChange={(
                e: React.ChangeEvent<HTMLInputElement>,
                data: InputOnChangeData
              ) => {
                if (onChange) {
                  onChange(e, data);
                }
                setFieldValue(name, data.value);
                setFieldTouched(name, true);
                handleChange(e);
                // setTimeout(() => setFieldValue(name, data.value), 0);
              }}
              focus={focus}
              onBlur={handleBlur}
              value={value || ""}
            />
            {inlineError && (
              <FormErrorMessage show={inlineError} fieldName={props.name} />
            )}
            {/*   <ErrorMessage name={props.name}> */}
            {/*     {msg => <StyledErrorMessage className="error-message">{msg}</StyledErrorMessage>} */}
            {/*   </ErrorMessage> */}
          </Form.Field>
        );
      }}
    />
  );
};

type FormErrorMessageProps = {
  fieldName: any;
  show: boolean | undefined;
};

export const FormErrorMessage: FC<FormErrorMessageProps> = ({
  fieldName,
  show
}) => {
  if (show) {
    return (
      <ErrorMessage name={fieldName}>
        {msg => (
          <StyledErrorMessage>
            <span className="error-message">{msg}</span>
          </StyledErrorMessage>
        )}
      </ErrorMessage>
    );
  }
  return null;
};

const StyledErrorMessage = styled.div`
  padding: 10px;
  margin: 4px 0;
  background-color: #ffd5d9;
  border: 1px solid #ffc3c9;
  border-radius: 4px;
  .error-message {
    color: #de4949;
  }
`;

export const FormikInputField = (
  props: InputProps & { errorUntouched?: boolean }
) => {
  const { errorUntouched, ...rest } = props;
  return (
    <Field
      {...rest}
      render={(p: FormFieldProps) => {
        return (
          <Form.Field
            {...rest}
            {...formikInputProps(props.name)({
              ...props,
              ...p.form,
              errorUntouched
            })}
          />
        );
      }}
    />
  );
};

/* type DateInputProps = { */
/*   name: string; */
/*   required?: boolean; */
/*   icon?: SemanticICONS; */
/*   label: string; */
/*   placeholder?: string; */
/*   showActionsBar?: boolean; */
/*   minDate?: Date; */
/*   maxDate?: Date; */
/*   forceLocale?: boolean; */
/*   defaultValue?: any; */
/*   value?: any; */
/*   debounceTime?: number; */
/*   disabled?: boolean; */
/*   errorUntouched?: boolean; */
/*   inline?: boolean; */
/*   onChange?: (name: string, value: any) => void; */
/* }; */

/* export const FormikDateInput = (props: DateInputProps) => { */
/*   const { */
/*     inline, */
/*     name, */
/*     required, */
/*     minDate, */
/*     maxDate, */
/*     icon, */
/*     errorUntouched, */
/*     forceLocale, */
/*     defaultValue: dValue, */
/*     debounceTime = 600, */
/*     disabled = false */
/*   } = props; */
/*   return ( */
/*     <Field */
/*       name={name} */
/*       className="date-input-wrapper" */
/*       inline={inline} */
/*       required={required} */
/*       render={(p: FieldProps) => { */
/*         const { values, setFieldValue, errors, touched } = p.form; */
/*         // const fieldValue = objectPath(values, name); */
/*         const error = objectPath(errors, name); */
/*         const touch = errorUntouched || objectPath(touched, name); */
/*         const formValue = objectPath(values, name); */
/*         const miDate = minDate */
/*           ? dateUtils.getDate(minDate) */
/*           : dateUtils.subtract("years", 20); */
/*         const maDate = maxDate */
/*           ? dateUtils.endOf("day", dateUtils.getDate(maxDate, forceLocale)) */
/*           : dateUtils.endOf("year", new Date()); */
/*         const defaultDate = dValue || dateUtils.getDate(formValue, forceLocale); */
/*         const defDate = */
/*           dateUtils.isValid(defaultDate) && */
/*           dateUtils.isBetween(defaultDate, miDate, maDate, null, "[]") */
/*             ? defaultDate */
/*             : undefined; */

/*         if (!formValue && defDate) { */
/*           setFieldValue(name, dateUtils.getDate(defDate)); */
/*         } */

/*         return ( */
/*           <Form.Field */
/*             className="date-input-field" */
/*             required={required} */
/*             error={!!touch && !!error} */
/*             inline={inline} */
/*           > */
/*             <label>{props.label}</label> */
/*             <DateInput */
/*               className="bp3-date-input" */
/*               disabled={disabled} */
/*               formatDate={date => { */
/*                 const d = dateUtils.getDate(date); */
/*                 let ret: any; */
/*                 if (dateUtils.isValid(d)) { */
/*                   ret = dateUtils.toShortDate(d); */
/*                 } else { */
/*                   ret = dateUtils.toShortDate(); */
/*                 } */
/*                 return ret; */
/*               }} */
/*               parseDate={str => { */
/*                 const date = dateUtils.getDate(str); */
/*                 if ( */
/*                   dateUtils.isValid(date) && */
/*                   dateUtils.isBetween(date, miDate, maDate, null, "[]") */
/*                 ) { */
/*                   return dateUtils.getDate(date); */
/*                 } */
/*                 return false; */
/*               }} */
/*               placeholder={props.placeholder} */
/*               showActionsBar={props.showActionsBar} */
/*               popoverProps={{ */
/*                 className: "ui input" */
/*               }} */
/*               inputProps={{ */
/*                 className: icon ? "ui left icon input" : "ui input", */
/*                 // defaultValue: p.form.values[name], */
/*                 leftIcon: props.icon ? <Icon name={props.icon} /> : undefined, */
/*                 name, */
/*                 onBlur: () => { */
/*                   p.form.setFieldTouched(name); */
/*                 }, */
/*                 // onChange: console.log, */
/*                 placeholder: props.placeholder, */
/*                 required */
/*               }} */
/*               defaultValue={defDate} */
/*               onChange={selectedData => { */
/*                 const setData = () => { */
/*                   p.form.setFieldTouched(name); */
/*                   const d = dateUtils.getDate(selectedData); */
/*                   let value: any; */
/*                   if ( */
/*                     dateUtils.isValid(d) && */
/*                     dateUtils.isBetween(d, miDate, maDate, null, "[]") */
/*                   ) { */
/*                     value = dateUtils.toShortDate(d); */
/*                   } */
/*                   setTimeout(() => p.form.setFieldValue(name, value), 20); */
/*                   if (props.onChange) { */
/*                     props.onChange(name, value); */
/*                   } */
/*                 }; */
/*                 debounce(setData, debounceTime)(); */
/*               }} */
/*               onError={() => { */
/*                 p.form.setFieldValue(name, undefined); */
/*                 p.form.setFieldError(name, i18nMark("Date in not valid")); */
/*               }} */
/*               outOfRangeMessage={i18nMark("Date is out of range")} */
/*               minDate={dateUtils.getDate(miDate)} */
/*               maxDate={dateUtils.getDate(maDate)} */
/*               invalidDateMessage={i18nMark("Invalid date")} */
/*               todayButtonText={i18nMark("Today")} */
/*               clearButtonText={i18nMark("Clear")} */
/*               localeUtils={{ */
/*                 formatDay: (day: Date) => { */
/*                   return dateUtils.getDay(day) as string; */
/*                 }, */
/*                 formatMonthTitle: (month: Date) => { */
/*                   return dateUtils.getMonth(month); */
/*                 }, */
/*                 formatWeekdayLong: (weekday: number) => { */
/*                   return dateUtils.getWeekday(weekday); */
/*                 }, */
/*                 formatWeekdayShort: (weekday: number) => { */
/*                   return dateUtils.getShortWeekday(weekday); */
/*                 }, */
/*                 getFirstDayOfWeek: () => 1, */
/*                 getMonths: () => dateUtils.getMonths() */
/*               }} */
/*               locale={dateUtils.getLocale()} */
/*             /> */
/*           </Form.Field> */
/*         ); */
/*       }} */
/*     /> */
/*   ); */
/* }; */

/* export type FormikDateRangeProps = { */
/*   endDatePlaceholder?: string; */
/*   initialMonth?: Date | undefined; */
/*   shortcuts?: IDateRangeShortcut[] | boolean | undefined; */
/*   singleMonthOnly?: boolean; */
/*   startDatePlaceholder?: string; */
/* } & DateInputProps; */

/* export const FormikDateRangeField = (props: FormikDateRangeProps) => { */
/*   const { */
/*     initialMonth, */
/*     singleMonthOnly, */
/*     shortcuts, */
/*     inline, */
/*     name, */
/*     required, */
/*     minDate, */
/*     maxDate, */
/*     icon, */
/*     endDatePlaceholder, */
/*     startDatePlaceholder, */
/*     errorUntouched, */
/*     defaultValue: dValue, */
/*     debounceTime = 600, */
/*     disabled = false */
/*   } = props; */
/*   return ( */
/*     <Field */
/*       className="date-range-wrapper" */
/*       name={name} */
/*       inline={inline} */
/*       required={required} */
/*       render={(p: FieldProps) => { */
/*         const { /1* values, *1/ errors, touched } = p.form; */
/*         // const fieldValue = objectPath(values, name); */
/*         const error = objectPath(errors, name); */
/*         const touch = errorUntouched || objectPath(touched, name); */
/*         const miDate = minDate */
/*           ? dateUtils.getDate(minDate) */
/*           : dateUtils.subtract("years", 20); */
/*         const maDate = maxDate */
/*           ? dateUtils.endOf("day", dateUtils.getDate(maxDate)) */
/*           : dateUtils.endOf("year", new Date()); */
/*         const defaultDate = dValue || dateUtils.getDate(p.form.values[name]); */
/*         const defDate = */
/*           dateUtils.isValid(defaultDate) && */
/*           dateUtils.isBetween(defaultDate, miDate, maDate, null, "[]") */
/*             ? defaultDate */
/*             : undefined; */

/*         return ( */
/*           <Form.Field */
/*             required={required} */
/*             className="date-range-field" */
/*             error={!!touch && !!error} */
/*             inline={inline} */
/*           > */
/*             <label>{props.label}</label> */
/*             <DateRangeInput */
/*               disabled={disabled} */
/*               initialMonth={initialMonth} */
/*               shortcuts={shortcuts} */
/*               singleMonthOnly={singleMonthOnly} */
/*               className="bp3-date-field" */
/*               allowSingleDayRange={true} */
/*               closeOnSelection */
/*               selectAllOnFocus */
/*               // contiguousCalendarMonths={false} */
/*               formatDate={date => { */
/*                 const d = dateUtils.getDate(date); */
/*                 let ret: any; */
/*                 if (dateUtils.isValid(d)) { */
/*                   ret = dateUtils.toShortDate(d); */
/*                 } else { */
/*                   ret = dateUtils.toShortDate(); */
/*                 } */
/*                 return ret; */
/*               }} */
/*               parseDate={str => { */
/*                 const date = dateUtils.getDate(str); */
/*                 if ( */
/*                   dateUtils.isValid(date) && */
/*                   dateUtils.isBetween(date, miDate, maDate, null, "[]") */
/*                 ) { */
/*                   return dateUtils.getDate(date); */
/*                 } */
/*                 return false; */
/*               }} */
/*               placeholder={props.placeholder} */
/*               // showActionsBar={props.showActionsBar} */
/*               popoverProps={{ */
/*                 className: "ui input" */
/*               }} */
/*               endInputProps={{ */
/*                 className: icon ? "ui left icon input" : "ui input", */
/*                 // defaultValue: p.form.values[name], */
/*                 leftIcon: props.icon ? <Icon name={props.icon} /> : undefined, */
/*                 name, */
/*                 onBlur: () => { */
/*                   p.form.setFieldTouched(name); */
/*                 }, */
/*                 // onChange: console.log, */
/*                 placeholder: endDatePlaceholder, */
/*                 required */
/*               }} */
/*               startInputProps={{ */
/*                 className: icon ? "ui left icon input" : "ui input", */
/*                 // defaultValue: p.form.values[name], */
/*                 leftIcon: props.icon ? <Icon name={props.icon} /> : undefined, */
/*                 name, */
/*                 onBlur: () => { */
/*                   p.form.setFieldTouched(name); */
/*                 }, */
/*                 // onChange: console.log, */
/*                 placeholder: startDatePlaceholder, */
/*                 required */
/*               }} */
/*               defaultValue={defDate} */
/*               onChange={selectedData => { */
/*                 const setData = () => { */
/*                   p.form.setFieldTouched(name); */
/*                   let d1 = selectedData[0]; */
/*                   let d2 = selectedData[1]; */
/*                   if (d2 && !d1) { */
/*                     d1 = d2; */
/*                   } */
/*                   if (!d2 && d1) { */
/*                     d2 = d1; */
/*                   } */
/*                   const nextDate1 = dateUtils.getDate(d1); */
/*                   const nextDate2 = dateUtils.getDate(d2); */
/*                   const value: string[] = []; */
/*                   if ( */
/*                     dateUtils.isValid(nextDate1) && */
/*                     dateUtils.isBetween(nextDate1, miDate, maDate, null, "[]") */
/*                   ) { */
/*                     value[0] = dateUtils.toShortDate(nextDate1); */
/*                   } */
/*                   if ( */
/*                     dateUtils.isValid(nextDate2) && */
/*                     dateUtils.isBetween(nextDate2, miDate, maDate, null, "[]") */
/*                   ) { */
/*                     value[1] = dateUtils.toShortDate(nextDate2); */
/*                   } */
/*                   setTimeout(() => p.form.setFieldValue(name, value), 20); */
/*                   if (props.onChange) { */
/*                     props.onChange(name, value); */
/*                   } */
/*                 }; */
/*                 debounce(setData, debounceTime)(); */
/*               }} */
/*               onError={() => { */
/*                 p.form.setFieldValue(name, undefined); */
/*                 p.form.setFieldError(name, i18nMark("Date in not valid")); */
/*               }} */
/*               outOfRangeMessage={i18nMark("Date is out of range")} */
/*               minDate={dateUtils.getDate(miDate)} */
/*               maxDate={dateUtils.getDate(maDate)} */
/*               invalidDateMessage={i18nMark("Invalid date")} */
/*               localeUtils={{ */
/*                 formatDay: (day: Date) => { */
/*                   return dateUtils.getDay(day); */
/*                 }, */
/*                 formatMonthTitle: (month: Date) => { */
/*                   return dateUtils.getMonth(month); */
/*                 }, */
/*                 formatWeekdayLong: (weekday: number) => { */
/*                   return dateUtils.getWeekday(weekday); */
/*                 }, */
/*                 formatWeekdayShort: (weekday: number) => { */
/*                   return dateUtils.getShortWeekday(weekday); */
/*                 }, */
/*                 getFirstDayOfWeek: () => 1, */
/*                 getMonths: () => dateUtils.getMonths() */
/*               }} */
/*               locale={dateUtils.getLocale()} */
/*             /> */
/*           </Form.Field> */
/*         ); */
/*       }} */
/*     /> */
/*   ); */
/* }; */

{/* export type FormikRichTextFieldProps = { */}
{/*   config?: { */}
{/*     buttons?: string[]; */}
{/*     readonly?: boolean; */}
{/*     toolbarAdaptive?: boolean; */}
{/*     [key: string]: any; */}
{/*   }; */}

{/*   placeholder?: string; */}
{/*   disabled?: boolean; */}
{/*   defaultValue?: string; */}
{/*   onChange?: (value: string) => void; */}
{/*   required?: boolean; */}
{/*   name: string; */}
{/*   label: string; */}
{/* }; */}

{/* const defaultButtons = ["undo", "redo", "align", "fontsize", "ul", "ol"]; */}

{/* const defaultJodiConfig = { */}
{/*   readonly: false, */}
{/*   buttons: defaultButtons, */}
{/*   toolbarAdaptive: true, */}
{/*   placeholder: "" */}
{/* }; */}

{/* export const FormikRichTextField = (props: FormikRichTextFieldProps) => { */}
{/*   const { required, disabled, config, label, name } = props; */}

{/*   return ( */}
{/*     <Field */}
{/*       name={name} */}
{/*       required={required} */}
{/*       disabled={disabled} */}
{/*       render={(p: FieldProps) => { */}
{/*         console.log("p", p); */}
{/*         const { setFieldValue, errors, values } = p.form; */}
{/*         const error = objectPath(errors, name); */}
{/*         const formValue = objectPath(values, name); */}
{/*         console.log("formValue", formValue); */}

{/*         return ( */}
{/*           <Form.Field */}
{/*             className="richText-input-field" */}
{/*             required={required} */}
{/*             error={!!error} */}
{/*           > */}
{/*             <label>{label}</label> */}
{/*             {/1* <JoditEditor *1/} */}
{/*             {/1*   value={formValue || ""} *1/} */}
{/*             {/1*   onBlur={value => { *1/} */}
{/*             {/1*     setFieldValue(name, value); *1/} */}
{/*             {/1*   }} *1/} */}
{/*             {/1*   config={{ ...defaultJodiConfig, ...config }} *1/} */}
{/*             {/1* /> *1/} */}
{/*           </Form.Field> */}
{/*         ); */}
{/*       }} */}
{/*     /> */}
{/*   ); */}
{/* }; */}

export type FormikTextAreaFieldProps = {
  name: string;
  onChange?: (value: string) => void;
  required?: boolean;
  disabled?: boolean;
  label?: string;
  placeholder?: string;
  readonly?: boolean;
} & TextAreaProps ;

export const FormikTextAreaField = (props: FormikTextAreaFieldProps) => {
  const {
    name,
    required = false,
    disabled = false,
    label = "",
    onChange,
  } = props;

  return (
    <Field
      className="textArea-input-field"
      name={name}
      required={required}
      disabled={disabled}
      render={(p: FieldProps) => {
        const { setFieldValue, values, errors } = p.form;
        const nextValue = getIn(values, name);
        const nextError = getIn(errors, name);

        return (
          <Form.Field
            error={!!nextError}
            required={required}
            disabled={disabled}
          >
            <label>{label}</label>
            <TextArea
              value={nextValue}
              onChange={(_, v) => {
                setFieldValue(name, v.value);
                if (onChange) {
                  onChange(String(v.value) || '');
                }
              }}
            />
          </Form.Field>
        );
      }}
    />
  );
};

export const FormikSelectField = (
  props: SelectProps & { errorUntouched?: boolean }
) => {
  const { errorUntouched, ...rest } = props;

  return (
    <Field
      {...rest}
      render={(p: FormFieldProps) => {
        return (
          <Form.Field
            {...rest}
            {...formikSelectProps(props.name)({ ...props, ...p.form })}
            />
        );
      }}
    />
  );
};

export type SelectPropsWithErrors = SelectProps & {
  inlineError?: boolean;
  errorUntouched?: boolean;
  fieldCss?: React.CSSProperties;
  disabled?: boolean;
}

export const FormikSelectFieldWithError = (props: SelectPropsWithErrors) => {

  const {
    errorUntouched,
    inlineError,
    fieldCss,
    name,
    disabled,
    ...rest
  } = props;

  const {
    onChange,
    required,
    label,
    ...remaining
  } = rest;

  return <Field
    className="form-select-field-with-errors"
    required={required}
    name={name}
    render={(p: FieldProps) => {
      const {
        setFieldValue,
        setFieldTouched,
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
      } = p.form;

      const error = getIn(errors, name);
      const touch = getIn(touched, name);
      const value = getIn(values, name) || "";
      const hasError = errorUntouched ? !!error : !!error && !!touch;

      return <Form.Field 
        required={required}
        style={fieldCss}
        error={hasError}
        disabled={disabled}
      >
        {label && <label>{label}</label>}
        <Select
          {...remaining}
          name={name}
          disabled={disabled}
          id={name}
          value={value}
          error={hasError}
          onBlur={e => handleBlur(e)}
          onChange={(e, data) => {
            if(onChange) {
              onChange(e, data);
            }
            setFieldValue(name, data.value);
            setFieldTouched(name, true);
            handleChange(e);
          }}
        />
        {inlineError && (
          <FormErrorMessage show={inlineError} fieldName={name} />
        )}
      </Form.Field>

    }} 
  />
}

export const FormikMultipleSelectField = (
  props: DropdownProps & { errorUntouched?: boolean }
) => {
  const { errorUntouched, ...rest } = props;
  return (
    <Field
      {...rest}
      render={(p: FormFieldProps) => {
        return (
          <Form.Field
            {...rest}
            {...formikMultipleSelectProps(props.name)(
              { ...props, ...p.form },
              rest
            )}
          />
        );
      }}
    />
  );
};

export const FormikReactSelectField = (
  props: Partial<FormikReactSelectPropsType> & { name: string }
) => {
  const { options, ...rest } = props;
  return (
    <Field
      {...rest}
      render={(p: FormFieldProps) => {
        // console.log('p', p);
        const allProps: any = formikReactSelectProps(props.name)({
          ...rest,
          options,
          ...p.form
        });
        return <Form.Field {...rest} {...allProps} />;
      }}
    />
  );
};

// export const FormikReactSelectFieldWithError = (
//   props: Partial<FormikReactSelectPropsType> & {name: string; inlineError?: boolean }
// ) => {
//   const { errorUntouched, inlineError, name, ...rest } = props;
//   const { options, required, onChange, label, inline, ...remaining } = rest;
//   return (
//     <Field
//       className="formik-react-select with-error"
//       // required={required}
//       name={name}
//       render={(p: FieldProps) => {
//         const { setFieldValue, values, errors, touched, handleBlur, handleChange } = p.form;
//         const error = objectPath(errors, name);
//         const touch = objectPath(touched, name);
//         const value = objectPath(values, name);
//         console.log('value', value);

//         return (
//           <Form.Field
//             label={label}
//             required={required}
//             error={errorUntouched ? !!error : !!error && touch}
//             inline={inline}>
//             {/* {label && <label>{label}</label>} */}
//             <ReactSelect
//               // {...remaining}
//               name={name}
//               options={options}
//               onChange={(selectValue, action) => {
//                 console.log(selectValue);
//               }}
//             />
//             {inlineError && (
//               <ErrorMessage name={props.name}>{msg => <span className="error-message">{msg}</span>}</ErrorMessage>
//             )}
//           </Form.Field>
//         );
//       }}
//     />
//   );
// };

export const FormikCheckboxField = (
  props: FormCheckboxProps & { inverted?: boolean }
) => {
  const { inverted, ...rest } = props;
  return (
    <Field
      {...rest}
      render={(p: FormFieldProps) => {
        return (
          <Form.Field
            {...rest}
            {...formikCheckboxProps(props.name || 'none')({ ...props, ...p.form })}
          />
        );
      }}
    />
  );
};

type FormikCheckoxStarFieldProps = {
  name: string;
  onChange?: (value: boolean) => void;
  size?: "mini" | "tiny" | "small" | "large" | "huge" | "massive";
  label?: string;
  required?: boolean;
  icon: "star" | "heart" | undefined;
};
export const FormikCheckboxStarField = (props: FormikCheckoxStarFieldProps) => {
  const { required, label, icon, size, name, onChange } = props;
  return (
    <Field
      {...props}
      render={(p: FieldProps) => {
        const { errors, setFieldValue, values } = p.form;
        const error = objectPath(errors, name);
        const value = +objectPath(values, name);
        return (
          <Form.Field
            required={required}
            error={!!error}
            className="star-checkbox"
          >
            {label && (
              <label
                style={{
                  display: "inline-block",
                  lineHeight: "24px",
                  marginBottom: 0,
                  marginRight: "10px",
                  verticalAlign: "top"
                }}
              >
                {label}
              </label>
            )}
            <Rating
              icon={icon}
              defaultRating={value}
              size={size}
              onRate={(_e, data: RatingProps) => {
                const checked = data.rating && data.rating > 0 ? true : false;
                if (onChange) {
                  onChange(checked);
                }
                setFieldValue(name, checked);
              }}
            />
          </Form.Field>
        );
        // return <Form.Field {...props} {...formikCheckboxStarProps(props.name!)({ ...props, ...p.form })} />;
      }}
    />
  );
};

export const FormikCheckboxGroupField = (
  props: FormCheckboxProps & {
    defaultValues?: string[];
    onCheckedChange?: (name: string, values: string[]) => void;
  }
) => {
  const { defaultValues, onCheckedChange, ...rest } = props;
  return (
    <Field
      {...rest}
      render={(p: FormFieldProps) => {
        return (
          <Form.Field
            {...rest}
            {...formikCheckboxGroupProps(props.name || '', props.value || false)({
              ...props,
              ...p.form
            })}
          />
        );
      }}
    />
  );
};
export const FormikCardsGroup = (props: CardProps) => {
  const { name, onChange, submitOnSelect, children, ...rest } = props;
  const items = React.Children.toArray(children).map(
    (c: React.ReactElement<any>) =>
      React.cloneElement(c, { name, onChange, submitOnSelect })
  );
  return <Card.Group {...rest}>{items}</Card.Group>;
};

export const FormikCardField = (props: CardProps) => {
  const {
    image,
    header,
    meta,
    description,
    value,
    name,
    onChange,
    submitOnSelect,
    selectText
  } = props;
  return (
    <Field
      {...props}
      render={(p: FormFieldProps) => {
        const active =
          p.form.values && p.form.values[name] && p.form.values[name] === value;
        const onSelect = () => {
          p.form.setFieldValue(name, value, true);
          setTimeout(() => {
            if (submitOnSelect) {
              p.form.submitForm();
            }
            if (onChange) {
              onChange(name, value);
            }
          }, 100);
        };

        return (
          <Card
            color={active ? "blue" : "grey"}
            className={`${active ? "selected" : ""}`}
          >
            <Image src={image} />
            <Card.Content>
              <Card.Header>{header}</Card.Header>
              <Card.Meta>{meta}</Card.Meta>
              <Card.Description>{description}</Card.Description>
            </Card.Content>
            <Card.Content extra textAlign="center">
              <Button as="a" basic color="blue" primary onClick={onSelect}>
                {selectText || "Select"}
              </Button>
            </Card.Content>
          </Card>
        );
      }}
    />
  );
};

