import './pages.css';

import React, { Component } from 'react';
// 'validate-react' '../validate';
import { validate, validationError } from '../validate';

import AutoComplete from 'material-ui/AutoComplete';
import Chip from 'material-ui/Chip';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import { api } from '../api/api';
import getStateModel from '../stateModel';

const styles = {
  button: {
    margin: '12px 24px 12px 0'
  },
  radioButton: {
    marginBottom: 15
  }
};

const conditionsArray = [
  'It has never been used.',
  'It has been refurbished.',
  'It has been used but is still in good condition.',
  'It is in bad condition, but is still usable.',
  'It is not usable in its current form.'
];

export default class Page3 extends Component {
  state = {
    categories: []
  };
  constructor(props) {
    super(props);

    api.fetchCategories().then(res => {
      this.setState({
        categories: res.map(category => ({
          text: category.name,
          value: category
        }))
      });
    });
  }

  itemSelected = index => itemCategory => {
    let item = this.props.currentState.items[index];
    item.itemCategory = itemCategory;

    let state = {
      target: {
        name: 'items',
        value: this.props.currentState.items
      }
    };
    this.props.onChange(state);

    //Validation
    let errors = this.props.currentState.errors;
    errors.items[index]['itemCategory'] = {
      blurred: true,
      valid: true,
      errorText: ''
    }
    state = {
      target: {
        name: 'errors',
        value: errors
      }
    };
    this.props.onChange(state);

  };

  onUpdateInput = index => searchText => {
    let items = this.props.currentState.items;
    items[index].itemCategory.value = {};
    let state = {
      target: {
        name: 'items',
        value: items
      }
    }
    this.props.onChange(state);
  }

  onSelectChange = (name, index) => (event, i, value) => {
    event['target'] = {
      name,
      value
    };
    this.handleChange(index)(event);
  };

  handleFile = index => event => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = upload => {
      let fileObject = {
        file,
        data_uri: upload.target.result,
        filename: file.name,
        filetype: file.type
      };
      this.props.currentState.items[index].photo = fileObject;

      let state = {
        target: {
          name: 'items',
          value: this.props.currentState.items
        }
      };
      this.props.onChange(state);
    };

