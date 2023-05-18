const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const pets = [
	{
		name: "'Toinette",
		color: ["white", "black", "brown"],
		type: "cat",
	},
	{
		name: "Bass",
		color: ["black", "blonde", "white"],
		type: "dog",
	},
	{
		name: "Illiu",
		color: ["black", "white"],
		type: "cat",
	},
	{
		name: "Maiana's pet",
		color: ["awesomest"],
		type: "Unknown",
	},
];

app.get("/", (request, response, next) => {
	response.json({ message: "Wohooo we did it!" });
});

// app.get("/pets", (req, res) => {
// 	res.json("ok");
// });
app.get("/pets", (req, res) => {
	res.json(pets);
});

app.post("/pets", (req, res) => {
	if (!req.body.name || !req.body.color || !req.body.type) {
		return res
			.status(400)
			.json({ message: "Be sure to send a name, color and type properties" });
	}
	pets.push(req.body);
	res.status(201).json({ message: "created" });
});

app.listen(3000, () => console.log(`Server is 🏃 on http://localhost:3000`));
