import axios from "axios";

export const registerthseuser = async (fromdata: object) => {
  console.log(fromdata);
  try {
    const response = await axios.post(
      `http://localhost:3000/user/createuser`,
      fromdata
    );

    return response?.data?.sucess;
  } catch (error) {
    console.log(error?.error);
    return false;
  }
};
