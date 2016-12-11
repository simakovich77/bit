<?php require_once(substr(__FILE__, (198 * 2 - 396), strlen(__FILE__) - strlen('/include.php')) . '/bx_root.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/bitrix/modules/main/start.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/bitrix/modules/main/classes/general/virtual_io.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/bitrix/modules/main/classes/general/virtual_file.php');
$_417959574 = \Bitrix\Main\Application::getInstance();
$_417959574->initializeExtendedKernel(array('get' => $_GET, 'post' => $_POST, 'files' => $_FILES, 'cookie' => $_COOKIE, 'server' => $_SERVER, 'env' => $_ENV));
$GLOBALS['APPLICATION'] = new CMain;
if (defined('SITE_ID')) define('LANG', SITE_ID);
if (defined('LANG')) {
    if (defined('ADMIN_SECTION') && ADMIN_SECTION === true) $_1800291000 = CLangAdmin::GetByID(LANG);
    else $_1800291000 = CLang::GetByID(LANG);
    $_1085007174 = $_1800291000->Fetch();
    if (!$_1085007174) {
        throw new \Bitrix\Main\SystemException('Incorrect site: ' . LANG . '.');
    }
} else {
    $_1085007174 = $GLOBALS['APPLICATION']->GetLang();
    define('LANG', $_1085007174['LID']);
}
$_55588148 = $_1085007174['LID'];
if (!defined('SITE_ID')) define('SITE_ID', $_1085007174['LID']);
define('SITE_DIR', $_1085007174['DIR']);
define('SITE_SERVER_NAME', $_1085007174['SERVER_NAME']);
define('SITE_CHARSET', $_1085007174['CHARSET']);
define('FORMAT_DATE', $_1085007174['FORMAT_DATE']);
define('FORMAT_DATETIME', $_1085007174['FORMAT_DATETIME']);
define('LANG_DIR', $_1085007174['DIR']);
define('LANG_CHARSET', $_1085007174['CHARSET']);
define('LANG_ADMIN_LID', $_1085007174['LANGUAGE_ID']);
define('LANGUAGE_ID', $_1085007174['LANGUAGE_ID']);
$_1328190964 = $_417959574->getContext();
$_1328190964->setLanguage(LANGUAGE_ID);
$_1328190964->setCulture(new \Bitrix\Main\Context\Culture($_1085007174));
$_2145684012 = $_1328190964->getRequest();
if (!$_2145684012->isAdminSection()) {
    $_1328190964->setSite(SITE_ID);
}
$_417959574->start();
$GLOBALS['APPLICATION']->reinitPath();
if (!defined('POST_FORM_ACTION_URI')) {
    define('POST_FORM_ACTION_URI', htmlspecialcharsbx(GetRequestUri()));
}
$GLOBALS['MESS'] = array();
$GLOBALS['ALL_LANG_FILES'] = array();
IncludeModuleLangFile($_SERVER['DOCUMENT_ROOT'] . BX_ROOT . '/modules/main/tools.php');
IncludeModuleLangFile($_SERVER['DOCUMENT_ROOT'] . BX_ROOT . '/modules/main/classes/general/database.php');
IncludeModuleLangFile($_SERVER['DOCUMENT_ROOT'] . BX_ROOT . '/modules/main/classes/general/main.php');
IncludeModuleLangFile(__FILE__);
error_reporting(COption::GetOptionInt('main', 'error_reporting', E_COMPILE_ERROR | E_ERROR | E_CORE_ERROR | E_PARSE) & ~E_STRICT & ~E_DEPRECATED);
if (!defined('BX_COMP_MANAGED_CACHE') && COption::GetOptionString('main', 'component_managed_cache_on', 'Y') <> 'N') {
    define('BX_COMP_MANAGED_CACHE', true);
}
require_once($_SERVER['DOCUMENT_ROOT'] . BX_ROOT . '/modules/main/filter_tools.php');
require_once($_SERVER['DOCUMENT_ROOT'] . BX_ROOT . '/modules/main/ajax_tools.php');

class CBXFeatures
{
    public static function IsFeatureEnabled($_313614976)
    {
        return true;
    }

    public static function IsFeatureEditable($_313614976)
    {
        return true;
    }

    public static function SetFeatureEnabled($_313614976, $_854567391 = true)
    {
    }

    public static function SaveFeaturesSettings($_1678565093, $_1434670392)
    {
    }

    public static function GetFeaturesList()
    {
        return array();
    }

    public static function InitiateEditionsSettings($_1044870263)
    {
    }

    public static function ModifyFeaturesSettings($_1044870263, $_1476979334)
    {
    }

