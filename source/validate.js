'use strict';

import React from 'react';

class Validate {
    constructor(){
        this.props = {};
        this.fieldsCollection = [];
        this.availableValidations = {
            required: 'required',
            email: 'email'
        };
        this.errorStyle = {
            position: 'relative',
            fontSize: 12,
            color: 'rgb(244, 67, 54)'
        }
    }

    /* For App.js (root state) */
    setProps(props){
        this.props = props;
    }
    
    validateAll = () => {
        this.fieldsCollection.forEach(f => {
            f.ref.blurred = true;
            this.validate(f.validations, f.key, f.value);
        })
        return this.fieldsCollection.filter(f => !f.ref.valid);
    }

    removeValidation = (key) => {
        this.fieldsCollection = this.fieldsCollection.filter(f => f.key !== key)
    }

    _onBlur = (_errorState, value) => {
        _errorState.ref.blurred = true;
        this.validate(_errorState.validations, _errorState.key, value);
    }

    _initValidation = (key, errorText, value, validations) => {
        let item = this.fieldsCollection.find(k => k.key === key);
        if(!item){
            this.fieldsCollection.push({
                key, 
                ref: { errorText, valid: !errorText},
                value,
                validations
            });
        } else {
            item.ref.errorText = errorText;
            item.ref.valid = !errorText;
            item.value = value;
            item.validations = validations;
        }
        let errorModel = this.props.currentState.errorModel;
        let count = (errorModel.inValidFields || []).length;
        errorModel.inValidFields = this.fieldsCollection.filter(f => !f.ref.valid).map(f => f.key);
        if(errorModel.inValidFields.length !== count){
            setTimeout(() => {
                this.props.onChange({target: {
                    name: 'errorModel',
                    value: this.props.currentState.errorModel
                }})
            }, 100)
        }
        return this.fieldsCollection.find(k => k.key === key);
    }

    _errorMessage = key => {
        let split = key.split('-'), name = split[split.length - 1];
        return this.props.currentState.errorModel[name] || `${name} is invalid!`
    }

    _requiredCheck = (key, value, validations) => {

        let _errorState = this.fieldsCollection.find(f => f.key === key) || {ref: {}};
        let errorText = (_errorState.ref.blurred && !value && value !== "0" ) ? 
        this._errorMessage(key) : '';
        _errorState = this._initValidation(key, errorText, value, validations);
        return _errorState;
    }

    _validateEmail = (key, value, isRequired, validations) => {

        let _errorState = this.fieldsCollection.find(f => f.key === key) || {ref: {}};
        let re = /\S+@\S+\.\S+/;
        let valid = re.test(value) || (!isRequired && !value);

        let errorText = (_errorState.ref.blurred && !valid) ? 
        this._errorMessage(key) : '';
        _errorState = this._initValidation(key, errorText, value, validations);
        return _errorState;
    }

    _extractKey = (name, prop, index) => {
        index = index === 0 ? '0' : (index || '');
        return `${prop || ''}-${index}-${name || ''}`; 
    }
    _generateAttributes = (errorAttribute, _errorState, value) => {
        let obj = {onBlur: e => this._onBlur(_errorState, value)};
        obj[errorAttribute] = _errorState.ref.errorText;
        return obj;

    }

    validate = (validations, key, value, errorAttribute = 'invalid') => {
        validations = validations || 'required';
        let validationsArray = validations.split(' ').filter(v => !!this.availableValidations[v]);

        if(validationsArray.find(v => v === this.availableValidations.email)){
            return this.validateEmail(key, value, errorAttribute, !!validationsArray.find(v => v === this.availableValidations.required), validations);
        } else {
            return this.required(key, value, errorAttribute, validations);
        }
    }

    required = (key, value, errorAttribute = 'invalid', validations) => {
        let _errorState = this._requiredCheck(key, value, validations);
        return this._generateAttributes(errorAttribute, _errorState, value);
    }

    validateEmail = (key, value, errorAttribute = 'invalid', isRequired, validations) => {
        
        let _errorState = this._validateEmail(key, value, isRequired, validations);
        return this._generateAttributes(errorAttribute, _errorState, value);
    }

    validationError = (key) => {
        let error = this.fieldsCollection.find(c => c.key === key).ref;
        return error.valid ? '' : <div style={this.errorStyle} className={key + " custom-error"}>{error.errorText}</div>;
    }
}

export class ValidationError extends React.Component {
    constructor(props) {
        super(props);
        this.name = this.props.name;
    }
    render() {
      return validateInstance.validationError(this.name);
    }
  }

/* Export Single instance */
export let validateInstance = new Validate(), 
        validate = validateInstance.validate,
        validateAll = validateInstance.validateAll,
        validationError = validateInstance.validationError,
        removeValidation = validateInstance.removeValidation;
