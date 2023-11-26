export const useGetUserInfo = () => {
  try {
    const { name, profilePhoto, userID } = JSON.parse(
      localStorage.getItem("auth") || "{}"
    );

    return { name, profilePhoto, userID };
  } catch (error) {
    console.error("Error parsing user information:", error);
    return { name: null, profilePhoto: null, userID: null };
  }
};
