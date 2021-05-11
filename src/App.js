import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { CardDeck } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import Columns from "react-columns";
import { Form } from "react-bootstrap";
import "./App.css";
import { Navbar } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
function App() {
	const [latest, setLatest] = useState([]); //world
	const [results, setResults] = useState([]); //countries
	const [states, setStates] = useState([]); //states
	const [query, setQuery] = useState(""); //searchbar

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
			])
			.then((res) => {
				//this useEffect is for getting 2 APIS at the same time
				setLatest(res[0].data);
				setResults(res[1].data);
				setStates(res[2].data);
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
		return query !== "" ? item.country.includes(query) : item;
	});
	const filterStates = states.filter((item) => {
		return query !== "" ? item.state.includes(query) : item;
	});
	function numberWithCommas(x) {
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}

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
						<Card.Img variant="top" src={data.countryInfo.flag}></Card.Img>
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
						{/* <Card.Img variant="top" src={data.countryInfo.flag}></Card.Img> */}
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
				className="header"
				collapseOnSelect
				expand="lg"
				bg="dark"
				variant="dark"
			>
				<Navbar.Brand className="nav-brand" href="#home">
					Corona Virus Tracker <AccountTreeIcon className="logo" />
				</Navbar.Brand>
			</Navbar>
			<Form>
				<Form.Group controlId="formGroupSearch">
					<Form.Control
						type="text"
						className="searchbar"
						onChange={(e) => {
							setQuery(e.target.value);
						}}
						autoComplete="off"
					/>
				</Form.Group>
				<Button className="search-button" variant="dark">
					Search
				</Button>{" "}
				<div className="search-bottom"> </div>
			</Form>

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

			<Columns queries={queries}>{countriesData}</Columns>
			<Columns queries={queries}>{statesData}</Columns>
			<br />
		</div>
	);
}

export default App;
