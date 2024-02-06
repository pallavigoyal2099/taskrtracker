import mongoose from "mongoose";    

export const ConnectDb=async()=>{   
    try{
     await mongoose.connect('mongodb://localhost:27017/tasktracker');
      console.log(`Connected to the database ${mongoose.connection.host}`);
    }
    catch(err){
     await mongoose.disconnect();
     process.exit(1);
}
}


