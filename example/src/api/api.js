

class API {
  

  submitForm = (data) => {
    alert("submitted");
  }

  getAvailableDates = () => {
    
    /*  API not ready for this therefore returning mocked Promise. */
    return new Promise((resolve, reject) => {
      return ['10-Nov-2017', '11-Nov-2017','12-Nov-2017','13-Nov-2017']
    });
  };

  fetchCategories = () => {
    return new Promise((resolve, reject) => {
      return [{
        name: 'Test auto-complete1'
      },{
        name: 'Test auto-complete2'
      },{
        name: 'Test auto-complete3'
      },{
        name: 'Test auto-complete4'
      }]
    });
  };  

}

/* Single Instance Pattern */
export let api = new API();
