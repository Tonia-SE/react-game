import React from 'react';

export const Footer: React.FC = () => {
  return (
    <div className="container-fluid text-center text-md-left mt-3">
      <div className="row">
      </div>
      <div className="footer-copyright py-3 font-16">
        <div className="inline">
          © 2021 Copyright:
          <a className="footer-link pl-1" href="https://github.com/Tonia-SE" target="blank">
            https://github.com/Tonia-SE
          </a>
        </div>
        <div>
          <a target="blank" href="https://rs.school/">
            <img id="logo" alt="RS school" src="https://rs.school/images/rs_school_js.svg" />
          </a>
        </div>
      </div>
    </div>
  );
};
