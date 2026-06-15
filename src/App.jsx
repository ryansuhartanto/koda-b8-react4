import { Outlet } from "react-router";

// oxlint-disable-next-line no-unassigned-import
import "#/style.css";

/**
 * @typedef Users
 * @prop {number} id
 * @prop {string} name
 * @prop {string} username
 * @prop {string} email
 * @prop {object} address
 * @prop {string} address.street
 * @prop {string} address.suite
 * @prop {string} address.city
 * @prop {string} address.zipcode
 * @prop {object} address.geo
 * @prop {string} address.geo.lat
 * @prop {string} address.geo.lng
 * @prop {string} phone
 * @prop {string} website
 * @prop {object} company
 * @prop {string} company.name
 * @prop {string} company.catchPhrase
 * @prop {string} company.bs
 */

/**
 * @returns {Promise<Users[]>}
 */
async function getData() {
	const req = await fetch("https://jsonplaceholder.typicode.com/users");
	const data = await req.json();
	return data;
}

export default function Layout() {
	return (
		<>
			<Outlet />
		</>
	);
}
