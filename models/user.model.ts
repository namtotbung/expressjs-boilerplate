import { Model, Schema, Types, model } from 'mongoose';
import bcrypt from 'bcrypt';

interface User {
	_id: Types.ObjectId;
	username: string;
	password: string;
	firstName: string;
	lastName: string;
	createdAt: Date;
	updatedAt: Date;
}

interface UserMethods {
	fullName(): string;
	hashPassword(rawPassword: string): void;
	comparePassword(plainTextPassword: string): Promise<boolean>;
}

type UserModel = Model<User, {}, UserMethods>;

const schema = new Schema<User, UserModel, UserMethods>(
	{
		username: {
			type: String,
			required: true,
			unique: true,
			minlength: 6,
			maxlength: 30
		},
		password: {
			type: String,
			required: true
		},
		firstName: {
			type: String,
			required: true
		},
		lastName: {
			type: String,
			required: true
		}
	},
	{
		timestamps: true
	}
);

schema.method('fullName', function fullName() {
	return this.firstName + ' ' + this.lastName;
});
schema.method('hashPassword', function hashPassword(rawPassword: string) {
	const saltRounds = 10;
	this.password = bcrypt.hash(rawPassword, saltRounds);
});

schema.method('comparePassword', function comparePassword(plainTextPassword: string) {
	return bcrypt.compare(plainTextPassword, this.password);
});

const User = model<User, UserModel>('User', schema);

export default User;
