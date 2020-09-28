import React, {FC} from "react";
import {Link} from "react-router-dom";
import {Grid, Header, Menu, Message, Segment} from "semantic-ui-react";
import LoginForm from "src/components/forms/LoginForm";
import {loginThunk} from "src/features/login/login.slice";
import {useAppDispatch, userAppSelector} from "src/store/store";

const LoginPage: FC = () => {
  const loginState = userAppSelector((s) => s.login);
  const dispatch = useAppDispatch();

  const hasError = !loginState.loading && loginState.error;

  const doLogin = async (email: string, password: string) => {
     await dispatch(loginThunk({ email, password }));
    /* if(loginThunk.fulfilled.match(log)) { */
    /*   const { user, erpProfile} = unwrapResult(log); */
    /*   console.log("erpProfile", erpProfile); */
    /*   console.log("user", user); */
    /* } else { */
    /*   if(log.payload) { */
    /*     console.log("log payload", log); */
    /*   } else { */
    /*     console.log("log", log); */
    /*   } */
    /* } */
  };

  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as={Segment} attached="top" color="teal" textAlign="center">
          {/* <Image size="massive" src={Logo} /> */}
          Nortwhind Weather
        </Header>
        <Segment attached>
          <LoginForm
            loading={loginState.loading}
            onSubmit={(values) => doLogin(values.email, values.password)}
          />
          {hasError && (
            <Message negative>
              Login error. Please check you credentials and try again.
            </Message>
          )}
          <Menu borderless text>
            <Menu.Item as={Link} to="/forgot-password" position="right">
              Forgot your password ?
            </Menu.Item>
          </Menu>
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

export default LoginPage;
