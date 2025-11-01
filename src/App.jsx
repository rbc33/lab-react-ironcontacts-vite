import { useState } from 'react'
import './App.css'
import cont from './contacts.json'

function App() {
	const [contacts, setContacts] = useState(cont.slice(0, 5))
	const set = new Set()
	contacts.forEach((c) => set.add(c.id))
	const handleAdd = () => {
		const filtered = cont.filter((c) => !set.has(c.id))

		if (filtered.length === 0) return

		const randomIndex = Math.floor(Math.random() * filtered.length)
		const randomContact = filtered[randomIndex]
		setContacts([...contacts, randomContact])
	}

	const handleSort = () => {
		setContacts([...contacts].sort((a, b) => a.localCompare(b)))
	}
	const handleSortByPop = () => {
		setContacts([...contacts].sort((a, b) => b.popularity - a.popularity))
	}

	return (
		<div className="App">
			<h1>IronContacts</h1>
			<button onClick={handleAdd}>Add Random Contact</button>
			<button onClick={handleSort}>Sort by Name</button>
			<button onClick={handleSortByPop}>Sort by Popularity</button>
			<table>
				<thead>
					<tr>
						<th>Picture</th>
						<th>Name</th>
						<th>Popularity</th>
						<th>Won an Oscar</th>
						<th>Won an Emmy</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{contacts.map((c) => (
						<tr key={c.id}>
							<td>
								<img src={c.pictureUrl} alt={c.name} width="100" />
							</td>
							<td>
								<h2>{c.name}</h2>
							</td>
							<td>
								<p>{c.popularity.toFixed(2)}</p>
							</td>
							<td>{c.wonOscar ? '🏆' : ''}</td>
							<td>{c.wonEmmy ? '🌟' : ''}</td>
							<td>
								<button
									onClick={() =>
										setContacts(contacts.filter((cont) => cont.id !== c.id))
									}
								>
									Delete
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default App
