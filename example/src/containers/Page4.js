import './pages.css';

import { List, ListItem } from 'material-ui/List';
import React, { Component } from 'react';
// 'validate-react' '../validate';
import {ValidationError, validate, validationError} from '../validate';

import Avatar from 'material-ui/Avatar';
import Checkbox from 'material-ui/Checkbox';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import Subheader from 'material-ui/Subheader';
import TextField from 'material-ui/TextField';
import { darkBlack } from 'material-ui/styles/colors';
import getStateModel from '../stateModel'

const styles = {
  button: {
    margin: '12px 24px 12px 0'
  }
};

export default class Page4 extends Component {
  handleChange = e => {
    this.props.onChange(e);
  };

  removeItem = index => event => {
    let items = this.props.currentState.items;
    items.splice(index, 1);
    if (items.length === 0) {
      items.push(getStateModel().items[0]);
    }

    event['target'] = {
      name: 'items',
      value: items
    };
    this.props.onChange(event);
  };

  onSelectChange = name => (event, index, value) => {
    event['target'] = {
      name,
      value
    };
    this.props.onChange(event);
  };

  render() {
    return (
      <section className={`App-section page-5 ${this.props.inactive && 'page-inactive'}`}>
        <TextField
          style={{ width: '24%', float: 'left', margin: '0 12px 0 0' }}
          floatingLabelText="What’s your first name?*"
          name="firstName"
          value={this.props.currentState.firstName}
          onChange={this.handleChange}
          {...validate('required', 'firstName', this.props.currentState.firstName, 'errorText')}
        />
        <TextField
          style={{ width: '24%' }}
          floatingLabelText="and last name?*"
          name="lastName"
          value={this.props.currentState.lastName}
          onChange={this.handleChange}
          {...validate('required', 'lastName', this.props.currentState.lastName, 'errorText')}
        />
        <br />

        <TextField
          style={{ width: '50%' }}
          floatingLabelText="What’s your street address?*"
          name="address"
          value={this.props.currentState.address}
          onChange={this.handleChange}
          {...validate('required', 'address', this.props.currentState.address, 'errorText')}
        />
        <br />
        <TextField
          style={{ width: '50%' }}
          floatingLabelText="What's your suburb?"
          value={this.props.currentState.locationObject.suburb}
          disabled={true}
        />
        <br />
        <TextField
          style={{ width: '50%' }}
          floatingLabelText="Your phone number?*"
          name="phone"
          value={this.props.currentState.phone}
          onChange={this.handleChange}
          {...validate('required', 'phone', this.props.currentState.phone, 'errorText')}
        />
        <br />
        <TextField
          type="email"
          style={{ width: '50%' }}
          floatingLabelText="Your email address?*"
          name="email"
          value={this.props.currentState.email}
          onChange={this.handleChange}
          {...validate('email', 'email', this.props.currentState.email, 'errorText')}
        />
        <br />
        <label>Any instructions for the pickup?</label>
        <br />
        <TextField
          style={{ width: '50%', marginBottom: 15 }}
          hintText=" Mandatory Text area*"
          multiLine={true}
          rows={2}
          name="instructionForPickup"
          value={this.props.currentState.instructionForPickup}
          onChange={this.handleChange}
          {...validate('required', 'instructionForPickup', this.props.currentState.instructionForPickup, 'errorText')}
        />


        <br />
        <List className="summary">
          <Subheader>A summary of Errors: </Subheader>
          {(this.props.currentState.errorModel.inValidFields || []).map((item, i) => (
            <ListItem
              key={i}
              primaryText={item}
            />
          ))}
        </List>

        <br />
        <Checkbox
          label="I confirm items. *"
          style={{ marginBottom: 15 }}
          name="confirmed"
          value={this.props.currentState.confirmed}
          onCheck={this.handleChange}
          {...validate('required', 'confirmed', this.props.currentState.confirmed)}
        />
        
        <ValidationError name="confirmed"></ValidationError>
        
        <RaisedButton label="Cancel" style={styles.button} />
        <RaisedButton
          primary={true}
          label="Submit"
          onClick={this.props.onSubmit}
          style={styles.button}
        />
      </section>
    );
  }
}

