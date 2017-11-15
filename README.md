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

#### In App.js ####
```
import { validateInstance } from 'validate-react';
    constructor(props) {
        super(props);
        this.state = {

            // picks error message from here otherwise use default message
            errorModel: {
                inValidFields: [],
                confirmedCheck: 'Please confirm the items!',
                pickUpDate: 'Please select pick-up date!',
                name: 'Item name is required field!',
                itemCategory: 'Item Category is required field!'
            }
        };
        // need state to set errorModel.inValidFields inside state.
        validateInstance.setProps({currentState: this.state, onChange: this.handleChange});

    }
    // Elevated set state method called by validate plugin as well as from other Pages to set state in React way
    handleChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    };

```


#### For Container/Component/React Page: ####

```

import {validate, ValidationError} from 'validate-react';

...
// This is material-ui form which display error when errorText attribute present.
<TextField
    name="firstName"
    value={this.props.currentState.firstName}
    onChange={this.handleChange}
    {...validate('required', 'firstName', this.props.currentState.firstName, 'errorText')}
/>
<Checkbox
    label="Please confirm to proceed further"
    name="confirmed"
    value={this.props.currentState.confirmed}
    onCheck={this.handleChange}
    {...validate('required', 'confirmed', this.props.currentState.confirmed)}
/>
<ValidationError name="confirmed"></ValidationError>
```
#### Spread function parameters #### 

* First param - *'required'* or *'email'* or *'required email'*
* Second param - unique `name` for non-iterating fields, `<parent>-${index}-<prop>` for iterating fields 
    * Iterating fields eg: `items-${index}-itemCategory` for 
    `{
        items: [
            {itemCategory: 'category1'},
            {itemCategory: 'category2'},
        ]
    }`
* Third param - property in state
* Fourth param - Error `attribute` of field - ('errorText' for material-ui design)
    * default `invalid`


#### To trigger validate on click ####

```
let invalidFields = validateInstance.validateAll();
if(invalidFields.length > 0) {
    console.log('Invalid' + JSON.stringify(invalidFields));
    alert("Form Validation failed! Invalid count:- " + this.state.errorModel.inValidFields.length);
}
```

#### To remove validation on fields #### call removeValidation.

```
import {validate, ValidationError, removeValidation} from 'validate-react';
...

removeValidation('firstName');

```