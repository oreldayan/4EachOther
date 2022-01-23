import React, { useState, useContext } from "react";
import styled from "styled-components";
import Text from "../components/Text";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { UserContext } from "../context/UserContext";
import { FirebaseContext } from "../context/FirebaseContext";

export default SigninScreen = ({ navigation }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const firebase = useContext(FirebaseContext);
  const [val, setUser] = useContext(UserContext);

  const signIn = async () => {
    setLoading(true);
    try {
      await firebase.signIn(email, password);

      const uid = firebase.getCurrentUser().uid;
      const userInfo = await firebase.getUserInfo(uid);
      const adminInfo = await firebase.getAdminInfo(uid);

      if (adminInfo) {
        setUser({
          username: userInfo.username,
          email: userInfo.email,
          uid,
          isLoggedIn: true,
          isAdmin: true,
        });
      } else {
        setUser({
          username: userInfo.username,
          email: userInfo.email,
          uid,
          isLoggedIn: true,
          isAdmin: false,
        });
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = (email, password) => {
    if (typeof password == "undefined") {
      alert("שגיאה! סיסמא היא שדה חובה");
      return;
    }

    if (typeof email == "undefined") {
      alert("שגיאה! מייל זהו שדה חובה");
      return;
    }

    if (!validate(email)) {
      alert("המייל אינו תקין!");
    } else {
      signIn();
    }
  };

  const validate = (email) => {
    const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;

    return expression.test(String(email).toLowerCase());
  };

  return (
    <KeyboardAwareScrollView>
      <Container>
        <Main>
          <Text title semi center>
            טוב לראות אתכם שוב!
          </Text>
        </Main>

        <Auth>
          <AuthContainer>
            <AuthTitle>כתובת מייל</AuthTitle>
            <AuthField
              autoCapitalize="none"
              autoCompleteType="email"
              autoCorrect={false}
              autoFocus={true}
              keyboardType="email-address"
              onChangeText={(email) => setEmail(email.trim())}
              value={email}
            />
          </AuthContainer>

          <AuthContainer>
            <AuthTitle>סיסמא</AuthTitle>
            <AuthField
              autoCapitalize="none"
              autoCompleteType="password"
              autoCorrect={false}
              secureTextEntry={true}
              onChangeText={(password) => setPassword(password.trim())}
              value={password}
            />
          </AuthContainer>
        </Auth>

        <SignInContainer
          onPress={() => {
            onSubmit(email, password);
          }}
          disabled={loading}
        >
          {loading ? (
            <Loading />
          ) : (
            <Text bold center color="#ffffff">
              התחבר
            </Text>
          )}
        </SignInContainer>

        <SignUp onPress={() => navigation.navigate("SignUp")}>
          <Text small center>
            עדיין לא נרשמת?{" "}
            <Text bold color="#33a8ff">
              הירשם עכשיו!
            </Text>
          </Text>
        </SignUp>

        <ForgotPassword onPress={() => navigation.navigate("ForgotPassword")}>
          <Text small center>
            שכחת סיסמא?{" "}
            <Text bold color="#33a8ff">
              לחץ כאן כדי לאפס!
            </Text>
          </Text>
        </ForgotPassword>

        <HeaderGraphic>
          <RightCircle />
          <LeftCircle />
        </HeaderGraphic>
        <StatusBar barStyle="light-content" />
      </Container>
    </KeyboardAwareScrollView>
  );
};

const Container = styled.View`
  flex: 1;
`;

const Main = styled.View`
  margin-top: 150px;
`;

const Auth = styled.View`
  margin: 64px 32px 32px;
`;

const AuthContainer = styled.View`
  margin-bottom: 32px;
`;

const AuthTitle = styled(Text)`
  color: #8e93a1;
  font-size: 15px;
  text-transform: uppercase;
  font-weight: bold;
  text-align: center;
`;

const AuthField = styled.TextInput`
  border-bottom-color: #8e93a1;
  border-bottom-width: 0.5px;
  height: 48px;
`;

const SignInContainer = styled.TouchableOpacity`
  margin: -20px 32px;
  height: 48px;
  align-items: center;
  justify-content: center;
  background-color: #33a8ff;
  border-radius: 6px;
`;

const Loading = styled.ActivityIndicator.attrs((props) => ({
  color: "#ffffff",
  size: "small",
}))``;

const SignUp = styled.TouchableOpacity`
  margin-top: 29px;
`;

const ForgotPassword = styled.TouchableOpacity`
  margin-top: 17px;
`;

const HeaderGraphic = styled.View`
  position: absolute;
  width: 100%;
  top: -50px;
  z-index: -100;
`;

const RightCircle = styled.View`
  background-color: #23a6d5;
  position: absolute;
  width: 400px;
  height: 400px;
  border-radius: 200px;
  right: -100px;
  top: -200px;
`;

const LeftCircle = styled.View`
  background-color: #8022d9;
  position: absolute;
  width: 200px;
  height: 200px;
  border-radius: 100px;
  left: -50px;
  top: -50px;
`;

const StatusBar = styled.StatusBar``;
