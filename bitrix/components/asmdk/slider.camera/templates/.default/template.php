<?if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die();?>

<?

	$GLOBALS['APPLICATION']->SetAdditionalCSS('/bitrix/components/asmdk/slider.camera/templates/.default/css/camera.css');
	
	$GLOBALS['APPLICATION']->AddHeadScript('/bitrix/components/asmdk/slider.camera/templates/.default/js/jquery.min.js');
	$GLOBALS['APPLICATION']->AddHeadScript('/bitrix/components/asmdk/slider.camera/templates/.default/js/jquery.mobile.customized.min.js');
	$GLOBALS['APPLICATION']->AddHeadScript('/bitrix/components/asmdk/slider.camera/templates/.default/js/jquery.easing.1.3.js');
	$GLOBALS['APPLICATION']->AddHeadScript('/bitrix/components/asmdk/slider.camera/templates/.default/js/camera.min.js');

?>
<?

	$imageWidth = !empty($arParams["PICTURE_IMAGE_WIDTH"]) ? $arParams["PICTURE_IMAGE_WIDTH"] : 1000;
	$imageHeight = !empty($arParams["PICTURE_IMAGE_HEIGHT"]) ? $arParams["PICTURE_IMAGE_HEIGHT"] : 400;
	$imageThumbWidth = !empty($arParams["THUMB_IMAGE_WIDTH"]) ? $arParams["THUMB_IMAGE_WIDTH"] : 100;
	$imageThumbHeight = !empty($arParams["THUMB_IMAGE_HEIGHT"]) ? $arParams["THUMB_IMAGE_HEIGHT"] : 100;

?>
<script>
	jQuery(function(){
		jQuery('#camera_wrap_1').camera({
			<?if (!empty($arParams["CAMERA_HEIGHT"])) : ?>height: '<?=$arParams["CAMERA_HEIGHT"]?>px',
			<? endif; ?>
			<?if (!empty($arParams["CAMERA_TIME"])) : ?>time: '<?=$arParams["CAMERA_TIME"]?>',
			<? endif; ?>
			<?if (!empty($arParams["CAMERA_LOADER"])) : ?>loader: '<?=$arParams["CAMERA_LOADER"]?>',
			<? endif; ?>
			<?if (!empty($arParams["CAMERA_LOADER_COLOR"])) : ?>loaderColor: '<?=$arParams["CAMERA_LOADER_COLOR"]?>',
			<? endif; ?>
			<?if (!empty($arParams["CAMERA_LOADER_BGCOLOR"])) : ?>loaderBgColor: '<?=$arParams["CAMERA_LOADER_BGCOLOR"]?>',
			<? endif; ?>
			<?if (!empty($arParams["CAMERA_LOADER_OPACITY"])) : ?>loaderOpacity: '<?=$arParams["CAMERA_LOADER_OPACITY"]?>',
			<? endif; ?>
			<?if ($arParams["CAMERA_PAGINATION"] == "N") : ?>pagination: false,
			<? endif; ?>
			<?if ($arParams["DISPLAY_THUMB_IMAGE"] == "Y") : ?>thumbnails: true,
			<? endif; ?>
			<?if ($arParams["CAMERA_NAV"] == "N") : ?>navigation: false,
			<? endif; ?>
		});
	});
</script>
<div class="camera_wrap camera_magenta_skin" id="camera_wrap_1">
	<?foreach($arResult["ITEMS"] as $arItem):?>
		<?
		$this->AddEditAction($arItem['ID'], $arItem['EDIT_LINK'], CIBlock::GetArrayByID($arItem["IBLOCK_ID"], "ELEMENT_EDIT"));
		$this->AddDeleteAction($arItem['ID'], $arItem['DELETE_LINK'], CIBlock::GetArrayByID($arItem["IBLOCK_ID"], "ELEMENT_DELETE"), array("CONFIRM" => GetMessage('CT_BNL_ELEMENT_DELETE_CONFIRM')));
		?>
		<?$img_thumb_cut = CFile::ResizeImageGet($arItem["DETAIL_PICTURE"]['ID'], array('width'=>"$imageThumbWidth", 'height'=>"$imageThumbHeight"), BX_RESIZE_IMAGE_EXACT, true);?>
		<?$img_cut = CFile::ResizeImageGet($arItem["DETAIL_PICTURE"]['ID'], array('width'=>"$imageWidth", 'height'=>"$imageHeight"), BX_RESIZE_IMAGE_EXACT, true);?>
		<div data-thumb="<?=$img_thumb_cut["src"];?>" data-src="<?=$img_cut['src'];?>">
			<? if ($arParams["DISPLAY_NAME"] == "Y" || $arParams["DISPLAY_PREVIEW_TEXT"] == "Y") : ?>
				<div class="camera_caption fadeFromBottom">
					<? if ($arParams["DISPLAY_NAME"] == "Y") : ?><?=$arItem["NAME"];?><? endif; ?>
					<? if ($arParams["DISPLAY_PREVIEW_TEXT"] == "Y") : ?><?echo $arItem["PREVIEW_TEXT"];?><? endif; ?>
				</div>
			<? endif; ?>
		</div>
	<?endforeach;?>
</div><!-- #camera_wrap_2 -->
