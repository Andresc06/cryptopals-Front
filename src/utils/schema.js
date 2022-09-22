import * as yup from "yup";

const schema = yup
  .object()
  .shape({
    email: yup
      .string()
      .email("Please, enter a valid email")
      .required("Your email is required. We won't share your info with anyone"),
    password: yup
      .string()
      .required("Invalid password")
      .min(8, "The minimum length of your password is 8 characters"),
    name: yup.string().required("Please, enter your full name"),
  })
  .required();

const schemaLogin = yup
  .object()
  .shape({
    email: yup
      .string()
      .email("Please, enter a valid email")
      .required("Your email is required. We won't share your info with anyone"),
    password: yup
      .string()
      .required("Invalid password")
      .min(8, "The minimum length of your password is 8 characters"),
  })
  .required();

const schemaPayment = yup
  .object()
  .shape({
    receiver: yup
      .string()
      .email("Please, enter a valid email")
      .required("You cannot send payments if we don't have the receiver"),
    quantity: yup.number().required("Please, enter an amount").min(0),
  })
  .required();

const schemaLoadAccount = yup
  .object()
  .shape({
    quantity: yup
      .number("Please enter a valid number")
      .required("Please, enter an amount")
      .min(0),
    date: yup.string().required("Please fill out the date"),
    time: yup.string().required("Please fill out the time"),
  })
  .required();

const schemaOrder = yup
  .object()
  .shape({
    quantity: yup
      .number("Please enter a valid number")
      .required("Please, enter an amount")
      .min(0),
  })
  .required();

export { schema, schemaLogin, schemaPayment, schemaLoadAccount, schemaOrder };
