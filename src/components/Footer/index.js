import React from "react";
import "./styles.scss";
import { PATHS } from "../../constant";

function Footer() {
  return (
    <div className="ng-footer">
      <a className="footer-link" href={PATHS.PRIVACY_POLICY}>
        Privacy policy
      </a>
    </div>
  );
}

export default Footer;
