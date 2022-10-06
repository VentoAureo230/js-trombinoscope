async function getFile() {
	let students = [];
	await fetch("/etudiants.json")
		.then((data) => data.json())
		.then((data) => { students = data.students})
	return students		
}

function createRow(data) {
	const loginDiv = document.createElement("p")
	loginDiv.innerHTML = "Login : " + data.login
	document.body.appendChild(loginDiv)

	const nameDiv = document.createElement("p")
	nameDiv.innerHTML = "Nom : " + data.name
	document.body.appendChild(nameDiv)

	const bioDiv = document.createElement("p")
	bioDiv.innerHTML = "Biographie : " + data.bio
	document.body.appendChild(bioDiv)
 
	const followersDiv = document.createElement("a")
	followersDiv.href =  data.followers_url
	followersDiv.innerHTML = "Followers : " + data.followers
	document.body.appendChild(followersDiv)

	const locationDiv = document.createElement("p")
	locationDiv.innerHTML = "Location : " + data.location
	document.body.appendChild(locationDiv)

	const publicRepos = document.createElement("p")
	publicRepos.innerHTML = "Dépôts publiés : " + data.public_repos
	document.body.appendChild(publicRepos)

	const gitLink = document.createElement("a")
	gitLink.href = data.html_url
	document.body.appendChild(gitLink)

	const avatarDiv = document.createElement("img")
	avatarDiv.src = data.avatar_url
	document.body.appendChild(avatarDiv)

}

async function search() {
	let logins = await getFile()
	for(login of logins)
		if (login != null) {
			fetch(`https://api.github.com/users/${login}`, {
				headers: new Headers({"Authorization": "Bearer "})
			})
			.then((data) => data.json())
			.then((data) => createRow(data))
		} else {
			console.error('Erreur pendant le chargement');
		}
}

