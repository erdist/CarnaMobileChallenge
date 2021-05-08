import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { AdminResponse, AuthAdmin, LoginResponse } from "../model/Admin";
import uuid from "react-native-uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default class AuthStore {

  //Credentials
  jsonWebToken = "";
  email = "";
  username = "";
  adminId = "";

  // Form object for Register
  registerForm: AuthAdmin = {
    email: "",
    password: "",
    admin: { id: "", firstName: "", surname: "", users: [], contents: [] },
    adminId: "",
  };

  // Form object for collecting credentials from RegisterScreen
  registerScreenForm = {
    email: "",
    password: "",
    firstName: "",
    surname: "",
  };

  // Form object for Login
  loginForm = { email: "", password: "" };

  // Decides which Stack Navigator to load/unload. Either Login/register pages or HomeScreen.
  isLoggedIn = false;

  // Response message for login function.
  message = "";

  constructor() {
    makeAutoObservable(this);
  }


  //Handle functions for updating login and register forms.
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


  // Set functions for observables
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

  //Basic AsyncStorage functions eg. store, get,and remove
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

  // Register function with no response handling.
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

  // User will be logged out and JWT token will be deleted from storage.
  logout = () => {
    this.removeValue();
  };

  // Login function with response handling in case of no user found and wrong password.
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

  //At app start, user is being authenticated with the jwt token in AysncStorage, if not, user is redirected to login/register page.
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
            //Redirect to DrawerScreen
            this.isLoggedIn = true;
          });
        } else {
          runInAction(() => {
            //Redirect to RootStackScreen
            this.isLoggedIn = false;
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
}
