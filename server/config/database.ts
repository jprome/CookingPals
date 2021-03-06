import mongoose, { ConnectOptions } from "mongoose";

const URI = process.env.MONGODB_URL;

// Connection to Mongoose
mongoose.connect(
	`${URI}`,
	{
		useNewUrlParser: true,
		useFindAndModify: false,
		useUnifiedTopology: true,
		useCreateIndex: true,
		ignoreUndefined: true,
	},
	(err) => {
		console.log(URI);
		if (err) throw err;
		console.log("Mongodb connection successfull");
	}
);
