# validate-react
A different and yet simplistic approach of validating input fields in ReactJS with or without Redux and Material-ui

## Getting Started

Most of the form validation in react requires changing the tag name. This little plugin allows you to easily plugin validation with introducing new tags.

### Prerequisites

Install: 
```
npm install validate-react --save
```

### Setting Up

In App.js
```
import { validateInstance } from 'validate-react';
    constructor(props) {
        super(props);
        this.state = {
            errorModel: {
                inValidFields: [],
                confirmedCheck: 'Please confirm the items!',
                pickUpDate: 'Please select pick-up date!',
                name: 'Item name is required field!',
                itemCategory: 'Item Category is required field!'
            }
        };
        validateInstance.setProps({currentState: this.state, onChange: this.handleChange});

    }

    handleChange = (event, scrollMore = 0) => {
        /* Custom event from select boxes */
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
        [name]: value
        });
    };

```

In Container/React Page:

```

import {validate, validationError, ValidationError} from 'validate-react';

...

<TextField
    style={{ width: '24%', float: 'left', margin: '0 12px 0 0' }}
    floatingLabelText="What’s your first name?*"
    name="firstName"
    value={this.props.currentState.firstName}
    onChange={this.handleChange}
    {...validate('required', 'firstName', this.props.currentState.firstName, 'errorText')}
/>
<Checkbox
    label="Please confirm to proceed further *"
    style={{ marginBottom: 15 }}
    name="confirmed"
    value={this.props.currentState.confirmed}
    onCheck={this.handleChange}
    {...validate('required', 'confirmed', this.props.currentState.confirmed)}
/>
{validationError('confirmed')}
or
<ValidationError name="confirmed"></ValidationError>
```

validate - 
    first param - 'required' or 'email' or 'required email'
    second param - unique key(name of tag) or `<parent>-${index}-<prop>` for looping tags. eg:          `items-${index}-itemCategory` for 
        ```{
            items: [
                {itemCategory: 'category1'},
                {itemCategory: 'category2'},
            ]
        }```
    third param - value inside state object
    fourth param - set attribute in case of error - ('errorText' for material-ui design)

    To trigger validate on click, call 

    ```
    let invalidFields = validateInstance.validateAll();
    if(invalidFields.length > 0) {
      console.log('Invalid' + JSON.stringify(invalidFields));
      alert("Form Validation failed! Invalid count:- " + this.state.errorModel.inValidFields.length);
    }
    ```

    To remove validation on fields on click, call removeValidation.