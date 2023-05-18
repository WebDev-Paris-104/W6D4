// Inporting express
import express from "express";
// Getting the app object
const app = express();
import crypto from "crypto";

/**
 * Settings to be able to read html forms and json data
 * inside of the request body.
 */

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// import json file
import characters from "./characters.json" assert { type: "json" };

/**
 * Routing
 */

app.get("/characters", (req, res) => {
	console.log(req.query);
	let charactersToSend = characters;
	if (req.query.name) {
		charactersToSend = charactersToSend.filter((character) => {
			return character.name
				.toLowerCase()
				.includes(req.query.name.toLowerCase());
		});
	}
	if (req.query.race) {
		charactersToSend = charactersToSend.filter((character) => {
			return character.race
				.toLowerCase()
				.includes(req.query.race.toLowerCase());
		});
	}
	if (!charactersToSend.length) {
		return res.json({
			message: "Could not match anything in our database.",
		});
	}
	res.json(charactersToSend);
});

app.get("/characters/:id", (req, res) => {
	console.log(req.params);
	// req.params is an object with an id key
	const foundCharacter = characters.find((character) => {
		return character._id === req.params.id;
	});

	if (foundCharacter) {
		return res.json(foundCharacter);
	} else {
		return res.json({
			message: `Could not find the character with id: ${req.params.id}`,
		});
	}
});

app.post("/characters", (req, res) => {
	const data = { ...req.body };
	if (!data.name || !data.gender || !data.race) {
		return res.json({ message: "Comon mate, give me something to work with" });
	}

	data._id = crypto.randomUUID();

	characters.push(data);
	res.status(201).json({
		created: data,
		message: "good job!",
	});
});

app.get("*", (req, res) => {
	res
		.status(404)
		.json({
			message: "This route does not exist.",
			validEndpoints: ["GET /characters", "GET /characters/:id"],
		});
});

app.listen(3000, () =>
	console.log("Server is running on http://localhost:3000")
);
