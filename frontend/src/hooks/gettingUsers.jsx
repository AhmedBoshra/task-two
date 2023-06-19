import axios from "axios";
import { useState, useEffect } from "react";

export const getAccessToken = async () => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:8080/realms/examengine/protocol/openid-connect/token",
      new URLSearchParams({
        client_id: "examengine",
        client_secret: "NbA6iMn2XQGW8xqccPxHjrqzqlKkvCEV",
        grant_type: "client_credentials",
      }).toString()
    );

    const { access_token } = response.data;
    return access_token;
  } catch (error) {
    console.error("Failed to authenticate:", error);
    throw new Error("Failed to retrieve access token");
  }
};

export const getUsersWithToken = async (token) => {
  try {
    const response = await axios.get(
      "http://127.0.0.1:8080/admin/realms/examengine/users",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to retrieve users:", error.message);
  }
};

export const filterStudentUsers = (usersData) => {
  return usersData.filter((user) => {
    const userTypes = user.attributes && user.attributes.userType;
    return userTypes && userTypes.includes("student");
  });
};

const gettingUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const access_token = await getAccessToken();
        const usersData = await getUsersWithToken(access_token);
        console.log(usersData);

        const studentUsers = filterStudentUsers(usersData);

        setUsers(studentUsers);
      } catch (error) {
        console.error("Failed to process request:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>{user.attributes.userType}</div>
      ))}
    </div>
  );
};

export default gettingUsers;
