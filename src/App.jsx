import React from "react";

// oxlint-disable-next-line no-unassigned-import
import "#/style.css";

/**
 * @typedef User
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
 * @returns {Promise<User[]>}
 */
async function getData() {
	const req = await fetch("https://jsonplaceholder.typicode.com/users");
	const data = await req.json();
	return data;
}

/**
 * @typedef {object} UserCardProps
 * @prop {string} name
 * @prop {string} username
 * @prop {string} email
 */

/**
 * @param {UserCardProps}
 * @returns
 */
function UserCard({ name, username, email }) {
	return (
		<div className="flex flex-col gap-2 p-4 px-6 rounded-md bg-white">
			<h2 className="font-bold">{name}</h2>
			<div>{username}</div>
			<div>{email}</div>
		</div>
	);
}

/**
 * @typedef {Object} UsersProps
 * @prop {User[]} users
 * @prop {string} filter-name
 * @prop {React.ComponentProps<"input">["onChange"]} onChange
 */

/**
 * @param {UsersProps}
 */
function Users({ users, "filter-name": filterName, onChange }) {
	return (
		<div className="min-h-screen bg-gray-100">
			<nav className="sticky inset-bs-0 py-4">
				<div className="max-w-3xl mx-auto p-4 flex flex-col gap-4 bg-blue-200 rounded-xl">
					<h1 className="font-bold text-2xl text-center">Contact List</h1>
					<input
						type="text"
						placeholder="Search user..."
						className="bg-white p-2 px-4"
						value={filterName}
						onChange={onChange}
					/>
				</div>
			</nav>

			<div className="max-w-3xl mx-auto px-4 grid grid-cols-2 gap-4">
				{users.map(({ id, ...user }) => (
					<UserCard
						key={id}
						{...user}
					/>
				))}
			</div>
		</div>
	);
}

export default function Layout() {
	const [users, setUsers] = React.useState([]);
	React.useEffect(() => {
		(async () => {
			const data = await getData();
			setUsers(data);
		})();
	}, []);

	const [filterName, setFilterName] = React.useState("");
	const filteredUser = users.filter((user) =>
		user.name.toLowerCase().includes(filterName.toLowerCase()),
	);

	return (
		<Users
			users={filteredUser}
			filter-name={filterName}
			onChange={(e) => {
				setFilterName(e.target.value);
			}}
		/>
	);
}
