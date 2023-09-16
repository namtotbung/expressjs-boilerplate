export interface RegisterBody {
	username: string;
	password: string;
	firstName: string;
	lastName: string;
}

export interface LoginBody {
	username: string;
	password: string;
}

export interface ChangePasswordBody {
	oldPassword: string;
	newPassword: string;
}
