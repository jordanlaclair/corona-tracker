import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { CardDeck } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import Columns from "react-columns";
import { Form } from "react-bootstrap";
import "./App.css";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import AccessAlarmsIcon from "@material-ui/icons/AccessAlarms";
function App() {
	const [latest, setLatest] = useState([]); //world
	const [results, setResults] = useState([]); //countries
	const [query, setQuery] = useState(""); //searchbar

	/* useEffect(() => { THIS CODE IS FOR USING 1 API
		axios
			.get("https://corona.lmao.ninja/v2/all")
			.then((res) => {
				setLatest(res.data);
			})
			.catch((err) => {
				console.log(err.data);
			}); 
	}, []); */
	useEffect(() => {
		// snippet of code(1) which runs on specific condition(2)
		axios // in this case, on page load
			.all([
				axios.get("https://corona.lmao.ninja/v2/all"),
				axios.get("https://corona.lmao.ninja/v2/countries?sort=country"),
			])
			.then((res) => {
				//this useEffect is for getting 2 APIS at the same time
				setLatest(res[0].data);
				setResults(res[1].data);
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
	const countries = filterCountry.map((data) => {
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
						<Card.Text>Total Cases: {data.cases}</Card.Text>
						<Card.Text>Total Deaths: {data.deaths}</Card.Text>
						<Card.Text>Total Recovered: {data.recovered}</Card.Text>
						<Card.Text>Cases Today: {data.todayCases}</Card.Text>
						<Card.Text>Deaths Today: {data.todayDeaths}</Card.Text>
						<Card.Text>Active Posessors: {data.active}</Card.Text>
						<Card.Text>Critical Condition: {data.critical}</Card.Text>
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
					Cordona Virus Tracker <AccessAlarmsIcon className="logo" />
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav">
					<Nav className="mr-auto">
						<Nav.Link href="#features">Features</Nav.Link>
						<Nav.Link href="#pricing">Pricing</Nav.Link>
						<NavDropdown title="About" id="collasible-nav-dropdown">
							<NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
							<NavDropdown.Item href="#action/3.2">
								Another action
							</NavDropdown.Item>
							<NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
							<NavDropdown.Divider />
							<NavDropdown.Item href="#action/3.4">
								Separated link
							</NavDropdown.Item>
						</NavDropdown>
					</Nav>
					<Nav>
						<Nav.Link href="#deets">More deets</Nav.Link>
						<Nav.Link eventKey={2} href="#memes">
							Dank memes
						</Nav.Link>
					</Nav>
				</Navbar.Collapse>
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
					Search Country
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

			<Columns queries={queries}>{countries}</Columns>
			<br />
		</div>
	);
}

export default App;
