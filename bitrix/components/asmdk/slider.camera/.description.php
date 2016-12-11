<?
if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true) die();

$arComponentDescription = array(
	"NAME" => GetMessage("MODULE_NAME"),
	"DESCRIPTION" => GetMessage("MODULE_DESC"),
	"ICON" => "/images/sc.gif",
	"SORT" => 20,
//	"SCREENSHOT" => array(
//		"/images/post-77-1108567822.jpg",
//		"/images/post-1169930140.jpg",
//	),
	"CACHE_PATH" => "Y",
	"PATH" => array(
		"ID" => "asmdk_components",
		"SORT" => 2000,
		"NAME" => GetMessage("MODULE_NAME"),
		"CHILD" => array(
			"ID" => "asmdk_sliders",
			"NAME" => GetMessage("COMPONENT_CATEGORY_NAME"),
			"SORT" => 10,
			"CHILD" => array(
				"ID" => "asmdk_slider",
			),
		),
	),
);

?>