import { observable, makeObservable } from "mobx";
import { User } from "../interfaces/user";
import { userList } from "../mockapi/user-list";

const deleteItem = (arr: any[], itemId: string) => {
  return arr.filter((item) => item.id !== itemId);
};

export class UserStore {
  users: User[] = userList;

  constructor() {
    makeObservable(this, {
      users: observable,
    });
  }

  onAdd = (user: User) => {
    this.users = this.users.concat(user);
  };

  onUpdate = (user: User) => {
    const index = this.users.findIndex((item) => item.id === user.id);
    this.users[index] = user;
  };

  onDelete = (userIds: string[]) => {
    userIds.forEach((item) => {
      this.users = deleteItem(this.users, item);
    });
  };

  getUserById = (userId: string) => {
    return this.users.find((user) => user.id === userId);
  };

  onCreateId = () => {
    if (this.users.length === 0) return 0;
    return Number(this.users[this.users.length - 1].id) + 1;
  };
}
