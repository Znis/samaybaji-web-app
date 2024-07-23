interface IUser {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
}
export interface IUpdateUserData {
  id?: string;
  name?: string;
  email?: string;
  phoneNumber?: string;
  password?: string;
  passwordHash?: string;
}

export default IUser;
