import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { CardDeck } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import Columns from "react-columns";
import { Form } from "react-bootstrap";
import "./App.css";
import { Navbar, NavDropdown } from "react-bootstrap";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import { Search } from "@material-ui/icons";

function App() {
	const [latest, setLatest] = useState([]); //world
	const [results, setResults] = useState([]); //countries
	const [states, setStates] = useState([]); //states
	const [query, setQuery] = useState(""); //searchbar
	const [stateFlag, setStateFlag] = useState([]); //state flag images
	const [toggleStates, setToggleStates] = useState(false);
	const [toggleCountries, setToggleCountries] = useState(true);

	useEffect(() => {
		const timeOutId = setTimeout(() => {}, 500);
		return () => clearTimeout(timeOutId);
	}, [query]);

	useEffect(() => {
		// snippet of code(1) which runs on specific condition(2)
		axios // in this case, on page load
			.all([
				axios.get("https://corona.lmao.ninja/v2/all"),
				axios.get("https://corona.lmao.ninja/v2/countries?sort=country"),
				axios.get("https://corona.lmao.ninja/v2/states"),
				axios.get(
					"https://raw.githubusercontent.com/CivilServiceUSA/us-states/master/data/states.json"
				),
			])
			.then((res) => {
				//this useEffect is for getting 3 APIS at the same time
				setLatest(res[0].data); //worldwide
				setResults(res[1].data); //countries
				setStates(res[2].data); //states
				setStateFlag(res[3].data); //set flags for states
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	let wwTests = String(latest.tests).replace(/(.)(?=(\d{3})+$)/g, "$1,");
	let wwCases = String(latest.cases).replace(/(.)(?=(\d{3})+$)/g, "$1,");
	let wwRecoveries = String(latest.recovered).replace(
		/(.)(?=(\d{3})+$)/g,
		"$1,"
	);
	let wwDeaths = String(latest.deaths).replace(/(.)(?=(\d{3})+$)/g, "$1,");
	const date = new Date(parseInt(latest.updated));
	const stringDate = date.toString();
	const filterCountry = results.filter((item) => {
		if (query !== "") {
			return item.country.toLowerCase().includes(query.toLowerCase());
		} else {
			return item;
		}
	});
	const filterStates = states.filter((item) => {
		if (query !== "") {
			return item.state.toLowerCase().includes(query.toLowerCase());
		} else {
			return item;
		}
	});
	const filterStateFlag = stateFlag.filter((item) => {
		if (query !== "") {
			return item.state.toLowerCase().includes(query.toLowerCase());
		} else {
			return item;
		}
	});
	function numberWithCommas(x) {
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}
	let toggleCountriesClick = (e) => {
		e.preventDefault();
		setToggleStates(false);
		setToggleCountries(true);
		setQuery("");
	};

	let toggleStatesClick = (e) => {
		e.preventDefault();
		setToggleStates(true);
		setToggleCountries(false);
		setQuery("");
	};

	const style = {
		borderRadius: 10,

		marginBottom: 10,
	};
	let search = (e) => {
		if (e.keyCode === 13) {
			setQuery(e.target.value);
		}
	};
	const countriesData = filterCountry.map((data) => {
		return (
			<div key={uuidv4()} className="country">
				<Card
					bg="success"
					text="white"
					className="text-center bubble-effect"
					style={{ margin: "10px" }}
				>
					<Card.Body>
						<Card.Img
							variant="top"
							style={style}
							src={data.countryInfo.flag}
						></Card.Img>
						<Card.Title>{data.country}</Card.Title>
						<Card.Subtitle>
							<hr />
						</Card.Subtitle>
						<Card.Text>Total Cases: {numberWithCommas(data.cases)}</Card.Text>
						<Card.Text>Total Deaths: {numberWithCommas(data.deaths)}</Card.Text>
						<Card.Text>
							Total Recovered: {numberWithCommas(data.recovered)}
						</Card.Text>
						<Card.Text>
							Cases Today: {numberWithCommas(data.todayCases)}
						</Card.Text>
						<Card.Text>
							Deaths Today: {numberWithCommas(data.todayDeaths)}
						</Card.Text>
						<Card.Text>
							Active Posessors: {numberWithCommas(data.active)}
						</Card.Text>
						<Card.Text>
							Critical Condition: {numberWithCommas(data.critical)}
						</Card.Text>
					</Card.Body>
				</Card>
			</div>
		);
	});
	const statesData = filterStates.map((data) => {
		return (
			<div key={uuidv4()} className="country">
				<Card
					bg="success"
					text="white"
					className="text-center bubble-effect"
					style={{ margin: "10px" }}
				>
					<Card.Body>
						{filterStateFlag.map((data1) => {
							if (data.state == data1.state) {
								return (
									<Card.Img
										key={data1.state}
										variant="top"
										style={style}
										src={data1.state_flag_url}
									></Card.Img>
								);
							}
						})}
						<Card.Title>{data.state}</Card.Title>
						<Card.Subtitle>
							<hr />
						</Card.Subtitle>
						<Card.Text>Total Cases: {numberWithCommas(data.cases)}</Card.Text>
						<Card.Text>Total Deaths: {numberWithCommas(data.deaths)}</Card.Text>
						<Card.Text>
							Total Recovered: {numberWithCommas(data.recovered)}
						</Card.Text>
						<Card.Text>
							Cases Today: {numberWithCommas(data.todayCases)}
						</Card.Text>
						<Card.Text>
							Deaths Today: {numberWithCommas(data.todayDeaths)}
						</Card.Text>
						<Card.Text>
							Active Posessors: {numberWithCommas(data.active)}
						</Card.Text>
						{/* <Card.Text>
							Critical Condition: {numberWithCommas(data.critical)}
						</Card.Text> */}
					</Card.Body>
				</Card>
			</div>
		);
	});
	var queries = [
		{
			columns: 2,
			query: "min-width: 500px",
		},
		{
			columns: 3,
			query: "min-width: 1000px",
		},
		{
			columns: 4,
			query: "min-width: 1500px",
		},
	];
	return (
		<div className="App">
			<Navbar
				fixed="top"
				variant="dark"
				className="header"
				collapseOnSelect
				expand="lg"
			>
				<Navbar.Brand className="nav-brand" href="#home">
					Corona Virus Tracker <AccountTreeIcon className="logo" />
				</Navbar.Brand>

				<NavDropdown title="Filter" id="collapsible-nav-dropdown">
					<NavDropdown.Item onClick={toggleCountriesClick}>
						Countries
					</NavDropdown.Item>
					<NavDropdown.Divider />
					<NavDropdown.Item onClick={toggleStatesClick}>
						States
					</NavDropdown.Item>
				</NavDropdown>

				<Form>
					<Form.Control
						placeholder="Search"
						type="text"
						className="mr-sm-2"
						onKeyDown={(e) => {
							search(e);
						}}
						autoComplete="off"
					/>
				</Form>
			</Navbar>

			<CardDeck className="card-deck">
				<Card
					bg="secondary"
					text="white"
					className="text-center bubble-effect"
					style={{ margin: "120px 10px 33px 10px" }}
				>
					<Card.Body>
						<Card.Title>Total Cases Worldwide</Card.Title>
						<Card.Subtitle>
							<hr />
						</Card.Subtitle>
						<Card.Text>{wwCases}</Card.Text>
					</Card.Body>
					<Card.Footer>
						<small>Last updated:{stringDate}</small>
					</Card.Footer>
				</Card>
				<Card
					bg="danger"
					text="white"
					className="text-center bubble-effect"
					style={{ margin: "120px 10px 33px 10px" }}
				>
					<Card.Body>
						<Card.Title>Total Deaths Worldwide</Card.Title>
						<Card.Subtitle>
							<hr />
						</Card.Subtitle>
						<Card.Text>{wwDeaths}</Card.Text>
					</Card.Body>
					<Card.Footer>
						<small>Last updated:{stringDate}</small>
					</Card.Footer>
				</Card>
				<Card
					bg="warning"
					text="white"
					className="text-center bubble-effect"
					style={{ margin: "120px 10px 33px 10px" }}
				>
					<Card.Body>
						<Card.Title>Total Recoveries Worldwide</Card.Title>
						<Card.Subtitle>
							<hr />
						</Card.Subtitle>
						<Card.Text>{wwRecoveries}</Card.Text>
					</Card.Body>
					<Card.Footer>
						<small>Last updated:{stringDate}</small>
					</Card.Footer>
				</Card>
				<Card
					bg="success"
					text="white"
					className="text-center bubble-effect"
					style={{ margin: "120px 10px 33px 10px" }}
				>
					<Card.Body>
						<Card.Title>Total Tests Inducted Worldwide</Card.Title>
						<Card.Subtitle>
							<hr />
						</Card.Subtitle>
						<Card.Text>{wwTests}</Card.Text>
					</Card.Body>
					<Card.Footer>
						<small>Last updated: {stringDate}</small>
					</Card.Footer>
				</Card>
			</CardDeck>
			{toggleCountries ? (
				<Columns queries={queries}>{countriesData}</Columns>
			) : (
				<Columns queries={queries}>{statesData}</Columns>
			)}

			<br />
		</div>
	);
}

export default App;
