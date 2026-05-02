import axios from "axios";
import Cookies from "js-cookie";

const testingApiGetUser = {
  method: "GET",
  url: "http://localhost:8080/api/v1/users/",
  headers: {
    //   Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    Authorization: `Bearer ${Cookies.get("jwt")}`,
  },
};

// console.log(Cookies.get("jwt"));

interface IFormInput {
  firstname: String;
  lastname: String;
  email: String;
  username: String;
  user_password: String;
  roles: "user" | "admin";
}

export const testingApiGetUserServices = {
  getUserList: async (): Promise<any> => {
    try {
      //   axios.defaults.withCredentials = true;
      const response = await axios.request(testingApiGetUser);
      //   console.log(response.headers);
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  },
};

export const testingApiSingupService = {
  signup: async (data: IFormInput): Promise<any> => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/users/",
        data
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  },
};

export const testingApiLoginServices = {
  logout: () => {
    Cookies.remove("jwt");
  },
  login: async (username: string, password: string): Promise<any> => {
    try {
      //   const body = {
      //     username: username,
      //     password: password,
      //   };

      //   const loginFormData = new FormData();
      //   loginFormData.append("username", body.username);
      //   loginFormData.append("password", body.password);
      //   console.log(loginFormData);

      //   const testingApiLogin = {
      //     method: "POST",
      //     url: "http://localhost:8080/api/v1/users/login",
      //     data: loginFormData,
      //     // credentials: "include",
      //   };

      //   const response = await axios.request(testingApiLogin);

      const response = await axios.post(
        "http://localhost:8080/api/v1/users/login",
        {
          username: username,
          password: password,
        }
      );
      //   localStorage.setItem("jwt", response.data.token);
      const token = response.data.token;
      console.log(response);
      var inFifteenMinutes = new Date(new Date().getTime() + 15 * 60 * 1000);
      Cookies.set("jwt", token, { expires: inFifteenMinutes });
    } catch (error) {
      console.log(error);
      return error;
    }
  },
};
