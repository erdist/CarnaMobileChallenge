import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { User, Content, Admin, AuthAdmin, Notification } from "../model/Admin";

export default class UserStore {
  userRegistry = new Map<string, User>();
  users: User[] = [];
  notifications: Notification[] = [];
  adminId = "2c83934e-251e-46c2-a9f6-b1d7eea4524c";
  selectedUser: User = {
    id: "",
    firstName: "",
    surname: "",
    city: "",
    country: "",
    adminId: "",
  };
  loading = true;
  loadingInitial = true;
  formOpen = false;
  isUpdate = false;
  refresh = false;

  constructor() {
    makeAutoObservable(this);
  }

  // Set functions for Form page.
  setFormOpen = (value: boolean) => {
    this.formOpen = value;
  };
  setRefresh = (value: boolean) => {
    runInAction(() => {
      this.refresh = value;
    });
  };
  setIsUpdate = (value: boolean) => {
    this.isUpdate = value;
  };
  setSelectedUser = (user: User) => {
    this.selectedUser = user;
  };
  setAdminIdForUser = (value: string) => {
    this.adminId = value;
  };

  appendNotifications = (notification: Notification) => {
    runInAction(() => {
      this.notifications = [...this.notifications, notification];
    });
  };

  //CRUD operations
  loadUsers = async () => {
    try {
      let users = await agent.Users.list();
      runInAction(() => {
        this.users = users;
      });
    } catch (error) {
      console.log(error);
    }
  };

  createUser = async (user: User) => {
    try {
      user.adminId = this.adminId;
      await agent.Users.create(user);
      runInAction(() => {
        this.userRegistry.set(user.id, user);
      });
    } catch (error) {
      console.log(error);
    }
  };

  updateUser = async (user: User) => {
    try {
      user.adminId = this.adminId;
      await agent.Users.update(user);
      runInAction(() => {
        this.users = [...this.users];
      });
    } catch (error) {
      console.log(error);
    }
  };

  deleteUser = async (id: string) => {
    try {
      await agent.Users.delete(id);
      runInAction(() => {
        this.users = [...this.users];
      });
    } catch (error) {
      console.log(error);
    }
  };
}
