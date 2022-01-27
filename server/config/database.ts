
import mongoose, { ConnectOptions } from "mongoose";
const URI = "mongodb+srv://jose:1234@cluster0.fsdna.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

mongoose.connect(
    URI,
    {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
      useCreateIndex: true
    }
  );
  