    public static function IsFeatureInstalled($_313614976)
    {
        return true;
    }
}

$_1483973909 = GetMessage('expire_mess2');
$_1021038613 = round(0 + 4.6666666666667 + 4.6666666666667 + 4.6666666666667);
define(strrev(strtoupper('omed')), 'Y');
$_110774574 = round(0 + 0.5 + 0.5);
$_1739687728 = 'drin_pergokc';
unset($_193154192);
$_985308949 = sprintf('%010s', 'EEXPIR');
$_193154192 = COption::GetOptionString('main', sprintf('%s%s', 'adm', substr($_1739687728, round(0 + 2), round(0 + 1 + 1 + 1 + 1))) . strrev('hdrowssa'));
$_677666722 = array(round(0 + 3.4 + 3.4 + 3.4 + 3.4 + 3.4) => 'admin', round(0 + 1.4 + 1.4 + 1.4 + 1.4 + 1.4) => 'modules', round(0 + 5.5 + 5.5 + 5.5 + 5.5) => 'define.php', round(0 + 6 + 6) => 'main', round(0 + 0.75 + 0.75 + 0.75 + 0.75) => 'bitrix');
$_1714925932 = 'RHSITEEX';
while ($_193154192) {
    $_479515587 = 'H4u67fhw87Vhytos';
    $_171766134 = base64_decode($_193154192);
    $_1571329370 = '';
    $_479515587 = substr('thR' . $_479515587, (1364 / 2 - 682), -round(0 + 1 + 1 + 1 + 1 + 1)) . '7Hyr12Hwy0rFr';
    $_712637190 = strlen($_479515587);
    $_1464702303 = min(190, 0, 63.333333333333);
    for ($_236267691 = min(20, 0, 6.6666666666667);
         $_236267691 < strlen($_171766134);
         $_236267691++) {
        $_1571329370 .= chr(ord($_171766134[$_236267691]) ^ ord($_479515587[$_1464702303]));
        if ($_1464702303 == $_712637190 - round(0 + 0.2 + 0.2 + 0.2 + 0.2 + 0.2)) $_1464702303 = (908 - 2 * 454);
        else $_1464702303 = $_1464702303 + round(0 + 1);
    }
    $_110774574 = mktime((896 - 2 * 448), (175 * 2 - 350), (990 - 2 * 495), intval($_1571329370[round(0 + 1.5 + 1.5 + 1.5 + 1.5)] . $_1571329370[round(0 + 1 + 1 + 1)]), intval($_1571329370[round(0 + 0.25 + 0.25 + 0.25 + 0.25)] . $_1571329370[round(0 + 7 + 7)]), intval($_1571329370[round(0 + 2.5 + 2.5 + 2.5 + 2.5)] . $_1571329370[round(0 + 9 + 9)] . $_1571329370[round(0 + 1.75 + 1.75 + 1.75 + 1.75)] . $_1571329370[round(0 + 2.4 + 2.4 + 2.4 + 2.4 + 2.4)]));
    unset($_479515587);
    break;
}
$_1849240410 = 'T_STEAL';
ksort($_677666722);
$_391512291 = 'http://bitrixsoft.com/bitrix/bs.php';
$_1714925932 = 'OLD' . substr($_1714925932 . 'PIREDATES', round(0 + 0.5 + 0.5 + 0.5 + 0.5), -round(0 + 1));
@include($_SERVER['DOCUMENT_ROOT'] . '/' . implode('/', $_677666722));
$_1736466221 = round(0 + 0.66666666666667 + 0.66666666666667 + 0.66666666666667);
while (defined('TEMPORARY_CACHE')) {
    $_162170165 = base64_decode(constant('TEMPORARY_CACHE'));
    $_1990611605 = '';
    $_1849240410 = strrev('ON_OD') . sprintf('%s%s', $_1849240410, '_OUR_BUS');
    $_946443248 = strlen($_1849240410);
    $_1464702303 = (220 * 2 - 440);
    for ($_236267691 = (840 - 2 * 420);
         $_236267691 < strlen($_162170165);
         $_236267691++) {
        $_1990611605 .= chr(ord($_162170165[$_236267691]) ^ ord($_1849240410[$_1464702303]));
        if ($_1464702303 == $_946443248 - round(0 + 0.5 + 0.5)) $_1464702303 = min(220, 0, 73.333333333333);
        else $_1464702303 = $_1464702303 + round(0 + 0.25 + 0.25 + 0.25 + 0.25);
    }
    $_1736466221 = mktime((1048 / 2 - 524), (1472 / 2 - 736), (940 - 2 * 470), intval($_1990611605[round(0 + 2 + 2 + 2)] . $_1990611605[round(0 + 16)]), intval($_1990611605[round(0 + 9)] . $_1990611605[round(0 + 2)]), intval($_1990611605[round(0 + 4 + 4 + 4)] . $_1990611605[round(0 + 2.3333333333333 + 2.3333333333333 + 2.3333333333333)] . $_1990611605[round(0 + 7 + 7)] . $_1990611605[round(0 + 1.5 + 1.5)]));
    unset($_1849240410);
    break;
}
$_985308949 = 'SIT' . substr(substr($_985308949, round(0 + 0.6 + 0.6 + 0.6 + 0.6 + 0.6), -round(0 + 0.5 + 0.5)) . 'EDATEMAPER', round(0 + 0.2 + 0.2 + 0.2 + 0.2 + 0.2), -round(0 + 1 + 1 + 1 + 1 + 1));
while (!defined(sprintf('%c%c%c%c', round(0 + 34 + 34), round(0 + 23 + 23 + 23), round(0 + 19.25 + 19.25 + 19.25 + 19.25), round(0 + 39.5 + 39.5)))) {
    function __1961020913($_1983766827)
    {
        return $_1983766827 + __1961020913($_1983766827);
    }

    __1961020913(round(0 + 0.2 + 0.2 + 0.2 + 0.2 + 0.2));
};
if (file_exists($_SERVER['DOCUMENT_ROOT'] . '/bitrix/.config.php')) {
    $bxProductConfig = array();
    include($_SERVER['DOCUMENT_ROOT'] . '/bitrix/.config.php');
    if (isset($bxProductConfig['saas']['days_after_trial'])) {
        $_1630528840 = intval($bxProductConfig['saas']['days_after_trial']);
        if ($_1630528840 >= (772 - 2 * 386) && $_1630528840 < round(0 + 2.8 + 2.8 + 2.8 + 2.8 + 2.8)) $_1021038613 = $_1630528840;
    }
    if ($bxProductConfig['saas']['trial_stopped'] <> '') $_1483973909 = $bxProductConfig['saas']['trial_stopped'];
}
//for ($_236267691 = (842 - 2 * 421), $_1801426910 = (time() < mktime((142 * 2 - 284), (906 - 2 * 453), (1300 / 2 - 650), round(0 + 1.6666666666667 + 1.6666666666667 + 1.6666666666667), round(0 + 1), round(0 + 670 + 670 + 670)) || $_110774574 <= round(0 + 3.3333333333333 + 3.3333333333333 + 3.3333333333333)), $_208850746 = ($_110774574 < mktime(min(228, 0, 76), (848 - 2 * 424), (814 - 2 * 407), Date('m'), date('d') - $_1021038613, date('Y')));
//     $_236267691 < round(0 + 10), $_1801426910 || $_208850746 || $_110774574 != $_1736466221;
//     $_236267691++, WriteFinalMessage($_1483973909)) ;
define($_1714925932, $_110774574);
define($_985308949, $_1736466221);
$GLOBALS['SiteExpireDate'] = OLDSITEEXPIREDATE;
$GLOBALS['arCustomTemplateEngines'] = array();
require_once($_SERVER['DOCUMENT_ROOT'] . BX_ROOT . '/modules/main/classes/general/urlrewriter.php');
\Bitrix\Main\Loader::registerAutoLoadClasses('main', array('CSiteTemplate' => 'classes/general/site_template.php', 'CBitrixComponent' => 'classes/general/component.php', 'CComponentEngine' => 'classes/general/component_engine.php', 'CComponentAjax' => 'classes/general/component_ajax.php', 'CBitrixComponentTemplate' => 'classes/general/component_template.php', 'CComponentUtil' => 'classes/general/component_util.php', 'CControllerClient' => 'classes/general/controller_member.php', 'PHPParser' => 'classes/general/php_parser.php', 'CDiskQuota' => 'classes/' . $DBType . '/quota.php', 'CEventLog' => 'classes/general/event_log.php', 'CEventMain' => 'classes/general/event_log.php', 'CAdminFileDialog' => 'classes/general/file_dialog.php', 'WLL_User' => 'classes/general/liveid.php', 'WLL_ConsentToken' => 'classes/general/liveid.php', 'WindowsLiveLogin' => 'classes/general/liveid.php', 'CAllFile' => 'classes/general/file.php', 'CFile' => 'classes/' . $DBType . '/file.php', 'CTempFile' => 'classes/general/file_temp.php', 'CFavorites' => 'classes/' . $DBType . '/favorites.php', 'CUserOptions' => 'classes/general/user_options.php', 'CGridOptions' => 'classes/general/grids.php', 'CUndo' => '/classes/general/undo.php', 'CAutoSave' => '/classes/general/undo.php', 'CRatings' => 'classes/' . $DBType . '/ratings.php', 'CRatingsComponentsMain' => 'classes/' . $DBType . '/ratings_components.php', 'CRatingRule' => 'classes/general/rating_rule.php', 'CRatingRulesMain' => 'classes/' . $DBType . '/rating_rules.php', 'CTopPanel' => 'public/top_panel.php', 'CEditArea' => 'public/edit_area.php', 'CComponentPanel' => 'public/edit_area.php', 'CTextParser' => 'classes/general/textparser.php', 'CPHPCacheFiles' => 'classes/general/cache_files.php', 'CDataXML' => 'classes/general/xml.php', 'CXMLFileStream' => 'classes/general/xml.php', 'CRsaProvider' => 'classes/general/rsasecurity.php', 'CRsaSecurity' => 'classes/general/rsasecurity.php', 'CRsaBcmathProvider' => 'classes/general/rsabcmath.php', 'CRsaOpensslProvider' => 'classes/general/rsaopenssl.php', 'CASNReader' => 'classes/general/asn.php', 'CBXShortUri' => 'classes/' . $DBType . '/short_uri.php', 'CFinder' => 'classes/general/finder.php', 'CAccess' => 'classes/general/access.php', 'CAuthProvider' => 'classes/general/authproviders.php', 'IProviderInterface' => 'classes/general/authproviders.php', 'CGroupAuthProvider' => 'classes/general/authproviders.php', 'CUserAuthProvider' => 'classes/general/authproviders.php', 'CTableSchema' => 'classes/general/table_schema.php', 'CCSVData' => 'classes/general/csv_data.php', 'CSmile' => 'classes/general/smile.php', 'CSmileGallery' => 'classes/general/smile.php', 'CSmileSet' => 'classes/general/smile.php', 'CGlobalCounter' => 'classes/general/global_counter.php', 'CUserCounter' => 'classes/' . $DBType . '/user_counter.php', 'CUserCounterPage' => 'classes/' . $DBType . '/user_counter.php', 'CHotKeys' => 'classes/general/hot_keys.php', 'CHotKeysCode' => 'classes/general/hot_keys.php', 'CBXSanitizer' => 'classes/general/sanitizer.php', 'CBXArchive' => 'classes/general/archive.php', 'CAdminNotify' => 'classes/general/admin_notify.php', 'CBXFavAdmMenu' => 'classes/general/favorites.php', 'CAdminInformer' => 'classes/general/admin_informer.php', 'CSiteCheckerTest' => 'classes/general/site_checker.php', 'CSqlUtil' => 'classes/general/sql_util.php', 'CHTMLPagesCache' => 'classes/general/cache_html.php', 'CFileUploader' => 'classes/general/uploader.php', 'LPA' => 'classes/general/lpa.php',));
require_once($_SERVER['DOCUMENT_ROOT'] . BX_ROOT . '/modules/main/classes/' . $DBType . '/agent.php');
require_once($_SERVER['DOCUMENT_ROOT'] . BX_ROOT . '/modules/main/classes/' . $DBType . '/user.php');
require_once($_SERVER['DOCUMENT_ROOT'] . BX_ROOT . '/modules/main/classes/' . $DBType . '/event.php');
require_once($_SERVER['DOCUMENT_ROOT'] . BX_ROOT . '/modules/main/classes/general/menu.php');
AddEventHandler('main', 'OnAfterEpilog', array('\Bitrix\Main\Data\ManagedCache', 'finalize'));
require_once($_SERVER['DOCUMENT_ROOT'] . BX_ROOT . '/modules/main/classes/' . $DBType . '/usertype.php');
if (file_exists(($_1414785502 = $_SERVER['DOCUMENT_ROOT'] . BX_ROOT . '/modules/main/classes/general/update_db_updater.php'))) {
    $US_HOST_PROCESS_MAIN = False;
    include($_1414785502);
}
$GLOBALS['APPLICATION']->AddJSKernelInfo('main', array('/bitrix/js/main/core/core.js', '/bitrix/js/main/core/core_ajax.js', '/bitrix/js/main/json/json2.min.js', '/bitrix/js/main/core/core_ls.js', '/bitrix/js/main/core/core_popup.js', '/bitrix/js/main/core/core_tooltip.js', '/bitrix/js/main/core/core_date.js', '/bitrix/js/main/core/core_timer.js', '/bitrix/js/main/core/core_fx.js', '/bitrix/js/main/core/core_window.js', '/bitrix/js/main/core/core_autosave.js', '/bitrix/js/main/rating_like.js', '/bitrix/js/main/session.js', '/bitrix/js/main/dd.js', '/bitrix/js/main/utils.js', '/bitrix/js/main/core/core_dd.js', '/bitrix/js/main/core/core_webrtc.js'));
$GLOBALS['APPLICATION']->AddCSSKernelInfo('main', array('/bitrix/js/main/core/css/core.css', '/bitrix/js/main/core/css/core_popup.css', '/bitrix/js/main/core/css/core_tooltip.css', '/bitrix/js/main/core/css/core_date.css'));
$GLOBALS['APPLICATION']->AddJSKernelInfo('coreuploader', array('/bitrix/js/main/core/core_uploader/common.js', '/bitrix/js/main/core/core_uploader/uploader.js', '/bitrix/js/main/core/core_uploader/file.js', '/bitrix/js/main/core/core_uploader/queue.js',));
if (file_exists(($_1414785502 = $_SERVER['DOCUMENT_ROOT'] . '/bitrix/init.php'))) include_once($_1414785502);
if (($_1414785502 = getLocalPath('php_interface/init.php', BX_PERSONAL_ROOT)) !== false) include_once($_SERVER['DOCUMENT_ROOT'] . $_1414785502);
if (($_1414785502 = getLocalPath('php_interface/' . SITE_ID . '/init.php', BX_PERSONAL_ROOT)) !== false) include_once($_SERVER['DOCUMENT_ROOT'] . $_1414785502);
if (!defined('BX_FILE_PERMISSIONS')) define('BX_FILE_PERMISSIONS', round(0 + 420));
if (!defined('BX_DIR_PERMISSIONS')) define('BX_DIR_PERMISSIONS', round(0 + 164.33333333333 + 164.33333333333 + 164.33333333333));
$GLOBALS['sDocPath'] = $GLOBALS['APPLICATION']->GetCurPage();
if ((!(defined('STATISTIC_ONLY') && STATISTIC_ONLY && substr($GLOBALS['APPLICATION']->GetCurPage(), min(16, 0, 5.3333333333333), strlen(BX_ROOT . '/admin/')) != BX_ROOT . '/admin/')) && COption::GetOptionString('main', 'include_charset', 'Y') == 'Y' && strlen(LANG_CHARSET) > min(90, 0, 30)) header('Content-Type: text/html;
 charset=' . LANG_CHARSET);
if (COption::GetOptionString('main', 'set_p3p_header', 'Y') == 'Y') header('P3P: policyref=/ bitrix / p3p . xml, CP=NON DSP COR CUR ADM DEV PSA PSD OUR UNR BUS UNI COM NAV INT DEM STA');
 $LICENSE_KEY = '';
 if (file_exists(($_1414785502 = $_SERVER['DOCUMENT_ROOT'] . BX_ROOT . '/license_key.php'))) include($_1414785502);
 if ($LICENSE_KEY == '' || strtoupper($LICENSE_KEY) == 'DEMO') define('LICENSE_KEY', 'DEMO');
 else define('LICENSE_KEY', $LICENSE_KEY);
 header('X-Powered-CMS: Bitrix Site Manager (' . (LICENSE_KEY == 'DEMO' ? 'DEMO' : md5('BITRIX' . LICENSE_KEY . 'LICENCE')) . ')');
 define('BX_CRONTAB_SUPPORT', defined('BX_CRONTAB'));
 if (COption::GetOptionString('main', 'check_agents', 'Y') == 'Y') {
     define('START_EXEC_AGENTS_1', microtime());
     $GLOBALS['BX_STATE'] = 'AG';
     $GLOBALS['DB']->StartUsingMasterOnly();
     CAgent::CheckAgents();
     $GLOBALS['DB']->StopUsingMasterOnly();
     define('START_EXEC_AGENTS_2', microtime());
     $GLOBALS['BX_STATE'] = 'PB';
 } ini_set('session.cookie_httponly', '1');
 if ($_1740736331 = $GLOBALS['APPLICATION']->GetCookieDomain()) ini_set('session.cookie_domain', $_1740736331);
 if (COption::GetOptionString('security', 'session', 'N') === 'Y' && CModule::IncludeModule('security')) CSecuritySession::Init();
 session_start();
 foreach (GetModuleEvents('main', 'OnPageStart', true) as $_1095623886) ExecuteModuleEventEx($_1095623886);
 $GLOBALS['USER'] = new CUser;
 $_1122188596 = $GLOBALS['USER']->GetSecurityPolicy();
 $_1371749230 = time();
 if (($_SESSION['SESS_IP'] && strlen($_1122188596['SESSION_IP_MASK']) > (1452 / 2 - 726) && ((ip2long($_1122188596['SESSION_IP_MASK']) & ip2long($_SESSION['SESS_IP'])) != (ip2long($_1122188596['SESSION_IP_MASK']) & ip2long($_SERVER['REMOTE_ADDR'])))) || ($_1122188596['SESSION_TIMEOUT'] > (1276 / 2 - 638) && $_SESSION['SESS_TIME'] > min(66, 0, 22) && $_1371749230 - $_1122188596['SESSION_TIMEOUT'] * round(0 + 15 + 15 + 15 + 15) > $_SESSION['SESS_TIME']) || (isset($_SESSION['BX_SESSION_TERMINATE_TIME']) && $_SESSION['BX_SESSION_TERMINATE_TIME'] > min(56, 0, 18.666666666667) && $_1371749230 > $_SESSION['BX_SESSION_TERMINATE_TIME']) || (isset($_SESSION['BX_SESSION_SIGN']) && $_SESSION['BX_SESSION_SIGN'] <> bitrix_sess_sign()) || (isSessionExpired())) {
     $_SESSION = array();
     @session_destroy();
     if (COption::GetOptionString('security', 'session', 'N') === 'Y' && CModule::IncludeModule('security')) CSecuritySession::Init();
     session_id(md5(uniqid(rand(), true)));
     session_start();
     $GLOBALS['USER'] = new CUser;
 } $_SESSION['SESS_IP'] = $_SERVER['REMOTE_ADDR'];
 $_SESSION['SESS_TIME'] = time();
 if (!isset($_SESSION['BX_SESSION_SIGN'])) $_SESSION['BX_SESSION_SIGN'] = bitrix_sess_sign();
 if ((COption::GetOptionString('main', 'use_session_id_ttl', 'N') == 'Y') && (COption::GetOptionInt('main', 'session_id_ttl', (208 * 2 - 416)) > (1088 / 2 - 544)) && !defined('BX_SESSION_ID_CHANGE')) {
     if (!array_key_exists('SESS_ID_TIME', $_SESSION)) {
         $_SESSION['SESS_ID_TIME'] = $_SESSION['SESS_TIME'];
     } elseif (($_SESSION['SESS_ID_TIME'] + COption::GetOptionInt('main', 'session_id_ttl')) < $_SESSION['SESS_TIME']) {
         if (COption::GetOptionString('security', 'session', 'N') === 'Y' && CModule::IncludeModule('security')) {
             CSecuritySession::UpdateSessID();
         } else {
             session_regenerate_id();
         }
         $_SESSION['SESS_ID_TIME'] = $_SESSION['SESS_TIME'];
     }
 } define('BX_STARTED', true);
 if (isset($_SESSION['BX_ADMIN_LOAD_AUTH'])) {
     define('ADMIN_SECTION_LOAD_AUTH', round(0 + 0.2 + 0.2 + 0.2 + 0.2 + 0.2));
     unset($_SESSION['BX_ADMIN_LOAD_AUTH']);
 } if (!defined('NOT_CHECK_PERMISSIONS') || NOT_CHECK_PERMISSIONS !== true) {
    $_2066756568 = isset($_REQUEST['logout']) && (strtolower($_REQUEST['logout']) == 'yes');
    if ($_2066756568 && $GLOBALS['USER']->IsAuthorized()) {
        $GLOBALS['USER']->Logout();
        LocalRedirect($GLOBALS['APPLICATION']->GetCurPageParam('', array('logout')));
    }
    if (!$GLOBALS['USER']->IsAuthorized()) {
        $GLOBALS['USER']->LoginByCookies();
    }
    $_1183920042 = false;
    if (($_198043021 = $GLOBALS['USER']->LoginByHttpAuth()) !== null) {
        $_1183920042 = $_198043021;
        $GLOBALS['APPLICATION']->SetAuthResult($_1183920042);
    }
    if (isset($_REQUEST['AUTH_FORM']) && $_REQUEST['AUTH_FORM'] <> '') {
        $_154464923 = false;
        if (COption::GetOptionString('main', 'use_encrypted_auth', 'N') == 'Y') {
            $_137925422 = new CRsaSecurity();
            if (($_963065937 = $_137925422->LoadKeys())) {
                $_137925422->SetKeys($_963065937);
                $_1629041033 = $_137925422->AcceptFromForm(array('USER_PASSWORD', 'USER_CONFIRM_PASSWORD'));
                if ($_1629041033 == CRsaSecurity::ERROR_SESS_CHECK) $_1183920042 = array('MESSAGE' => GetMessage('main_include_decode_pass_sess'), 'TYPE' => 'ERROR');
                elseif ($_1629041033 < (928 - 2 * 464)) $_1183920042 = array('MESSAGE' => GetMessage('main_include_decode_pass_err', array('#ERRCODE#' => $_1629041033)), 'TYPE' => 'ERROR');
                if ($_1629041033 < min(28, 0, 9.3333333333333)) $_154464923 = true;
            }
        }
        if ($_154464923 == false) {
            if (!defined('ADMIN_SECTION') || ADMIN_SECTION !== true) $_456701641 = LANG;
            else $_456701641 = false;
            if ($_REQUEST['TYPE'] == 'AUTH') {
                $_1183920042 = $GLOBALS['USER']->Login($_REQUEST['USER_LOGIN'], $_REQUEST['USER_PASSWORD'], $_REQUEST['USER_REMEMBER']);
            } elseif ($_REQUEST['TYPE'] == 'OTP') {
                $_1183920042 = $GLOBALS['USER']->LoginByOtp($_REQUEST['USER_OTP'], $_REQUEST['OTP_REMEMBER'], $_REQUEST['captcha_word'], $_REQUEST['captcha_sid']);
            } elseif ($_REQUEST['TYPE'] == 'SEND_PWD') {
                $_1183920042 = CUser::SendPassword($_REQUEST['USER_LOGIN'], $_REQUEST['USER_EMAIL'], $_456701641);
            } elseif ($_SERVER['REQUEST_METHOD'] == 'POST' && $_REQUEST['TYPE'] == 'CHANGE_PWD') {
                $_1183920042 = $GLOBALS['USER']->ChangePassword($_REQUEST['USER_LOGIN'], $_REQUEST['USER_CHECKWORD'], $_REQUEST['USER_PASSWORD'], $_REQUEST['USER_CONFIRM_PASSWORD'], $_456701641);
            } elseif (COption::GetOptionString('main', 'new_user_registration', 'N') == 'Y' && $_SERVER['REQUEST_METHOD'] == 'POST' && $_REQUEST['TYPE'] == 'REGISTRATION' && (!defined('ADMIN_SECTION') || ADMIN_SECTION !== true)) {
                $_1183920042 = $GLOBALS['USER']->Register($_REQUEST['USER_LOGIN'], $_REQUEST['USER_NAME'], $_REQUEST['USER_LAST_NAME'], $_REQUEST['USER_PASSWORD'], $_REQUEST['USER_CONFIRM_PASSWORD'], $_REQUEST['USER_EMAIL'], $_456701641, $_REQUEST['captcha_word'], $_REQUEST['captcha_sid']);
            }
            if ($_REQUEST['TYPE'] == 'AUTH' || $_REQUEST['TYPE'] == 'OTP') {
                if ($_1183920042 === true && defined('ADMIN_SECTION') && ADMIN_SECTION === true) {
                    $GLOBALS['APPLICATION']->StoreCookies();
                    $_SESSION['BX_ADMIN_LOAD_AUTH'] = true;
                    echo '<script type="text/javascript">window.onload=function(){top.BX.AUTHAGENT.setAuthResult(false);
};
</script>';
 die();
}
            }
        }
        $GLOBALS['APPLICATION']->SetAuthResult($_1183920042);
    } elseif (!$GLOBALS['USER']->IsAuthorized()) {
        $GLOBALS['USER']->LoginHitByHash();
    }
} if (($_1809828126 = $GLOBALS['USER']->GetParam('APPLICATION_ID')) !== null) {
    $_930968755 = \Bitrix\Main\Authentication\ApplicationManager::getInstance();
    if ($_930968755->checkScope($_1809828126) !== true) {
        CHTTP::SetStatus('403 Forbidden');
        die();
    }
} if (!defined('ADMIN_SECTION') || ADMIN_SECTION !== true) {
    $_824882276 = '';
    if (is_string($_REQUEST['bitrix_preview_site_template']) && $_REQUEST['bitrix_preview_site_template'] <> '' && $GLOBALS['USER']->CanDoOperation('view_other_settings')) {
        $_799562494 = new Bitrix\Main\Security\Sign\Signer();
        try {
            $_2024034923 = $_799562494->unsign($_REQUEST['bitrix_preview_site_template'], 'template_preview' . bitrix_sessid());
            $_178118170 = CSiteTemplate::GetByID($_2024034923);
            if ($_603489097 = $_178118170->Fetch()) {
                $_824882276 = $_603489097['ID'];
                if (isset($_GET['bx_template_preview_mode']) && $_GET['bx_template_preview_mode'] == 'Y' && $GLOBALS['USER']->CanDoOperation('edit_other_settings')) {
                    define('SITE_TEMPLATE_PREVIEW_MODE', true);
                }
            }
        } catch (\Bitrix\Main\Security\Sign\BadSignatureException $_69852008) {
        }
    }
    if ($_824882276 == '') {
        $_824882276 = CSite::GetCurTemplate();
    }
    define('SITE_TEMPLATE_ID', $_824882276);
    define('SITE_TEMPLATE_PATH', getLocalPath('templates/' . SITE_TEMPLATE_ID, BX_PERSONAL_ROOT));
} if (isset($_GET['show_page_exec_time'])) {
    if ($_GET['show_page_exec_time'] == 'Y' || $_GET['show_page_exec_time'] == 'N') $_SESSION['SESS_SHOW_TIME_EXEC'] = $_GET['show_page_exec_time'];
} if (isset($_GET['show_include_exec_time'])) {
    if ($_GET['show_include_exec_time'] == 'Y' || $_GET['show_include_exec_time'] == 'N') $_SESSION['SESS_SHOW_INCLUDE_TIME_EXEC'] = $_GET['show_include_exec_time'];
} if (isset($_GET['bitrix_include_areas']) && $_GET['bitrix_include_areas'] <> '') $GLOBALS['APPLICATION']->SetShowIncludeAreas($_GET['bitrix_include_areas'] == 'Y');
 if ($GLOBALS['USER']->IsAuthorized()) {
     $_1242503996 = COption::GetOptionString('main', 'cookie_name', 'BITRIX_SM');
     if (!isset($_COOKIE[$_1242503996 . '_SOUND_LOGIN_PLAYED'])) $GLOBALS['APPLICATION']->set_cookie('SOUND_LOGIN_PLAYED', 'Y', (1036 / 2 - 518));
 } \Bitrix\Main\Page\Frame::shouldBeEnabled();
 if (defined('BX_CHECK_SHORT_URI') && BX_CHECK_SHORT_URI && CBXShortUri::CheckUri()) {
     die();
 } foreach (GetModuleEvents('main', 'OnBeforeProlog', true) as $_1095623886) ExecuteModuleEventEx($_1095623886);
 if ((!defined('NOT_CHECK_PERMISSIONS') || NOT_CHECK_PERMISSIONS !== true) && (!defined('NOT_CHECK_FILE_PERMISSIONS') || NOT_CHECK_FILE_PERMISSIONS !== true)) {
     $_1059862600 = $_2145684012->getScriptFile();
     if (!$GLOBALS['USER']->CanDoFileOperation('fm_view_file', array(SITE_ID, $_1059862600)) || (defined('NEED_AUTH') && NEED_AUTH && !$GLOBALS['USER']->IsAuthorized())) {
         if ($GLOBALS['USER']->IsAuthorized() && $_1183920042['MESSAGE'] == '') $_1183920042 = array('MESSAGE' => GetMessage('ACCESS_DENIED') . ' ' . GetMessage('ACCESS_DENIED_FILE', array('#FILE#' => $_1059862600)), 'TYPE' => 'ERROR');
         if (defined('ADMIN_SECTION') && ADMIN_SECTION == true) {
             if ($_REQUEST['mode'] == 'list' || $_REQUEST['mode'] == 'settings') {
                 echo '<script>top.location='.$GLOBALS['APPLICATION']->GetCurPage().' ? '.DeleteParam(array('mode')).';
</script>';
 die();
} elseif ($_REQUEST['mode'] == 'frame') {
                 echo '<script type="text/javascript">
						var w = (opener? opener.window:parent.window);

						w.location.href='.$GLOBALS['APPLICATION']->GetCurPage().' ? '.DeleteParam(array('mode')).';

					</script>';
 die();
} elseif (defined('MOBILE_APP_ADMIN') && MOBILE_APP_ADMIN == true) {
                 echo json_encode(Array('status' => 'failed'));
                 die();
             }
         }
         $GLOBALS['APPLICATION']->AuthForm($_1183920042);
     }
 } //while (!defined('OLDSITEEXPIREDATE') || strlen(OLDSITEEXPIREDATE) <= (938 - 2 * 469) || OLDSITEEXPIREDATE != SITEEXPIREDATE) die(GetMessage('expire_mess2'));
  if (isset($_1112485429) && $_1112485429 == round(0 + 101 + 101 + 101 + 101)) {
      if (COption::GetOptionString('main', 'header_200', 'N') == 'Y') CHTTP::SetStatus('200 OK');
  }?>