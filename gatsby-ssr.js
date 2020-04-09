import React from 'react'

exports.onRenderBody = ({ setHeadComponents, setPostBodyComponents }) => {
  if (process.env.GATSBY_DISABLE_CHAT === undefined) {
    setPostBodyComponents([
      <script type="text/javascript"
        key={'snapEngage'}
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              var se = document.createElement('script'); se.type = 'text/javascript'; se.async = true;
              se.src = '//storage.googleapis.com/code.snapengage.com/js/47ad677f-0a1f-4565-9aa3-c18e3b04701a.js';
              var done = false;
              se.onload = se.onreadystatechange = function() {
                if (!done&&(!this.readyState||this.readyState==='loaded'||this.readyState==='complete')) {
                  done = true;
                  /* Place your SnapEngage JS API code below */
                  /* SnapEngage.allowChatSound(true); Example JS API: Enable sounds for Visitors. */
                  // SnapEngage.hideButton()
                }
              };
              var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(se, s);
            })();
            `
        }} />
    ])
  }
}
