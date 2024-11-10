import { useForm } from "react-hook-form";
import { login } from "./service";
import {
  Button,
  Flex,
  Input,
  NativeSelectField,
  NativeSelectRoot,
  Text,
} from "@chakra-ui/react";
import logo from "./ASLLogo.png";
import { Field } from "./components/ui/field";
import React, { useContext } from "react";

import { AsmelContext } from "./ASMELContext";
import { useNavigate } from "react-router-dom";

export function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const { userSession, setUserSession } = useContext(AsmelContext);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const loginResponse = await login(data.facility, data.cdcnumber);
    if (loginResponse.status === 404) {
      setError("cdcnumber", {
        type: "manual",
        message: "CDC Number is incorrect",
      });
    }
    if (loginResponse.status === 200) {
      setUserSession({
        name: loginResponse.data.name,
        userId: loginResponse.data.id,
      });
      setTimeout(() => {
        navigate("/home");
      }, 2000);
    }
  };

  return (
    <Flex className="App-layout">
      <header className="App-header">
        <img
          src={logo}
          alt={"A Stronger Mind Library"}
          className={"asmel-logo"}
        />
        <p className={"asmel-title"}>StrongerMind Literature Login</p>
      </header>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          height: "50%",
        }}
      >
        <Field label="Correctional Facility">
          <NativeSelectRoot>
            <NativeSelectField
              size={"lg"}
              {...register("facility", { required: "Facility is required" })}
            >
              <option value={"SCSO"}>Sacramento County Sheriff's Office</option>
            </NativeSelectField>
          </NativeSelectRoot>
        </Field>

        <Field
          label="California Department of Corrections Number"
          invalid={!!errors.cdcnumber}
          errorText={errors.cdcnumber?.message}
        >
          <Input
            sx={{ fontWeight: "bold" }}
            size={"xl"}
            {...register("cdcnumber", { required: "CDC number is required" })}
          />
        </Field>

        <Button type="submit">Launch Portal</Button>
      </form>

      {userSession?.userId && (
        <Text color={"green"} textStyle={"2xl"}>
          Welcome {userSession?.name}
        </Text>
      )}
    </Flex>
  );
}
