import { render } from '@testing-library/react';
import React,{ Component } from 'react'
import { connect } from "react-redux";
import { Field, reduxForm, FormSection } from "redux-form";
import { load as loadAccount } from "./account";
import './App.css'




const required = value => (value || typeof value === 'number' ? undefined : 'Required')
const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined
const maxLength15 = maxLength(15)
export const minLength = min => value =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined
export const minLength2 = minLength(2)
const number = value =>
  value && isNaN(Number(value)) ? 'Must be a number' : undefined
const minValue = min => value =>
  value && value < min ? `Must be at least ${min}` : undefined
const minValue13 = minValue(13)
const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined
const tooYoung = value =>
  value && value < 13
    ? 'You do not meet the minimum age requirement!'
    : undefined
const aol = value =>
  value && /.+@aol\.com/.test(value)
    ? 'Really? You still use AOL for your email?'
    : undefined
const alphaNumeric = value =>
  value && /[^a-zA-Z0-9 ]/i.test(value)
    ? 'Only alphanumeric characters'
    : undefined
export const phoneNumber = value =>
  value && !/^(0|[1-9][0-9]{9})$/i.test(value)
    ? 'Invalid phone number, must be 10 digits'
    : undefined


    const validate = values => {
        const errors = {}
        if (!values.username) {
          errors.username = 'Required'
        } else if (values.username.length > 15) {
          errors.username = 'Must be 15 characters or less'
        }
        if (!values.email) {
          errors.email = 'Required'
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
          errors.email = 'Invalid email address'
        }
        if(!values.favoriteColor)
        {
            errors.favoriteColor ="Required";
        }
       
        return errors
      }
const renderField = ({
  input,
  label,
  type,
  meta: { touched, error, warning }
}) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} />
      {touched &&
        ((error && <span>{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  </div>
)


export const SelectField = ({
                              input,
                              label,
                              meta: {touched, error},
                              children
                            }) => (
  <div className="field">
    <label className="label">{label}</label>
    <div className="control">
      <div className={
        'select ' + (touched ? (error ? 'is-danger' : 'is-success') : '')
      }>
        <select {...input} >
          {children}
        </select>
        {touched && (error && <span>{error}</span>)}
      </div>
    </div>
  </div>
);

const data = {
    info:{
        username:"vicky"
    },
    email:"vicky@gmail.com",
    phone:"9994539140",
    favoriteColor:"blue",
};

class FieldLevelValidationForm extends Component {
    
    render()
    {
        const { handleSubmit, pristine, reset, submitting } =this.props;

    

return (
    <div className='form'>
    <form onSubmit={handleSubmit}>
   

        <div className='field'>
            <FormSection name="info">
      <Field
        name="username"
        type="text"
        component={renderField}
        label="Username"
        validate={[required, maxLength15, minLength2]}
        warn={alphaNumeric}
      />
      </FormSection>
      </div>

      <div className='field'>
      <Field
        name="email"
        type="email"
        component={renderField}
        label="Email"
        validate={email}
        warn={aol}
      />
      </div>

      <div className='field'>
      <Field
        name="phone"
        type="number"
        component={renderField}
        label="Phone number"
        validate={[required, phoneNumber]}
      />
      </div>

      
      <div className='field'>
        <label>Favorite Color</label>
          <Field name="favoriteColor" component={SelectField} >
            <option />
            <option value="ff0000">Red</option>
            <option value="00ff00">Green</option>
            <option value="0000ff">Blue</option>
          </Field>
        </div>

      
      <div className='button_group'>
        <button type="submit" disabled={submitting || submitting}>
          Submit
        </button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </button>
       
      </div>

      
    </form>
    </div>
  )
}
}

FieldLevelValidationForm = reduxForm({
  form: 'fieldLevelValidation',
  validate,
  // a unique identifier for this form
})(FieldLevelValidationForm)


FieldLevelValidationForm = connect(
  state => ({
    initialValues: state.account.data // pull initial values from account reducer
  }),
 // bind account loading action creator
)(FieldLevelValidationForm);

export default FieldLevelValidationForm;