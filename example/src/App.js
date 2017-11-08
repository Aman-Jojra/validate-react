import './App.css';

import React, { Component } from 'react';

import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Page3 from './containers/Page3';
import Page4 from './containers/Page4';
import Page5 from './containers/Page5';
import Scroll from 'react-scroll';
import { api } from './api/api';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import getStateModel from './stateModel';
// 'validate-react' './validate';
import { validateInstance } from './validate';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = getStateModel();
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

  bookNew = () => {
    this.setState(getStateModel());
  };



  handleSubmit = async (event) => {
    console.log('Submitting form:- ');
    console.log(this.state);
    this.setState({dirty: true});

    let invalidFields = validateInstance.validateAll();
    if(invalidFields.length > 0) {
      console.log('Invalid' + JSON.stringify(invalidFields));
      alert("Form Validation failed! Invalid count:- " + this.state.errorModel.inValidFields.length);
    } else {
      // show spinner
      this.setState({submitting: true});
      
      try {
        const orderId = await api.submitForm(this.state);
        this.setState({
          submitted: true,
          submitting: false,
          submittedOrderId: orderId,
          dirty: false
        });
      } catch(err) {
        alert('Something went wrong, please try again.');
        this.setState({
          submitting: false
        })
      }
    }
  };

  advanceToPage = (page) => () => {
    if(page > this.state.pageProgress) {
      this.setState({pageProgress: page});
    }
  }

  render() {
    let currentState = this.state;

    return (
      <MuiThemeProvider>
        <form className="container">
          <section className="header-section">
            <div className="icon-container">
              <h1>Test App</h1>
            </div>
          </section>

          {this.state.submitted !== true ? (
            <article>
              <Page3 currentState={currentState} onChange={this.handleChange} />
              <Page4 currentState={currentState} onChange={this.handleChange} onSubmit={this.handleSubmit} />
            </article>
          ) : (
            <Page5 currentState={currentState} />
          )}
        </form>
      </MuiThemeProvider>
    );
  }
}

export default App;
