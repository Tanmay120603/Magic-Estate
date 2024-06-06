import { useFormik,Form } from "formik"
import "./validationForm.scss";

function ValidationForm({inputFields,initialValues,handleSubmitApiRequest,buttonText,validationSchema}){
    const {isSubmitting,values,handleChange,handleBlur,handleSubmit,touched,errors}=useFormik({
        initialValues,
        onSubmit:async(values,actions)=>{
            await handleSubmitApiRequest(values) 
            actions.setSubmitting(false)
        },
       validationSchema
    })
    return(
        <Form className="container" onSubmit={handleSubmit}>
            {inputFields.map((inputField,index)=><div className="textField-container" key={index}><label htmlFor={inputField.id}>{inputField.labelText}</label><input id={inputField.id} onChange={handleChange} onBlur={handleBlur} type={inputField.type} placeholder={inputField.placeholder || ""} name={inputField.name} value={values[inputField.name]}/>
            {errors[inputField.name] && touched[inputField.name] && <p className="error">{errors[inputField.name]}</p>}
            </div>)}
            <button type="submit" disabled={isSubmitting}>{isSubmitting ? "Loading..." : buttonText }</button>
        </Form>
    )
}

export default ValidationForm