    reader.readAsDataURL(file);
  };

  handleRequestDelete = (itemIndex) => {
    this.props.currentState.items[itemIndex].photo = null;
    let state = {
      target: {
        name: 'items',
        value: this.props.currentState.items
      }
    };
    // Clear <input type='file' /> element
    (this.props.currentState.items[itemIndex].fileInput).value = '';
    this.props.onChange(state);
  };

  handleChange = index => event => {
    let items = this.props.currentState.items;
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    items[index][name] = value;

    event['target'] = {
      name: 'items',
      value: items
    };
    this.props.onChange(event);
  };

  removeItem = index => event => {
    let items = this.props.currentState.items;
    items.splice(index, 1);

    event['target'] = {
      name: 'items',
      value: items
    };
    this.props.onChange(event);

    //Errors model

    let errors = this.props.currentState.errors;
    errors.items.splice(index, 1);

    event['target'] = {
      name: 'errors',
      value: errors
    };
    this.props.onChange(event);

  };

  validatePhoto = index => {
    let errors = this.props.currentState.errors;
    if(!errors.items[index].photos.valid){
      errors.items[index].photos = {
        valid: true,
        blurred: true,
        errorText: ''
      }
      let state = {
        target: {
          name: 'errors',
          value: errors
        }
      }
      this.props.onChange(state);
    }
  }

  addAnotherItem = event => {
    let items = this.props.currentState.items;

    // Necessary because we're actually using stateModel and passing it around as a singleton. Shouldn't be doing this!! Instead make it a new instance every time.
    items.push(getStateModel().items[0]);
    event['target'] = {
      name: 'items',
      value: items
    };
    this.props.onChange(event);

    //Errors model

    let errors = this.props.currentState.errors;
    errors.items.push(getStateModel().errors.items[0]);

    event['target'] = {
      name: 'errors',
      value: errors
    };
    this.props.onChange(event);

  };

  render() {
    return this.props.currentState.items.map((item, index) => (
      <section key={index} className={`App-section page-4 ${this.props.inactive && 'page-inactive'}`}>
        <header className="App-header">
          <h2 className="section-title">
            We need a little more information.
          </h2>
        </header>
        <TextField
          style={{ width: '50%' }}
          floatingLabelFixed={true}
          floatingLabelText="Mandatory Name?*"
          name="name"
          {...validate('required', `items-${index}-name`, item.name, 'errorText')}
          value={item.name}
          onChange={this.handleChange(index)}
        />
        <AutoComplete
          textFieldStyle={{ width: '100%' }}
          style={{ width: '50%', marginRight: 20 }}
          menuStyle = {{maxHeight: 400}}
          floatingLabelText="Mandatory category*"
          dataSource={this.state.categories}
          fullWidth={true}
          filter={AutoComplete.caseInsensitiveFilter}
          disableFocusRipple={true}
          openOnFocus={true}
          {...validate('required', `items-${index}-itemCategory`, item.itemCategory.value.name, 'errorText')}
          dataSourceConfig={{ text: 'text', value: 'value' }}
          onNewRequest={this.itemSelected(index)}
          onUpdateInput={this.onUpdateInput(index)}
        />
        <TextField
          style={{ width: '10%' }}
          type="number"
          floatingLabelText="Quantity"
          floatingLabelFixed={true}
          name="quantity"
          value={item.quantity}
          min={1}
          onChange={this.handleChange(index)}
        />
        <br />
        <TextField
          style={{ width: '10%', margin: '0 12px' }}
          type="number"
          floatingLabelText="cm"
          floatingLabelFixed={true}
          hintText="width"
          name="dimensionsX"
          value={item.dimensionsX}
          min={0}
          onChange={this.handleChange(index)}
        /> ｘ
        <TextField
          style={{ width: '10%', margin: '0 12px' }}
          type="number"
          floatingLabelText="cm"
          floatingLabelFixed={true}
          hintText="height"
          name="dimensionsY"
          value={item.dimensionsY}
          min={0}
          onChange={this.handleChange(index)}
        /> ｘ
        <TextField
          style={{ width: '10%', margin: '0 12px' }}
          type="number"
          floatingLabelText="cm"
          floatingLabelFixed={true}
          hintText="length"
          name="dimensionsZ"
          value={item.dimensionsZ}
          min={0}
          onChange={this.handleChange(index)}
        />
        <br />
        <TextField
          style={{ width: '50%' }}
          floatingLabelText="Optional brand of item?"
          name="brand"
          value={item.brand}
          onChange={this.handleChange(index)}
        />
        <br />
        <SelectField
          floatingLabelText="Mandatory current condition?*"
          name="condition"
          value={item.condition}
          onChange={this.onSelectChange('condition', index)}
          {...validate('required', `items-${index}-condition`, item.condition, 'errorText')}
          style={{ width: '50%', marginBottom: 15 }}
        >
          {conditionsArray.map((text, i) => (
            <MenuItem key={i} value={text} primaryText={text} />
          ))}
        </SelectField>{' '}
        <br />

        <p style={{ marginBottom: 0 }}>
          Tell us a story!
        </p>
        <TextField
          style={{ width: '50%', marginBottom: 15 }}
          hintText="Optional Text area."
          multiLine={true}
          rows={2}
          name="moreInfo"
          value={item.moreInfo}
          onChange={this.handleChange(index)}
        />
        <br />
        
        <label style={{ marginBottom: 15, marginRight: 10 }}>
          Please upload a photo - Mandatory:
        </label>{' '}
        <RaisedButton
          className="file-button"
          primary={true}
          label="Upload"
          containerElement="label"
          style={styles.button}
          {...validate('required', `items-${index}-photo`, item.photo)}
        >
          <input
            ref={(input) => {if(this.props.currentState.items[index]) this.props.currentState.items[index]['fileInput'] = input}}
            onChange={this.handleFile(index)}
            className="file"
            type="file"
            accept="image/*"
          />
        </RaisedButton>
        <br />
        {item.photo &&
          <Chip
            style={{ padding: 10 }}
            onRequestDelete={() => this.handleRequestDelete(index)}
          >
            <img src={item.photo.data_uri} width={200} alt='' />
          </Chip>
        }
        {validationError(`items-${index}-photo`)}
        
        <br />
        <RaisedButton
          onClick={this.addAnotherItem}
          primary={true}
          label="Add another item"
          style={styles.button}
        />
        {this.props.currentState.items.length > 1 && (
          <RaisedButton
            onClick={this.removeItem(index)}
            label="Remove item"
            style={styles.button}
          />
        )}
      </section>
    ));
  }
}
