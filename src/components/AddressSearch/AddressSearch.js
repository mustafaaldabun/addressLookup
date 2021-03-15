import React, { useState } from 'react';
import axios from 'axios';
import './AddressSearch.css';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Modal from '../Modal/Modal';
import AddressDropdown from '../AddressDropdown/AddressDropdown';

export default function AddressSearch(props) {
  const [value, setValue] = useState('');
  const [postCodeError, setPostCodeError] = useState();
  const [apiError, setApiError] = useState();
  const [addressDropdown, setAddressDropdown] = useState([]);
  const [showAddressList, setShowAddressList] = useState();
  const [storePostcode, setStorePostCode] = useState('');

  const handleSubmit = (newValue) => {
    newValue.preventDefault();
    setValue('');

    if (newValue.type === 'submit' || newValue.type === 'click' || newValue.key === 'Enter') {
      setValue(newValue);
      const apiKey = 'd2CFjHGLvUyAn7ZhPpR9eQ30092';
      axios({
        url: `https://api.getAddress.io/autocomplete/${value}?api-key=${apiKey}`,
        method: "get",
        headers: {
          "Access-Control-Allow-Origin": "true",
        },
      }).then((res) => {
        let addressList = res.data.suggestions.map((el) => el.address);
        if (addressList.length === 0) {
          setPostCodeError(true)
        } else {
          setAddressDropdown([...addressList]);
          setShowAddressList(true);
          setPostCodeError(false);
          setStorePostCode(value);
        }
      }).catch((err) => {
        if (err) {
          setApiError(true);
        }
      })
      setValue('');
    }
  }

  const closePostCodeError = () => {
    setValue('');
    setPostCodeError(false);
    setApiError(false);
  }

  return (
    <div>
      <Modal show={postCodeError} closeModal={closePostCodeError}>Please enter a valid postcode</Modal>
      <Modal show={apiError} closeModal={closePostCodeError}>ERROR 404 (NOT FOUND)</Modal>
      <form onSubmit={handleSubmit}>
        <header className="label">Postcode search</header>
        <div className="search-field">
          <InputBase
            value={value}
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0)',
              color: 'white',
              fontWeight: 'bold',
              minWidth: '650px'
            }}
            type="text"
            className="input"
            onChange={e => { setValue(e.target.value) }}
            placeholder="Enter postcode"
          />
          <IconButton
            onClick={handleSubmit}
            style={{
              color: 'white',
              marginLeft: '40px'
            }}
          >
            <SearchIcon />
          </IconButton>
        </div>
      </form>
      {
        showAddressList && props.showFields && <>
          <header className="label">Address</header>
          <form onSubmit={props.onClick}>
            <AddressDropdown
              show={props.showFields}
              showAddressList={showAddressList}
              address={addressDropdown}
              postcode={storePostcode}
              onSubmit={props.onClick}
            />
          </form>
        </>
      }
    </div >
  )
}
