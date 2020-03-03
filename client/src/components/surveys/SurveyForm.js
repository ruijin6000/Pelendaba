import React, {Component} from "react";
import {reduxForm, Field} from 'redux-form';
import _ from 'lodash';
import {Link} from 'react-router-dom';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';

const FIELDS = [
    {label: 'Survey Title', name: 'title'},
    {label: 'Subject Line', name: 'subject'},
    {label: 'Email Body', name: 'body'},
    {label: 'Recipient List', name: 'emails'}
];

class SurveyForm extends Component {

    renderFields() {
        // <div>
        //     <Field label="Survey Title" type="text" name="title" component={SurveyField}/>
        //     <Field label="Subject Line" type="text" name="subject" component={SurveyField}/>
        //     <Field label="Email Body" type="text" name="body" component={SurveyField}/>
        //     <Field label="Recipient List" type="text" name="emails" component={SurveyField}/>
        // </div>

        return _.map(FIELDS, ({label, name}) => {
            return (
                <Field key={name} component={SurveyField} type="text" label={label} name={name}/>
            );
        });

    }

    render() {

        return (
            <div>
                <form onSubmit={this.props.handleSubmit(values => console.log(values))}>
                    {this.renderFields()}
                    <Link to="/surveys"  className="red btn-flat white-text">
                        Cancel
                    </Link>
                    <button type="submit" className="teal btn-flat right white-text">
                        Next
                        <i className ="material-icons right">done</i>
                    </button>
                </form>
            </div>
        );

    }
}


function validate(values) {
    const errors = {};

    errors.emails = validateEmails(values.emails || '');

     _.each(FIELDS, ({name}) => {
        if(!values[name]) {
           errors[name] = 'You must provide a value';
        }
     });

    return errors;
}

export default reduxForm({
    validate: validate,
    form: 'surveyForm'
})(SurveyForm);