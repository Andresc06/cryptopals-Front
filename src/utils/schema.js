import * as yup from 'yup';

const schema = yup
    .object()
    .shape({
        email: yup.string().email('Please, enter a valid email').required("Your email is required. We won't share your info with anyone"),
        password: yup.string().required('Invalid password').min(8, 'The minimum length of your password is 8 characters'),
        name: yup.string().required('Please, enter your full name'),
    })
    .required();

    const schemaLogin = yup
    .object()
    .shape({
        email: yup.string().email('Please, enter a valid email').required("Your email is required. We won't share your info with anyone"),
        password: yup.string().required('Invalid password').min(8, 'The minimum length of your password is 8 characters')
    })
    .required();

export { schema, schemaLogin };
