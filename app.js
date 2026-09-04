require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");

const app = express();

const PORT = 3000;

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected"); 
    })
    .catch((error) => {
        console.error("MongoDB connection error:", error);
    });

// ==============================
// EJS
// ==============================

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(expressLayouts);

app.set("layout", "layouts/main");


// ==============================
// Middleware
// ==============================

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
    res.locals.currentPath = req.path;
    next();
});


// ==============================
// Routes
// ==============================

const reviewRoutes = require("./routes/review");

app.use("/reviews", reviewRoutes);

app.get("/", (req, res) => {
    res.render("pages/home", {
        title: "Marjheerdy | Shopify Expert & Ecommerce Growth Agency"
    });
});

app.get("/about", (req, res) => {
    res.render("pages/about", {
        title: "About Marjheerdy | Shopify Growth Agency"
    });
});

app.get("/services", (req, res) => {
    res.render("pages/services", { title: "Shopify Services | CRO, SEO, Design & Email — Marjheerdy" });
});

app.get("/packages", (req, res) => {
    res.render("pages/packages", { title: "Shopify Packages & Pricing | Marjheerdy" });
});

app.get("/case-studies", (req, res) => {
    res.render("pages/case-studies", {
        title: "Shopify Case Studies & Example Scenarios | Marjheerdy"
    });
});

// app.get("/reviews", (req, res) => {
//     res.render("pages/reviews", {
//         title: "Client Reviews | Marjheerdy Shopify Growth Partner"
//     });
// });

app.get("/faq", (req, res) => {
    res.render("pages/faq", {
        title: "Shopify Agency FAQ | Marjheerdy"
    });
});

app.get("/contact", (req, res) => {
    res.render("pages/contact", {
        title: "Contact Marjheerdy | Discuss Your Shopify Store"
    });
});


// ==============================
// 404
// ==============================

app.use((req, res) => {
    res.status(404).render("404", {
        title: "Page Not Found"
    });
});


// ==============================
// Start Server
// ==============================

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});