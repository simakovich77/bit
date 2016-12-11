<?
if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true) die();

$arCLoader = array(
	'none' => 'none',
	'pie' => 'pie',
	'bar' => 'bar',
);

$arTemplateParameters = array(
	/*"DISPLAY_DATE" => Array(
		"NAME" => GetMessage("T_IBLOCK_DESC_S_DATE"),
		"TYPE" => "CHECKBOX",
		"DEFAULT" => "Y",
	),*/
	"DISPLAY_NAME" => Array(
		"NAME" => GetMessage("T_IBLOCK_DESC_S_NAME"),
		"TYPE" => "CHECKBOX",
		"DEFAULT" => "Y",
	),
	"DISPLAY_PREVIEW_TEXT" => Array(
		"NAME" => GetMessage("T_IBLOCK_DESC_S_TEXT"),
		"TYPE" => "CHECKBOX",
		"DEFAULT" => "Y",
	),
	/*"DISPLAY_PICTURE" => Array(
		"NAME" => GetMessage("T_IBLOCK_DESC_S_PICTURE"),
		"TYPE" => "CHECKBOX",
		"DEFAULT" => "Y",
	),*/
	"CAMERA_TIME" => Array(
		"NAME" => GetMessage("T_IBLOCK_DESC_S_CAMERA_TIME"),
		"TYPE" => "STRING",
		"DEFAULT" => "7000",
	),
	"CAMERA_PAGINATION" => Array(
		"NAME" => GetMessage("T_IBLOCK_DESC_S_CAMERA_PAGINATION"),
		"TYPE" => "CHECKBOX",
		"DEFAULT" => "N",
	),
	"PICTURE_IMAGE_WIDTH" => Array(
		"NAME" => GetMessage("T_IBLOCK_DESC_S_PICTURE_WIDTH"),
		"TYPE" => "STRING",
		"DEFAULT" => "1000",
	),
	"PICTURE_IMAGE_HEIGHT" => Array(
		"NAME" => GetMessage("T_IBLOCK_DESC_S_PICTURE_HEIGHT"),
		"TYPE" => "STRING",
		"DEFAULT" => "400",
	),
	"DISPLAY_THUMB_IMAGE" => Array(
		"NAME" => GetMessage("T_IBLOCK_DESC_S_THUMB"),
		"TYPE" => "CHECKBOX",
		"DEFAULT" => "Y",
	),
	"THUMB_IMAGE_WIDTH" => Array(
		"NAME" => GetMessage("T_IBLOCK_DESC_S_THUMB_WIDTH"),
		"TYPE" => "STRING",
		"DEFAULT" => "100",
	),
	"THUMB_IMAGE_HEIGHT" => Array(
		"NAME" => GetMessage("T_IBLOCK_DESC_S_THUMB_HEIGHT"),
		"TYPE" => "STRING",
		"DEFAULT" => "100",
	),
	"CAMERA_HEIGHT" => Array(
		"NAME" => GetMessage("T_IBLOCK_DESC_S_CAMERA_HEIGHT"),
		"TYPE" => "STRING",
		"DEFAULT" => "100",
	),
	"CAMERA_NAV" => Array(
		"NAME" => GetMessage("T_IBLOCK_DESC_S_CAMERA_NAV"),
		"TYPE" => "CHECKBOX",
		"DEFAULT" => "Y",
	),
	"CAMERA_LOADER" => Array(
		"NAME" => GetMessage("T_IBLOCK_DESC_S_CAMERA_LOADER"),
		"TYPE" => "LIST",
		"VALUES" => $arCLoader,
		"DEFAULT" => "pie",
	),
	"CAMERA_LOADER_COLOR" => Array(
		"NAME" => GetMessage("T_IBLOCK_DESC_S_CAMERA_LOADER_COLOR"),
		"TYPE" => "STRING",
		"DEFAULT" => "#eeeeee",
	),
	"CAMERA_LOADER_BGCOLOR" => Array(
		"NAME" => GetMessage("T_IBLOCK_DESC_S_CAMERA_LOADER_BGCOLOR"),
		"TYPE" => "COLORPICKER",
		"DEFAULT" => "#222222",
	),
	"CAMERA_LOADER_OPACITY" => Array(
		"NAME" => GetMessage("T_IBLOCK_DESC_S_CAMERA_OPACITY"),
		"TYPE" => "STRING",
		"DEFAULT" => ".8",
	),
);
?>
