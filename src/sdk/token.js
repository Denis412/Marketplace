import { Cookies } from "quasar";

const save = (tokenData) => {
  // console.log(tokenData);

  // Cookies.set(
  //   "access_token",
  //   JSON.stringify({
  //     access_token: tokenData.access_token,
  //     expires_in: tokenData.expires_in,
  //   }),
  //   { httpOnly: true }
  // );

  Cookies.set("access_token", `Bearer ${tokenData.access_token}`, {
    // expires: 7, // срок жизни cookie (в днях)
    httpOnly: true, // доступ к cookie только через http-протокол
  });

  localStorage.setItem(
    "accessToken",
    JSON.stringify({
      access_token: tokenData.access_token,
      expires_in: tokenData.expires_in,
    })
  );

  localStorage.setItem("refreshToken", JSON.stringify(tokenData.refresh_token));
};

const getTokenData = () => JSON.parse(localStorage.getItem("accessToken"));

const refresh = () => {};

const remove = () => {
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("accessToken");
};

const tokenApi = { save, refresh, getTokenData, remove };

export default tokenApi;
