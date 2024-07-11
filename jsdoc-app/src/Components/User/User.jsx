import PropTypes from "prop-types";
import { useEffect, useState } from "react";

import { getUser } from "./get";
import { UserAddress } from "./UserAddres";
import { UserCompany } from "./UserCompany";
import { useUser } from "../../UserContext";

/**
 * @namespace User
 */

/**
 * @import { UserType } from './get'
 */


/**
 * Component for user details to show in the app
 * 
 * @component
 * @memberof User
 * @param {Object} props
 * @param {number} props.id - The unique identifier for the user.
 * @example
 * const id = 1;
 * return (
 *  <User id={id} />
 * )
 */
export const User = ({ id }) => {
  const userCache = useUser();
   const [user, setUser] = useState(/** @type {UserType} */ ({}));

  useEffect(() => {
    const fetchUser = async () => {
      const cachedUser = userCache.getUser(id);
      if (cachedUser) {
        setUser(cachedUser);
        return;
      }

      try {
        const user = await getUser(id);
        setUser(user);
        userCache.cacheUser(user);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, [id])

  if (Object.keys(user).length === 0) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1>{user.username}</h1>
      <p>Phone: {user.phone}</p>
      <p>Website: <a href={`http://${user.website}`}>{user.website}</a></p>
      <h3>Company</h3>
      <UserCompany company={user.company} />
      <h3>Address</h3>
      <UserAddress address={user.address} />
    </div>
  )
};

User.propTypes = {
  id: PropTypes.number.isRequired,
};