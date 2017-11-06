export default function getStateModel() {
  return {
    pageProgress: 1,
    haveAnyItem: null,
    locationObject: {
      bower_zone: '',
      collection_day: '',
      council: '',
      postcode: '',
      state: '',
      suburb: ''
    },
    availableDates: [],
    pickupDate: '',
    willDateWork: true,
    noneDateWork: false,
    items: [
      {
        name: '',
        itemCategory: {
          value: {
            name: '',
            weight_kg: 0
          }
        },
        quantity: '1',
        dimensionsX: '',
        dimensionsY: '',
        dimensionsZ: '',
        brand: '',
        condition: '',
        moreInfo: '',
        photos: []
      }
    ],
    firstName: '',
    lastName: '',
    address: '',
    phone: '',
    email: '',
    instructionForPickup: '',
    confirmed: false,
    howHeard: '',
    subscribeToLetter: false,
    submitting: false,
    submitted: false,
    submittedOrderId: '',
    dirty: false,
    errorModel: {
      inValidFields: [],
      confirmedCheck: 'Please confirm the items!',
      pickUpDate: 'Please select pick-up date!',
      name: 'Item name is required field!',
      itemCategory: 'Item Category is required field!',
      condition: 'Item Condition is required field!',
      photo: 'Photo is mandatory!',
      firstName: 'First Name is required field!',
      lastName: 'Last Name is required field!',
      address: 'Address is required field!',
      phone: 'Phone is required field!',
      email: 'Email is required field!',
      instructionForPickup: 'Instruction is required field!',
      confirmed: 'Please confirm!'
    }
  }
}