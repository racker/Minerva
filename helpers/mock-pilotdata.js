var pilot = {
    nav: `<style>body { margin: 0; } .phx-banner-placeholder { display: block; height: 56px; background: #000; } .phx-root { display: none; } </style> <div class="phx-banner-placeholder"></div>
<div id="pilot-root" class="phx-root"> <script type="application/javascript">
window.RS_PILOT_DATA = {};
window.RS_PILOT_DATA.features = {};
window.RS_PILOT_DATA.features["salesforce_liveagent"] = true;window.RS_PILOT_DATA.features["notification_preferences"] = true;
window.RS_PILOT_DATA.features["billing_available_for_datapipe"] = true;window.RS_PILOT_DATA.features["update_snapins_to_new_version"] = true;window.RS_PILOT_DATA.features["myrack_keep_alive"] = true;
window.RS_PILOT_DATA.features["azure_active_without_role"] = false;window.RS_PILOT_DATA.features["liveagent_in_maintenance"] = false;
// Temporary addition during GD rollout
window.RS_PILOT_DATA.roles_temporary = {};
window.RS_PILOT_DATA.roles_temporary["compute:default"] = true;window.RS_PILOT_DATA.roles_temporary["identity:tenant-access"] = true;window.RS_PILOT_DATA.roles_temporary["identity:tenant-access"] = true;window.RS_PILOT_DATA.roles_temporary["object-store:default"] = true;window.RS_PILOT_DATA.roles_temporary["monitoring:service-admin"] = true;window.RS_PILOT_DATA.roles_temporary["identity:admin"] = true;window.RS_PILOT_DATA.roles_temporary["identity:multifactor_beta"] = true;
window.RS_PILOT_DATA.is_federated = false;
window.RS_PILOT_DATA.diagnostic_url = "https://hap-n02.staging.dfw.pilot.rackspace.net/browser-diagnostic";
window.RS_PILOT_DATA.analytics_on = true;
window.RS_PILOT_DATA.user = {"username": "conwaytwitty", "is_dedicated": false, "email": null, "tenant": "cloud:833544"};
window.RS_PILOT_DATA.support_button_id = "";
window.RS_PILOT_DATA.support_chat_liveagent_logo_url = "https://19c5b85ac8f15b5aa0f0-992405e4638ce3c6772d7b96e627ce61.ssl.cf1.rackcdn.com/assets/dist/2d5d3ada2aa5d6bf2045a780c62c19abdfef7456/support-chat-liveagent-logo.png";
window.RS_PILOT_DATA.liveagent_settings = {"baseLiveAgentContentURL": "https://c.la4-c1cs-phx.salesforceliveagent.com/content", "deploymentId": "572610000004GrU", "communityEndpointUrl": "https://uat-raxportal.cs19.force.com/",
"eswLiveAgentDevName": "EmbeddedServiceLiveAgent_Parent04I61000000GmasEAC_15f9b2806f5", "organizationId": "00D290000004X6M", "gslbBaseUrl": "https://rax--uat.cs19.my.salesforce.com/", "eswConfigDevName": "Engine_Room_Support", "baseCoreUrl": "https://rax--uat.cs19.my.salesforce.com/", "baseLiveAgentURL": "https://d.la4-c1cs-phx.salesforceliveagent.com/chat"};
window.RS_PILOT_DATA.astra_keep_alive_url = "";
window.RS_PILOT_DATA.myrack_keep_alive_url = "";
window.RS_PILOT_DATA.request_configuration = {"query": {}, "payload": {"primary-nav": {"show": false}}}
</script>
<script src="https://19c5b85ac8f15b5aa0f0-992405e4638ce3c6772d7b96e627ce61.ssl.cf1.rackcdn.com/assets/dist/2d5d3ada2aa5d6bf2045a780c62c19abdfef7456/pilot.bundle.js" type="application/javascript"></script>
<link href="https://19c5b85ac8f15b5aa0f0-992405e4638ce3c6772d7b96e627ce61.ssl.cf1.rackcdn.com/assets/dist/2d5d3ada2aa5d6bf2045a780c62c19abdfef7456/pilot.bundle.css" type="text/css" rel="stylesheet">
<div class="phx-eyebrow">
<div class="phx-container">
<div id="phx-control-panel-menu" class="phx-nav phx-pull-left">
<div class="phx-nav-item " data-nav="dashboard" id="pilot-branding">
<a href="https://staging.portal.rackspace.com/dashboard" data-pilot-tracking-id="dashboard-link" tabindex="0" aria-label="Global Dashboard">
<div class="phx-nav-brand phx-nav-highlight-container phx-nav-brand-hover">
<div class="phx-logo-white"></div>
</div></a></div>
<div class="phx-nav-item phx-utility-dropdown phx-text-dropdown" id="more-products-dropdown">
<div class="phx-dropdown-toggle phx-nav-highlight-container"
data-pilot-tracking-id="more-products-dropdown"
data-nav="product-selector"
  tabindex="0"
  role="menu"
  aria-haspopup="true"
  aria-expanded="false"
  aria-label="Product Selector">
  <div class="phx-dropdown-title">
    Select a Product
    <div class="phx-toggle-icon">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="phx-svg-icon phx-icon-arrow-down phx-icon-small">
<path d="M8.004 12.561l-5.771-6.92a1 1 0 1 1 1.535-1.282l4.236 5.08 4.229-5.072a1 1 0 0 1 1.535 1.281l-5.764 6.913z"></path>
</svg>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="phx-svg-icon phx-icon-arrow-up phx-icon-small">
<path d="M13.001 11.562c-.287 0-.571-.123-.769-.36L7.996 6.125l-4.228 5.07a1 1 0 1 1-1.536-1.281L7.996 3l5.772 6.92a1.001 1.001 0 0 1-.767 1.642"></path>
</svg> </div> </div> </div> <div class="phx-dropdown-menu"> <div class="phx-dropdown-item phx-product-dropdown-item">
<a class="phx-dropdown-item-content phx-dropdown-link"
   href="https://manage.rackspace.com/" target="_self" data-pilot-tracking-id="fanatical-support-for-aws-dropdown" tabindex="0"
  role="menuitem"
  aria-label="Amazon Web Services"> <div class=""> Amazon Web Services </div>
</a>
</div>
<div class="phx-dropdown-item phx-product-dropdown-item">
<a class="phx-dropdown-item-content phx-dropdown-link phx-disabled" target="_self"
   data-pilot-tracking-id="myrackspace" data-pilot-tooltip="This control panel is only available to the account owner."
  tabindex="0" role="menuitem" aria-label="Dedicated Hosting This control panel is only available to the account owner.">
<div class="">Dedicated Hosting </div> </a> </div>
<div class="phx-dropdown-item phx-product-dropdown-item">
<a class="phx-dropdown-item-content phx-dropdown-link" href="https://manage.rackspace.com/gcp" target="_self" data-pilot-tracking-id="managed-google-cloud" tabindex="0" role="menuitem" aria-label="Google Cloud Platform">
<div class=""> Google Cloud Platform </div> </a> </div>
<div class="phx-dropdown-item phx-product-dropdown-item">
<a class="phx-dropdown-item-content phx-dropdown-link phx-disabled" target="_self" data-pilot-tracking-id="mailgun"
  data-pilot-tooltip="This control panel is only available to the account owner."
  tabindex="0"
  role="menuitem"
  aria-label="Mailgun This control panel is only available to the account owner."> <div class=""> Mailgun </div>
</a>
</div>
<div class="phx-dropdown-item phx-product-dropdown-item">
<a class="phx-dropdown-item-content phx-dropdown-link"
   href="https://dev.security.rackspace.com/sso"
   target="_self"
   data-pilot-tracking-id="managed-security" tabindex="0"
  role="menuitem" aria-label="Managed Security"> <div class="">
      Managed Security </div>
</a> </div>
<div class="phx-dropdown-item phx-product-dropdown-item">
<a class="phx-dropdown-item-content phx-dropdown-link"
   href="https://mycloud.rackspace.com/cloud/-85418/home"
   target="_self"
   data-pilot-tracking-id="rackspace-cloud-dropdown" tabindex="0"
  role="menuitem" aria-label="Rackspace Cloud"> <div class=""> Rackspace Cloud </div>
</a>
</div>
<div class="phx-dropdown-item phx-product-dropdown-item">
<a class="phx-dropdown-item-content phx-dropdown-link phx-disabled" target="_self"
   data-pilot-tracking-id="eyebrow-cloud-intelligence"
  data-pilot-tooltip="This feature is disabled. For more information, contact your account admin."
  tabindex="0"
  role="menuitem"
  aria-label="Rackspace Intelligence This feature is disabled. For more information, contact your account admin.">
<div class=""> Rackspace Intelligence </div>
</a>
</div>
</div>
</div>
</div>
<div class="phx-nav phx-pull-right"> <div class="phx-utility-services-button-set"> <div class="phx-nav-item phx-platform-surface-button phx-nav-highlight-container  phx-disabled"
  data-nav="notifications"
     data-pilot-link-button-selector="notifications-button">
  <a  data-pilot-tracking-id="notifications-button" data-pilot-tooltip="This feature is disabled. For more information, contact your account admin."
   tabindex="0" aria-label="Notifications This feature is disabled. For more information, contact your account admin.">
      <i class="phx-dropdown-button-icon">
      <svg viewbox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="phx-notifications-menu-icon">
  <path fill="none" fill-rule="evenodd"
  d="M10,17.396 C6.592,17.396 3.828,16.917 3.828,16.327 C3.828,15.736 6.592,15.256 10,15.256 C13.408,15.256 16.171,15.736 16.171,16.327 C16.171,16.917 13.408,17.396 10,17.396 M18.19,15.223 C16.652,13.858 15.38,12.223 15.38,6.966 C15.38,4.913 13.783,2.686 11.125,2.178 L11.125,2.177 C11.125,1.527 10.621,1 10,1 C9.379,1 8.875,1.527 8.875,2.177 L8.875,2.178 C6.217,2.686 4.619,4.913 4.619,6.966 C4.619,12.223 3.347,13.858 1.809,15.223 C1.294,15.559 1,15.932 1,16.327 C1,17.803 5.029,19 10,19 C14.971,19 19,17.803 19,16.327 C19,
  15.932 18.706,15.559 18.19,15.223"></path></svg></i><div class="phx-dropdown-title">Notifications</div>
  </a>
</div>
<div class="phx-nav-item" id="tickets-dropdown">
<div class="phx-platform-surface-button phx-dropdown-toggle phx-nav-highlight-container phx-disabled" data-pilot-tracking-id="tickets-dropdown"
  data-nav="tickets"
  tabindex="0"
  role="menu"
  aria-haspopup="true"
  aria-expanded="false"
   data-pilot-tooltip="This feature is disabled. For more information, contact your account admin."
  aria-label="Tickets This feature is disabled. For more information, contact your account admin.">
  <i class="phx-dropdown-button-icon"> <svg viewbox="0 0 15 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="phx-tickets-menu-icon">
  <path fill="none" fill-rule="evenodd" d="M2.5425,2.38095238 L11.25,2.38095238 L11.25,1.19047619 C11.25,0.535714286 10.6875,0 10,0 L1.25,0 C0.5625,0 0,0.535714286 0,1.19047619 L0,14.2857143 C0,14.9392857 0.5625,15.4761905 1.25,15.4761905 L2.5425,15.4761905 L2.5425,2.38095238 Z"></path>
  <path fill="none" fill-rule="evenodd" d="M13.7777778,4 L5.22222222,4 C4.55,4 4,4.55384615 4,5.23076923 L4,18.7692308 C4,19.4461538 4.55,20 5.22222222,20 L13.7777778,20 C14.45,20 15,19.4461538 15,18.7692308 L15,5.23076923 C15,4.55384615 14.45,4 13.7777778,4 Z M6.39433333,15.0769231 L12.5311111,15.0769231 L12.5311111,13.8461538 L6.39433333,13.8461538 L6.39433333,15.0769231 Z M6.39311111,17.5384615 L10.1184444,17.5384615 L10.1184444,16.3076923 L6.39311111,
  16.3076923 L6.39311111,17.5384615 Z M6.59111111,9.02030769 C6.83066667,8.77784615 7.21688889,8.77784615 7.45522222,9.01784615 L8.92555556,10.4898462 L11.4017778,6.65107692 C11.5863333,6.36676923 11.9664444,6.28676923 12.2463333,6.47015385 C12.5298889,6.656 12.6093333,7.03753846 12.426,7.32184615 L9.13088889,12.4307692 L6.59355556,9.89046154 C6.354,9.65046154 6.354,9.26030769 6.59111111,9.02030769 Z"></path>
</svg> </i> <div class="phx-dropdown-title"> Tickets </div></div>
</div> <div class="phx-nav-item phx-utility-dropdown" id="support-dropdown">
<div class="phx-platform-surface-button phx-dropdown-toggle phx-nav-highlight-container" data-pilot-tracking-id="support-dropdown"
  data-nav="support"
  tabindex="0"
  role="menu" aria-haspopup="true" aria-expanded="false" aria-label="Support">
  <i class="phx-dropdown-button-icon"> <svg viewbox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="phx-support-menu-icon">
  <path fill="none" fill-rule="evenodd" d="M12.2518615,12.456278 C11.695064,12.456278 11.2436921,11.9737113 11.2436921,11.3784328 C11.2436921,10.7831543 11.695064,10.3005876 12.2518615,10.3005876 C12.8086591,10.3005876 13.2600309,10.7831543 13.2600309,11.3784328 C13.2600309,11.9737113 12.8086591,12.456278 12.2518615,12.456278 M7.64308724,12.456278 C7.0862897,12.456278 6.63491787,11.9737113 6.63491787,11.3784328 C6.63491787,10.7831543 7.0862897,10.3005876 7.64308724,10.3005876 C8.19988478,
  10.3005876 8.65125661,10.7831543 8.65125661,11.3784328 C8.65125661,11.9737113 8.19988478,12.456278 7.64308724,12.456278 M15.5721953,10.0616139 C15.8150201,14.0918311 14.5781403,16.4136636 12.4246905,17.9970182 C11.6453756,18.5702779 10.3772426,19.3255394 9.03968987,18.8495937 C8.70483361,18.7305688 7.55436833,18.1819456 6.8029941,17.5055208 C5.96376511,16.7499513 5.53586923,15.8656563 5.53586923,15.8656563 C5.76573184,15.9594288 6.41067219,16.1865462 7.02493539,16.3314394 C7.64510358,16.4775644 8.30487842,16.5505499 8.40223878,16.5608665 C8.62907688,17.0189507 9.18961906,17.34369 9.84694549,17.34369 C10.7048976,17.34369 11.4003905,16.7913713 11.4003905,16.1100192 C11.4003905,
  15.4286671 10.7048976,14.8763484 9.84694549,14.8763484 C9.2136711,14.8763484 8.66997976,15.1776831 8.42801911,15.6094371 C8.09186663,15.6063575 7.09622737,15.5715585 6.05277207,15.0611219 C5.20965442,14.6484611 4.66322662,14.0291621 4.64507957,13.9637215 C4.53994191,13.5835501 4.3934693,12.9380748 4.34248474,12.3150803 C4.27148081,11.4452592 4.3184327,10.6190139 4.3184327,10.6190139 C4.3184327,10.6190139 5.10019603,10.7143262 6.31691244,9.35100598 C7.41408877,8.12149257 7.38499588,6.0534156 7.38499588,6.0534156 C7.88475984,7.14342504 12.2818185,9.51791801 15.1442994,9.17146777 C15.4504949,9.1343591 15.5209227,10.026045 15.5721953,10.0616139 Z M18.4558766,10.092856 C18.7882844,
  10.4040453 19,10.859204 19,11.3656372 L19,13.3929101 C19,14.3244763 18.2870802,15.0866668 17.4157338,15.0866668 L16.7167844,15.0866668 C16.7166404,15.0866668 16.7163523,15.0868208 16.7160643,15.0868208 C16.7159203,15.0868208 16.7156322,15.0866668 16.7153442,15.0866668 L16.6770337,15.0866668 L16.6768897,15.0825094 C16.4664704,15.0611065 16.3009866,14.8737154 16.3009866,14.6430565 C16.3009866,14.5856228 16.3119324,14.5312686 16.3305115,14.4810718 C16.3313757,14.4767604 16.3313757,14.4732189 16.3326719,14.4687535 C16.6002688,13.5036202 16.7575433,12.3823532 16.7575433,11.0809321 C16.7575433,10.7480319 16.7465974,10.4497768 16.7249938,10.1301187 C16.7248498,10.1273471 16.726146,
  10.1256533 16.726434,10.1233437 C16.726434,10.120572 16.7255699,10.1179544 16.7255699,10.1151828 C16.7255699,9.87158981 16.9094888,9.67403618 17.136903,9.67188049 C17.1383432,9.67188049 17.1393514,9.67141856 17.1407917,9.67141856 C17.1420879,9.67141856 17.1433841,9.67188049 17.1446803,9.67188049 L17.4157338,9.67188049 C17.4621096,9.67188049 17.5077653,9.67511403 17.5531329,9.67927143 C17.362877,7.63105761 16.7474616,5.88741204 15.743757,4.58275742 C14.4056281,2.84326926 12.4080125,1.92386731 9.96709047,1.92386731 C7.6500292,1.92386731 5.70671073,2.8415755 4.34741036,4.57767615 C3.3017947,5.91281839 2.65915874,7.6575418 2.45853303,9.67865552 C2.50015603,9.67511403 2.54177902,
  9.67188049 2.58426616,9.67188049 L2.66924043,9.67188049 C2.67053665,9.67188049 2.67168884,9.67141856 2.67312909,9.67141856 C2.8993911,9.67141856 3.08287792,9.86543069 3.08734267,10.1062521 C3.08734267,10.1082538 3.08863889,10.1087158 3.08849487,10.1107175 C3.08835084,10.1121033 3.08835084,10.113643 3.08820682,10.1151828 L3.08820682,10.1153368 C3.06530697,10.4306835 3.05335296,10.7526513 3.05335296,11.0809321 C3.05335296,12.3275371 3.25685915,13.4511137 3.59618016,14.451508 C3.61087063,14.4838434 3.62311268,14.5174105 3.63002584,14.5534414 C3.63218621,14.5600624 3.63420255,14.5668375 3.63650693,14.5734585 C3.64356412,14.5934756 3.64313205,14.6158024 3.6380912,14.639361 C3.6380912,
  14.6405929 3.63837925,14.6416707 3.63837925,14.6430565 C3.63837925,14.8801824 3.46382192,15.0721929 3.24490514,15.0843571 C3.24375295,15.085281 3.24188064,15.0866668 3.24188064,15.0866668 L3.22402164,15.0866668 C3.22373359,15.0866668 3.22358956,15.0868208 3.22330151,15.0868208 C3.22301347,15.0868208 3.22286944,15.0866668 3.22258139,15.0866668 L2.58426616,15.0866668 C1.71291977,15.0866668 1,14.3244763 1,13.3929101 L1,11.3656372 C1,10.8541227 1.21560422,10.3948067 1.55362901,10.0834634 C1.70931917,7.66785832 2.43592123,5.57483693 3.67971419,3.98640108 C5.2095392,2.03272967 7.38358444,1 9.96709047,1 C12.6774818,1 14.9074084,2.03657912 16.4163499,3.99779544 C17.6123269,5.55235616 18.30926,7.64522357 18.4558766,10.092856 Z"></path>
</svg> </i>
  <div class="phx-dropdown-title"> Support </div> </div>
  <div class="phx-dropdown-menu"> <div class="phx-dropdown-item"> <a class="phx-dropdown-item-content phx-dropdown-link"
   href="https://rackspace.service-now.com/system_status"
   target="_blank" tabindex="0"
  role="menuitem" aria-label="Rackspace System Status"> <div class="">Rackspace System Status <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="phx-svg-icon phx-icon-external-link ">
<path d="M10 1h5v5a1 1 0 1 1-2 0V4.509L8.099 9.411a1 1 0 0 1-1.414-1.414L11.682 3H10a1 1 0 1 1 0-2zm2 7a1 1 0 0 1 1 1v4.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 1 13.5v-9A1.5 1.5 0 0 1 2.5 3H7a1 1 0 1 1 0 2H3v8h8V9a1 1 0 0 1 1-1z"></path>
</svg>
</div>
</a>
</div>
<div class="phx-dropdown-item">
<a class="phx-dropdown-item-content phx-dropdown-link"
  href="https://support.rackspace.com"
  target="_blank" tabindex="0"
  role="menuitem" aria-label="Support Documentation"> <div class="">Support Documentation <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="phx-svg-icon phx-icon-external-link ">
<path d="M10 1h5v5a1 1 0 1 1-2 0V4.509L8.099 9.411a1 1 0 0 1-1.414-1.414L11.682 3H10a1 1 0 1 1 0-2zm2 7a1 1 0 0 1 1 1v4.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 1 13.5v-9A1.5 1.5 0 0 1 2.5 3H7a1 1 0 1 1 0 2H3v8h8V9a1 1 0 0 1 1-1z"></path>
</svg>
</div>
</a>
</div>
</div>
</div> <div class="phx-nav-item phx-platform-surface-button phx-nav-highlight-container  phx-disabled"
  data-nav="billing"
     data-pilot-link-button-selector="billing-link">
  <a  data-pilot-tracking-id="billing-link"
    id="pilot-billing-link"
     data-pilot-tooltip="This feature is disabled. For more information, contact your account admin." tabindex="0"
    aria-label="Billing This feature is disabled. For more information, contact your account admin.">
      <i class="phx-dropdown-button-icon">
      <svg viewbox="0 0 19 19" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="phx-billing-menu-icon">
  <path fill="none" fill-rule="evenodd" d="M11.1666667,7.75 L14.6666667,7.75 L14.6666667,6.625 L11.1666667,6.625 L11.1666667,7.75 Z M11.1666667,11.125 L14.6666667,11.125 L14.6666667,10 L11.1666667,10 L11.1666667,11.125 Z M5.33333333,14.5 L14.6666667,14.5 L14.6666667,13.375 L5.33333333,13.375 L5.33333333,14.5 Z M7.02266667,4.39975 L7.02266667,3.25 L8.31066667,3.25 L8.31066667,4.37725 L10,4.37725 L10,5.49775 L7.28283333,5.49775 C6.88383333,5.49775 6.493,5.764375 6.493,6.03775 C6.493,6.3235 6.899,6.62725 7.28283333,6.62725 L8.1625,6.62725 C9.20433333,6.62725 9.9965,7.355125 10.0058333,8.3215 C10.0081667,8.777125 9.83316667,9.197875 9.51233333,9.505 C9.20666667,9.796375 8.7715,
  9.9775 8.31066667,9.98875 L8.31066667,11.125 L7.02266667,11.125 L7.02266667,9.996625 L5.33333333,9.99775 L5.33333333,8.87725 L8.1625,8.876125 C8.383,8.918875 8.57666667,8.822125 8.69566667,8.709625 C8.79366667,8.615125 8.845,8.4835 8.84383333,8.329375 C8.8415,7.976125 8.57316667,7.74775 8.1625,7.74775 L7.28283333,7.74775 C6.24333333,7.74775 5.331,6.947875 5.331,6.03775 C5.331,5.213125 6.08466667,4.513375 7.02266667,4.39975 Z M13.4638333,1 L4.16666667,1 C3.525,1 3,1.50625 3,2.125 L3,17.875 C3,18.49375 3.525,19 4.16666667,19 L15.8333333,19 C16.475,19 17,18.49375 17,17.875 L17,4.409875 L13.4638333,1 Z"></path>
</svg>
</i>
<div class="phx-dropdown-title">Billing</div>
</a>
</div>
<div class="phx-nav-item phx-utility-dropdown" id="account-menu">
<div class="phx-platform-surface-button phx-dropdown-toggle phx-nav-highlight-container"
  data-pilot-tracking-id="account-menu"
  data-nav="account"
  tabindex="0"
  role="menu"
  aria-haspopup="true"
  aria-expanded="false"
  aria-label="Account">
  <i class="phx-dropdown-button-icon">
<svg viewbox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="phx-accounts-menu-icon">
  <path fill="none" fill-rule="evenodd" d="M12.5,6 L17.5,6 L17.5,4.66666667 L12.5,4.66666667 L12.5,6 Z M12.5,10 L17.5,10 L17.5,8.66666667 L12.5,8.66666667 L12.5,10 Z M12.5,14 L17.5,14 L17.5,12.6666667 L12.5,12.6666667 L12.5,14 Z M11.25,13.416 C11.25,13.7386667 11.005,14 10.70375,14 L3.0475,14 C2.745,14 2.5,13.7386667 2.5,13.416 L2.5,12.8333333 C2.5,12.612 2.6175,12.4106667 2.8025,12.3106667 C2.89625,12.2613333 5.12625,11.084 6.875,11.084 C8.62375,11.084 10.85375,12.2613333 10.9475,12.3106667 C11.1325,12.4106667 11.25,12.612 11.25,12.8333333 L11.25,13.416 Z M4.64125,7.096 C4.64125,5.80933333 5.6225,4.76266667 6.82875,4.76266667 C8.035,
  4.76266667 9.01625,5.80933333 9.01625,7.096 L9.01625,8.26266667 C9.01625,9.54933333 8.035,10.596 6.82875,10.596 C5.6225,10.596 4.64125,9.54933333 4.64125,8.26266667 L4.64125,7.096 Z M19,2 L1,2 C0.45,2 0,2.48 0,3.06666667 L0,16.9333333 C0,17.52 0.45,18 1,18 L4,18 C4,17.116 4.67125,16.4 5.5,16.4 C6.3275,16.4 7,17.116 7,18 L13,18 C13,17.116 13.6725,16.4 14.5,16.4 C15.32875,16.4 16,17.116 16,18 L19,18 C19.55,18 20,17.52 20,16.9333333 L20,3.06666667 C20,2.48 19.55,2 19,2 Z"></path>
</svg>
</i>
<div class="phx-dropdown-title">Account</div></div>
<div class="phx-dropdown-menu">
<div class="phx-dropdown-item">
<a class="phx-dropdown-item-content"
   target="_self"
  tabindex="0"
  role="menuitem"
  aria-label="833544">
<div class="phx-dropdown-item-descriptor">Account #</div>
<div class=" phx-important-item-value"> 833544 </div></a></div>
<div class="phx-divider"></div>
<div class="phx-dropdown-item">
<a class="phx-dropdown-item-content phx-dropdown-link"
   href="https://account.rackspace.com/"
   target="_self"
   data-pilot-tracking-id="account-settings"
  tabindex="0"
  role="menuitem"
  aria-label="Account Settings">
    <div class=""> Account Settings </div>
</a></div>
<div class="phx-dropdown-item">
<a class="phx-dropdown-item-content phx-dropdown-link phx-disabled"
   target="_self"
   data-pilot-tracking-id="user-management"
  data-pilot-tooltip="This feature is disabled. For more information, contact your account admin."   tabindex="0"
  role="menuitem"
  aria-label="User Management This feature is disabled. For more information, contact your account admin.">
    <div class="">
      User Management
    </div>
</a>
</div>
<div class="phx-divider"></div>
<div class="phx-dropdown-item">
<a class="phx-dropdown-item-content phx-dropdown-link"
  href=""
  target="_self"
  data-pilot-tracking-id="account-forms"
  tabindex="0"
  role="menuitem"
  aria-label="Docs and Forms">
<div class="">Docs and Forms </div>
</a>
</div>
</div>
</div>
</div>
<div class="phx-eyebrow-vertical-bar phx-nav-item"></div>
<div class="phx-nav-item phx-utility-dropdown phx-text-dropdown" id="user-menu">
<div class="phx-dropdown-toggle phx-nav-highlight-container"
  data-pilot-tracking-id="user-menu"
  data-nav="user"
  tabindex="0"
  role="menu"
  aria-haspopup="true"
  aria-expanded="false"
  aria-label="User Menu">
  <div class="phx-dropdown-title"> conwaytwitty
    <div class="phx-toggle-icon">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="phx-svg-icon phx-icon-arrow-down phx-icon-small">
<path d="M8.004 12.561l-5.771-6.92a1 1 0 1 1 1.535-1.282l4.236 5.08 4.229-5.072a1 1 0 0 1 1.535 1.281l-5.764 6.913z"></path>
</svg>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="phx-svg-icon phx-icon-arrow-up phx-icon-small">
<path d="M13.001 11.562c-.287 0-.571-.123-.769-.36L7.996 6.125l-4.228 5.07a1 1 0 1 1-1.536-1.281L7.996 3l5.772 6.92a1.001 1.001 0 0 1-.767 1.642"></path>
</svg>
    </div>
  </div>
</div>
<div class="phx-dropdown-menu">
<div class="phx-dropdown-item">
<a class="phx-dropdown-item-content phx-dropdown-link"
   href=""
   target="_self"
   data-pilot-tracking-id="my-profile"
  tabindex="0"
  role="menuitem"
  aria-label="My Profile & Settings">
    <div class="">My Profile & Settings</div>
</a>
</div>
<div class="phx-dropdown-item">
<a class="phx-dropdown-item-content phx-dropdown-link"
   href=""
   target="_self"
   data-pilot-tracking-id="my-notification-preferences"
  tabindex="0" role="menuitem"
  aria-label="My Notification Preferences">
 <div class="">
      My Notification Preferences
 </div>
</a>
</div>
<div class="phx-divider"></div>
<div class="phx-dropdown-item"
 id="phx-logout">
<a class="phx-dropdown-item-content phx-dropdown-link"
   href=""
   target="_self"
   data-pilot-tracking-id="logout"
  tabindex="0"
  role="menuitem"
  aria-label="Log Out">
<div class=""> Log Out </div>
</a>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
<div id="live-agent-chat"></div>`
};

module.exports = pilot;