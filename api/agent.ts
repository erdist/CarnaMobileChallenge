import axios, { AxiosResponse } from "axios";
import {
  Admin,
  AdminResponse,
  AuthAdmin,
  Content,
  LoginResponse,
  User,
} from "../model/Admin";

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

let sleepTime: number = 10;

axios.interceptors.response.use(async (response) => {
  try {
    await sleep(sleepTime);
    return response;
  } catch (error) {
    console.log(error);
    return await Promise.reject(error);
  }
});

// It only allows for connections with physical device. Change with your own machine IP.
// Use 10.0.2.2 for emulator as it is an alias for localhost.
let rootAddress: string = "http://192.168.1.107:5000";

axios.defaults.baseURL = rootAddress + "/api";

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  delete: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Admins = {
  list: () => requests.get<Admin[]>("/admins"),
  details: (id: string) => requests.get(`/admins/${id}`),
  create: (admin: Admin) => requests.post("/admins", admin),
  update: (admin: Admin) => requests.put(`/admins/${admin.id}`, admin),
  delete: (id: string) => requests.delete(`/admins/${id}`),
};

const Users = {
  list: () => requests.get<User[]>("/users"),
  details: (id: string) => requests.get(`/users/${id}`),
  create: (user: User) => requests.post("/users", user),
  update: (user: User) => requests.put(`/users/${user.id}`, user),
  delete: (id: string) => requests.delete(`/users/${id}`),
};

const Contents = {
  list: () => requests.get<Content[]>("/contents"),
  details: (id: string) => requests.get(`/contents/${id}`),
  create: (content: Content) => requests.post("/contents", content),
  update: (content: Content) =>
    requests.put(`/contents/${content.id}`, content),
  delete: (id: string) => requests.delete(`/contents/${id}`),
};

const ImportExport = {
  import: (file: FormData) => requests.post("/importexport/import", file),
  export: () => requests.get("/importexport/export"),
};

const Auth = {
  register: (authAdmin: AuthAdmin) =>
    requests.post("/auth/register", authAdmin),
  login: (authAdmin: any) =>
    requests.post<LoginResponse>("/auth/login", authAdmin),
  authenticate: (jwt: any) => requests.get<AdminResponse>(`/auth/${jwt}`),
};

const agent = {
  Admins,
  Users,
  Contents,
  ImportExport,
  Auth,
};

export default agent;
