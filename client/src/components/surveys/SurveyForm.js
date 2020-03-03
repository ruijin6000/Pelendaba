import React, {Component} from "react";
import {reduxForm, Field} from 'redux-form';
import SurveyField from './SurveyField';
import _ from 'lodash';

const FIELDS = [
    {label: 'Survey Title', name: 'title'},
    {label: 'Subject Line', name: 'subject'},
    {label: 'Email Body', name: 'body'},
    {label: 'Recipient List', name: 'Emails'}
];

class SurveyForm extends Component {

    renderFields() {
        // <div>
        //     <Field label="Survey Title" type="text" name="title" component={SurveyField}/>
        //     <Field label="Subject Line" type="text" name="subject" component={SurveyField}/>
        //     <Field label="Email Body" type="text" name="body" component={SurveyField}/>
        //     <Field label="Recipient List" type="text" name="Emails" component={SurveyField}/>
        // </div>

        return _.map(FIELDS, ({label, name}) => {
            return (
                <Field component={SurveyField} type="text" label={label} name={name}/>
            );
        });

    }

    render() {
        return (
            <div>
                <form onSubmit={this.props.handleSubmit(values => console.log(values))}>
                    {this.renderFields()}
                    <button type="submit"> Submit</button>
                </form>
            </div>
        );

    }
}

export default reduxForm({
    form: 'surveyForm'
})(SurveyForm);