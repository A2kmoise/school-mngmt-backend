import mongoose from 'mongoose';
import dotenv from 'dotenv';


dotenv.config();

const Mongoconn = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('DB connected successfully...');
  } catch (error) {
    console.error('DB failed to connect:', error);
  }
};

export default Mongoconn;
