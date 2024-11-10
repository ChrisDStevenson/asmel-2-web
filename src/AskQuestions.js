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
import {submitASMELQuestions} from "./service";

export function AskQuestions() {
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
  const bookName = watch("bookName");
  console.log(questionList.length);

  const submitQuestions = async () => {
      navigate('/loading');
      const apiResponse = await submitASMELQuestions(bookName, userSession?.name, questionList, userSession?.userId);
      console.log(apiResponse.data);
      const apiURL = apiResponse.data?.url;
      setUserSession({...userSession, pdfUrl: apiURL});

  }

  return (
    <DialogRoot size="sm" placement="center" motionPreset="slide-in-bottom">
    <Flex
      className="App-layout"
      alignItems={"center"}
      justifyContent={"space-evenly"}
    >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Submission</DialogTitle>
            <DialogCloseTrigger />
          </DialogHeader>
          <DialogBody>
            Are you ready to send your questions to the ASMEL team?
          </DialogBody>
          <DialogFooter>
            <DialogActionTrigger asChild>
              <Button variant="outline">Cancel</Button>
            </DialogActionTrigger>
            <Button onClick={submitQuestions}>Yes, Submit</Button>
          </DialogFooter>
        </DialogContent>
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
          <InputGroup
            endElement={<RiArrowDropDownLine />}
            width={"70%"}
            fontWeight={"bold"}
          >
            <NativeSelectRoot>
              <NativeSelectField
                size={"lg"}
                {...register("bookName", { required: "Book Name is required" })}
              >
                <option value={"Think and Grow Rich"}>
                  Think and Grow Rich
                </option>
              </NativeSelectField>
            </NativeSelectRoot>
          </InputGroup>

          <Flex height={"24px"} />
          <Group width={"80%"} justifyContent={"center"}>
            <InputAddon>
              <LuSearch color={"black"} />
            </InputAddon>
            <Input
              placeholder="Add a Question"
              color={"black"}
              width={"60%"}
              bg={"white"}
              fontWeight={"bold"}
              {...register("questionText")}
            />
            <Button
              disabled={!(questionText)}
              onClick={() => {
                console.log(questionList);
                setQuestionList([...questionList, questionText]);
                resetField("questionText");
              }}
            >
              <IoMdAdd />
            </Button>
            <DialogTrigger asChild>
              <Button marginLeft={"24px"} disabled={questionList.length === 0} onClick={()=>{console.log('athere');}}>
                <TbSend2 />
              </Button>
            </DialogTrigger>
          </Group>
        </Flex>
      </Box>

      <Flex overflowY={"auto"} height={"265px"} width={"70%"}>
        <Grid
          width={"100%"}
          justifyItems={"center"}
          alignItems={"center"}
          templateColumns="repeat(2, 1fr)"
          gap={"2"}
        >
          {questionList?.map((question, ix) => (
            <Box
              bg={"white"}
              width={"auto"}
              borderRadius={"8px"}
              padding={"4px"}
            >
              <Text
                marginLeft="8px"
                display={"flex"}
                justifyContent={"space-between"}
                fontWeight={"bold"}
                alignItems={"center"}
              >
                {question}
                <Button
                  onClick={() => {
                    setQuestionList(questionList.toSpliced(ix, 1));
                  }}
                  alignSelf={"end"}
                  width={"10px"}
                  height={"30px"}
                  marginLeft="8px"
                >
                  <IoCloseSharp size={"16px"} />
                </Button>
              </Text>
            </Box>
          ))}
        </Grid>
      </Flex>
    </Flex>
    </DialogRoot>
  );
}
