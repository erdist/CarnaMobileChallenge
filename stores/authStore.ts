import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { AdminResponse, AuthAdmin, LoginResponse } from "../model/Admin";
import uuid from "react-native-uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default class AuthStore {
  jsonWebToken = "";
  email = "";
  username = "";
  adminId = "";
  registerForm: AuthAdmin = {
    email: "",
    password: "",
    admin: { id: "", firstName: "", surname: "", users: [], contents: [] },
    adminId: "",
  };
  registerScreenForm = {
    email: "",
    password: "",
    firstName: "",
    surname: "",
  };

  loginForm = { email: "", password: "" };

  isLoggedIn = false;
  message = "";

  constructor() {
    makeAutoObservable(this);
  }


  //Handle functions for updating login register forms.
  handleRegisterEmail = (e: any) => {
    runInAction(() => {
      this.registerScreenForm.email = e;
    });
  };
  handleRegisterPassword = (e: any) => {
    runInAction(() => {
      this.registerScreenForm.password = e;
    });
  };
  handleRegisterFirstname = (e: any) => {
    runInAction(() => {
      this.registerScreenForm.firstName = e;
    });
  };
  handleRegisterSurname = (e: any) => {
    runInAction(() => {
      this.registerScreenForm.surname = e;
    });
  };

  handleLoginEmail = (e: any) => {
    runInAction(() => {
      this.loginForm.email = e;
    });
  };
  handleLoginPassword = (e: any) => {
    runInAction(() => {
      this.loginForm.password = e;
    });
  };

  setIsLoggedIn = (value: boolean) => {
    this.isLoggedIn = value;
  };

  setRegisterForm = (form: AuthAdmin) => {
    runInAction(() => {
      this.registerForm = form;
    });
  };

  setLoginForm = (form: any) => {
    runInAction(() => {
      this.loginForm = form;
    });
  };

  setAdminId = (value: string) => {
    runInAction(() => {
      this.adminId = value;
    });
  };

  //Basic AsyncStorage functions store, get,and remove
  storeData = async (value: string) => {
    try {
      await AsyncStorage.setItem("@storage_Key", value);
    } catch (e) {
      console.log(e);
    }
    console.log("Key created for AsyncStorage.");
  };
  getData = async () => {
    try {
      const value = await AsyncStorage.getItem("@storage_Key");
      if (value !== null) {
        console.log("Key found. Fetched from AsyncStorage.");
        return value;
      } else {
        return "dummy";
      }
    } catch (e) {
      console.log(e);
      return "0";
    }
  };
  removeValue = async () => {
    try {
      await AsyncStorage.removeItem("@storage_Key");
    } catch (e) {
      console.log(e);
    }

    console.log("Done. Key deleted from AsyncStorage.");
  };

  register = async () => {
    try {
      let uid = uuid.v4().toString();
      this.registerForm = {
        email: this.registerScreenForm.email,
        password: this.registerScreenForm.password,
        admin: {
          id: uid,
          firstName: this.registerScreenForm.firstName,
          surname: this.registerScreenForm.surname,
          users: [],
          contents: [],
        },
        adminId: uid,
      };
      let result = await agent.Auth.register(this.registerForm);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  // JWT id deleted from storage.
  logout = () => {
    this.removeValue();
  };

  login = async () => {
    try {
      let result: LoginResponse = await agent.Auth.login(this.loginForm);
      runInAction(() => {
        if (result.jwtstring) {
          this.jsonWebToken = result.jwtstring;
          this.email = result.response.data.email;
          this.username =
            result.response.data.admin.firstName +
            " " +
            result.response.data.admin.surname;
          this.adminId = result.response.data.adminId;
          this.message = result.response.message;
          this.storeData(this.jsonWebToken);
          this.setIsLoggedIn(true);
        } else {
          this.message = result.response.message;
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  //At app start, user is being autheticated with the jwt token in AysncStorage, if not, user is redirected to login/register page.
  authenticate = async () => {
    try {
      runInAction(async () => {
        let result = await agent.Auth.authenticate(await this.getData());
        if (result.code) {
          this.jsonWebToken = await this.getData();
          this.email = result.data.email;
          this.username =
            result.data.admin.firstName + " " + result.data.admin.surname;
          this.setAdminId(result.data.adminId);
          this.message = result.message;
          runInAction(() => {
            //Redirect DrawerScreen
            this.isLoggedIn = true;
          });
        } else {
          runInAction(() => {
            //Redirect RootStackScreen
            this.isLoggedIn = false;
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
}
