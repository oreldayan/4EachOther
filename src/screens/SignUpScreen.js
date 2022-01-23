import React, { useContext, useState } from "react";
import styled from "styled-components";
import Text from "../components/Text";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { FirebaseContext } from "../context/FirebaseContext";
import { UserContext } from "../context/UserContext";
import SelectPicker from "react-native-form-select-picker";

const options = ["באר שבע", "אופקים"];

export default SignUpScreen = ({ navigation }) => {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [city, setCity] = useState();
  const [loading, setLoading] = useState(false);
  const firebase = useContext(FirebaseContext);
  const [val, setUser] = useContext(UserContext);

  const signUp = async () => {
    setLoading(true);

    const user = { username, email, password, phoneNumber, city };

    try {
      const createdUser = firebase.createUser(user);

      await setUser({ ...createdUser, isLoggedIn: true });
    } catch (error) {
      console.log("error @signUp", error);
    } finally {
      setLoading(false);
    }
  };

  //validations
  const onSubmit = (username, password, phoneNumber, email) => {
    if (typeof username == "undefined") {
      alert("שגיאה! שם משתמש זהו שדה חובה");
      return;
    } else if (typeof password == "undefined") {
      alert("שגיאה! סיסמא היא שדה חובה");
      return;
    } else if (password.length < 6) {
      alert("שגיאה! סיסמא חייבת להיות לפחות 6 תווים");
      return;
    } else if (typeof phoneNumber == "undefined") {
      alert("שגיאה! מספר טלפון זהו שדה חובה");
      return;
    } else if (phoneNumber.length < 10) {
      alert("מספר טלפון באורך לא חוקי!");
    } else if (typeof email == "undefined") {
      alert("שגיאה! מייל זהו שדה חובה");
      return;
    } else if (!validate(email)) {
      alert("המייל אינו תקין!");
    } else {
      signUp();
    }
  };

  //validation about the email
  const validate = (email) => {
    const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;

    return expression.test(String(email).toLowerCase());
  };

  return (
    <KeyboardAwareScrollView>
      <Container>
        <Main>
          <Text large semi center>
            שלום לכם! הירשמו כדי להתחיל.
          </Text>
        </Main>

        <Auth>
          <AuthContainer>
            <AuthTitle>שם משתמש</AuthTitle>
            <AuthField
              autoCapitalize="none"
              autoCorrect={false}
              autoFocus={true}
              onChangeText={(username) => setUsername(username.trim())}
              value={username}
            />
          </AuthContainer>

          <AuthContainer>
            <AuthTitle>כתובת מייל</AuthTitle>
            <AuthField
              autoCapitalize="none"
              autoCompleteType="email"
              autoCorrect={false}
              keyboardType="email-address"
              onChangeText={(email) => setEmail(email.trim())}
              value={email}
            />
          </AuthContainer>

          <AuthContainer>
            <AuthTitle>מספר טלפון</AuthTitle>
            <AuthField
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="number-pad"
              maxLength={10}
              onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber.trim())}
              value={phoneNumber}
            />
          </AuthContainer>

          <AuthContainer>
            <AuthTitle>עיר</AuthTitle>
            <SelectPicker
              style={{ alignItems: "center" }}
              placeholder="אנא בחר עיר"
              onValueChange={(city) => {
                setCity(city);
              }}
              selected={city}
            >
              {Object.values(options).map((val, i) => (
                <SelectPicker.Item label={val} value={val} key={i} />
              ))}
            </SelectPicker>
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

        <SignUpContainer
          onPress={() => {
            console.log(username);
            console.log(password);
            console.log(phoneNumber);
            console.log(email);
            onSubmit(username, password, phoneNumber, email, city);
          }}
          disabled={loading}
        >
          {loading ? (
            <Loading />
          ) : (
            <Text bold center color="#ffffff">
              הירשם
            </Text>
          )}
        </SignUpContainer>

        <SignUp onPress={() => navigation.navigate("SignIn")}>
          <Text small center>
            יש לכם משתמש?{" "}
            <Text bold color="#33a8ff">
              התחברו עכשיו!
            </Text>
          </Text>
        </SignUp>

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
  margin-top: 160px;
`;

const Auth = styled.View`
  margin: 16px 32px 32px;
`;

const AuthContainer = styled.View`
  margin-bottom: 32px;
`;

const AuthTitle = styled(Text)`
  color: #8e93a1;
  font-size: 15px;
  text-transform: uppercase;
  font-weight: bold;
  text-align: right;
`;

const AuthField = styled.TextInput`
  border-bottom-color: #8e93a1;
  border-bottom-width: 0.5px;
  height: 48px;
`;

const SignUpContainer = styled.TouchableOpacity`
  margin: -52px 32px;
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
  margin-top: 52px;
`;

const HeaderGraphic = styled.View`
  position: absolute;
  width: 100%;
  top: -50px;
  z-index: -100;
`;

const RightCircle = styled.View`
  background-color: #8022d9;
  position: absolute;
  width: 400px;
  height: 400px;
  border-radius: 200px;
  right: -100px;
  top: -200px;
`;

const LeftCircle = styled.View`
  background-color: #23a6d5;
  position: absolute;
  width: 200px;
  height: 200px;
  border-radius: 100px;
  left: -50px;
  top: -50px;
`;

const StatusBar = styled.StatusBar``;
