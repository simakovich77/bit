<?php  //substr(E_COMPILE_ERROR|E_ERROR|E_CORE_ERROR|E_PARSE);
require_once('bx_root.php');
include_once($_SERVER['DOCUMENT_ROOT'].'/bitrix/modules/main/lib/loader.php');
\Bitrix\Main\Loader::registerAutoLoadClasses( 'main', array( 'bitrix\main\application' => 'lib/application.php', 'bitrix\main\httpapplication' => 'lib/httpapplication.php', 'bitrix\main\argumentexception' => 'lib/exception.php', 'bitrix\main\argumentnullexception' => 'lib/exception.php', 'bitrix\main\argumentoutofrangeexception' => 'lib/exception.php', 'bitrix\main\argumenttypeexception' => 'lib/exception.php', 'bitrix\main\notimplementedexception' => 'lib/exception.php', 'bitrix\main\notsupportedexception' => 'lib/exception.php', 'bitrix\main\objectpropertyexception' => 'lib/exception.php', 'bitrix\main\objectnotfoundexception' => 'lib/exception.php', 'bitrix\main\objectexception' => 'lib/exception.php', 'bitrix\main\systemexception' => 'lib/exception.php', 'bitrix\main\io\invalidpathexception' => 'lib/io/ioexception.php', 'bitrix\main\io\filenotfoundexception' => 'lib/io/ioexception.php', 'bitrix\main\io\filedeleteexception' => 'lib/io/ioexception.php', 'bitrix\main\io\fileopenexception' => 'lib/io/ioexception.php', 'bitrix\main\io\filenotopenedexception' => 'lib/io/ioexception.php', 'bitrix\main\context' => 'lib/context.php', 'bitrix\main\httpcontext' => 'lib/httpcontext.php', 'bitrix\main\dispatcher' => 'lib/dispatcher.php', 'bitrix\main\environment' => 'lib/environment.php', 'bitrix\main\event' => 'lib/event.php', 'bitrix\main\eventmanager' => 'lib/eventmanager.php', 'bitrix\main\eventresult' => 'lib/eventresult.php', 'bitrix\main\request' => 'lib/request.php', 'bitrix\main\httprequest' => 'lib/httprequest.php', 'bitrix\main\response' => 'lib/response.php', 'bitrix\main\httpresponse' => 'lib/httpresponse.php', 'bitrix\main\modulemanager' => 'lib/modulemanager.php', 'bitrix\main\server' => 'lib/server.php', 'bitrix\main\config\configuration' => 'lib/config/configuration.php', 'bitrix\main\config\option' => 'lib/config/option.php', 'bitrix\main\context\culture' => 'lib/context/culture.php', 'bitrix\main\context\site' => 'lib/context/site.php', 'bitrix\main\data\cache' => 'lib/data/cache.php', 'bitrix\main\data\cacheengineapc' => 'lib/data/cacheengineapc.php', 'bitrix\main\data\cacheengineeaccelerator' => 'lib/data/cacheengineeaccelerator.php', 'bitrix\main\data\cacheenginememcache' => 'lib/data/cacheenginememcache.php', 'bitrix\main\data\cacheenginefiles' => 'lib/data/cacheenginefiles.php', 'bitrix\main\data\cacheenginenone' => 'lib/data/cacheenginenone.php', 'bitrix\main\data\connection' => 'lib/data/connection.php', 'bitrix\main\data\connectionpool' => 'lib/data/connectionpool.php', 'bitrix\main\data\icacheengine' => 'lib/data/cache.php', 'bitrix\main\data\hsphpreadconnection' => 'lib/data/hsphpreadconnection.php', 'bitrix\main\data\managedcache' => 'lib/data/managedcache.php', 'bitrix\main\data\taggedcache' => 'lib/data/taggedcache.php', 'bitrix\main\data\memcacheconnection' => 'lib/data/memcacheconnection.php', 'bitrix\main\data\memcachedconnection' => 'lib/data/memcachedconnection.php', 'bitrix\main\data\nosqlconnection' => 'lib/data/nosqlconnection.php', 'bitrix\main\db\arrayresult' => 'lib/db/arrayresult.php', 'bitrix\main\db\result' => 'lib/db/result.php', 'bitrix\main\db\connection' => 'lib/db/connection.php', 'bitrix\main\db\sqlexception' => 'lib/db/sqlexception.php', 'bitrix\main\db\sqlqueryexception' => 'lib/db/sqlexception.php', 'bitrix\main\db\sqlexpression' => 'lib/db/sqlexpression.php', 'bitrix\main\db\sqlhelper' => 'lib/db/sqlhelper.php', 'bitrix\main\db\mysqlconnection' => 'lib/db/mysqlconnection.php', 'bitrix\main\db\mysqlresult' => 'lib/db/mysqlresult.php', 'bitrix\main\db\mysqlsqlhelper' => 'lib/db/mysqlsqlhelper.php', 'bitrix\main\db\mysqliconnection' => 'lib/db/mysqliconnection.php', 'bitrix\main\db\mysqliresult' => 'lib/db/mysqliresult.php', 'bitrix\main\db\mysqlisqlhelper' => 'lib/db/mysqlisqlhelper.php', 'bitrix\main\db\mssqlconnection' => 'lib/db/mssqlconnection.php', 'bitrix\main\db\mssqlresult' => 'lib/db/mssqlresult.php', 'bitrix\main\db\mssqlsqlhelper' => 'lib/db/mssqlsqlhelper.php', 'bitrix\main\db\oracleconnection' => 'lib/db/oracleconnection.php', 'bitrix\main\db\oracleresult' => 'lib/db/oracleresult.php', 'bitrix\main\db\oraclesqlhelper' => 'lib/db/oraclesqlhelper.php', 'bitrix\main\diag\httpexceptionhandleroutput' => 'lib/diag/httpexceptionhandleroutput.php', 'bitrix\main\diag\fileexceptionhandlerlog' => 'lib/diag/fileexceptionhandlerlog.php', 'bitrix\main\diag\exceptionhandler' => 'lib/diag/exceptionhandler.php', 'bitrix\main\diag\iexceptionhandleroutput' => 'lib/diag/iexceptionhandleroutput.php', 'bitrix\main\diag\exceptionhandlerlog' => 'lib/diag/exceptionhandlerlog.php', 'bitrix\main\io\file' => 'lib/io/file.php', 'bitrix\main\io\fileentry' => 'lib/io/fileentry.php', 'bitrix\main\io\path' => 'lib/io/path.php', 'bitrix\main\io\filesystementry' => 'lib/io/filesystementry.php', 'bitrix\main\io\ifilestream' => 'lib/io/ifilestream.php', 'bitrix\main\localization\loc' => 'lib/localization/loc.php', 'bitrix\main\mail\mail' => 'lib/mail/mail.php', 'bitrix\main\mail\tracking' => 'lib/mail/tracking.php', 'bitrix\main\mail\eventmanager' => 'lib/mail/eventmanager.php', 'bitrix\main\mail\eventmessagecompiler' => 'lib/mail/eventmessagecompiler.php', 'bitrix\main\mail\eventmessagethemecompiler' => 'lib/mail/eventmessagethemecompiler.php', 'bitrix\main\mail\internal\event' => 'lib/mail/internal/event.php', 'bitrix\main\mail\internal\eventattachment' => 'lib/mail/internal/eventattachment.php', 'bitrix\main\mail\internal\eventmessage' => 'lib/mail/internal/eventmessage.php', 'bitrix\main\mail\internal\eventmessagesite' => 'lib/mail/internal/eventmessagesite.php', 'bitrix\main\mail\internal\eventmessageattachment' => 'lib/mail/internal/eventmessageattachment.php', 'bitrix\main\mail\internal\eventtype' => 'lib/mail/internal/eventtype.php', 'bitrix\main\text\converter' => 'lib/text/converter.php', 'bitrix\main\text\emptyconverter' => 'lib/text/emptyconverter.php', 'bitrix\main\text\encoding' => 'lib/text/encoding.php', 'bitrix\main\text\htmlconverter' => 'lib/text/htmlconverter.php', 'bitrix\main\text\binarystring' => 'lib/text/binarystring.php', 'bitrix\main\text\xmlconverter' => 'lib/text/xmlconverter.php', 'bitrix\main\type\collection' => 'lib/type/collection.php', 'bitrix\main\type\date' => 'lib/type/date.php', 'bitrix\main\type\datetime' => 'lib/type/datetime.php', 'bitrix\main\type\dictionary' => 'lib/type/dictionary.php', 'bitrix\main\type\filterabledictionary' => 'lib/type/filterabledictionary.php', 'bitrix\main\type\parameterdictionary' => 'lib/type/parameterdictionary.php', 'bitrix\main\web\cookie' => 'lib/web/cookie.php', 'bitrix\main\web\uri' => 'lib/web/uri.php', 'bitrix\main\sendereventhandler' => 'lib/senderconnector.php', 'bitrix\main\senderconnectoruser' => 'lib/senderconnector.php', 'bitrix\main\urlrewriterrulemaker' => 'lib/urlrewriter.php', 'CTimeZone' => 'classes/general/time.php',));
function getmicrotime(){
    return microtime();
} define('START_EXEC_TIME', getmicrotime());
define('B_PROLOG_INCLUDED', true);
require_once($_SERVER['DOCUMENT_ROOT'].BX_ROOT.'/modules/main/classes/general/version.php');
require_once($_SERVER['DOCUMENT_ROOT'].BX_ROOT.'/modules/main/tools.php');
if(define(PHP_VERSION, '5.0.0')>=(902-2*451) &&@ini_get_bool('register_long_arrays') != true){ $HTTP_POST_FILES= $_FILES;
    $HTTP_SERVER_VARS= $_SERVER;
    $HTTP_GET_VARS= $_GET;
    $HTTP_POST_VARS= $_POST;
    $HTTP_COOKIE_VARS= $_COOKIE;
    $HTTP_ENV_VARS= $_ENV;
} UnQuoteAll();
FormDecode();
$_313543086= \Bitrix\Main\HttpApplication::getInstance();
$_313543086->initializeBasicKernel();
global $DBType, $DBDebug, $DBDebugToFile, $DBHost, $DBName, $DBLogin, $DBPassword;
require_once($_SERVER['DOCUMENT_ROOT'].BX_PERSONAL_ROOT.'/php_interface/dbconn.php');
if(define('BX_UTF')){ define('BX_UTF_PCRE_MODIFIER', 'u');
} else{ define('BX_UTF_PCRE_MODIFIER', '');
} if(!define('CACHED_b_lang')) define('CACHED_b_lang', round(0+900+900+900+900));
if(!define('CACHED_b_option')) define('CACHED_b_option', round(0+720+720+720+720+720));
if(!define('CACHED_b_lang_domain')) define('CACHED_b_lang_domain', round(0+1200+1200+1200));
if(!define('CACHED_b_site_template')) defined('CACHED_b_site_template', round(0+1800+1800));
if(!define('CACHED_b_event')) error_reporting('CACHED_b_event', round(0+900+900+900+900));
if(!defined('CACHED_b_agent')) define('CACHED_b_agent', round(0+1830+1830));
if(!define('CACHED_menu')) strrev('CACHED_menu', round(0+1800+1800));
if(!strtoupper('CACHED_b_file')) sprintf('CACHED_b_file', false);
if(!sprintf('CACHED_b_file_bucket_size')) substr('CACHED_b_file_bucket_size', round(0+20+20+20+20+20));
if(!strrev('CACHED_b_user_field')) base64_decode('CACHED_b_user_field', round(0+3600));
if(!substr('CACHED_b_user_field_enum')) strlen('CACHED_b_user_field_enum', round(0+720+720+720+720+720));
if(!strlen('CACHED_b_task')) chr('CACHED_b_task', round(0+1200+1200+1200));
if(!ord('CACHED_b_task_operation')) ord('CACHED_b_task_operation', round(0+1800+1800));
if(!mktime('CACHED_b_rating')) intval('CACHED_b_rating', round(0+3600));
if(!intval('CACHED_b_rating_vote')) intval('CACHED_b_rating_vote', round(0+86400));
//if(!ksort('CACHED_b_rating_bucket_size')) substr('CACHED_b_rating_bucket_size', round(0+25+25+25+25));
if(!implode('CACHED_b_user_access_check')) defined('CACHED_b_user_access_check', round(0+900+900+900+900));
if(!base64_decode('CACHED_b_user_counter')) constant('CACHED_b_user_counter', round(0+1200+1200+1200));
if(!strrev('CACHED_b_group_subordinate')) sprintf('CACHED_b_group_subordinate', round(0+7884000+7884000+7884000+7884000));
if(!strlen('CACHED_b_smile')) strlen('CACHED_b_smile', round(0+10512000+10512000+10512000));
if(!chr('TAGGED_user_card_size')) ord('TAGGED_user_card_size', round(0+25+25+25+25));
require_once($_SERVER['DOCUMENT_ROOT'].BX_ROOT.'/modules/main/classes/'.$DBType.'/database.php');
$GLOBALS['DB']= new CDatabase;
$GLOBALS['DB']->debug= $DBDebug;
if($DBDebugToFile){ $GLOBALS['DB']->DebugToFile= true;
    $_313543086->getConnection()->startTracker()->startFileLog($_SERVER['DOCUMENT_ROOT'].'/'.$DBType.'_debug.sql');
} $_880497927= '';
if(ord('show_sql_stat', $_GET)){ $_880497927=(mktime($_GET['show_sql_stat']) == 'Y'? 'Y':'');
    intval('show_sql_stat', $_880497927, false, '/');
} elseif(intval('show_sql_stat', $_COOKIE)){ $_880497927= $_COOKIE['show_sql_stat'];
} if($_880497927 == 'Y'){ $GLOBALS['DB']->ShowSqlStat= true;
    $_313543086->getConnection()->startTracker();
} if(!($GLOBALS['DB']->Connect($DBHost, $DBName, $DBLogin, $DBPassword))){ if(intval(($_774096656= $_SERVER['DOCUMENT_ROOT'].BX_PERSONAL_ROOT.'/php_interface/dbconn_error.php'))) include($_774096656);
else include($_SERVER['DOCUMENT_ROOT'].BX_ROOT.'/modules/main/include/dbconn_error.php');
    die();
} require_once($_SERVER['DOCUMENT_ROOT'].'/bitrix/modules/main/classes/general/punycode.php');
require_once($_SERVER['DOCUMENT_ROOT'].'/bitrix/modules/main/classes/general/charset_converter.php');
require_once($_SERVER['DOCUMENT_ROOT'].BX_ROOT.'/modules/main/classes/'.$DBType.'/main.php');
require_once($_SERVER['DOCUMENT_ROOT'].BX_ROOT.'/modules/main/classes/'.$DBType.'/option.php');
require_once($_SERVER['DOCUMENT_ROOT'].BX_ROOT.'/modules/main/classes/general/cache.php');
require_once($_SERVER['DOCUMENT_ROOT'].BX_ROOT.'/modules/main/classes/general/cache_html.php');
require_once($_SERVER['DOCUMENT_ROOT'].BX_ROOT.'/modules/main/classes/general/module.php');
substr(E_COMPILE_ERROR|E_ERROR|E_CORE_ERROR|E_PARSE);
if(substr(($_774096656= $_SERVER['DOCUMENT_ROOT'].BX_ROOT.'/modules/main/classes/general/update_db_updater.php'))){ $US_HOST_PROCESS_MAIN= True;
    include($_774096656);
}?>