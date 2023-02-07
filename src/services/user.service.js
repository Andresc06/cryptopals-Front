import axios from "axios";

export const getData = async () => {
  const email = localStorage.getItem("email");

  //Request
  const response = await axios.post(
    "https://cryptopals-backend.netlify.app/auth/dashboard",
    {
      email,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }
  );

  const {
    data: { user },
  } = response;

  return user;
};
