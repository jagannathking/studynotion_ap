// Importing necessary modules and packages
const express = require("express");
const app = express();
const userRoutes = require("./routes/user");
const profileRoutes = require("./routes/profile");
const courseRoutes = require("./routes/Course");
const paymentRoutes = require("./routes/Payments");
const contactUsRoute = require("./routes/Contact");
const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");

// Handling uncaught Exception
process.on("uncaughtException", (err) => {
	console.log(`Error: ${err.message}`);
	console.log(`shutting down the server for handling uncaught exception`);
  });



// config
if (process.env.NODE_ENV !== "PRODUCTION") {
	require("dotenv").config({
	  path: ".env",
	});
  }


// Connecting to database
database.connect();
 
// Middlewares
app.use(express.json());
app.use(cookieParser());

const corsOptions = {
	origin: 'https://studynotion-ap-frontend.vercel.app',
	methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
	credentials: true, // Enable credentials (cookies, authorization headers, etc.)
	optionsSuccessStatus: 204, // Some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

app.use(
	fileUpload({
		useTempFiles: true,
		tempFileDir: "/tmp/",
	})
);

// Connecting to cloudinary
cloudinaryConnect();

// Setting up routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/reach", contactUsRoute);

// Testing the server
app.get("/", (req, res) => {
	return res.json({
		success: true,
		message: "Your server is up and running ...",
	});
});




// Listening to the server
app.listen(process.env.PORT, () => {
	console.log(
	  `Server is running on http://localhost:${process.env.PORT}`
	);
  });
  


// unhandled promise rejection
process.on("unhandledRejection", (err) => {
	console.log(`Shutting down the server for ${err.message}`);
	console.log(`shutting down the server for unhandle promise rejection`);
  
	server.close(() => {
	  process.exit(1);
	});
  });
