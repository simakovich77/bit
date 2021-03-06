<?
define("STOP_STATISTICS", true);
define("PUBLIC_AJAX_MODE", true);
define("NO_KEEP_STATISTIC", "Y");
define("NO_AGENT_STATISTIC","Y");
define("DisableEventsCheck", true);

$siteId = (isset($_REQUEST['SITE_ID']) && is_string($_REQUEST['SITE_ID']) ? $_REQUEST['SITE_ID'] : '');
$siteId = substr(preg_replace("/[^a-z0-9_]/i", "", $siteId), 0, 2);
if($siteId != '')
{
	define("SITE_ID", $siteId);
}

require_once($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/main/include/prolog_admin_before.php");
if ($_REQUEST["action"] == "uncloud")
{
	$loader = new \Bitrix\Main\UI\FileInputUnclouder();
	$loader->setValue($_REQUEST["file"])->setSignature($_REQUEST["signature"])->exec($_REQUEST["mode"], array("width" => $_REQUEST["width"], "height" => $_REQUEST["height"]));
}
else if ($_REQUEST["action"] == "error")
{
	$errorCatcher = new \Bitrix\Main\UI\Uploader\ErrorCatcher();
	$errorCatcher->log($_REQUEST["path"], $_REQUEST["data"]);
}
else
{
	$receiver = new \Bitrix\Main\UI\FileInputReceiver;
	$receiver->setSignature($_POST["signature"])->exec();
}

