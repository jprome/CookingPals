
import mongoose, { ConnectOptions } from "mongoose";

const URI = process.env.MONGODB_URL

mongoose.connect(
  `${URI}`,
    {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
      useCreateIndex: true
    },
    (err) => {
      console.log(URI)
      if(err) throw err;
      console.log('Mongodb connection successfull')
    }
  );
  