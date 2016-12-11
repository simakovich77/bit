<?
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php");
$APPLICATION->SetTitle("slider");
?>
<h2>Slider</h2>

<?php

$APPLICATION->IncludeComponent(
	"asmdk:slider.camera", 
	".default", 
	array(
		"COMPONENT_TEMPLATE" => ".default",
		"IBLOCK_TYPE" => "news",
		"IBLOCK_ID" => $_REQUEST["ID"],
		"NEWS_COUNT" => "20",
		"SORT_BY1" => "ACTIVE_FROM",
		"SORT_ORDER1" => "DESC",
		"FILTER_NAME" => "",
		"FIELD_CODE" => array(
			0 => "",
			1 => "",
		),
		"PROPERTY_CODE" => array(
			0 => "",
			1 => "",
		),
		"CHECK_DATES" => "Y",
		"DETAIL_URL" => "",
		"AJAX_MODE" => "N",
		"AJAX_OPTION_JUMP" => "N",
		"AJAX_OPTION_STYLE" => "Y",
		"AJAX_OPTION_HISTORY" => "N",
		"AJAX_OPTION_ADDITIONAL" => "undefined",
		"CACHE_TYPE" => "A",
		"CACHE_TIME" => "36000000",
		"CACHE_FILTER" => "N",
		"CACHE_GROUPS" => "Y",
		"PREVIEW_TRUNCATE_LEN" => "",
		"ACTIVE_DATE_FORMAT" => "d.m.Y",
		"SET_TITLE" => "Y",
		"SET_BROWSER_TITLE" => "Y",
		"SET_META_KEYWORDS" => "Y",
		"SET_META_DESCRIPTION" => "Y",
		"SET_LAST_MODIFIED" => "N",
		"INCLUDE_IBLOCK_INTO_CHAIN" => "Y",
		"ADD_SECTIONS_CHAIN" => "Y",
		"HIDE_LINK_WHEN_NO_DETAIL" => "N",
		"PARENT_SECTION" => "",
		"PARENT_SECTION_CODE" => "",
		"INCLUDE_SUBSECTIONS" => "Y",
		"DISPLAY_NAME" => "Y",
		"DISPLAY_PREVIEW_TEXT" => "Y",
		"CAMERA_TIME" => "7000",
		"CAMERA_PAGINATION" => "N",
		"PICTURE_IMAGE_WIDTH" => "1000",
		"PICTURE_IMAGE_HEIGHT" => "400",
		"DISPLAY_THUMB_IMAGE" => "Y",
		"THUMB_IMAGE_WIDTH" => "100",
		"THUMB_IMAGE_HEIGHT" => "100",
		"CAMERA_HEIGHT" => "100",
		"CAMERA_NAV" => "Y",
		"CAMERA_LOADER" => "pie",
		"CAMERA_LOADER_COLOR" => "#eeeeee",
		"CAMERA_LOADER_BGCOLOR" => "#222222",
		"CAMERA_LOADER_OPACITY" => "0.8",
		"SET_STATUS_404" => "N",
		"SHOW_404" => "N",
		"MESSAGE_404" => ""
	),
	false
);
echo '1';
?><?require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php");?>