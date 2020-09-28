import { Trans } from "@lingui/react";
import React, { useCallback } from "react";
import { Icon } from "semantic-ui-react";
import {logoutThunk} from "src/features/login/login.thunks";
import { useAppDispatch, userAppSelector } from "src/store/store";

const LoginContatinerComponent = () => {
  const loginState = userAppSelector((s) => s.login);
  const dispatch = useAppDispatch();
  const fullName = loginState.ERPProfile
    ? `${loginState.ERPProfile.contact_name}`
    : "";

  const handleLogout = useCallback(async () => {
    const response = await dispatch(logoutThunk());
    console.log("response", response);
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "row", justifyContent: 'flex-end', marginTop: 12 }}>
      <div>
        <Trans>Welcome </Trans> {fullName}
      </div>
      <Icon
        style={{ marginLeft: 12 }}
        title="Log Out"
        color="teal"
        link
        onClick={handleLogout}
        size="large"
        name="log out"
      />
    </div>
  );
};

const LoginContatiner = React.memo(LoginContatinerComponent);
export { LoginContatiner };
