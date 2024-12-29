/* eslint-disable @typescript-eslint/no-unused-vars */
import nodemailer from "nodemailer";


const transporter = nodemailer.createTransport({
  host: process.env.SMTP_SERVER, 
  port: 465,  
  auth: {
    user: process.env.MAIL_USERNAME, 
    pass: process.env.MAIL_PASSWORD,  
  },
});

export const sendWelcomeEmail = async (email: string, name: string) => {
  const mailOptions = {
    from: process.env.MAIL_FROM_ADDRESS,  
    to:email,
    subject: "Welcome to Our Service!",
    html :`
    <html dir="ltr" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="und">

<head>
  <meta http-equiv="Content-Security-Policy"
    content="script-src 'none'; connect-src 'none'; object-src 'none'; form-action https://cdn.ampproject.org https://amp.stripo.email;">
  <meta charset="UTF-8">
  <meta content="width=device-width, initial-scale=1" name="viewport">
  <meta name="x-apple-disable-message-reformatting">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta content="telephone=no" name="format-detection">
  <title></title>
  <!--[if (mso 16)]>
     <style type="text/css"> a {text-decoration: none;} 
 </style>
     <![endif]--><!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]--><!--[if gte mso 9]>
 <noscript>
          <xml>
            <o:OfficeDocumentSettings>
            <o:AllowPNG></o:AllowPNG>
            <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
          </xml>
       </noscript>
 <![endif]--><!--[if !mso]><!-->
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:400,400i,700,700i"><!--<![endif]-->
  <style type="text/css">
    .rollover:hover .rollover-first {
      max-height: 0px !important;
      display: none !important;
    }

    .rollover:hover .rollover-second {
      max-height: none !important;
      display: block !important;
    }

    .rollover span {
      font-size: 0px;
    }

    u+.body img~div div {
      display: none;
    }

    #outlook a {
      padding: 0;
    }

    span.MsoHyperlink,
    span.MsoHyperlinkFollowed {
      color: inherit;
      mso-style-priority: 99;
    }

    a.es-button {
      mso-style-priority: 100 !important;
      text-decoration: none !important;
    }

    a[x-apple-data-detectors],
    #MessageViewBody a {
      color: inherit !important;
      text-decoration: none !important;
      font-size: inherit !important;
      font-family: inherit !important;
      font-weight: inherit !important;
      line-height: inherit !important;
    }

    .es-desk-hidden {
      display: none;
      float: left;
      overflow: hidden;
      width: 0;
      max-height: 0;
      line-height: 0;
      mso-hide: all;
    }

    @media only screen and (max-width:600px) {
      .es-m-p20b {
        padding-bottom: 20px !important
      }

      .es-m-p20l {
        padding-left: 20px !important
      }

      .es-m-p0t {
        padding-top: 0px !important
      }

      .es-m-p20r {
        padding-right: 20px !important
      }

      .es-m-p35b {
        padding-bottom: 35px !important
      }

      .es-m-p0r {
        padding-right: 0px !important
      }

      .es-m-p15t {
        padding-top: 15px !important
      }

      .es-p-default {}

      *[class="gmail-fix"] {
        display: none !important
      }

      p,
      a {
        line-height: 150% !important
      }

      h1,
      h1 a {
        line-height: 120% !important
      }

      h2,
      h2 a {
        line-height: 120% !important
      }

      h3,
      h3 a {
        line-height: 120% !important
      }

      h4,
      h4 a {
        line-height: 120% !important
      }

      h5,
      h5 a {
        line-height: 120% !important
      }

      h6,
      h6 a {
        line-height: 120% !important
      }

      .es-header-body p {}

      .es-content-body p {}

      .es-footer-body p {}

      .es-infoblock p {}

      h1 {
        font-size: 28px !important;
        text-align: center
      }

      h2 {
        font-size: 20px !important;
        text-align: left
      }

      h3 {
        font-size: 20px !important;
        text-align: left
      }

      h4 {
        font-size: 24px !important;
        text-align: left
      }

      h5 {
        font-size: 20px !important;
        text-align: left
      }

      h6 {
        font-size: 16px !important;
        text-align: left
      }

      .es-header-body h1 a,
      .es-content-body h1 a,
      .es-footer-body h1 a {
        font-size: 28px !important
      }

      .es-header-body h2 a,
      .es-content-body h2 a,
      .es-footer-body h2 a {
        font-size: 20px !important
      }

      .es-header-body h3 a,
      .es-content-body h3 a,
      .es-footer-body h3 a {
        font-size: 20px !important
      }

      .es-header-body h4 a,
      .es-content-body h4 a,
      .es-footer-body h4 a {
        font-size: 24px !important
      }

      .es-header-body h5 a,
      .es-content-body h5 a,
      .es-footer-body h5 a {
        font-size: 20px !important
      }

      .es-header-body h6 a,
      .es-content-body h6 a,
      .es-footer-body h6 a {
        font-size: 16px !important
      }

      .es-menu td a {
        font-size: 14px !important
      }

      .es-header-body p,
      .es-header-body a {
        font-size: 14px !important
      }

      .es-content-body p,
      .es-content-body a {
        font-size: 16px !important
      }

      .es-footer-body p,
      .es-footer-body a {
        font-size: 14px !important
      }

      .es-infoblock p,
      .es-infoblock a {
        font-size: 12px !important
      }

      .es-m-txt-c,
      .es-m-txt-c h1,
      .es-m-txt-c h2,
      .es-m-txt-c h3,
      .es-m-txt-c h4,
      .es-m-txt-c h5,
      .es-m-txt-c h6 {
        text-align: center !important
      }

      .es-m-txt-r,
      .es-m-txt-r h1,
      .es-m-txt-r h2,
      .es-m-txt-r h3,
      .es-m-txt-r h4,
      .es-m-txt-r h5,
      .es-m-txt-r h6 {
        text-align: right !important
      }

      .es-m-txt-j,
      .es-m-txt-j h1,
      .es-m-txt-j h2,
      .es-m-txt-j h3,
      .es-m-txt-j h4,
      .es-m-txt-j h5,
      .es-m-txt-j h6 {
        text-align: justify !important
      }

      .es-m-txt-l,
      .es-m-txt-l h1,
      .es-m-txt-l h2,
      .es-m-txt-l h3,
      .es-m-txt-l h4,
      .es-m-txt-l h5,
      .es-m-txt-l h6 {
        text-align: left !important
      }

      .es-m-txt-r img,
      .es-m-txt-c img,
      .es-m-txt-l img {
        display: inline !important
      }

      .es-m-txt-r .rollover:hover .rollover-second,
      .es-m-txt-c .rollover:hover .rollover-second,
      .es-m-txt-l .rollover:hover .rollover-second {
        display: inline !important
      }

      .es-m-txt-r .rollover span,
      .es-m-txt-c .rollover span,
      .es-m-txt-l .rollover span {
        line-height: 0 !important;
        font-size: 0 !important;
        display: block
      }

      .es-spacer {
        display: inline-table
      }

      a.es-button,
      button.es-button {
        font-size: 16px !important;
        padding: 0px 0px 0px 0px !important;
        line-height: 120% !important
      }

      a.es-button,
      button.es-button,
      .es-button-border {
        display: inline-block !important
      }

      .es-m-fw,
      .es-m-fw.es-fw,
      .es-m-fw .es-button {
        display: block !important
      }

      .es-m-il,
      .es-m-il .es-button,
      .es-social,
      .es-social td,
      .es-menu {
        display: inline-block !important
      }

      .es-adaptive table,
      .es-left,
      .es-right {
        width: 100% !important
      }

      .es-content table,
      .es-header table,
      .es-footer table,
      .es-content,
      .es-footer,
      .es-header {
        width: 100% !important;
        max-width: 600px !important
      }

      .adapt-img {
        width: 100% !important;
        height: auto !important
      }

      .es-mobile-hidden,
      .es-hidden {
        display: none !important
      }

      .es-desk-hidden {
        width: auto !important;
        overflow: visible !important;
        float: none !important;
        max-height: inherit !important;
        line-height: inherit !important
      }

      tr.es-desk-hidden {
        display: table-row !important
      }

      table.es-desk-hidden {
        display: table !important
      }

      td.es-desk-menu-hidden {
        display: table-cell !important
      }

      .es-menu td {
        width: 1% !important
      }

      table.es-table-not-adapt,
      .esd-block-html table {
        width: auto !important
      }

      .h-auto {
        height: auto !important
      }

      .img-5080 {
        width: 200px !important
      }

      .img-1224 {
        width: 280px !important
      }

      .es-text-3613 .es-text-mobile-size-16,
      .es-text-3613 .es-text-mobile-size-16 * {
        font-size: 16px !important;
        line-height: 150% !important
      }

      .es-text-9870 .es-text-mobile-size-16,
      .es-text-9870 .es-text-mobile-size-16 * {
        font-size: 16px !important;
        line-height: 150% !important
      }

      .es-text-9610 .es-text-mobile-size-16,
      .es-text-9610 .es-text-mobile-size-16 * {
        font-size: 16px !important;
        line-height: 150% !important
      }

      .es-text-5700 .es-text-mobile-size-16,
      .es-text-5700 .es-text-mobile-size-16 * {
        font-size: 16px !important;
        line-height: 150% !important
      }

      .es-text-3855 .es-text-mobile-size-16,
      .es-text-3855 .es-text-mobile-size-16 * {
        font-size: 16px !important;
        line-height: 150% !important
      }

      .es-text-3485 .es-text-mobile-size-16,
      .es-text-3485 .es-text-mobile-size-16 * {
        font-size: 16px !important;
        line-height: 150% !important
      }

      .es-text-4228 .es-text-mobile-size-16,
      .es-text-4228 .es-text-mobile-size-16 * {
        font-size: 16px !important;
        line-height: 150% !important
      }
    }

    @media screen and (max-width:384px) {
      .mail-message-content {
        width: 414px !important
      }
    }
  </style>
  <style>
    * {
      scrollbar-width: thin;
      scrollbar-color: #888 transparent;
    }

    /* Chrome, Edge, Safari */
    ::-webkit-scrollbar {
      width: 10px;
      height: 10px;
    }

    ::-webkit-scrollbar-track {
      background: transparent;
    }

    ::-webkit-scrollbar-thumb {
      background: #888;
      border-radius: 6px;
      border: 2px solid transparent;
    }

    ::-webkit-scrollbar-thumb:hover {
      box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    }

    textarea::-webkit-scrollbar-track {
      margin: 15px;
    }
  </style>
</head>

<body class="body"
  style="width:100%;height:100%;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0">
  <div dir="ltr" class="es-wrapper-color" lang="und" style="background-color:#EEEEEE"><!--[if gte mso 9]>
  <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
    <v:fill type="tile"  color="#eeeeee" origin="0.5, 0" position="0.5, 0"></v:fill>
  </v:background>
 <![endif]-->
    <table width="100%" cellspacing="0" cellpadding="0" class="es-wrapper" role="none"
      style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top;background-color:#EEEEEE">
      <tbody>
        <tr>
          <td valign="top" style="padding:0;Margin:0">
            <table cellspacing="0" cellpadding="0" align="center" class="es-header" role="none"
              style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:100%;table-layout:fixed !important;background-color:transparent;background-repeat:repeat;background-position:center top">
              <tbody>
                <tr>
                  <td align="center" style="padding:0;Margin:0">
                    <table cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" class="es-header-body"
                      role="none"
                      style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px">
                      <tbody>
                        <tr>
                          <td align="left" style="padding:0;Margin:0;padding-top:35px">
                            <table cellspacing="0" width="100%" cellpadding="0" role="none"
                              style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                              <tbody>
                                <tr>
                                  <td align="left" style="padding:0;Margin:0;width:600px">
                                    <table cellpadding="0" cellspacing="0" width="100%" role="presentation"
                                      style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                      <tbody>
                                        <tr>
                                          <td align="center" style="padding:0;Margin:0;padding-bottom:35px;font-size:0">
                                            <a target="_blank" href="https://www.gbmeals.com/"
                                              style="mso-line-height-rule:exactly;text-decoration:underline;color:#2CB543;font-size:14px"><img
                                                src="https://enjobkh.stripocdn.email/content/guids/CABINET_d4c7cf3d3287f63d3fd8ef8a939741b5964691d841a9e4036865138946aa62b4/images/logo22cc494b3c43bf1131ac7.png"
                                                alt="" width="280" class="img-1224"
                                                style="display:block;font-size:16px;border:0;outline:none;text-decoration:none"></a>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td align="center" style="padding:0;Margin:0;font-size:0"><a target="_blank"
                                              href="https://www.gbmeals.com/"
                                              style="mso-line-height-rule:exactly;text-decoration:underline;color:#2CB543;font-size:14px"><img
                                                src="https://enjobkh.stripocdn.email/content/guids/CABINET_d4c7cf3d3287f63d3fd8ef8a939741b5964691d841a9e4036865138946aa62b4/images/welcomebanner1_sSP.gif"
                                                alt="" width="600" class="adapt-img"
                                                style="display:block;font-size:16px;border:0;outline:none;text-decoration:none"></a>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                        <tr>
                          <td align="left" bgcolor="#000000"
                            style="padding:0;Margin:0;padding-top:5px;padding-bottom:40px;background-color:#000000">
                            <table cellpadding="0" cellspacing="0" width="100%" role="none"
                              style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                              <tbody>
                                <tr>
                                  <td align="left" style="padding:0;Margin:0;width:600px">
                                    <table width="100%" role="presentation" cellpadding="0" cellspacing="0"
                                      style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                      <tbody>
                                        <tr>
                                          <td align="center" style="padding:0;Margin:0;padding-bottom:15px">
                                            <p
                                              style="Margin:0;mso-line-height-rule:exactly;font-family:roboto, 'helvetica neue', helvetica, arial, sans-serif;line-height:21px;letter-spacing:0;color:#606060;font-size:14px">
                                              <strong><span style="color:#ffffff">Hi!</span><a target="_blank"
                                                  style="mso-line-height-rule:exactly;text-decoration:underline;color:#ffffff;font-size:14px"
                                                  href=""></a></strong></p>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td align="center" bgcolor="#000000" class="es-text-3613"
                                            style="padding:0;Margin:0;padding-bottom:15px;padding-right:30px;padding-left:30px">
                                            <p
                                              style="Margin:0;mso-line-height-rule:exactly;font-family:roboto, 'helvetica neue', helvetica, arial, sans-serif;line-height:24px;letter-spacing:0;color:#ffffff;font-size:14px">
                                              <strong> </strong><span class="es-text-mobile-size-16"
                                                style="font-size:16px">Welcome to GBMeal! We’re thrilled to have you on
                                                board. You’ve just made the first step toward simplifying your weekly
                                                meal planning and ensuring that you have delicious, nutritious meals
                                                ready every week.</span><strong> </strong></p>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td align="center" style="padding:0;Margin:0"><span class="es-button-border"
                                              style="border-style:solid;border-color:#738065;background:#ffffff;border-width:14px 35px 14px 35px;display:inline-block;border-radius:8px;width:auto;border-top:14px solid #ffffff;border-right:44px solid #ffffff;border-bottom:14px solid #ffffff;border-left:44px solid #ffffff"><a
                                                href="https://www.gbmeals.com/" target="_blank" class="es-button"
                                                style="mso-style-priority:100 !important;text-decoration:none !important;mso-line-height-rule:exactly;color:#738065;font-size:14px;padding:0px;display:inline-block;background:#ffffff;border-radius:8px;font-family:roboto, 'helvetica neue', helvetica, arial, sans-serif;font-weight:bold;font-style:normal;line-height:16.8px;width:auto;text-align:center;letter-spacing:0;mso-padding-alt:0;mso-border-alt:10px solid #ffffff">Discover
                                                Now</a></span></td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                        <tr>
                          <td align="left" style="padding:0;Margin:0;padding-top:35px">
                            <table cellspacing="0" width="100%" cellpadding="0" role="none"
                              style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                              <tbody>
                                <tr>
                                  <td align="left" style="padding:0;Margin:0;width:600px">
                                    <table role="presentation" cellpadding="0" cellspacing="0" width="100%"
                                      style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                      <tbody>
                                        <tr>
                                          <td align="center" style="padding:0;Margin:0;padding-bottom:5px">
                                            <h1
                                              style="Margin:0;font-family:roboto, 'helvetica neue', helvetica, arial, sans-serif;mso-line-height-rule:exactly;letter-spacing:0;font-size:28px;font-style:normal;font-weight:bold;line-height:33.6px;color:#313131">
                                              What You Can <span style="color:#738065">Expect From Us</span></h1>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td align="center" style="padding:0;Margin:0;font-size:0"><img alt=""
                                              width="35"
                                              src="https://enjobkh.stripocdn.email/content/guids/CABINET_d4c7cf3d3287f63d3fd8ef8a939741b5964691d841a9e4036865138946aa62b4/images/underline.png"
                                              style="display:block;font-size:16px;border:0;outline:none;text-decoration:none">
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                        <tr class="es-mobile-hidden">
                          <td align="left" style="padding:0;Margin:0;padding-top:5px;padding-bottom:20px">
                            <!--[if mso]><table style="width:600px" cellpadding="0" cellspacing="0"><tr><td style="width:200px" valign="top"><![endif]-->
                            <table cellspacing="0" cellpadding="0" align="left" class="es-left" role="none"
                              style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
                              <tbody>
                                <tr>
                                  <td valign="top" align="center" class="es-m-p20b"
                                    style="padding:0;Margin:0;width:200px">
                                    <table width="100%" cellspacing="0" cellpadding="0" role="presentation"
                                      style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                      <tbody>
                                        <tr>
                                          <td align="center" class="es-m-txt-l"
                                            style="padding:0;Margin:0;padding-left:25px;font-size:0"><a target="_blank"
                                              href="https://www.gbmeals.com/"
                                              style="mso-line-height-rule:exactly;text-decoration:underline;color:#2CB543;font-size:14px"><img
                                                src="https://enjobkh.stripocdn.email/content/guids/CABINET_d4c7cf3d3287f63d3fd8ef8a939741b5964691d841a9e4036865138946aa62b4/images/image1.png"
                                                alt="" width="175"
                                                style="display:block;font-size:16px;border:0;outline:none;text-decoration:none"></a>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            <!--[if mso]></td><td style="width:20px"></td><td style="width:380px" valign="top"><![endif]-->
                            <table cellspacing="0" cellpadding="0" align="right" class="es-right" role="none"
                              style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right">
                              <tbody>
                                <tr>
                                  <td align="left" style="padding:0;Margin:0;width:380px">
                                    <table width="100%" cellspacing="0" cellpadding="0" role="presentation"
                                      style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                      <tbody>
                                        <tr>
                                          <td align="left"
                                            style="Margin:0;padding-top:15px;padding-right:10px;padding-bottom:10px;padding-left:10px">
                                            <h2
                                              style="Margin:0;font-family:roboto, 'helvetica neue', helvetica, arial, sans-serif;mso-line-height-rule:exactly;letter-spacing:0;font-size:20px;font-style:normal;font-weight:bold;line-height:24px;color:#738065">
                                              Weekly Meal Plans</h2>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td align="left" class="es-text-5700"
                                            style="padding:0;Margin:0;padding-bottom:15px;padding-left:10px;padding-right:25px">
                                            <p
                                              style="Margin:0;mso-line-height-rule:exactly;font-family:roboto, 'helvetica neue', helvetica, arial, sans-serif;line-height:24px;letter-spacing:0;color:#333333;font-size:14px">
                                              <span class="es-text-mobile-size-16" style="font-size:16px">Each week,
                                                you’ll receive a personalized meal plan with a detailed
                                                shopping list. Say goodbye to the daily "What’s for dinner?" dilemma!
                                                Your curated plan makes it easy to stay organized and
                                                well-prepared.</span></p>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td align="left" style="padding:0;Margin:0;padding-left:10px"><span
                                              class="es-button-border"
                                              style="border-style:solid;border-color:#738065;background:#738065;border-width:14px 35px 14px 35px;display:inline-block;border-radius:8px;width:auto"><a
                                                href="https://www.gbmeals.com/" target="_blank" class="es-button"
                                                style="mso-style-priority:100 !important;text-decoration:none !important;mso-line-height-rule:exactly;color:#FFFFFF;font-size:14px;padding:0px;display:inline-block;background:#738065;border-radius:8px;font-family:roboto, 'helvetica neue', helvetica, arial, sans-serif;font-weight:normal;font-style:normal;line-height:16.8px;width:auto;text-align:center;letter-spacing:0;mso-padding-alt:0;mso-border-alt:10px solid #738065">Learn
                                                More</a></span></td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table><!--[if mso]></td></tr></table><![endif]-->
                          </td>
                        </tr>
                        <!--[if !mso]><!-->
                        <tr class="es-desk-hidden"
                          style="display:none;float:left;overflow:hidden;width:0;max-height:0;line-height:0;mso-hide:all">
                          <td align="left" style="padding:0;Margin:0;padding-top:10px">
                            <table align="left" cellspacing="0" cellpadding="0" class="es-left" role="none"
                              style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
                              <tbody>
                                <tr>
                                  <td valign="top" align="center" class="es-m-p20b"
                                    style="padding:0;Margin:0;width:200px">
                                    <table width="100%" cellspacing="0" cellpadding="0" role="presentation"
                                      style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                      <tbody>
                                        <tr>
                                          <td align="center" class="es-m-txt-l es-m-p20l"
                                            style="padding:0;Margin:0;padding-left:25px;font-size:0"><a target="_blank"
                                              href="https://www.gbmeals.com/"
                                              style="mso-line-height-rule:exactly;text-decoration:underline;color:#2CB543;font-size:14px"><img
                                                width="175"
                                                src="https://enjobkh.stripocdn.email/content/guids/CABINET_d4c7cf3d3287f63d3fd8ef8a939741b5964691d841a9e4036865138946aa62b4/images/image1.png"
                                                alt=""
                                                style="display:block;font-size:16px;border:0;outline:none;text-decoration:none"></a>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            <table cellpadding="0" align="right" cellspacing="0" class="es-right" role="none"
                              style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right">
                              <tbody>
                                <tr>
                                  <td align="left" style="padding:0;Margin:0;width:380px">
                                    <table width="100%" cellspacing="0" cellpadding="0" role="presentation"
                                      style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                      <tbody>
                                        <tr>
                                          <td align="left" class="es-m-p20l es-m-p0t"
                                            style="Margin:0;padding-top:15px;padding-right:10px;padding-bottom:10px;padding-left:10px">
                                            <h2
                                              style="Margin:0;font-family:roboto, 'helvetica neue', helvetica, arial, sans-serif;mso-line-height-rule:exactly;letter-spacing:0;font-size:20px;font-style:normal;font-weight:bold;line-height:24px;color:#738065">
                                              Weekly Meal Plans</h2>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td align="left" class="es-text-3855 es-m-p20l es-m-p20r"
                                            style="padding:0;Margin:0;padding-bottom:15px;padding-left:10px;padding-right:25px">
                                            <p
                                              style="Margin:0;mso-line-height-rule:exactly;font-family:roboto, 'helvetica neue', helvetica, arial, sans-serif;line-height:24px;letter-spacing:0;color:#333333;font-size:14px">
                                              <span class="es-text-mobile-size-16" style="font-size:16px">Each week,
                                                you’ll receive a personalized meal plan with a detailed
                                                shopping list. Say goodbye to the daily "What’s for dinner?" dilemma!
                                                Your curated plan makes it easy to stay organized and
                                                well-prepared.</span></p>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td align="left" class="es-m-p20l es-m-p35b"
                                            style="padding:0;Margin:0;padding-left:10px"><span class="es-button-border"
                                              style="border-style:solid;border-color:#738065;background:#738065;border-width:14px 35px 14px 35px;display:inline-block;border-radius:8px;width:auto"><a
                                                href="" target="_blank" class="es-button"
                                                style="mso-style-priority:100 !important;text-decoration:none !important;mso-line-height-rule:exactly;color:#FFFFFF;font-size:14px;padding:0px;display:inline-block;background:#738065;border-radius:8px;font-family:roboto, 'helvetica neue', helvetica, arial, sans-serif;font-weight:normal;font-style:normal;line-height:16.8px;width:auto;text-align:center;letter-spacing:0;mso-padding-alt:0;mso-border-alt:10px solid #738065">Learn
                                                More</a></span></td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                        <!--<![endif]--><!--[if !mso]><!-->
                        <tr class="es-desk-hidden"
                          style="display:none;float:left;overflow:hidden;width:0;max-height:0;line-height:0;mso-hide:all">
                          <td align="left" style="padding:0;Margin:0;padding-bottom:35px">
                            <table cellpadding="0" cellspacing="0" align="left" class="es-left" role="none"
                              style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
                              <tbody>
                                <tr>
                                  <td align="left" style="padding:0;Margin:0;width:219px">
                                    <table cellpadding="0" cellspacing="0" width="100%" role="presentation"
                                      style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                      <tbody>
                                        <tr>
                                          <td align="center" class="es-m-txt-l es-m-p20l es-m-p0r"
                                            style="padding:0;Margin:0;padding-right:25px;font-size:0"><a target="_blank"
                                              href="https://www.gbmeals.com/"
                                              style="mso-line-height-rule:exactly;text-decoration:underline;color:#2CB543;font-size:14px"><img
                                                src="https://enjobkh.stripocdn.email/content/guids/CABINET_d4c7cf3d3287f63d3fd8ef8a939741b5964691d841a9e4036865138946aa62b4/images/image2.png"
                                                alt="" width="194"
                                                style="display:block;font-size:16px;border:0;outline:none;text-decoration:none"></a>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            <table cellpadding="0" cellspacing="0" align="right" class="es-right" role="none"
                              style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right">
                              <tbody>
                                <tr>
                                  <td align="left" style="padding:0;Margin:0;width:361px">
                                    <table cellpadding="0" cellspacing="0" width="100%" role="presentation"
                                      style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                      <tbody>
                                        <tr>
                                          <td align="left" class="es-m-p15t"
                                            style="Margin:0;padding-left:25px;padding-right:10px;padding-bottom:10px;padding-top:25px">
                                            <h2
                                              style="Margin:0;font-family:roboto, 'helvetica neue', helvetica, arial, sans-serif;mso-line-height-rule:exactly;letter-spacing:0;font-size:20px;font-style:normal;font-weight:bold;line-height:24px;color:#738065">
                                              Smart Shopping Lists</h2>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td align="left" class="es-text-9870 es-m-p20l"
                                            style="padding:0;Margin:0;padding-bottom:15px;padding-left:25px;padding-right:15px">
                                            <p
                                              style="Margin:0;mso-line-height-rule:exactly;font-family:roboto, 'helvetica neue', helvetica, arial, sans-serif;line-height:24px;letter-spacing:0;color:#333333;font-size:14px">
                                              <span class="es-text-mobile-size-16" style="font-size:16px"> </span></p>
                                            <p class="es-text-mobile-size-16"
                                              style="Margin:0;mso-line-height-rule:exactly;font-family:roboto, 'helvetica neue', helvetica, arial, sans-serif;line-height:24px;letter-spacing:0;color:#333333;font-size:16px">
                                              Save time and shop smarter! Our curated shopping lists ensure you have
                                              everything you need, making your trips to the grocery store faster and
                                              more efficient.</p>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td align="left" class="es-m-p20l"
                                            style="padding:0;Margin:0;padding-left:25px"><span class="es-button-border"
                                              style="border-style:solid;border-color:#738065;background:#738065;border-width:14px 35px 14px 35px;display:inline-block;border-radius:8px;width:auto"><a
                                                target="_blank" href="https://www.gbmeals.com/" class="es-button"
                                                style="mso-style-priority:100 !important;text-decoration:none !important;mso-line-height-rule:exactly;color:#FFFFFF;font-size:14px;padding:0px;display:inline-block;background:#738065;border-radius:8px;font-family:roboto, 'helvetica neue', helvetica, arial, sans-serif;font-weight:normal;font-style:normal;line-height:16.8px;width:auto;text-align:center;letter-spacing:0;mso-padding-alt:0;mso-border-alt:10px solid #738065">Learn
                                                More</a></span></td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                        <!--<![endif]-->
                        <tr class="es-mobile-hidden">
                          <td align="left" style="padding:0;Margin:0;padding-bottom:35px">
                            <!--[if mso]><table style="width:600px" cellpadding="0" cellspacing="0"><tr><td style="width:361px" valign="top"><![endif]-->
                            <table cellpadding="0" cellspacing="0" align="left" class="es-left" role="none"
                              style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
                              <tbody>
                                <tr>
                                  <td align="left" style="padding:0;Margin:0;width:361px">
                                    <table cellpadding="0" cellspacing="0" width="100%" role="presentation"
                                      style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                      <tbody>
                                        <tr>
                                          <td align="left"
                                            style="Margin:0;padding-left:25px;padding-right:10px;padding-bottom:10px;padding-top:25px">
                                            <h2
                                              style="Margin:0;font-family:roboto, 'helvetica neue', helvetica, arial, sans-serif;mso-line-height-rule:exactly;letter-spacing:0;font-size:20px;font-style:normal;font-weight:bold;line-height:24px;color:#738065">
                                              Smart Shopping Lists</h2>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td align="left" class="es-text-9610"
                                            style="padding:0;Margin:0;padding-bottom:15px;padding-left:25px;padding-right:15px">
                                            <p
                                              style="Margin:0;mso-line-height-rule:exactly;font-family:roboto, 'helvetica neue', helvetica, arial, sans-serif;line-height:24px;letter-spacing:0;color:#333333;font-size:14px">
                                              <span class="es-text-mobile-size-16" style="font-size:16px"> </span></p>
                                            <p class="es-text-mobile-size-16"
                                              style="Margin:0;mso-line-height-rule:exactly;font-family:roboto, 'helvetica neue', helvetica, arial, sans-serif;line-height:24px;letter-spacing:0;color:#333333;font-size:16px">
                                              Save time and shop smarter! Our curated shopping lists ensure you have
                                              everything you need, making your trips to the grocery store faster and
                                              more efficient.</p>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td align="left" style="padding:0;Margin:0;padding-left:25px"><span
                                              class="es-button-border"
                                              style="border-style:solid;border-color:#738065;background:#738065;border-width:14px 35px 14px 35px;display:inline-block;border-radius:8px;width:auto"><a
                                                href="https://www.gbmeals.com/" target="_blank" class="es-button"
                                                style="mso-style-priority:100 !important;text-decoration:none !important;mso-line-height-rule:exactly;color:#FFFFFF;font-size:14px;padding:0px;display:inline-block;background:#738065;border-radius:8px;font-family:roboto, 'helvetica neue', helvetica, arial, sans-serif;font-weight:normal;font-style:normal;line-height:16.8px;width:auto;text-align:center;letter-spacing:0;mso-padding-alt:0;mso-border-alt:10px solid #738065">Learn
                                                More</a></span></td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            <!--[if mso]></td><td style="width:20px"></td><td style="width:219px" valign="top"><![endif]-->
                            <table cellpadding="0" cellspacing="0" align="right" class="es-right" role="none"
                              style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right">
                              <tbody>
                                <tr>
                                  <td align="left" class="es-m-p20b" style="padding:0;Margin:0;width:219px">
                                    <table role="presentation" cellpadding="0" cellspacing="0" width="100%"
                                      style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                      <tbody>
                                        <tr>
                                          <td align="center" style="padding:0;Margin:0;padding-right:25px;font-size:0">
                                            <a target="_blank" href="https://www.gbmeals.com/"
                                              style="mso-line-height-rule:exactly;text-decoration:underline;color:#2CB543;font-size:14px"><img
                                                src="https://enjobkh.stripocdn.email/content/guids/CABINET_d4c7cf3d3287f63d3fd8ef8a939741b5964691d841a9e4036865138946aa62b4/images/image2.png"
                                                alt="" width="194"
                                                style="display:block;font-size:16px;border:0;outline:none;text-decoration:none"></a>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table><!--[if mso]></td></tr></table><![endif]-->
                          </td>
                        </tr>
                      
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
            <table cellspacing="0" cellpadding="0" align="center" class="es-content" role="none"
              style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:100%;table-layout:fixed !important">
              <tbody>
                <tr>
                  <td align="center" style="padding:0;Margin:0">
                    <table cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" class="es-content-body"
                      role="none"
                      style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px">
                      <tbody>
                        <tr>
                          <td align="left" style="padding:0;Margin:0;padding-top:35px">
                            <table width="100%" cellspacing="0" cellpadding="0" role="none"
                              style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                              <tbody>
                                <tr>
                                  <td valign="top" align="center" style="padding:0;Margin:0;width:600px">
                                    <table width="100%" cellspacing="0" cellpadding="0" role="presentation"
                                      style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                      <tbody>
                                        <tr>
                                          <td align="center"
                                            style="padding:0;Margin:0;padding-bottom:5px;padding-right:15px;padding-left:15px">
                                            <h1
                                              style="Margin:0;font-family:roboto, 'helvetica neue', helvetica, arial, sans-serif;mso-line-height-rule:exactly;letter-spacing:0;font-size:28px;font-style:normal;font-weight:bold;line-height:33.6px;color:#313131">
                                              <strong>Tasty, Nutritious Recipes</strong></h1>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td align="center" style="padding:0;Margin:0;font-size:0"><img
                                              src="https://enjobkh.stripocdn.email/content/guids/CABINET_d4c7cf3d3287f63d3fd8ef8a939741b5964691d841a9e4036865138946aa62b4/images/underline.png"
                                              alt="" width="35"
                                              style="display:block;font-size:16px;border:0;outline:none;text-decoration:none">
                                          </td>
                                        </tr>
                                        <tr>
                                          <td align="center" style="padding:0;Margin:0;font-size:0"><a target="_blank"
                                              href="https://www.gbmeals.com/"
                                              style="mso-line-height-rule:exactly;text-decoration:underline;color:#738065;font-size:16px"><img
                                                src="https://enjobkh.stripocdn.email/content/guids/CABINET_d4c7cf3d3287f63d3fd8ef8a939741b5964691d841a9e4036865138946aa62b4/images/top_image1_KNO.png"
                                                alt="" width="600" class="adapt-img"
                                                style="display:block;font-size:16px;border:0;outline:none;text-decoration:none"></a>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td align="center" bgcolor="#738065"
                                            style="Margin:0;padding-bottom:15px;padding-right:30px;padding-left:30px;padding-top:15px">
                                            <p
                                              style="Margin:0;mso-line-height-rule:exactly;font-family:roboto, 'helvetica neue', helvetica, arial, sans-serif;line-height:24px;letter-spacing:0;color:#ffffff;font-size:16px">
                                              From wholesome breakfasts to satisfying dinners, we’ve got you covered
                                              with balanced and easy-to-make meals.</p>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td align="center" bgcolor="#738065"
                                            style="padding:0;Margin:0;padding-bottom:35px;padding-left:25px"><span
                                              class="es-button-border"
                                              style="border-style:solid;border-color:#738065;background:#ffffff;border-width:14px 35px 14px 35px;display:inline-block;border-radius:8px;width:auto;border-top:14px solid #ffffff;border-right:34px solid #ffffff;border-bottom:14px solid #ffffff;border-left:34px solid #ffffff"><a
                                                href="https://www.gbmeals.com/" target="_blank" class="es-button"
                                                style="mso-style-priority:100 !important;text-decoration:none !important;mso-line-height-rule:exactly;color:#738065;font-size:14px;padding:0px;display:inline-block;background:#ffffff;border-radius:8px;font-family:roboto, 'helvetica neue', helvetica, arial, sans-serif;font-weight:bold;font-style:normal;line-height:16.8px;width:auto;text-align:center;letter-spacing:0;mso-padding-alt:0;mso-border-alt:10px solid #ffffff">Learn
                                                More</a></span></td>
                                        </tr>
                                        <tr>
                                          <td align="center" style="padding:0;Margin:0;font-size:0"><a target="_blank"
                                              href="https://www.gbmeals.com/"
                                              style="mso-line-height-rule:exactly;text-decoration:underline;color:#738065;font-size:16px"><img
                                                src="https://enjobkh.stripocdn.email/content/guids/CABINET_d4c7cf3d3287f63d3fd8ef8a939741b5964691d841a9e4036865138946aa62b4/images/offer_image_fIC.png"
                                                alt="" width="600" class="adapt-img"
                                                style="display:block;font-size:16px;border:0;outline:none;text-decoration:none"></a>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
            <table cellspacing="0" cellpadding="0" align="center" class="es-footer" role="none"
              style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:100%;table-layout:fixed !important;background-color:transparent;background-repeat:repeat;background-position:center top">
              <tbody>
                <tr>
                  <td align="center" style="padding:0;Margin:0">
                    <table cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" class="es-footer-body"
                      role="none"
                      style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px">
                      <tbody>
                        <tr>
                          <td align="left" style="padding:0;Margin:0;padding-top:35px">
                            <table width="100%" cellpadding="0" cellspacing="0" role="none"
                              style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                              <tbody>
                                <tr>
                                  <td align="left" style="padding:0;Margin:0;width:600px">
                                    <table cellpadding="0" cellspacing="0" width="100%" role="presentation"
                                      style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                      <tbody>
                                        <tr>
                                          <td align="center" class="es-text-3485"
                                            style="padding:0;Margin:0;padding-bottom:15px;padding-right:35px;padding-left:35px">
                                            <p
                                              style="Margin:0;mso-line-height-rule:exactly;font-family:roboto, 'helvetica neue', helvetica, arial, sans-serif;line-height:24px;letter-spacing:0;color:#606060;font-size:14px">
                                              <span class="es-text-mobile-size-16" style="font-size:16px">If you have
                                                any questions or need assistance, feel free to reply to this email.
                                                We're here to help!&nbsp; Looking forward to helping you make meal
                                                planning easier. </span></p>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td align="center" class="es-text-4228"
                                            style="padding:0;Margin:0;padding-right:35px;padding-left:35px;padding-bottom:30px">
                                            <p
                                              style="Margin:0;mso-line-height-rule:exactly;font-family:roboto, 'helvetica neue', helvetica, arial, sans-serif;line-height:24px;letter-spacing:0;color:#333333;font-size:14px">
                                              <strong class="es-text-mobile-size-16" style="font-size:16px"> Warm
                                                regards, </strong></p>
                                            <p
                                              style="Margin:0;mso-line-height-rule:exactly;font-family:roboto, 'helvetica neue', helvetica, arial, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px">
                                              <strong> The GBMeal Team</strong></p>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td align="center" style="padding:0;Margin:0;padding-bottom:35px;font-size:0">
                                            <a target="_blank" href="https://www.gbmeals.com/"
                                              style="mso-line-height-rule:exactly;text-decoration:underline;color:#2CB543;font-size:14px"><img
                                                width="200"
                                                src="https://enjobkh.stripocdn.email/content/guids/CABINET_d4c7cf3d3287f63d3fd8ef8a939741b5964691d841a9e4036865138946aa62b4/images/logo22cc494b3c43bf1131ac7.png"
                                                alt="" class="img-5080"
                                                style="display:block;font-size:16px;border:0;outline:none;text-decoration:none"></a>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                        <tr>
                          <td align="left" bgcolor="#000000"
                            style="padding:0;Margin:0;padding-top:25px;padding-bottom:25px;background-color:#000000">
                            <table width="100%" cellpadding="0" cellspacing="0" role="none"
                              style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                              <tbody>
                                <tr>
                                  <td align="left" style="padding:0;Margin:0;width:600px">
                                    <table role="presentation" cellpadding="0" cellspacing="0" width="100%"
                                      style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                      <tbody>
                                        <tr>
                                          <td align="center" style="padding:0;Margin:0;font-size:0">
                                            <table cellpadding="0" cellspacing="0" class="es-table-not-adapt es-social"
                                              role="presentation"
                                              style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                              <tbody>
                                                <tr>
                                                  <td align="center" valign="top"
                                                    style="padding:0;Margin:0;padding-right:20px"><img alt="Fb"
                                                      width="23" height="23" title="Facebook"
                                                      src="https://enjobkh.stripocdn.email/content/guids/CABINET_d4c7cf3d3287f63d3fd8ef8a939741b5964691d841a9e4036865138946aa62b4/images/facebooklogo_49052.png"
                                                      style="display:block;font-size:16px;border:0;outline:none;text-decoration:none">
                                                  </td>
                                                  <td align="center" valign="top"
                                                    style="padding:0;Margin:0;padding-right:20px"><img width="23"
                                                      height="23" title="X"
                                                      src="https://enjobkh.stripocdn.email/content/guids/CABINET_d4c7cf3d3287f63d3fd8ef8a939741b5964691d841a9e4036865138946aa62b4/images/twitter_5968958.png"
                                                      alt="X"
                                                      style="display:block;font-size:16px;border:0;outline:none;text-decoration:none">
                                                  </td>
                                                  <td align="center" valign="top"
                                                    style="padding:0;Margin:0;padding-right:20px"><a target="_blank"
                                                      href="https://www.instagram.com/gbmeals/"
                                                      style="mso-line-height-rule:exactly;text-decoration:underline;color:#2CB543;font-size:14px"><img
                                                        alt="Ig" width="23" height="23" title="Instagram"
                                                        src="https://enjobkh.stripocdn.email/content/guids/CABINET_d4c7cf3d3287f63d3fd8ef8a939741b5964691d841a9e4036865138946aa62b4/images/instagram_1384031.png"
                                                        style="display:block;font-size:16px;border:0;outline:none;text-decoration:none"></a>
                                                  </td>
                                                  <td align="center" valign="top"
                                                    style="padding:0;Margin:0;padding-right:20px"><img title="YouTube"
                                                      src="https://enjobkh.stripocdn.email/content/guids/CABINET_d4c7cf3d3287f63d3fd8ef8a939741b5964691d841a9e4036865138946aa62b4/images/youtube_1384028.png"
                                                      alt="Yt" width="23" height="23"
                                                      style="display:block;font-size:16px;border:0;outline:none;text-decoration:none">
                                                  </td>
                                                  <td valign="top" align="center" style="padding:0;Margin:0"><a
                                                      target="_blank" href="https://www.gbmeals.com/"
                                                      style="mso-line-height-rule:exactly;text-decoration:underline;color:#2CB543;font-size:14px"><img
                                                        height="23" title="LinkedIn"
                                                        src="https://enjobkh.stripocdn.email/content/guids/CABINET_d4c7cf3d3287f63d3fd8ef8a939741b5964691d841a9e4036865138946aa62b4/images/linkedin_3128219.png"
                                                        alt="In" width="23"
                                                        style="display:block;font-size:16px;border:0;outline:none;text-decoration:none"></a>
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td align="center"
                                            style="padding:0;Margin:0;padding-bottom:5px;padding-top:20px">
                                            <p
                                              style="Margin:0;mso-line-height-rule:exactly;font-family:roboto, 'helvetica neue', helvetica, arial, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px">
                                              <span style="color:#ffffff">© 2024 gbmeals. All rights reserved.</span>
                                            </p>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
            <table class="es-footer es-content" cellspacing="0" cellpadding="0" align="center" role="none"
              style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:100%;table-layout:fixed !important;background-color:transparent;background-repeat:repeat;background-position:center top">
            </table>
  </div>
</body>

</html>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
