import { useForm } from "react-hook-form";
import { login } from "./service";
import {
  Button,
  Flex,
  Input,
  NativeSelectField,
  NativeSelectRoot,
  Stack,
  Text,
} from "@chakra-ui/react";
import logo from "./ASLLogo.png";
import { Field } from "./components/ui/field";
import React, { useContext } from "react";

import { AsmelContext } from "./ASMELContext";
import { useNavigate } from "react-router-dom";

export function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const { userSession, setUserSession } = useContext(AsmelContext);
  const navigate = useNavigate();

  const logout = () => {
    setUserSession(null);
    navigate("/login");

  };

  return (
    <Flex className="App-layout">
      <header className="App-header">
        <img
          src={logo}
          alt={"A Stronger Mind Library"}
          className={"asmel-logo"}
        />
        <p className={"asmel-title"}>Welcome {userSession?.name}</p>
      </header>

      <Flex
        width={"100%"}
        height={"100%"}
        justifyContent={"center"}
        padding={"16px"}
        alignItems={"center"}
      >
        <Stack separator={<Flex height={"40px"} />} width={"50%"}>
          <Button onClick={() => navigate("/questions")}>Ask A Question</Button>
          <Button onClick={async () => {
            navigate("/viewSubmissions")
          }
          }>View My Questions</Button>
          <Button textWrap={"balance"}>Request Book (Max Security Only)</Button>
          <Button onClick={logout} textWrap={"balance"}>
            Logout
          </Button>
        </Stack>
      </Flex>
    </Flex>
  );
}
