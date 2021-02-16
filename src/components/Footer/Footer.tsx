import React from 'react';

export const Footer: React.FC = () => {
  return (
    <div className="container-fluid text-center text-md-left">
      <div className="row">
        <div className="wrapper-btn">
          <button className="my-btn">
            <img className="my-img" src="./assets/images/winners.ico" alt="winners" />
          </button>
          <button className="my-btn">
            <img className="my-img" src="./assets/images/settings.ico" alt="settings" />
          </button>
        </div>
      </div>
      <div className="footer-copyright py-3 font-16">
        <div className="inline">
          © 2021 Copyright:
          <a href="https://github.com/Tonia-SE" target="blank">
            https://github.com/Tonia-SE
          </a>
        </div>
        <div>
          <a href="https://rs.school/">
            <img id="logo" alt="RS school" src="https://rs.school/images/rs_school_js.svg" />
          </a>
        </div>
      </div>
    </div>
  );
};
