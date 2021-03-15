import React, { useState } from 'react';
import AddressSearch from '../components/AddressSearch/AddressSearch';
import Modal from '../components/Modal/Modal';
import { Dropdown } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import './Address.css';
import '../components/AddressSearch/AddressSearch.css';


const Address = () => {
  const [yearsDuration, setYearsDuration] = useState([]);
  const [monthsDuration, setMonthsDuration] = useState([]);
  const [showFields, setShowFields] = useState(true);
  const [showDetailsCard, setShowDetailsCard] = useState(false);
  const [showDurationErros, setDurationErrors] = useState();
  const [addressDetailsCard, setAddressDetails] = useState([]);

  const handleMonthsDuration = (event, value) => {
    event.preventDefault();
    if (monthsDuration.length === 0) {
      setMonthsDuration(monthsDuration.push(value.value));
    }

    if (monthsDuration.length > 0) {
      setMonthsDuration(monthsDuration.splice(0, 1, value.value))
    }
    setMonthsDuration(monthsDuration);
  }

  const handleYearsDuration = (event, value) => {
    event.preventDefault();
    if (yearsDuration.length === 0) {
      setYearsDuration(yearsDuration.push(value.value));
    }

    if (yearsDuration.length > 0) {
      setYearsDuration(yearsDuration.splice(0, 1, value.value))
    }
    setYearsDuration(yearsDuration);
  }

  let yearOptions = [];
  let monthOptions = [];

  for (let i = 0; i < 100; i++) {
    yearOptions.push(i);
  }

  for (let i = 0; i < 12; i++) {
    monthOptions.push(i);
  }

  const years = yearOptions.map((el) => ({
    key: yearOptions[el] + 1,
    value: yearOptions[el],
    text: el
  }))

  const months = monthOptions.map((el) => ({
    key: monthOptions[el] + 1,
    value: monthOptions[el],
    text: el
  }))

  const handleAddAddress = (event) => {
    event.preventDefault();
    const formData = event.target;
    let addressDetails = [];

    if (monthsDuration.length === 0 || yearsDuration.length === 0) {
      setDurationErrors(true);
    } else {
      setYearsDuration(yearsDuration);
      setMonthsDuration(monthsDuration);
    }

    for (let i = 0; i < 4; i++) {
      addressDetails.push({ id: i, addressLine: formData[i].value })
    }

    setShowFields(false);
    setAddressDetails(addressDetailsCard.push(addressDetails));
    setAddressDetails(...addressDetailsCard)
    setShowDetailsCard(true);
  }

  const closePostCodeError = () => {
    setDurationErrors(false);
  }

  const handleAddressDelete = () => {
    setShowDetailsCard(false);
    setMonthsDuration([]);
    setYearsDuration([]);
    window.location.reload(false);//Realised used wrong parent -> child order structure
  }


  return (
    <div>
      <Modal show={showDurationErros} closeModal={closePostCodeError}>Please input living duration</Modal>
      <header className="header">Address </header>
      <header className="subHeader">Please enter your address</header>
      <hr className="hr" />
      {showDetailsCard &&
        <div className="DetailsCard">
          <header className="subHeader">Address Details</header>
          <hr className="hr" />
          {addressDetailsCard.map((el => <div key={Math.random()}>{el.addressLine}</div>))}
          <p>Time at this address: {yearsDuration} years and {monthsDuration} months</p>
          <button className="Button" onClick={handleAddressDelete}>Delete</button>
        </div>}
      <div className="address-duration">
        <header>How long have you lived at your current address?</header>
        <Dropdown
          className="ui Dropdown"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0)",
            color: "white",
            border: "2px solid white",
            width: "350px",
            fontWeight: "bold",
            justifyContent: "center",
            margin: "25px 0px 25px 0px",
          }}
          placeholder="Select years"
          selection
          options={years}
          onChange={handleYearsDuration}
        />
        <Dropdown
          className="ui Dropdown"
          placeholder="Select months"
          selection
          options={months}
          style={{
            backgroundColor: "rgba(0, 0, 0, 0)",
            color: "white",
            border: "2px solid white",
            width: "350px",
            fontWeight: "bold",
            justifyContent: "center",
            margin: "25px 0px 25px 0px",
            marginLeft: "50px"
          }}
          onChange={handleMonthsDuration}
        />
        <AddressSearch
          className="ui Dropdown"
          onClick={handleAddAddress}
          yearsSelected={yearsDuration}
          monthSelected={monthsDuration}
          showFields={showFields}
        />
      </div>
    </div >
  )
}

export default Address;