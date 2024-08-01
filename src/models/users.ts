import IUser, { ICreateUser, IUpdateUser } from '../interfaces/user';
import { BaseModel } from './base';

export default class UserModel extends BaseModel {
  static getAllUsers() {
    return this.queryBuilder()
      .select('*')
      .from('users')
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  }
  static getUser(userID: string) {
    return this.queryBuilder()
      .select('*')
      .from('users')
      .where('id', userID)
      .first()
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  }
  static getUserByEmail(email: string) {
    return this.queryBuilder()
      .select('*')
      .from('users')
      .where('email', email)
      .first()
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  }
  static createUser(user: ICreateUser) {
    return this.queryBuilder()
      .insert({
        name: user.name,
        email: user.email,
        passwordHash: user.password,
        phoneNumber: user.phoneNumber,
        imageSrc: user.imageSrc,
      })
      .into('users')
      .returning('*')
      .then((data) => {
        return data[0];
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  }
  static assignRole(userId: string, role: string) {
    return this.queryBuilder()
      .insert({
        userId: userId,
        roleId: role,
      })
      .into('users_roles')
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  }
  static updateRole(userID: string, role: string) {
    return this.queryBuilder()
      .update({
        roleId: role,
      })
      .into('users_roles')
      .where('user_id', userID)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  }
  static editUserById(id: string, updateUserData: IUpdateUser) {
    return this.queryBuilder()
      .update(updateUserData)
      .from('users')
      .where('id', id)
      .returning('*')
      .then((data) => {
        return data[0];
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  }
  static deleteUserById(id: string) {
    return this.queryBuilder()
      .del()
      .from('users')
      .where('id', id)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  }
}
