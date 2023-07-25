import BaseApi from "../common/base.api";

class AuthService {
  login(email: string, password: string) {
    return BaseApi.post("/auth/signIn", {
        email,
        password,
      })
      .then((response) => {
        console.log(response);
        if (response.data.jwtAccessToken) {
          localStorage.setItem('jwtAccessToken', response.data.jwtAccessToken);
        }
        if (response.data.user.email) {
          localStorage.setItem('email', response.data.user.email);
        }
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("email");
    localStorage.removeItem("jwtAccessToken");
  }

  register(fullName:string, email: string, password: string) {
    return BaseApi.post("/auth/signUp", {
      fullName,
      email,
      password,
    });
  }

  getCurrentUser() {
    const email = localStorage.getItem("email");
    if (email) return email;
    return null;
  }
}

export default new AuthService();
