import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Content, Admin, AuthAdmin, Notification } from "../model/Admin";

export default class ContentStore {
  contentRegistry = new Map<string, Content>();
  contents: Content[] = [];
  notifications: Notification[] = [];
  adminId = "2c83934e-251e-46c2-a9f6-b1d7eea4524c";
  selectedContent: Content = {
    id: "",
    title: "",
    contentBody: "",
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
  setSelectedContent = (content: Content) => {
    this.selectedContent = content;
  };
  setAdminIdForContent = (value: string) => {
    this.adminId = value;
  };

  appendNotifications = (notification: Notification) => {
    runInAction(() => {
      this.notifications = [...this.notifications, notification];
    });
  };

  // CRUD operations
  loadContents = async () => {
    try {
      let contents = await agent.Contents.list();
      runInAction(() => {
        this.contents = contents;
      });
    } catch (error) {
      console.log(error);
    }
  };

  createContent = async (content: Content) => {
    try {
      content.adminId = this.adminId;
      await agent.Contents.create(content);
      runInAction(() => {
        this.contentRegistry.set(content.id, content);
      });
    } catch (error) {
      console.log(error);
    }
  };

  updateContent = async (content: Content) => {
    try {
      content.adminId = this.adminId;
      await agent.Contents.update(content);
      runInAction(() => {
        this.contents = [...this.contents];
      });
    } catch (error) {
      console.log(error);
    }
  };

  deleteContent = async (id: string) => {
    try {
      await agent.Contents.delete(id);
      runInAction(() => {
        this.contents = [...this.contents];
      });
    } catch (error) {
      console.log(error);
    }
  };
}
