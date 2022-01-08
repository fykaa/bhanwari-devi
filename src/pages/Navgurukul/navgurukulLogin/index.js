import React, { useState } from "react";
import "./styles.scss";
import GoogleLogin from "react-google-login";
import { Redirect } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { actions as userActions } from "../../../components/User/redux/action";

function NavgurukulLogin() {
  const dispatch = useDispatch();
  const { data } = useSelector(({ User }) => User);
  const isAuthenticated = data && data.isAuthenticated;

  function onSignIn(googleUser) {
    let profile = googleUser.getBasicProfile();
    let { id_token: idToken } = googleUser.getAuthResponse();

    const googleData = {
      id: profile.getId(),
      name: profile.getName(),
      imageUrl: profile.getImageUrl(),
      email: profile.getEmail(),
      idToken,
    };
    // let's send the data to our backend.
    dispatch(userActions.onUserSignin(googleData));
  }

  const onGoogleLoginFail = (errorResponse) => {
    // eslint-disable-next-line no-console
    console.log("onGoogle login fail", errorResponse);
  };

  if (isAuthenticated) {
    return <Redirect to="/admission" />;
  }

  return (
    <div className="login-container">
      <div className="flex-Container">
        <div className="left-side-conent">
          <video src="../../asset/video.mp4" className="video" controls></video>
        </div>
        <div className="right-side-conent">
          <h2 className="login-heading">
            Navgurukul One-Year Software Engineering Scholarship Test
          </h2>

          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            buttonText="Continue with Google"
            onSuccess={onSignIn}
            onFailure={onGoogleLoginFail}
            cookiePolicy={"single_host_origin"}
            className="google-login"
          />
        </div>
      </div>
    </div>
  );
}

export default NavgurukulLogin;
