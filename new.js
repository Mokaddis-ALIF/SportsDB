//Load event
window.addEventListener('load', () => {
	const api = `https://www.thesportsdb.com/api/v1/json/1/eventspastleague.php?id=4328`;
	fetch(api)
		.then((res) => res.json())
		.then((data) => displayTeamResults(data.events));
});
const displayTeamResults = (data) => {
	// console.log(data);
	const liveResults = document.getElementById('live-results');
	for (const team of data) {
		const div = document.createElement('div');
		div.innerHTML = `<div 
			class="card bg-success m-2 border border-dark rounded"
			style="width: 22rem"
		>
                        <img class="img-fluid" src="${team.strThumb}" class="card-img-top" alt="..." />
                        <div class="card-body">
                            <h5 class="card-title">${team.strEvent}: ${team.intHomeScore}-${team.intAwayScore}</h5>
                            <p class="card-text">
                                <span><b>Venue: </b>${team.strVenue}<br></span>
                                ${team.strLeague}
                            </p>
                        </div>
			            </div>`;
		liveResults.appendChild(div);
	}
};
//Search event
const searchTeam = () => {
	const searchField = document.getElementById('search-field');
	const searchFieldTxt = searchField.value;

	//Clear input
	searchField.value = '';
	//teams
	fetch(
		`https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=${searchFieldTxt}`
	)
		.then((res) => res.json())
		.then((data) => {
			displaySearchResults(data.teams);
		});
	//players
	resultsNow(searchFieldTxt);
};
//search results for team
const displaySearchResults = (teams) => {
	const searchResults = document.getElementById('search-result');
	searchResults.innerHTML = ``;

	// searchResult
	for (const team of teams) {
		const div = document.createElement('div');
		div.classList.add('row');

		div.innerHTML = `<div onclick="teamInfo(${team.idTeam})"
					class="
						col-md-6
						d-flex
						flex-column
						justify-content-center
						align-items-center
					"
				>
					<div class="row d-flex flex-column">
						<div
							class="
								col-md-4
								d-flex
								flex-row
								justify-content-between
								align-items-center
								pb-2
							"
						>
							<img src="https://www.thesportsdb.com/images/icons/artist.png" />
							<b>Teams</b>
						</div>
						<div class="col-md-8 d-flex
								flex-column
								justify-content-between
								align-items-center">
							<img
								src="${team.strTeamBadge}"
								height="100"
								width="100"
                                class="ms-3"
							/>
							<div
								class="text-center"
							>
                            
							<p class="py-2 text-center">${team.strTeam}</p>
							</div>
						</div>
					</div>
				</div>
                	<div
					class="
						col-md-6
						d-flex
						flex-column
						justify-content-center
						align-items-center
					"
				>
					<img
						class="img-fluid rounded-3"
						height="120"
						width="200"
						src="${team.strStadiumThumb}"
					/>
					<p class="lead py-2 text-center">${team.strStadium}</p>
				</div>`;

		searchResults.appendChild(div);
	}
};
//teaminfo drom search results
const teamInfo = (teamId) => {
	fetch(`https://www.thesportsdb.com/api/v1/json/1/lookupteam.php?id=${teamId}`)
		.then((res) => res.json())
		.then((data) => teamInfoResultsDisplay(data.teams[0]));
};
//teaminfo drom search results and display
const teamInfoResultsDisplay = (team) => {
	const teamInfoResults = document.getElementById('teamInfo-results');
	teamInfoResults.innerHTML = '';
	const div = document.createElement('div');
	div.classList.add('row');
	div.innerHTML = `<div
						class="
							col-md-4
							d-flex
							flex-column
							justify-content-center
							align-items-center
						"
					>
						<h3 class="pb-3">${team.strTeam}</h3>
						<img
							class="img-fluid"
							src="${team.strTeamBadge}"
							height="200"
							width="250"
						/>
						<h3 class="pt-3">${team.intFormedYear}</h3>
					</div>
					<div
						class="
							col-md-4
							d-flex
							flex-column
							justify-content-center
							align-items-center
						"
					>
						<h3 class="pb-3">${team.strTeamShort}</h3>
						<img
							class="img-fluid"
							src="${team.strTeamJersey}"
							height="200"
							width="300"
							
						/>
						<h3 class="pt-3">${team.strKeywords}</h3>
					</div>
					<div
						class="
							col-md-4
							d-flex
							flex-column
							justify-content-center
							align-items-center
						"
					>
						<h3 class="pb-3">Stadium</h3>
						<img
							class="img-fluid rounded"
							src="${team.strStadiumThumb}"
							
						/>
						<p class="lead pt-4">${team.intStadiumCapacity},${team.strStadiumLocation}</p>
					</div>`;
	teamInfoResults.appendChild(div);
};
//Players result display
const resultsNow = (data) => {
	fetch(`https://www.thesportsdb.com/api/v1/json/1/searchplayers.php?p=${data}`)
		.then((res) => res.json())
		.then((data) => {
			resultsNowDisplay(data.player);
		});
};

const resultsNowDisplay = (players) => {
	// console.log(players);
	const playerResults = document.getElementById('player-results');
	playerResults.innerHTML = '';
	for (const player of players) {
		// console.log(player);
		const div = document.createElement('div');
		div.classList.add('row');
		div.innerHTML = `<div class="col-md-8 py-2 pb-2 my-2 border-end-0
						border border-4
						rounded-end" onclick="location.href='https://www.google.com/';">
					<div class="row d-flex flex-row">
						<div class="col-md-6">
							<img
								class="img-fluid"
								src="${player.strThumb}"
								
							/>
						</div>
						<div class="col-md-6">
							<img
								class="img-fluid"
								src="${player.strCutout}"
								
							/>
						</div>
					</div>
				</div>
				<div
					class="
						col-md-4
						d-flex
						flex-column
						justify-content-center
						align-items-center
						py-2
						pb-2
						my-2
						border-start-0
						border border-4
						rounded-start
						
					"
				>
					<h3><span class="fw-bold">Name:</span> ${player.strPlayer}</h3>
			<h4>
				<span class="fw-bold">Nationality:</span> ${player.strNationality}
			</h4>
			<h4><span class="fw-bold">Club:</span> ${player.strTeam}</h4>
			<h5><span class="fw-bold">Date of Birth:</span> ${player.dateBorn}</h5>
			<h5>
				<span class="fw-bold">Birth Location:</span> ${player.strBirthLocation}
			</h5>
			<h5><span class="fw-bold">Number:</span> ${player.strNumber}</h5>
			<h5><span class="fw-bold">Gender:</span> ${player.strGender}</h5>
			<h5><span class="fw-bold">Height:</span> ${player.strHeight}</h5>
			<h5><span class="fw-bold">Weight:</span> ${player.strWeight}</h5>
				</div>`;
		playerResults.appendChild(div);
	}
};
