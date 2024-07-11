import PropTypes from "prop-types";

/**
 * @import { CompanyType } from './get'
 */

/**
 * 
 * @param {Object} props
 * @param {CompanyType} props.company - The company of the user. 
 * @memberof User
 * @example
 * const company = {
 *  name: 'ABC Company',
 *  catchPhrase: 'The best company',
 *  bs: 'Best company ever'
 * }
 * 
 * return (
 *  <UserCompany company={company} />
 * )
 */

export const UserCompany = ({ company }) => {
  return (
    <div style={{ border: '1px solid whitesmoke', padding: '8px' }}>
      <p>{company.name}</p>
      <p>{company.catchPhrase}</p>
      <p>{company.bs}</p>
    </div>
  );
};

UserCompany.propTypes = {
  company: PropTypes.shape({
    name: PropTypes.string.isRequired,
    catchPhrase: PropTypes.string.isRequired,
    bs: PropTypes.string.isRequired,
  }).isRequired,
};