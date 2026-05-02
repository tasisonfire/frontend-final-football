import "./styles.css";
import React, { useEffect, useState } from "react";
import {
  testingApiGetUserServices,
  testingApiLoginServices,
  testingApiSingupService,
} from "@/service/weStride";
import { useForm, SubmitHandler } from "react-hook-form";

interface IFormInput {
  firstname: String;
  lastname: String;
  email: String;
  username: String;
  user_password: String;
  roles: "user" | "admin";
}

function weStride() {
  const [getUser, setGetUser] = useState<any>([]);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [createUser, setCreateUser] = useState<IFormInput>();

  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    setCreateUser(data);
    callSignin(data);
  };

  //   console.log(createUser);
  const handleUsername = (event: any) => {
    setUsername(event.target.value);
  };
  const handlePassword = (event: any) => {
    setPassword(event.target.value);
  };

  const callSignin = async (createUser: IFormInput) => {
    const response = await testingApiSingupService.signup(createUser);
  };

  useEffect(() => {
    const callGetUser = async () => {
      const responseList = await testingApiGetUserServices.getUserList();
      //   console.log(responseList.message);
      setGetUser(responseList.data.data);
    };
    callGetUser();
  }, []);
  //   console.log(getUser);

  const callLogin = async (username: string, password: string) => {
    const responseLogin = await testingApiLoginServices.login(
      username,
      password
    );
    console.log(responseLogin.response.data);
    setError(responseLogin.response.data);
  };
  //   callLogin(username, password);

  const handleSubmitLogin = (event: any) => {
    event.preventDefault();
    // Call your function with the input values
    callLogin(username, password);
    // Clear the input fields if needed
    // setInputValue1("");
    // setInputValue2("");
  };

  const handleLogout = () => {
    testingApiLoginServices.logout();
    location.reload();
  };

  const handleId = (e: any) => {
    e.preventDefault();
    const id = e.target.id;
    console.log(id);
  };

  const handleUpdateUser = (id: number, e: any) => {};

  return (
    <>
      <h1>Testing API call Service</h1>
      {getUser.map((item: any) => (
        <>
          <p id={item.id} key={item.id}>
            {item.id} {item.first_name} {item.last_name}{" "}
            <span style={{ cursor: "pointer" }} id={item.id} onClick={handleId}>
              edit
            </span>
          </p>
        </>
      ))}

      {getUser.length == 0 ? (
        <>
          <h3>login</h3>
          <form action="" onSubmit={handleSubmitLogin}>
            <input
              type="text"
              value={username}
              onChange={handleUsername}
              placeholder="Username"
            />
            <input
              type="text"
              value={password}
              onChange={handlePassword}
              placeholder="Password"
            />
            <button type="submit">Submit</button>
          </form>
        </>
      ) : (
        <>
          <button onClick={handleLogout}>logout</button>
        </>
      )}
      {error}
      <div className="createUser">
        <h3>Create User</h3>
        <div className="form">
          <form action="" onSubmit={handleSubmit(onSubmit)}>
            <input
              {...register("firstname")}
              type="text"
              id=""
              placeholder="first name"
            />
            <input
              {...register("lastname")}
              type="text"
              id=""
              placeholder="lasts name"
            />
            <input
              {...register("email")}
              type="text"
              id=""
              placeholder="email"
            />
            <input
              {...register("username")}
              type="text"
              id=""
              placeholder="username"
            />
            <input
              {...register("user_password")}
              type="text"
              id=""
              placeholder="password"
            />
            <input
              {...register("roles")}
              type="text"
              id=""
              placeholder="roles"
            />

            <button type="submit">Submit</button>
            {/* <input type="submit" /> */}
          </form>
        </div>
      </div>
    </>
  );
}

export default weStride;
