import { getUser } from "./User";

const UserPage = ({ userId }) => {
  const user = getUser('string');


  return `
    <div>
      <h1>${user.name}</h1>
      <p>${user.email}</p>
      <p>${user.phone}</p>
      <p>${user.website}</p>
      <h2>Address</h2>
      <p>${user.address.street}</p>
      <p>${user.address.suite}</p>
      <p>${user.address.city}</p>
      <p>${user.address.zipcode}</p>
      <h2>Company</h2>
      <p>${user.company.name}</p>
      <p>${user.company.catchPhrase}</p>
      <p>${user.company.bs}</p>
    </div>
  `;
};