import axios from "axios";

const API_URL = "http://localhost:8080/";

export const login = async (facility, cdcNumber) => {
  const LOGIN_URL = API_URL + "api/v1/login";
  return await axios.post(
    LOGIN_URL,
    {
      facility,
      cdcNumber,
    },
    { validateStatus: () => true },
  );
};

export const submitASMELQuestions = async (bookName, name, questions, userId) => {
    const QUESTION_URL = API_URL + "api/v1/questions";
    return await axios.post(
        QUESTION_URL,
        {
            "questions": questions,
            "name": name,
            "bookName": bookName,
            "userId": userId,
        },
        { validateStatus: () => true },
    );
};

export const getASMELSubmissions = async (userId) => {
    const QUESTION_URL = API_URL + "api/v1/submissions?userId=" + userId;
    return await axios.get(
        QUESTION_URL,
        { validateStatus: () => true },
    );
}
