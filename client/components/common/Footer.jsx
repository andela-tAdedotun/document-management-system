import React from 'react';

/**
 * ProtectedSelect - component for page footer
 *
 * @param  {void}
 * @return {object}       markup for footer
 */
const Footer = () =>
  (
    <footer className="page-footer">
      <div className="footer-copyright">
        <div className="container">
        © 2017 Taiwo
        <a
          className="grey-text text-lighten-4 right"
          target="_blank"
          rel="noreferrer noopener"
          href="https://github.com/andela-tAdedotun"
        >
          I am on Github.
        </a>
        </div>
      </div>
    </footer>
  );


export default Footer;
