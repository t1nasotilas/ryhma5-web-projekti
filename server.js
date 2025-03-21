const express = require("express");
const path = require("path");

const app = express();

// Serve static files from public folders
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "css")));
app.use(express.static(path.join(__dirname, "js")));
app.use(express.static(path.join(__dirname, "images")));
app.use(express.static(path.join(__dirname, "pages")));

// Default route (optional, serves index.html)
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// Ensure Azure listens on the correct port
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`🌍 Server running at http://localhost:${PORT}`);
});
