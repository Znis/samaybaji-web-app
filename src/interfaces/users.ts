interface IUser {
  id: string;
  name: string;
  email: string;
  imageSrc?: string;
  phoneNumber: string;
  passwordHash: string;
}
export interface IAuthenticatedUser extends IUser {
  roleId: string;
  restaurantId: string;
}
export interface IAuthUser {
  email: string;
  password: string;
}
export interface ICreateUser {
  name: string;
  email: string;
  imageSrc?: string;
  phoneNumber: string;
  password: string;
}
export interface IUpdateUser {
  name?: string;
  email?: string;
  imageSrc?: string;
  phoneNumber?: string;
  password?: string;
  passwordHash?: string;
}

export default IUser;
