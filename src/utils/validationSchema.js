import * as Yup from "yup"

const registerUserValidationSchema=Yup.object({
    username:Yup.string().required("Username can't be empty").min(3).max(32),
    email:Yup.string().email("Your email is not valid").required("Email can't be empty"),
    password:Yup.string().required("Password can't be empty").min(6).max(28)
})

const loginUserValidationSchema=Yup.object({
    username:Yup.string().required("Username can't be empty").min(3).max(32),
    password:Yup.string().required("Password can't be empty").min(6).max(28)
})

const updateProfileValidationSchema=Yup.object({
    username:Yup.string().required("Username can't be empty").min(3).max(32),
    email:Yup.string().email("Your email is not valid").required("Email can't be empty")
})

const addPostValidationSchema=Yup.object({
    title:Yup.string().required("Title can't be empty").min(3).max(40),
    price:Yup.number().required("Price can't be empty").min(1),
    bedroom:Yup.number().required().min(1).max(50),
    bathroom:Yup.number().required().min(1).max(50),
    type:Yup.string().required("Please select rent or buy"),
    property:Yup.string().required("Please select property type"),
    desc:Yup.string().required().min(20),
    size:Yup.number().required("Room size can't be empty").min(1),
    school:Yup.number().min(1),
    bus:Yup.number().min(1),
    restraunt:Yup.number().min(1),
    petAllowance:Yup.string(),
    income:Yup.string(),
    utilities:Yup.string()
})

export {registerUserValidationSchema,loginUserValidationSchema,updateProfileValidationSchema,addPostValidationSchema}