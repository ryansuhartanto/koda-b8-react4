import React from "react";

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

/**
 * @param {object}
 * @param {string} .name
 * @param {string} .username
 * @param {string} .email
 */
function UserCard({ name, username, email }) {
	return (
		<div className="flex flex-col gap-2 p-4 rounded-md bg-white">
			<h2 className="font-bold">{name}</h2>
			<div>{username}</div>
			<div>{email}</div>
		</div>
	);
}

export default function Layout() {
	const [data, setData] = React.useState([]);
	React.useEffect(() => {
		(async () => {
			const data = await getData();
			setData(data);
		})();
	}, [setData]);

	return (
		<div className="min-h-screen bg-gray-100">
			<div className="max-w-3xl mx-auto grid grid-cols-2 gap-4">
				{data.map((user) => (
					<UserCard {...user} />
				))}
			</div>
		</div>
	);
}
