import { useForm } from "react-hook-form";
import {getASMELSubmissions, login} from "./service";
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
import React, {useContext, useEffect, useState} from "react";

import { AsmelContext } from "./ASMELContext";
import { useNavigate } from "react-router-dom";

export function ViewSubmissions() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();


  const { userSession, setUserSession } = useContext(AsmelContext);
  const [ submissions, setSubmissions ] = useState([]);

  const navigate = useNavigate();

  useEffect( () => {
    const fetchAPISubmissions = async () => {
      return await getASMELSubmissions(userSession?.userId);
    }
    fetchAPISubmissions().then((response) => setSubmissions(response?.data));
  }, []);


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
          <Button onClick={() => navigate("/home")}>Home</Button>
          {submissions?.map(
              submission => {
                return (<Button onClick={() => {
                  setUserSession({...userSession, pdfUrl: submission?.documentUrl });
                  navigate("/viewQuestions");
                }}>{submission?.date}</Button>)
              }
          )}
        </Stack>
      </Flex>
    </Flex>
  );
}
