import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  Flex,
  Group,
  Icon,
  Input,
  InputAddon,
  NativeSelectField,
  NativeSelectRoot,
  Stack,
  Text,
  Grid,
  GridItem,
    DialogBody,
    DialogActionTrigger,
    DialogCloseTrigger,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogRoot,
    DialogTitle,
    DialogTrigger,
  Spinner
} from "@chakra-ui/react";
import logo from "./ASLLogo.png";
import { Field } from "./components/ui/field";
import React, { useContext, useState } from "react";

import { AsmelContext } from "./ASMELContext";
import { useNavigate } from "react-router-dom";
import { LuSearch } from "react-icons/lu";
import { IoMdAdd } from "react-icons/io";
import { InputGroup } from "./components/ui/input-group";
import { RiArrowDropDownLine } from "react-icons/ri";
import { CiCircleRemove } from "react-icons/ci";
import { IoCloseSharp } from "react-icons/io5";
import { TbSend2 } from "react-icons/tb";

export function LoadingDocument() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    watch,
    getValues,
    resetField,
  } = useForm();

  const { userSession, setUserSession } = useContext(AsmelContext);

  const [questionList, setQuestionList] = useState([]);

  const navigate = useNavigate();
  const questionText = watch("questionText");
  console.log(questionList.length);

  const loadedURL = userSession?.pdfUrl;
  if (loadedURL !== undefined){
    navigate("/viewQuestions");
  }

  return (
    <DialogRoot size="sm" placement="center" motionPreset="slide-in-bottom">
    <Flex
      className="App-layout"
      alignItems={"center"}
      justifyContent={"space-evenly"}
    >
      <header className="App-header">
        <img
          src={logo}
          alt={"A Stronger Mind Library"}
          className={"asmel-logo"}
        />
        <p className={"asmel-title"}>Ask A Stronger Mind Bot</p>
      </header>

      <Box
        bg={"#F1E8A1"}
        width={"70%"}
        justifyContent={"center"}
        marginTop={"16px"}
      >
        <Flex
          width={"100%"}
          height={"100%"}
          justifyContent={"center"}
          padding={"16px"}
          alignItems={"center"}
          flexDirection={"column"}
        >
          <Text>Thank you, {userSession?.name ?? "patron"}. Fetching your responses </Text>
          <Flex height={"24px"} />
          <Group width={"80%"} justifyContent={"center"}>
            <Spinner size="lg"/>
          </Group>
        </Flex>
      </Box>

    </Flex>
    </DialogRoot>
  );
}
