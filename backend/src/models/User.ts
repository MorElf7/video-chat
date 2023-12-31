import { Schema, model } from "mongoose";
import UserCredential from "./UserCredentials";

const userSchema = new Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
		},
		passwordHash: {
			type: String,
			required: true,
		},
		firstName: {
			type: String,
			required: true,
		},
		lastName: {
			type: String,
			required: true,
		},
		email: { type: String },
		phone: { type: String },
		avatar: String,
		bio: String,
		updatedAt: {
			type: Date,
			default: Date.now,
		},
		createdAt: {
			type: Date,
			default: Date.now,
		},
	},
	{
		toJSON: {
			virtuals: true,
			versionKey: false,
			transform: function (doc, ret) {
				delete ret.passwordHash;
				delete ret._id;
			},
		},
	}
);

userSchema.virtual("id").get(function () {
	return this._id.toString();
});

userSchema.post("findOneAndDelete", async function (doc) {
	if (doc) {
		await UserCredential.deleteMany({
			user: doc._id,
		});
	}
});

userSchema.post("findOneAndUpdate", function (doc) {
	if (doc) {
		doc.updatedAt = Date.now();
	}
});

userSchema.index({
	username: "text",
	firstName: "text",
	lastName: "text",
	email: "text",
	phone: "text",
});

export default model("User", userSchema);
