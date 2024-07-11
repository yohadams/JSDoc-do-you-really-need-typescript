import PropTypes from "prop-types";

/**
 * @import { AddressType } from './get'
 */

/**
 * Component for displaying user address information.
 * 
 * @memberof User
 * @param {Object} props
 * @param {AddressType} props.address - The address of the user. 
 * @return {JSX.Element}
 * @example
 * const address = {
 *  street: '123 Main St',
 *  suite: 'Apt 101',
 *  city: 'Springfield',
 *  zipcode: '12345'
 *  geo: {
 *   lat: '123.456',
 *   lng: '456.789',
 *  },
 * }
 * 
 * return (
 *  <UserAddress address={address} />
 * )
 */

export const UserAddress = ({ address }) => {
  return (
    <div style={{ border: '1px dashed whitesmoke', padding: '8px' }}>
      <p>{address.street}</p>
      <p>{address.suite}</p>
      <p>{address.city}</p>
      <p>{address.zipcode}</p>
      <p><a href={`https://maps.google.com/?q=${address.geo.lat},${address.geo.lng}`}>Google map link</a></p>
    </div>
  );
};

UserAddress.propTypes = {
  address: PropTypes.shape({
    street: PropTypes.string.isRequired,
    suite: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    zipcode: PropTypes.string.isRequired,
  }).isRequired,
};