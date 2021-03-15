import React from 'react';
import InputFields from '../../components/InputFields/InputFields';

const AddressFields = (props) => {
  const postCode = props.postcode.toUpperCase();
  const addressArray = [...props.addressField, postCode];
  const fiveLineHeaders = ['Building', 'Address Line 1', 'Address Line 2', 'City', 'Postcode'];
  const fourLineHeaders = ['Address Line 1', 'Address Line 2', 'City', 'Postcode'];
  const threeLineHeaders = ['Address Line 1', 'City', 'Postcode'];

  if (addressArray.length === 5) {
    const result = Object.assign.apply({}, fiveLineHeaders.map((el, i) => ({ [el]: addressArray[i] })));
    var fiveLineAddress = Object.keys(result).map(key => ({ id: key, name: result[key] }));
  }

  if (addressArray.length === 4) {
    const result = Object.assign.apply({}, fourLineHeaders.map((el, i) => ({ [el]: addressArray[i] })));
    var fourLineAddress = Object.keys(result).map(key => ({ id: key, name: result[key] }));
  }

  if (addressArray.length === 3) {
    const result = Object.assign.apply({}, threeLineHeaders.map((el, i) => ({ [el]: addressArray[i] })));
    var threeLineAddress = Object.keys(result).map(key => ({ id: key, name: result[key] }));
  }

  return (
    <div>
      {addressArray.length === 5 && fiveLineAddress.map((el =>
        <div key={el.id}>
          <header className="label">{el.id}</header>
          <InputFields value={el.name} />
        </div>))}
      {addressArray.length === 4 && fourLineAddress.map((el =>
        <div key={el.id}>
          <header className="label">{el.id}</header>
          <InputFields value={el.name} />
        </div>))
      }
      {addressArray.length === 3 && threeLineAddress.map((el =>
        <div key={el.id}>
          <header className="label">{el.id}</header>
          <InputFields value={el.name} />
        </div>))
      }
    </div>
  )
}

export default AddressFields;
