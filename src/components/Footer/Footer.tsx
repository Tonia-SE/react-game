import React, { useEffect } from 'react';
import { getI18n, useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { ApplicationState } from '../../store/rootReducer';

export const Footer: React.FC = () => {
  const { t } = useTranslation();
  const language = useSelector((state: ApplicationState) => state.settings.language);
  useEffect(() => {
    getI18n().changeLanguage(language);
  }, [language]);
  return (
    <div className="container-fluid text-center text-md-left ">
      <div className="footer-copyright font-16">
        <div className="inline">
          {`© 2021 ${t('copyright')}:`}
          <a className="footer-link pl-1" href="https://github.com/Tonia-SE" target="blank">
            https://github.com/Tonia-SE
          </a>
        </div>
        <div className="footer-img">
          <a target="blank" href="https://rs.school/">
            <img id="logo" alt="RS school" src="https://rs.school/images/rs_school_js.svg" />
          </a>
        </div>
      </div>
    </div>
  );
};
