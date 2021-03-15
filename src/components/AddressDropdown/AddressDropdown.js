import React, { useState } from 'react';
import { Dropdown } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import './AddressDropdown.css';
import AddressFields from '../../containers/AddressFields/AddressFields';

const AddressDropdown = props => {
  const [addressSelection, setAddressSelection] = useState([]);
  const [showAddressFields, setShowAddressFields] = useState();

  const handleSelection = (event) => {
    event.preventDefault();
    const selectedAddress = event.target.innerText;
    setAddressSelection(selectedAddress.split(','));
    setShowAddressFields(true);
  }

  return (
    <div>
      <Dropdown
        style={{
          backgroundColor: "rgba(0, 0, 0, 0)",
          color: "white",
          border: "2px solid white",
          minWidth: '750px',
          fontWeight: "bold",
          justifyContent: "center",
          margin: "25px 0px 25px 0px",
        }}
        className="ui Dropdown"
        placeholder='Select address'
        selection
        fluid
        onChange={handleSelection}
        options={props.address.map(el => ({ key: el, text: el, value: el }))}
      />
      {
        showAddressFields && <div>
          <AddressFields
            showAddressFields={showAddressFields}
            addressField={addressSelection}
            postcode={props.postcode}
          />
          <button
            className="Button"
            onSubmit={props.onSubmit}>Add address</button>
        </div>
      }
    </div>
  )
};

export default AddressDropdown;
