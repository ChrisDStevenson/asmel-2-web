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

export function ViewDocument() {
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

  const loadedURL = userSession?.pdfUrl;

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

      <Button onClick={() => navigate('/home')}>Back to Home</Button>

      <Flex overflowY={"auto"} height={"550px"} width={"100%"}>
        <iframe
            src={`${loadedURL}#toolbar=0&navpanes=0&scrollbar=0`} // Replace with the path to your PDF
            width="100%"
            height="100%"
            style={{border: 'none'}}
            title="Your ASMEL Responses"
            type="application/pdf"
        />
      </Flex>
    </Flex>
    </DialogRoot>
  );
}
