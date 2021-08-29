const searchTeam = () => {
	const searchField = document.getElementById('search-field');
	const searchFieldTxt = searchField.value;
	// const newtxt = searchFieldTxt.replace(
	// 	searchFieldTxt[0],
	// 	searchFieldTxt[0].toUpperCase()
	// );

	//Clear input
	searchField.value = '';
	fetch(
		`https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=${searchFieldTxt}`
	)
		.then((res) => res.json())
		.then((data) => {
			displaySearchResults(data.teams);
		});
};
const displaySearchResults = (teams) => {
	const searchResults = document.getElementById('search-result');
	searchResults.innerHTML = '';

	for (const team of teams) {
		const div = document.createElement('div');
		console.log(team);
		div.classList.add('row');
		div.innerHTML = `<div onclick="teamInfo(${team.idTeam})" class="col-md-4 py-3">
					<h4>${team.strTeam}</h4>
					<img class="img-fluid" src="${team.strStadiumThumb}" />
					<p>${team.strStadium}</p>
					<p>${team.intStadiumCapacity}</p>
				</div>
				<div class="col-md-4 py-3">
					<h4>${team.strTeamShort}</h4>
					<img class="img-fluid w-25" src="${team.strTeamBadge}" />
				</div>
				<div class="col-md-4 py-3">
					<h4><p>${team.strCountry}</p></h4>
					<img class="img-fluid w-50" src="${team.strTeamJersey}" />
				</div>`;
		searchResults.appendChild(div);
	}
};
const teamInfo = (teamId) => {
	fetch(`https://www.thesportsdb.com/api/v1/json/1/lookupteam.php?id=${teamId}`)
		.then((res) => res.json())
		.then((data) => displayTeams(data.teams[0]));
};
const displayTeams = (team) => {
	console.log(team);
	const teamResults = document.getElementById('team-results');
	teamResults.innerHTML = '';
	const div = document.createElement('div');
	div.classList.add('row');

	div.innerHTML = `<div onclick="teamInfo(${team.idTeam})" class="col-md-4 py-3">
					<h4>${team.strTeam}</h4>
					<img class="img-fluid" src="${team.strStadiumThumb}" />
					<p>${team.strStadium}</p>
					<p>${team.intStadiumCapacity}</p>
				</div>
				<div class="col-md-4 py-3">
					<h4>${team.strTeamShort}</h4>
					<img class="img-fluid w-25" src="${team.strTeamBadge}" />
				</div>
				<div class="col-md-4 py-3">
					<h4><p>${team.strCountry}</p></h4>
					<img class="img-fluid w-50" src="${team.strTeamJersey}" />
				</div>`;
	teamResults.appendChild(div);
};
