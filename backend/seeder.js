import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import users from "./data/users.js";
import products from "./data/products.js";
import userModel from "./models/userModel.js";
import productModel from "./models/productModel.js";
import orderModel from "./models/orderModel.js";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    // clear any stagnant data from DB before seeding
    await orderModel.deleteMany();
    await productModel.deleteMany();
    await userModel.deleteMany();

    //inserting array of created users --> see userSchema
    const createdUsers = await userModel.insertMany(users);

    //pulling the sample admin user that was created is the first userobj in the array
    const adminUser = createdUsers[0]._id;

    //seed products data + add admin user for the ref
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    await productModel.insertMany(sampleProducts);

    console.log("HEY data was imported".cyan.inverse);
  } catch (error) {
    console.error(`Error: ${error.message}`.red);
    process.exit(1);
  }
};

const destoryData = async () => {
  try {
    // clear any stagnant data from DB before seeding
    await orderModel.deleteMany();
    await productModel.deleteMany();
    await userModel.deleteMany();

    console.log("data YEETED&DELETED".magenta.bold);
  } catch (error) {
    console.error(`Error: ${error.message}`.red);
    process.exit(1);
  }
};

//seeder script args ($ node backend/seeder -d)
//these are added as an npm scripts in package.json (data:import data:destroy)
//npm run data:import/destory
if (process.argv[2] === "-d") {
  destoryData();
} else {
  importData();
}
