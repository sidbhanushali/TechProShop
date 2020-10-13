import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  //use bcrypt method to compare plain text to encrypted password

  //marchPassword is called on that specific user so this.password compares the stored password
  return await bcrypt.compare(enteredPassword, this.password);
};

//this method executes a callback "pre" save
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  //salt is what hashes the password
  const salt = await bcrypt.genSalt(10);
  //converts the plain text password into the hashed password to be entered right before saving
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

export default User;
