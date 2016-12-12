
; /* Start:"a:4:{s:4:"full";s:82:"/bitrix/components/bitrix/photogallery/templates/.default/script.js?14815250646333";s:6:"source";s:67:"/bitrix/components/bitrix/photogallery/templates/.default/script.js";s:3:"min";s:0:"";s:3:"map";s:0:"";}"*/
function debug_info(text)
{
	container_id = 'debug_info_forum';
	var div = document.getElementById(container_id);
	if (!div || div == null)
	{
		div = document.body.appendChild(document.createElement("DIV"));
		div.id = container_id;
//		div.className = "forum-debug";
		div.style.position = "absolute";
		div.style.width = "170px";
		div.style.padding = "5px";
		div.style.backgroundColor = "#FCF7D1";
		div.style.border = "1px solid #EACB6B";
		div.style.textAlign = "left";
		div.style.zIndex = '7900'; 
		div.style.fontSize = '11px'; 
		
		div.style.left = document.body.scrollLeft + (document.body.clientWidth - div.offsetWidth) - 5 + "px";
		div.style.top = document.body.scrollTop + 5 + "px";
	}
	if (typeof text == "object")
	{
		for (var ii in text)
		{
			div.innerHTML += ii + ': ' + text[ii] + "<br />";
		}
	}
	else
	{
		div.innerHTML += text + "<br />";
	}
	return;
}
/************************************************/

function PhotoPopupMenu()
{
	var _this = this;
	this.active = null;
	this.just_hide_item = false;
	this.events = null;
	
	this.PopupShow = function(div, pos, set_width, set_shadow, events)
	{
		this.PopupHide();
		if (!div) { return; } 
		if (typeof(pos) != "object") { pos = {}; } 

		this.active = div.id;
		
		if (set_width !== false && !div.style.width)
		{
			div.style.width = div.offsetWidth + 'px';
		}
		
		this.events = ((events && typeof events == "object") ? events : null);

		var res = jsUtils.GetWindowSize();
		
		pos['top'] = (pos['top'] ? pos['top'] : parseInt(res["scrollTop"] + res["innerHeight"]/2 - div.offsetHeight/2));
		pos['left'] = (pos['left'] ? pos['left'] : parseInt(res["scrollLeft"] + res["innerWidth"]/2 - div.offsetWidth/2));
		
		jsFloatDiv.Show(div, pos["left"], pos["top"], set_shadow, true, false);
		div.style.display = '';
		
		jsUtils.addEvent(document, "keypress", _this.OnKeyPress);
		
		var substrate = document.getElementById("photo_substrate");
		if (!substrate)
		{
			substrate = document.createElement("DIV");
			substrate.id = 	"photo_substrate";
			substrate.style.position = "absolute";
			substrate.style.display = "none";
			substrate.style.background = "#052635";
			substrate.style.opacity = "0.5";
			substrate.style.top = "0";
			substrate.style.left = "0";
			if (substrate.style.MozOpacity)
				substrate.style.MozOpacity = '0.5';
			else if (substrate.style.KhtmlOpacity)
				substrate.style.KhtmlOpacity = '0.5';
			if (jsUtils.IsIE())
		 		substrate.style.filter += "progid:DXImageTransform.Microsoft.Alpha(opacity=50)";
			document.body.appendChild(substrate);
		}
		
		substrate.style.width = res["scrollWidth"] + "px";
		substrate.style.height = res["scrollHeight"] + "px";
		substrate.style.zIndex = 7500;
		substrate.style.display = 'block';
	}

	this.PopupHide = function()
	{
		this.active = (this.active == null && arguments[0] ? arguments[0] : this.active);
		
		this.CheckEvent('BeforeHide');
		
		var div = document.getElementById(this.active);
		if (div)
		{
			jsFloatDiv.Close(div);
			div.style.display = 'none';
			if (!this.just_hide_item) {div.parentNode.removeChild(div); } 
		}
		var substrate = document.getElementById("photo_substrate");
		if (substrate) { substrate.style.display = 'none'; } 

		this.active = null;
		
		jsUtils.removeEvent(document, "keypress", _this.OnKeyPress);
		
		this.CheckEvent('AfterHide');
		this.events = null;
	}

	this.CheckClick = function(e)
	{
		var div = document.getElementById(_this.active);
		
		if (!div || !_this.IsVisible()) { return; }
		if (!jsUtils.IsIE() && e.target.tagName == 'OPTION') { return false; }
		
		var x = e.clientX + document.body.scrollLeft;
		var y = e.clientY + document.body.scrollTop;

		/*menu region*/
		var posLeft = parseInt(div.style.left);
		var posTop = parseInt(div.style.top);
		var posRight = posLeft + div.offsetWidth;
		var posBottom = posTop + div.offsetHeight;
		
		if (x >= posLeft && x <= posRight && y >= posTop && y <= posBottom) { return; }

		if(_this.controlDiv)
		{
			var pos = jsUtils.GetRealPos(_this.controlDiv);
			if(x >= pos['left'] && x <= pos['right'] && y >= pos['top'] && y <= pos['bottom'])
				return;
		}
		_this.PopupHide();
	}

	this.OnKeyPress = function(e)
	{
		if(!e) e = window.event
		if(!e) return;
		if(e.keyCode == 27)
			_this.PopupHide();
	},

	this.IsVisible = function()
	{
		return (document.getElementById(this.active).style.visibility != 'hidden');
	}, 
	
	this.CheckEvent = function()
	{
		if (!this.events || this.events == null)
		{
			return false;
		}
		
		eventName = arguments[0];
		
		if (this.events[eventName]) 
		{ 
			return this.events[eventName](arguments); 
		} 
		return true;
	}
}
var PhotoMenu;
if (!PhotoMenu) 
	PhotoMenu = new PhotoPopupMenu();

var jsUtilsPhoto = {
	GetElementParams : function(element)
	{
		if (!element) return false;
		if (element.style.display != 'none' && element.style.display != null)
			return {width: element.offsetWidth, height: element.offsetHeight};
		var originstyles = {position: element.style.position, visibility : element.style.visibility, display: element.style.display};
		element.style.position = 'absolute';
		element.style.visibility = 'hidden';
		element.style.display = 'block';
		var result = {width: element.offsetWidth, height: element.offsetHeight};
		element.style.display = originstyles.display;
		element.style.visibility = originstyles.visibility;
		element.style.position = originstyles.position;
		return result;
	}, 
	ClassCreate : function(parent, properties)
	{
		function oClass() { 
			this.init.apply(this, arguments); 
		}
		
		if (parent) 
		{
			var temp = function() { };
			temp.prototype = parent.prototype;
			oClass.prototype = new temp;
		}
		
		for (var property in properties)
			oClass.prototype[property] = properties[property];
		if (!oClass.prototype.init)
			oClass.prototype.init = function() {};
		
		oClass.prototype.constructor = oClass;
		
		return oClass;
	}, 
	ObjectsMerge : function(arr1, arr2)
	{
		var arr3 = {};
		for (var key in arr1)
			arr3[key] = arr1[key];
		for (var key in arr2)
			arr3[key] = arr2[key];
		return arr3;
	}
}; 

window.bPhotoMainLoad = true;
/* End */
;
; /* Start:"a:4:{s:4:"full";s:95:"/bitrix/components/bitrix/photogallery.section.list/templates/.default/script.js?14815250647685";s:6:"source";s:80:"/bitrix/components/bitrix/photogallery.section.list/templates/.default/script.js";s:3:"min";s:0:"";s:3:"map";s:0:"";}"*/
function EditAlbum(url)
{
	var oEditAlbumDialog = new BX.CDialog({
		title : '',
		content_url: url + (url.indexOf('?') !== -1 ? "&" : "?") + "AJAX_CALL=Y",
		buttons: [BX.CDialog.btnSave, BX.CDialog.btnCancel],
		width: 600,
		height: 400
	});
	oEditAlbumDialog.Show();

	BX.addCustomEvent(oEditAlbumDialog, "onWindowRegister", function(){
		oEditAlbumDialog.adjustSizeEx();
		var pName = BX('bxph_name');

		if (pName) // Edit album properies
		{
			BX.focus(pName);
			if (BX('bxph_pass_row'))
			{
				BX('bxph_use_password').onclick = function()
				{
					var ch = !!this.checked;
					BX('bxph_pass_row').style.display = ch ? '' : 'none';
					BX('bxph_photo_password').disabled = !ch;
					if (ch)
						BX.focus(BX('bxph_photo_password'));

					oEditAlbumDialog.adjustSizeEx();
				};
			}
		}
		else // Edit album icon
		{
		}
	});

	oEditAlbumDialog.ClearButtons();
	oEditAlbumDialog.SetButtons([
		new BX.CWindowButton(
		{
			title: BX.message('JS_CORE_WINDOW_SAVE'),
			id: 'savebtn',
			action: function()
			{
				var pForm = oEditAlbumDialog.Get().getElementsByTagName('form')[0];
				if (pForm.action.indexOf('icon') == -1)
					CheckForm(pForm);
				else // Edit album icon
					CheckFormEditIcon(pForm);
			}
		}),
		oEditAlbumDialog.btnCancel
	]);

	window.oPhotoEditAlbumDialog = oEditAlbumDialog;
}

function CheckForm(form)
{
	if (typeof form != "object")
		return false;

	oData = {"AJAX_CALL" : "Y"};
	for (var ii in form.elements)
	{
		if (form.elements[ii] && form.elements[ii].name)
		{
			if (form.elements[ii].type && form.elements[ii].type.toLowerCase() == "checkbox")
			{
				if (form.elements[ii].checked == true)
					oData[form.elements[ii].name] = form.elements[ii].value;
			}
			else
				oData[form.elements[ii].name] = form.elements[ii].value;
		}
	}

	BX.showWait('photo_window_edit');
	window.oPhotoEditAlbumDialogError = false;

	BX.ajax.post(
		form.action,
		oData,
		function(data)
		{
			setTimeout(function(){
				BX.closeWait('photo_window_edit');
				result = {};

				if (window.oPhotoEditAlbumDialogError !== false)
				{
					var errorTr = BX("bxph_error_row");
					errorTr.style.display = "";
					errorTr.cells[0].innerHTML = window.oPhotoEditAlbumDialogError;
					window.oPhotoEditAlbumDialog.adjustSizeEx();
				}
				else
				{
					try
					{
						eval("result = " + data + ";");
						if (result['url'] && result['url'].length > 0)
							BX.reload(result['url']);

						var arrId = {"NAME" : "photo_album_name_", "DATE" : "photo_album_date_", "DESCRIPTION" : "photo_album_description_"};
						for (var ID in arrId)
						{
							if (BX(arrId[ID] + result['ID']))
								BX(arrId[ID] + result['ID']).innerHTML = result[ID];
						}
						var res = BX('photo_album_info_' + result['ID']);

						if (res)
						{
							if (result['PASSWORD'].length <= 0)
								res.className = res.className.replace("photo-album-password", "");
							else
								res.className += " photo-album-password ";
						}
						window.oPhotoEditAlbumDialog.Close();
					}
					catch(e)
					{
						var errorTr = BX("bxph_error_row");
						errorTr.style.display = "";
						errorTr.cells[0].innerHTML = BXPH_MESS.UnknownError;
						window.oPhotoEditAlbumDialog.adjustSizeEx();
					}
				}
			}, 200);
		}
	);
}

function CheckFormEditIcon(form)
{
	if (typeof form != "object")
		return false;

	oData = {"AJAX_CALL" : "Y"};
	for (var ii in form.elements)
	{
		if (form.elements[ii] && form.elements[ii].name)
		{
			if (form.elements[ii].type && form.elements[ii].type.toLowerCase() == "checkbox")
			{
				if (form.elements[ii].checked == true)
					oData[form.elements[ii].name] = form.elements[ii].value;
			}
			else
				oData[form.elements[ii].name] = form.elements[ii].value;
		}
	}
	oData["photos"] = [];
	for (var ii = 0; ii < form.elements["photos[]"].length; ii++)
	{
		if (form.elements["photos[]"][ii].checked == true)
			oData["photos"].push(form.elements["photos[]"][ii].value);
	}

	BX.showWait('photo_window_edit');
	window.oPhotoEditIconDialogError = false;

	BX.ajax.post(
		form.action,
		oData,
		function(data)
		{
			setTimeout(function(){
				BX.closeWait('photo_window_edit');
				var result = {};

				if (window.oPhotoEditIconDialogError !== false)
				{
					var errorCont = BX("bxph_error_cont");
					errorCont.style.display = "";
					errorCont.innerHTML = window.oPhotoEditIconDialogError + "<br/>";
					window.oPhotoEditAlbumDialog.adjustSizeEx();
				}
				else
				{
					try
					{
						eval("result = " + data + ";");
					}
					catch(e)
					{
						result = {};
					}

					if (parseInt(result["ID"]) > 0)
					{
						if (BX("photo_album_img_" + result['ID']))
							BX("photo_album_img_" + result['ID']).src = result['SRC'];
						else if (BX("photo_album_cover_" + result['ID']))
							BX("photo_album_cover_" + result['ID']).style.backgroundImage = "url('" + result['SRC'] + "')";
						window.oPhotoEditAlbumDialog.Close();
					}
					else
					{
						var errorTr = BX("bxph_error_row");
						errorTr.style.display = "";
						errorTr.cells[0].innerHTML = BXPH_MESS.UnknownError;
						window.oPhotoEditAlbumDialog.adjustSizeEx();
					}
				}
			}, 200);
		}
	);
}

function DropAlbum(url, id)
{
	BX.showWait('photo_window_edit');
	window.oPhotoEditAlbumDialogError = false;

	if (id > 0)
	{
		var pAlbum = BX("photo_album_info_" + id);
		if (pAlbum)
			pAlbum.style.display = "none";
	}

	BX.ajax.post(
		url,
		{"AJAX_CALL" : "Y"},
		function(data)
		{
			setTimeout(function(){
				BX.closeWait('photo_window_edit');

				if (window.oPhotoEditAlbumDialogError !== false)
					return alert(window.oPhotoEditAlbumDialogError);

				try
				{
					eval("result = " + data + ";");
					if (result['ID'])
					{
						var pAlbum = BX("photo_album_info_" + result['ID']);
						if (pAlbum && pAlbum.parentNode)
							pAlbum.parentNode.removeChild(pAlbum);
					}
				}
				catch(e)
				{
					if (id > 0)
					{
						var pAlbum = BX("photo_album_info_" + id);
						if (pAlbum && pAlbum.parentNode)
							pAlbum.style.display = "";
					}

					if (window.BXPH_MESS)
						return alert(window.BXPH_MESS.UnknownError);
				}
			}, 200);
		}
	);

	return false;
}

window.__photo_check_name_length_count = 0;
function __photo_check_name_length()
{
	var nodes = document.getElementsByTagName('a');
	var result = false;
	for (var ii = 0; ii < nodes.length; ii++)
	{
		var node = nodes[ii];
		if (!node.id.match(/photo\_album\_name\_(\d+)/gi))
			continue;
		result = true;
		if (node.offsetHeight <= node.parentNode.offsetHeight)
			continue;
		var div = node.parentNode;
		var text = node.innerHTML.replace(/\<wbr\/\>/gi, '').replace(/\<wbr\>/gi, '').replace(/\&shy\;/gi, '');
		while (div.offsetHeight < node.offsetHeight || div.offsetWidth < node.offsetWidth)
		{
			if ((div.offsetHeight  < (node.offsetHeight / 2)) || (div.offsetWidth < (node.offsetWidth / 2)))
				text = text.substr(0, parseInt(text.length / 2));
			else
				text = text.substr(0, (text.length - 2));
			node.innerHTML = text;
		}
		node.innerHTML += '...';
		if (div.offsetHeight < node.offsetHeight || div.offsetWidth < node.offsetWidth)
			node.innerHTML = text.substr(0, (text.length - 3)) + '...';
	}
	if (!result)
	{
		window.__photo_check_name_length_count++;
		if (window.__photo_check_name_length_count < 7)
			setTimeout(__photo_check_name_length, 250);
	}
}
setTimeout(__photo_check_name_length, 250);
/* End */
;
; /* Start:"a:4:{s:4:"full";s:102:"/bitrix/components/bitrix/photogallery.detail.list.ex/templates/.default/script.min.js?148152506375605";s:6:"source";s:82:"/bitrix/components/bitrix/photogallery.detail.list.ex/templates/.default/script.js";s:3:"min";s:86:"/bitrix/components/bitrix/photogallery.detail.list.ex/templates/.default/script.min.js";s:3:"map";s:86:"/bitrix/components/bitrix/photogallery.detail.list.ex/templates/.default/script.map.js";}"*/
(function(window){window.BXPhotoSlider=function(t){var e=this;this.MESS=t.MESS;this.bSceletonCreated=false;this.id=t.id||"bxph_detail_list";this.uniqueId=t.uniqueId;this.itemsCount=t.itemsCount;this.actionUrl=t.actionUrl;this.responderUrl=t.responderUrl;this.actionPostUrl=t.actionUrl===true?this.actionUrl:false;this.sign=t.sign;this.reqParams=t.reqParams;this.checkParams=t.checkParams;this.userSettings=t.userSettings;this.itemsPageSize=t.itemsPageSize;this.bSectionOpened=this.userSettings.detail_view=="Y";this.reloadItemsOnload=t.reloadItemsOnload;this.cacheRaitingReq=t.cacheRaitingReq;this._bFirstDisplay=true;this.bArrowControllEnabled=true;this.bEscCloseEnabled=true;this.userUrl=t.userUrl;this.sectionUrl=t.sectionUrl;this.pElementsCont=t.pElementsCont;this.srcIndex={};this.sections={};for(var i in t.sections)this.sections[t.sections[i]["ID"]]=t.sections[i]["NAME"];this.perm=t.permissions;this.perm.view=!!this.perm.view;this.perm.edit=!!this.perm.edit;this.perm.moderate=!!this.perm.moderate;this.perm.viewComment=!!this.perm.viewComment;this.perm.addComment=!!this.perm.addComment;this.useComments=t.useComments=="Y"&&this.perm.viewComment;this.commentsType=t.commentsType=="blog"?"blog":"forum";this.useRatings=t.useRatings=="Y";this.bShowSourceLink=t.showSourceLink!="N";this.bShowEditControls=this.perm.edit;this.showViewsCont=t.showViewsCont!=="N";this.Mode=this.userSettings.view_mode=="auto"?"auto":"fixed";this.moderation=t.moderation=="Y";this.theme=this.userSettings.theme=="light"?"light":"dark";this.bChangeTheme=true;this.itemUrl=t.itemUrl;this.itemUrlHash=t.itemUrlHash;this.player=false;this.Items=[];this.ItemIndex={};this.currentIndex=0;this.PageQueue={};this.LoadedPages={};this.LoadedPages[parseInt(t.currentPage)]=true;this.fixedSize=735;this.Rotated={};this.state="ready";this.showAddCommentsCount=1;this.HandleItems(t.items);this.AttachThumbnailsEvents();if(window.location.hash)window.location.hash.replace(new RegExp(this.itemUrlHash.replace("#ELEMENT_ID#","(\\d+)"),"ig"),function(t,i){e.currentItem=parseInt(i)||0});if(!this.currentItem)this.currentItem=parseInt(t.currentItem)||0;if(this.currentItem>0){if(typeof this.ItemIndex[this.currentItem]!="undefined"){this.OpenPopup(this.currentItem)}else{BX.showWait("photo_load_items");BX.addCustomEvent(this,"OnAfterItemsLoaded",BX.proxy(this.OnAfterCurrentItemsLoaded,this));this.LoadItems(this.currentItem,false,false)}}BX.addCustomEvent(window,"onMoreItemsLoaded",BX.proxy(this.OnMoreItemsLoaded,this))};window.BXPhotoSlider.prototype={HandleItems:function(t){for(var e in t){t[e].index=parseInt(t[e].index);t[e].comments=parseInt(t[e].comments)||0;t[e].shows=parseInt(t[e].shows)||0;this.Items[t[e].index]=t[e];this.ItemIndex[t[e].id]=t[e].index;t[e].bShowed=false}BX.onCustomEvent(this,"OnAfterItemsHandled",[this.Items]);if(this.oTopSlider&&!this.reloadItemsOnload)this.oTopSlider.HandleItems(this.Items)},OpenPopup:function(t){this.windowInnerSize=BX.GetWindowInnerSize(document);if(top.oBXPhotoList&&top.oBXPhotoList[this.uniqueId]&&top.oBXPhotoList[this.uniqueId].bWasJustDragged)return;if(this.currentItem>0){var e=this.GetById(t);var i=this.sectionUrl.replace("#SECTION_ID#",e.album_id);if(e.gallery_id)i=i.replace("#USER_ALIAS#",e.gallery_id);this.startLocation={href:i,hash:""}}else this.startLocation={href:window.location.href,hash:window.location.hash};this.startWndSize=BX.GetWindowScrollPos();if(!this.bSceletonCreated||!BX.isNodeInDom(this.pFixedOverlay))this.CreateSceleton();if(!this.bAjaxNaviEnabled)this.InitAjaxNavi();this.pFixedOverlay.style.display="";this.bPopupOpened=true;this.InitPopupEvents(true);this.ChangeMode(this.Mode,false);this.DisplayItem(t);if(this.reloadItemsOnload){this._currentItemId=t;BX.addCustomEvent(this,"OnBeforeItemsLoaded",BX.proxy(this._CleanItemsArray,this));BX.addCustomEvent(this,"OnAfterItemsHandled",BX.proxy(this._RedisplayItemAfterItemsReloading,this));this.LoadItems(parseInt(this.reloadItemsOnload),false,false)}BX.addClass(document.body,"photo-body-overlay");if(!BX.browser.IsDoctype()&&BX.browser.IsIE())this.pFixedOverlay.style.top=BX.GetWindowScrollPos(document).scrollTop+"px"},ClosePopup:function(){if(this.bPopupOpened){this._bFirstDisplay=true;this.pFixedOverlay.style.display="none";this.bPopupOpened=false;this.InitPopupEvents(false);BX.removeClass(document.body,"photo-body-overlay");this.SetUrl(this.startLocation.href,this.startLocation.hash);this.SaveRotatedItems();if(BX.browser.IsIE()){var t=this,e;setTimeout(function(){e=BX.GetWindowScrollPos();if(e.scrollTop!=t.startWndSize.scrollTop)BX.GetDocElement().scrollTop=t.startWndSize.scrollTop},100);setTimeout(function(){e=BX.GetWindowScrollPos();if(e.scrollTop!=t.startWndSize.scrollTop)BX.GetDocElement().scrollTop=t.startWndSize.scrollTop},300)}}return false},InitPopupEvents:function(t){if(t===true){BX.bind(document,"keyup",BX.proxy(this.OnKeyUp,this));BX.bind(window,"beforeunload",BX.proxy(this.SaveRotatedItems,this));BX.bind(window,"resize",BX.proxy(this.OnResize,this))}else{BX.unbind(document,"keyup",BX.proxy(this.OnKeyUp,this));BX.unbind(window,"beforeunload",BX.proxy(this.SaveRotatedItems,this));BX.unbind(window,"resize",BX.proxy(this.OnResize,this))}},InitAjaxNavi:function(){var t=this;this.oAjaxNavi={pObj:this,getState:function(){if(this.pObj&&this.pObj.Items&&this.pObj.Items[this.pObj.currentIndex])return{index:this.pObj.currentIndex,id:this.pObj.Items[this.pObj.currentIndex].id};return{}},setState:function(e){if(e&&e.id)t.DisplayItem(e.id,true,false)}};BX.ajax.history.init(this.oAjaxNavi)},SetUrl:function(t,e){BX.ajax.history.put(this.oAjaxNavi.getState(),t,e)},Previous:function(t){if(this.slideShowStatus=="play")this.StopSlideShow();return this.ShowItem(this.currentIndex-1,"prev",t!==false)},Next:function(t,e){if(!e&&this.slideShowStatus=="play")this.StopSlideShow();return this.ShowItem(this.currentIndex+1,"next",t!==false)},ShowItem:function(t,e,i,s){this.SaveRotatedItems(true);if(!this.Items||!this.Items.length)return;var o=false;if(t>=this.itemsCount){t=0;o="first";if(!i||this.itemsCount<=1)return false}else if(t<0){t=this.itemsCount-1;o="last";if(!i||this.itemsCount<=1)return false}if(this.Items[t]){this.DisplayItem(this.Items[t].id,s)}else{if(!e)return;if(o===false)o=this.Items[e=="next"?t-1:t+1].id;this.LoadItems(o,e)}return true},LoadPage:function(t){if(this.itemsPageCount&&this.itemsPageCount<t){if(this.PageQueue[t])delete this.PageQueue[t];return}if(!this.LoadedPages[t]&&!this.PageQueue[t]){if(this.state=="loading")this.PageQueue[t]=true;else this.LoadItems("page",false,false,t)}},LoadItems:function(t,e,i,s){var o={UCID:this.uniqueId,sessid:BX.bitrix_sessid(),current:{id:t},include_subsection:"Y",return_array:"Y",ELEMENT_ID:t,AJAX_CALL:"Y"};if(e!==false)o.direction=e=="next"?"next":"prev";this.state="loading";if(t=="last")o.last_page=Math.ceil(this.itemsCount/this.itemsPageSize);if(t=="page")o.page_num=parseInt(s)||0;var n=this;window.bxphres=false;BX.onCustomEvent(this,"OnBeforeItemsLoaded",[o]);BX.ajax.get(this.actionUrl,o,function(t){setTimeout(function(){n.CheckActionPostUrl();if(window.bxphres.itemsPageSize)n.itemsPageSize=parseInt(window.bxphres.itemsPageSize);if(window.bxphres.itemsCount)n.itemsCount=parseInt(window.bxphres.itemsCount);if(window.bxphres.pageCount)n.itemsPageCount=parseInt(window.bxphres.pageCount);if(window.bxphres&&window.bxphres.items)n.HandleItems(window.bxphres.items);n.LoadedPages[parseInt(window.bxphres.currentPage)]=true;if(n.PageQueue[parseInt(window.bxphres.currentPage)]===true)delete n.PageQueue[parseInt(window.bxphres.currentPage)];n.state="ready";if(i!==false){if(e=="next")n.Next();else if(e=="prev")n.Previous()}BX.onCustomEvent(n,"OnAfterItemsLoaded");var t,s;for(t in n.PageQueue)if(n.PageQueue[t]===true&&!n.LoadedPages[t])s=t;if(s)n.LoadItems("page",false,false,s)},100)})},PreloadItems:function(){return;var t=false;var e=false;if(this.minIndex>0&&this.currentIndex-this.minIndex<10)t=true;else if(this.maxIndex<this.itemsCount-1&&this.maxIndex-this.currentIndex<30)e=true;else if(this.minIndex>0&&this.currentIndex-this.minIndex<30)t=true;if(!this._iterrations)this._iterrations=0;if(++this._iterrations>30)return clearInterval(this.preloadItemsInt);if(t)return this.LoadItems(this.Items[this.minIndex].id,"prev",false);if(e)return this.LoadItems(this.Items[this.maxIndex].id,"next",false);if(this.minIndex==0&&this.maxIndex==this.itemsCount-1)clearInterval(this.preloadItemsInt)},GetById:function(t){if(typeof this.ItemIndex[t]!="undefined"&&this.Items[this.ItemIndex[t]])return this.Items[this.ItemIndex[t]];return false},OnAfterItemLoad:function(){},DisplayItem:function(t,e,i){var s=this;if(this._DisplayTimeout){clearTimeout(this._DisplayTimeout);this._DisplayTimeout=null}var o=this.GetById(t);if(o===false){this._DisplayTimeout=setTimeout(function(){s.DisplayItem(t,e)},100);return}if(o===false||this.currentIndex===parseInt(o.index)&&!this._bFirstDisplay)return;this._bFirstDisplay=false;this.currentIndex=parseInt(o.index);if(i!==false&&!this.reloadItemsOnload){var n=this.itemUrl.replace("#ELEMENT_ID#",t);n=n.replace("#SECTION_ID#",o.album_id);if(o.gallery_id)n=n.replace("#USER_ALIAS#",o.gallery_id);var r=this.itemUrlHash.replace("#ELEMENT_ID#",t);r=r.replace("#SECTION_ID#",o.album_id);if(o.gallery_id)r=r.replace("#USER_ALIAS#",o.gallery_id);this.SetUrl(n,r)}this.topPager.current.innerHTML=parseInt(o.index)+1;this.topPager.count.innerHTML=parseInt(this.itemsCount)<parseInt(o.index)+1?parseInt(o.index)+1:this.itemsCount;if(this.RotateCont&&this.RotateCont.parentNode){this.RotateCont.parentNode.removeChild(this.RotateCont);this.RotateCont=null}o.srcLoaded=false;if(this.pImage&&this.pImage.parentNode)this.pImage.parentNode.removeChild(this.pImage);if(o.saveRotationProcess){this.pImageWait.style.display=""}else{var h=o.big_src||o.src;this.pImage=this.pImgCell.appendChild(BX.create("IMG",{props:{src:h,className:"photo-image-loading",id:"bx-ph-"+o.id}}));this.pImageWait.style.display="";this.pImage.onload=function(){s.ImageOnload(parseInt(this.id.substr("bx-ph-".length)))};if(this._photoOnloadInterval){clearInterval(this._photoOnloadInterval);this._photoOnloadInterval=null}if(!s.pImage.complete&&!o.srcLoaded){this._photoOnloadInterval=setInterval(function(){if(s.pImage.complete)s.ImageOnload(o.id);if(o.srcLoaded){clearInterval(s._photoOnloadInterval);s._photoOnloadInterval=null}},100)}else{this.ImageOnload(o.id)}this.CleanRotation(false);this.CheckImageSize(o)}this.CheckFullModeDisplay(o);this.DisplayItemDetails(o);this.pCommentsCont.innerHTML="";this.ShowComWait(false);if(this.useComments){o.comments=parseInt(o.comments);if(o.comments>0){this.pComCount.innerHTML=o.comments;if(this.reloadItemsOnload)this.ShowComWait(true)}if(!this.reloadItemsOnload){if(o.comments>0){this.pShowMoreComLink.style.display="none";if(o.savedComments&&this._CommentsParams){this.pCommentsCont.innerHTML=o.savedComments;this._CommentsParams.navParams=o.savedNavparams;this.UpdateCommentsCount()}else{this.GetComments(o.id)}}else{if(!this._CommentsParams)this.GetComments(o.id);this.pShowMoreComLink.style.display="none";this.pComCount.innerHTML="0"}if(this._CommentsParams&&this.perm.addComment){if(this._CommentsParams.elementId)this._CommentsParams.elementId.value=o.id;if(this._CommentsParams.textarea){this._CommentsParams.textarea.value=o.savedCommentText||"";this.CheckTextareaActivity(this._CommentsParams.textarea,true)}}if(this.perm.addComment){if(this.commentsType=="forum"){if(o.comments>this.showAddCommentsCount){this.pAddCommentForm.style.display="none";this.pAddComLink.style.display=""}else{this.pAddCommentForm.style.display="block";this.pAddComLink.style.display="none"}}else{this.pAddCommentForm.style.display="block"}}}}this.pActionsCont.style.display=this.reloadItemsOnload?"none":"";if(this.oTopSlider&&e!==false)this.oTopSlider.SelectItem(o);if(!o.bShowed||this.useRatings)this.OnItemShowed(o)},DisplayItemDetails:function(t){this.CancelItemDescription(t);var e=this.sectionUrl.replace("#SECTION_ID#",t.album_id);if(t.gallery_id)e=e.replace("#USER_ALIAS#",t.gallery_id);this.pAlbumLink.href=e;this.pAlbumLink.innerHTML=t.album_name;this.pAuthorLink.href=this.userUrl.replace(/#USER_ID#/gi,t.author_id);if(t.gallery_id&&this.pAuthorLink.href.toLowerCase().indexOf("#user_alias#"))this.pAuthorLink.href=this.pAuthorLink.href.replace(/#USER_ALIAS#/gi,t.gallery_id);this.pAuthorLink.innerHTML=t.author_name;if(this.pViews)this.pViews.innerHTML=t.shows;this.pTags.innerHTML="";if(t.tags!=""){this.pTags.parentNode.style.display="";if(t.tags_array){this.pTags.appendChild(BX.create("SPAN",{text:this.MESS.tags+": "}));for(var i=0,s=t.tags_array.length;i<s;i++){name=t.tags_array[i]["TAG_NAME"];href=t.tags_array[i]["TAG_URL"];this.pTags.appendChild(BX.create("A",{props:{href:href},text:name}));if(i<s-1)this.pTags.appendChild(document.createTextNode(", "))}}else{this.pTags.innerHTML=this.MESS.tags+": "+BX.util.htmlspecialchars(t.tags)}}else{this.pTags.parentNode.style.display="none"}this.pDate.innerHTML=this.MESS.created+" "+t.date;if(this.bShowSourceLink)this.pSourceLink.href=t.big_src||t.src;if(this.moderation)this.SetWarning(t["active"]!="Y"?"active":false)},SetWarning:function(t){if(!this.pTopWarning)this.pTopWarning=this.pImgCell.appendChild(BX.create("DIV"));this.pTopWarning.className="photo-top-warning"+(t?" photo-top-not-"+t:"");if(t=="active"){this.pTopWarning.style.top=Math.round((parseInt(this.pImgCell.offsetHeight)/2||300)-10)+"px";this.pTopWarning.innerHTML="<span>"+this.MESS.notModerated+"</span>";if(this.perm.moderate){var e=this.pTopWarning.appendChild(BX.create("A",{props:{href:"javascript: void(0)",className:"photo-top-not-warn-link"},html:this.MESS.activateNow}));e.onclick=BX.proxy(this.ActivateItem,this);var i=this.pTopWarning.appendChild(BX.create("A",{props:{href:"javascript: void(0)",className:"photo-top-not-warn-link"},html:this.MESS.deleteNow}));i.onclick=BX.proxy(this.DeleteItem,this)}}},ImageOnload:function(t){var e=this.GetById(t);if(e.index==this.currentIndex&&!e.srcLoaded){e.srcLoaded=true;this.pImageWait.style.display="none";BX.removeClass(this.pImage,"photo-image-loading");BX.onCustomEvent(this,"OnItemLoaded",[e]);setTimeout(BX.proxy(this.AdjustControls,this),100);this.PreloadImages(e)}},CreateSceleton:function(){var t=this;var e=BX.findChild(document.body,{className:"photo-fixed-overlay"});if(e)BX.cleanNode(e,true);this.pFixedOverlay=document.body.appendChild(BX.create("DIV",{props:{className:!BX.browser.IsDoctype()&&BX.browser.IsIE()?"photo-fixed-overlay photo-quirks-mode":"photo-fixed-overlay sds"}}));this.pTable=this.pFixedOverlay.appendChild(BX.create("TABLE",{props:{className:"photo-main-table",cellSpacing:0}}));var i=this.pTable.insertRow(-1);var s=BX.adjust(i.insertCell(-1),{attrs:{className:"photo-prev-slide-wrap"}}),o=BX.adjust(i.insertCell(-1),{attrs:{className:"photo-main-block-wrap"}}),n=BX.adjust(i.insertCell(-1),{attrs:{className:"photo-next-slide-wrap"}});this.pMainCell=o;this.prevPhotoLink=s.appendChild(BX.create("a",{props:{href:"javascript: void(0)",className:"photo-prev-slide"},html:"<span></span>"}));this.closeLink=n.appendChild(BX.create("a",{props:{href:"javascript: void(0)",className:"photo-close"},html:"<span></span>"}));this.nextPhotoLink=n.appendChild(BX.create("a",{props:{href:"javascript: void(0)",className:"photo-next-slide"},html:"<span></span>"}));this.prevPhotoLink.onclick=BX.proxy(this.Previous,this);this.nextPhotoLink.onclick=BX.proxy(this.Next,this);this.closeLink.onclick=BX.proxy(this.ClosePopup,this);this.pOverlay=this.pFixedOverlay.appendChild(BX.create("DIV",{props:{className:"photo-overlay"},style:{height:"800px"}}));this.pPopup=o.appendChild(BX.create("DIV",{props:{className:"photo-wrap"}})).appendChild(BX.create("DIV",{props:{className:"photo-main"}}));this.pPopupTop=this.pPopup.appendChild(BX.create("DIV",{props:{className:"photo-top"}}));var r=this.pPopupTop.appendChild(BX.create("DIV",{props:{className:"photo-top-nav"}})),h=r.appendChild(BX.create("DIV",{props:{className:"photo-pager"},html:'<span class="photo-current-page">#</span><span>'+this.MESS.from+'</span><span class="photo-last-page">#</span>'})),a=r.appendChild(BX.create("DIV",{props:{className:"photo-top-nav-buttons"}}));this.topPager={current:h.childNodes[0],count:h.childNodes[2]};this.pTopSliderBut=a.appendChild(BX.create("A",{props:{className:"photo-slider-button",href:"javascript: void(0)"},html:"<span>"+this.MESS.slider+"</span><i></i>"}));this.pMinimizeBut=a.appendChild(BX.create("A",{props:{className:"photo-full-screen-but",href:"javascript: void(0)"}}));this.pCloseBut=a.appendChild(BX.create("A",{props:{className:"photo-close-but",href:"javascript: void(0)"}}));this.pCloseBut.onclick=BX.proxy(this.ClosePopup,this);this.pMinimizeBut.onclick=BX.proxy(this.ChangeMode,this);this.pScrollCont=r.appendChild(BX.create("DIV",{props:{className:"photo-scroll"}}));this.pScroller=this.pScrollCont.appendChild(BX.create("A",{props:{className:"photo-scroll-wheel"}}));this.pSliderCont=this.pPopupTop.appendChild(BX.create("DIV",{props:{className:"photo-slider"}}));this.pSlider=this.pSliderCont.appendChild(BX.create("DIV",{props:{className:"photo-slider-int"}}));this.oTopSlider=new BXTopSlider(this);this.pImageTable=this.pPopup.appendChild(BX.create("TABLE",{props:{className:"photo-image",cellSpacing:0}}));this.pImageTable.onclick=BX.proxy(this.Next,this);this.pImgCell=this.pImageTable.insertRow(-1).insertCell(-1);this.pImageWait=this.pImgCell.appendChild(BX.create("IMG",{props:{src:"/bitrix/images/1.gif",className:"photo-image-wait"},style:{display:"none"}}));this.pImage=this.pImgCell.appendChild(BX.create("IMG",{props:{src:"/bitrix/images/1.gif"}}));this.pPopupFooter=this.pPopup.appendChild(BX.create("DIV",{props:{className:"photo-footer"}}));var l=this.pPopupFooter.appendChild(BX.create("DIV",{props:{className:"photo-descriptions"}})),d=l.appendChild(BX.create("DIV",{props:{className:"photo-description-left"}})),p=l.appendChild(BX.create("DIV",{props:{className:"photo-description-right"}}));this.pDescCont=d.appendChild(BX.create("SPAN",{props:{className:"photo-description-text"}}));if(this.bShowEditControls){this.pAddDescLink=d.appendChild(BX.create("A",{props:{className:"photo-qt-desc",href:"javascript: void(0)"},text:this.MESS.addDesc}));this.pAddDescLink.onclick=BX.proxy(this.EditItemDescription,this)}this.pDesc=this.pDescCont.appendChild(BX.create("SPAN"));if(this.bShowEditControls){this.pEditDesc=this.pDescCont.appendChild(BX.create("A",{props:{href:"javascript:void(0)"}}));this.pEditDesc.onclick=BX.proxy(this.EditItemDescription,this);this.pEditDescCont=d.appendChild(BX.create("DIV",{props:{className:"photo-sign-wrap"}}));this.pEditDescInp=this.pEditDescCont.appendChild(BX.create("TEXTAREA",{props:{className:"photo-textarea photo-textarea-active"}}));this.pEditDescSave=this.pEditDescCont.appendChild(BX.create("A",{props:{className:"photo-comment-add",href:"javascript:void(0)",title:this.MESS.saveDetailTitle},html:"<span>"+this.MESS.save+"</span><i></i>"}));this.pEditDescCancel=this.pEditDescCont.appendChild(BX.create("A",{props:{className:"photo-comment-add",href:"javascript:void(0)"},html:"<span>"+this.MESS.cancel+"</span><i></i>"}));this.pEditDescSave.onclick=BX.proxy(this.SaveItemDescription,this);this.pEditDescCancel.onclick=BX.proxy(this.CancelItemDescription,this);this.pEditDescInp.onkeyup=function(e){if(!e)e=window.event;if(!e)return;var i=e.keyCode||e.which;if(i==17){t._bCtrlPressed=true;setTimeout(function(){t._bCtrlPressed=false},400)}else if(i==13&&(e.ctrlKey||t._bCtrlPressed)){if(t.bItemDescEdited)t.SaveItemDescription()}return BX.PreventDefault(e)}}if(this.useRatings){this.pRatingCont=p.appendChild(BX.create("SPAN",{props:{id:"bx-photo-rating-cont",className:"photo-rating"}}));if(!BX.browser.IsDoctype()&&BX.browser.IsIE())this.pRatingCont.style.margin="3px 10px 0 0"}this.pSlideshowCont=p.appendChild(BX.create("SPAN",{props:{className:"photo-slideshow"}}));this.pSlideshow=this.pSlideshowCont.appendChild(BX.create("A",{props:{className:"photo-slideshow-button",title:this.MESS.slideshowTitle},html:'<span class="photo-slideshow-button-text">'+this.MESS.slideshow+':</span><span class="photo-slideshow-button-img"></span><i></i>'}));this.pSlideshow.onclick=BX.proxy(this.RunSlideShow,this);this.pExtendDescCont=this.pPopupFooter.appendChild(BX.create("DIV",{props:{className:"photo-comments no-comment"}}));var m=this.pExtendDescCont.appendChild(BX.create("DIV",{props:{className:"photo-comments-left"}})),c=this.pExtendDescCont.appendChild(BX.create("DIV",{props:{className:"photo-comments-right"}})),u=c.appendChild(BX.create("DIV",{props:{className:"photo-comments-right-info"}})),f=u.appendChild(BX.create("DIV",{props:{className:"photo-album"},children:[BX.create("SPAN",{props:{className:"photo-comments-right-grey"},text:this.MESS.album+": "})]})),I=u.appendChild(BX.create("DIV",{props:{className:"photo-comments-author"},children:[BX.create("SPAN",{props:{className:"photo-comments-right-grey"},text:this.MESS.author+": "})]}));if(this.showViewsCont){var C=u.appendChild(BX.create("DIV",{props:{className:"photo-comments-author"},children:[BX.create("SPAN",{props:{className:"photo-comments-right-grey"},text:this.MESS.views+": "})]}));this.pViews=C.appendChild(BX.create("SPAN",{props:{className:"photo-comments-right-grey"}}))}var S=u.appendChild(BX.create("DIV",{props:{className:"photo-comments-author"}}));this.pAlbumLink=f.appendChild(BX.create("A",{props:{href:"#"},html:"album"}));this.pAuthorLink=I.appendChild(BX.create("A",{props:{href:"#"},html:"author"}));this.pDate=u.appendChild(BX.create("DIV",{props:{className:"photo-comments-add_date"}}));this.pTags=S.appendChild(BX.create("SPAN",{props:{className:"photo-comments-right-grey"}}));this.pActionsCont=c.appendChild(BX.create("DIV"));var v=this.pActionsCont.appendChild(BX.create("DIV",{props:{className:"photo-comments-edit-wrap"}}));if(this.bShowEditControls){var w=v.appendChild(BX.create("A",{props:{href:"javascript: void(0)",className:"photo-comments-button"},html:this.MESS.edit})),g=v.appendChild(BX.create("A",{props:{href:"javascript: void(0)",className:"photo-comment-undo",title:this.MESS.rotate}})),x=v.appendChild(BX.create("A",{props:{href:"javascript: void(0)",className:"photo-comment-redo",title:this.MESS.rotate}})),b=this.pActionsCont.appendChild(BX.create("A",{props:{href:"javascript: void(0)",className:"photo-comments-button"},html:this.MESS.del}));g.onclick=function(e){t.RotateItem(true);return BX.PreventDefault(e)};x.onclick=function(e){t.RotateItem(false);return BX.PreventDefault(e)};b.onclick=BX.proxy(this.DeleteItem,this);w.onclick=BX.proxy(this.EditItem,this)}this.pBigPhoto=this.pActionsCont.appendChild(BX.create("A",{props:{href:"javascript: void(0)",className:"photo-comments-button"},html:this.MESS.bigPhoto}));this.pBigPhoto.onclick=BX.proxy(this.ChangeMode,this);if(this.bShowSourceLink){this.pSourceLink=this.pActionsCont.appendChild(BX.create("A",{props:{href:"javascript: void(0)",className:"photo-comments-button"},html:this.MESS.sourceImage}));this.pSourceLink.onclick=BX.proxy(this.ShowSource,this)}this.pComWaiter=m.appendChild(BX.create("IMG",{props:{className:"photo-wait-comments",src:"/bitrix/images/1.gif"},style:{display:"none"}}));this.pShowMoreComLink=m.appendChild(BX.create("A",{props:{className:"photo-more-comments",href:"javascript:void(0)"},html:this.MESS.moreCom,style:{display:"none"}}));this.pCommentsCont=m.appendChild(BX.create("DIV"));this.pShowMoreComLink.onclick=BX.proxy(this.ShowMoreComments,this);this.pAddCommentForm=m.appendChild(BX.create("DIV"));if(!this.perm.addComment&&this.useComments)m.appendChild(BX.create("DIV",{props:{className:"photo-comments-warning"},text:this.MESS.comAccessDenied}));if(this.perm.addComment){this.pAddComLink=m.appendChild(BX.create("A",{props:{className:"photo-comments-add",href:"javascript:void(0)"},html:this.MESS.addComment,style:{display:"none"}}));this.pAddComLink.onclick=function(){t.pAddCommentForm.style.display="block";t.pAddComLink.style.display="none";if(t._CommentsParams&&t._CommentsParams.textarea)t.CheckTextareaActivity(t._CommentsParams.textarea,false);t.AdjustOverlay()}}this.pComCountLink=this.pPopupFooter.appendChild(BX.create("A",{props:{className:"photo-qt-comments",href:"javascript: void(0)"},html:this.MESS.commentsCount+": "}));this.pComCount=this.pComCountLink.appendChild(BX.create("SPAN",{html:"0"}));this.pExFlipper=this.pPopupFooter.appendChild(BX.create("A",{props:{className:"photo-open-footer",href:"javascript: void(0)"},html:"<i></i>"}));this.pExFlipper.onclick=this.pComCountLink.onclick=BX.proxy(this.OpenExtDescription,this);if(this.bChangeTheme){this.pThemeLink=this.pPopupFooter.appendChild(BX.create("A",{props:{className:"photo-dark-theme-link",href:"javascript: void(0)"}}));this.pThemeLink.onclick=BX.proxy(this.SetTheme,this)}this.OpenExtDescription(this.bSectionOpened,false);this.bSceletonCreated=true;this.SetUnselectable([this.pTopSliderBut,this.pMinimizeBut,this.pCloseBut,this.pScrollCont,this.pScroller,this.pSliderCont,this.pSlider]);if(!this.useComments){m.appendChild(u);BX.addClass(u,"photo-comments-right-info-left");this.pComCountLink.style.display="none"}this.SetTheme(this.theme,false);this.OnResize()},AdjustControls:function(){if(this.itemsCount<=1){this.nextPhotoLink.style.display=this.prevPhotoLink.style.display="none"}else{this.nextPhotoLink.style.display=this.prevPhotoLink.style.display="";if(!BX.browser.IsDoctype()&&BX.browser.IsIE()){this.nextPhotoLink.style.height=this.prevPhotoLink.style.height=document.documentElement.offsetHeight+"px";this.prevPhotoLink.style.width=this.prevPhotoLink.parentNode.clientWidth-1+"px";this.nextPhotoLink.style.width=this.nextPhotoLink.parentNode.clientWidth-1+"px"}else{this.nextPhotoLink.style.height=this.prevPhotoLink.style.height=document.documentElement.clientHeight+"px";this.prevPhotoLink.style.width=this.prevPhotoLink.parentNode.clientWidth+"px";this.nextPhotoLink.style.width=this.nextPhotoLink.parentNode.clientWidth+"px"}this.prevPhotoLink.firstChild.style.left=this.prevPhotoLink.parentNode.clientWidth*4/10+"px";this.nextPhotoLink.firstChild.style.right=this.nextPhotoLink.parentNode.clientWidth*4/10+"px"}this.closeLink.style.width=this.closeLink.parentNode.clientWidth+"px";if(BX.browser.IsChrome()){var t=this.closeLink.firstChild;t.style.top="14.5px";setTimeout(function(){t.style.top="15px"},10)}var e=this.Mode=="auto"?parseInt(this.pImageTable.offsetWidth):this.fixedSize;if(!e||e<this.fixedSize)e=this.fixedSize;this.pPopupFooter.style.width=e+"px";this.AdjustOverlay();if(this.oTopSlider)this.oTopSlider.AdjustScroller()},AdjustOverlay:function(){var t=parseInt(this.pTable.offsetHeight)||0,e=parseInt(BX.GetWindowScrollSize(document).scrollHeight)||0;if(t<e)t=e;this.pOverlay.style.height=t+(BX.browser.IsIE10()?250:50)+"px"},OpenExtDescription:function(t,e){if(typeof t!="boolean")t=!this.bSectionOpened;if(t){BX.addClass(this.pExFlipper,"photo-open-footer-open");this.pExtendDescCont.style.display="block";if(this.useComments)this.pComCountLink.style.display="none"}else{BX.removeClass(this.pExFlipper,"photo-open-footer-open");this.pExtendDescCont.style.display="none";if(this.useComments)this.pComCountLink.style.display=""}this.bSectionOpened=t;if(e!==false)this.SaveOption("detail_view",t?"Y":"N");this.AdjustOverlay();return false},OnKeyUp:function(t){if(!t)t=window.event;if(!t)return;var e=t.keyCode||t.which;if(e==27){if(this.bEscCloseEnabled)this.ClosePopup()}else if(e==39){if(this.bArrowControllEnabled)this.Next()}else if(e==37){if(this.bArrowControllEnabled)this.Previous()}else if(e==17){var i=this;this._bCtrlPressed=true;setTimeout(function(){i._bCtrlPressed=false},400)}else if(e==13&&(t.ctrlKey||this._bCtrlPressed)){if(this.bItemDescEdited)this.SaveItemDescription();else if(this.pAddCommentForm.style.display=="block"&&this._CommentsParams)this.SubmitNewComment()}},SetUnselectable:function(t){if(typeof t!="object")t=[t];for(var e=0,i=t.length;e<i;e++){if(!BX.browser.IsIE8())BX.setUnselectable(t[e]);t[e].ondragstart=function(t){return BX.PreventDefault(t)}}},GetComments:function(t){this.ShowComWait(true);var e=this;window.bxph_error=null;BX.ajax.get(this.actionUrl,{UCID:this.uniqueId,photo_list_action:"load_comments",sessid:BX.bitrix_sessid(),photo_element_id:t,AJAX_CALL:"Y"},function(i){setTimeout(function(){e.CheckActionPostUrl();e.ShowComWait(false);if(window.bxph_error){alert(window.bxph_error)}else{if(t!=e.Items[e.currentIndex].id)return;if(e.commentsType=="blog"){e.ParseBlogComments(i)}else{if(e.perm.addComment)e.ParseForm(i);e.AddComments(i)}}},50);var s=function(){setTimeout(function(){BX.onCustomEvent(e,"OnRegisterCommentsControl")},100);BX.removeCustomEvent("onAjaxSuccessFinish",s)};BX.addCustomEvent("onAjaxSuccessFinish",s)})},AddComments:function(t,e){var i=this.Items[this.currentIndex].arCommentInds;if(i&&top._bxArCommentsIds){for(var s in top._bxArCommentsIds){if(i[top._bxArCommentsIds[s]]){var o=BX("bxphoto_com_"+top._bxArCommentsIds[s]);if(o)o.parentNode.removeChild(o)}}}if(e===true)this.pCommentsCont.innerHTML+=this.ParseComments(t);else this.pCommentsCont.innerHTML=this.ParseComments(t)+this.pCommentsCont.innerHTML;this.Items[this.currentIndex].savedComments=this.pCommentsCont.innerHTML;this.AdjustOverlay()},RegisterCommentsControl:function(t){if(t.itemId!=this.Items[this.currentIndex].id)return;if(t.navParams){t.navParams.pageCount=parseInt(t.navParams.pageCount)||0;t.navParams.pageSize=parseInt(t.navParams.pageSize)||0;t.navParams.pagen=parseInt(t.navParams.pagen)||0;t.navParams.NavNum=parseInt(t.navParams.NavNum)||0;t.navParams.nSelectedCount=parseInt(t.navParams.nSelectedCount)||0}this._CommentsParams=t;this.Items[this.currentIndex].savedNavparams=BX.clone(t.navParams,true);if(!this.Items[this.currentIndex].arCommentInds)this.Items[this.currentIndex].arCommentInds={};if(t.arComments)for(var e in t.arComments)this.Items[this.currentIndex].arCommentInds[t.arComments[e]]=true;this.UpdateCommentsCount();var i=this;if(this.perm.addComment&&this._CommentsParams&&this._CommentsParams.textarea&&this._CommentsParams.button){this._CommentsParams.button.onclick=BX.proxy(this.SubmitNewComment,this);this._CommentsParams.textarea.onblur=function(){i.SaveUnpostedComment(this.value);i.CheckTextareaActivity(this,true)};this._CommentsParams.textarea.onkeyup=function(t){i.SaveUnpostedComment(this.value);if(!t)t=window.event;if(!t)return;var e=t.keyCode||t.which;if(e==17){i._bCtrlPressed=true;setTimeout(function(){i._bCtrlPressed=false},400)}else if(e==13&&(t.ctrlKey||i._bCtrlPressed)){if(i.pAddCommentForm.style.display=="block"&&i._CommentsParams)i.SubmitNewComment()}return BX.PreventDefault(t)};this._CommentsParams.textarea.onfocus=function(){i.CheckTextareaActivity(this,false)};this.CheckTextareaActivity(this._CommentsParams.textarea,true);if(this._CommentsParams.guestName){this._CommentsParams.guestName.onblur=function(){i.CheckInputActivity(this,true)};this._CommentsParams.guestName.onfocus=function(){i.CheckInputActivity(this,false)}}if(this._CommentsParams.guestEmail){this._CommentsParams.guestEmail.onblur=function(){i.CheckInputActivity(this,true)};this._CommentsParams.guestEmail.onfocus=function(){i.CheckInputActivity(this,false)}}}},ShowMoreComments:function(){if(!this._CommentsParams||!this._CommentsParams.navParams||this._CommentsParams.navParams.pagen>=this._CommentsParams.navParams.pageCount){this.pShowMoreComLink.style.display="none";return}var t=this;var e={UCID:this.uniqueId,photo_list_action:"load_comments",sessid:BX.bitrix_sessid(),return_more_comments:"Y",photo_element_id:this.Items[this.currentIndex].id,AJAX_CALL:"Y"};e["PAGEN_"+this._CommentsParams.navParams.NavNum]=this._CommentsParams.navParams.pagen+1;top._bxArCommentsIds=false;this.ShowComWait(true);BX.ajax.get(this.actionUrl,e,function(e){setTimeout(function(){t.CheckActionPostUrl();t.AddComments(e);t.ShowComWait(false);BX.onCustomEvent(t,"OnRegisterCommentsControl")},100)})},ParseBlogComments:function(t){t=BX.util.trim(t);var e=this,i=t.indexOf("#BLOG_COMMENTS_BEGIN#"),s=t.indexOf("#BLOG_COMMENTS_END#");

if(i===-1||s===-1)return"";var o=t.substr(i+"#BLOG_COMMENTS_BEGIN#".length,s-i-"#BLOG_COMMENTS_BEGIN#".length);BX.addCustomEvent("onShowPhotoBlogComment",BX.proxy(this.AdjustOverlay,this));BX.addCustomEvent("onAddNewPhotoBlogComment",function(t){if(t){var i=parseInt(t.count);if(parseInt(t.editId)==0)i++;if(parseInt(t.deletedComment)!=0)i--;e.pComCount.innerHTML=i}});this.pAddCommentForm.innerHTML=BX.util.trim(o);this.AdjustOverlay()},ParseComments:function(t){t=BX.util.trim(t);var e=t.indexOf("#COMMENTS_BEGIN#"),i=t.indexOf("#COMMENTS_END#");if(e===-1||i===-1)return"";var s=t.substr(e+"#COMMENTS_BEGIN#".length,i-e-"#COMMENTS_BEGIN#".length);s=BX.util.trim(s);return s},ParseForm:function(t){var e="",i="",s=t.indexOf("#NOTE_BEGIN#"),o=t.indexOf("#NOTE_END#");if(s!==-1&&o!==-1)i=BX.util.trim(t.substr(s+"#NOTE_BEGIN#".length,o-s-"#NOTE_BEGIN#".length));s=t.indexOf("#ADD_COMMENT_BEGIN#");o=t.indexOf("#ADD_COMMENT_END#");if(s!==-1&&o!==-1)e=BX.util.trim(t.substr(s+"#ADD_COMMENT_BEGIN#".length,o-s-"#ADD_COMMENT_BEGIN#".length));this.pAddCommentForm.innerHTML=i+e;if(i!=="")return false;if(e.indexOf("reviews-note-error")!==-1)return false;return true},UpdateCommentsCount:function(){this.pShowMoreComLink.style.display=this._CommentsParams.navParams&&this._CommentsParams.navParams.pageCount>1?"":"none";var t=this.MESS.moreCom,e=this._CommentsParams.navParams.pageSize,i=0,s,o=0,n=this._CommentsParams.navParams.nSelectedCount;this.Items[this.currentIndex].comments=n;for(s in this.Items[this.currentIndex].arCommentInds)o++;i=n-o;if(i<e){e=i;t=this.MESS.moreCom2}if(i<=0)this.pShowMoreComLink.style.display="none";t=t.replace("#N#",e);t=t.replace("#M#",i);this.pShowMoreComLink.innerHTML=t;this.pComCount.innerHTML=n},ShowComWait:function(t){this.pComWaiter.style.display=t?"":"none"},SaveUnpostedComment:function(t){this.Items[this.currentIndex].savedCommentText=t},SubmitNewComment:function(){if(!this._CommentsParams)return;var t=this;var e=this.Items[this.currentIndex].comments<1;var i=this.Items[this.currentIndex].id;this._CommentsParams.textarea.value=BX.util.trim(this._CommentsParams.textarea.value);if(this._CommentsParams.textarea.value==this.MESS.commentTitle)this._CommentsParams.textarea.value="";this._CommentsParams.form.action+="&UCID="+this.uniqueId;top._bxError=false;var s=this._CommentsParams.textarea.value;if(s.length>2){this.ShowComWait(true);BX.ajax.submit(this._CommentsParams.form,function(o){var n=t.ParseForm(o);if(!top._bxError&&n!==false){if(e)return t.GetComments(i);setTimeout(function(){t.AddComments(o,true)},100)}if(n===false){t.pAddCommentForm.style.display="";t.pAddComLink.style.display="none";t._CommentsParams.textarea.value=s}BX.onCustomEvent(t,"OnRegisterCommentsControl");t.ShowComWait(false)});setTimeout(function(){t.pAddCommentForm.style.display="none";t.pAddComLink.style.display="";t.SaveUnpostedComment("");t._CommentsParams.textarea.value="";t._CommentsParams.form.parentNode.removeChild(t._CommentsParams.form)},50)}else{if(this._CommentsParams.textarea.value.length>0)alert(this.MESS.shortComError)}},CheckTextareaActivity:function(t,e){if(!this.perm.addComment)return;var i=BX.util.trim(t.value),s=this.MESS.commentTitle,o="photo-textarea-active";if(e){if(i==""||i==s){t.value=s;BX.removeClass(t,o)}else{BX.addClass(t,o)}this.bArrowControllEnabled=true}else{if(i==""||i==s){t.value="";BX.addClass(t,o);t.focus()}this.bArrowControllEnabled=false}},CheckInputActivity:function(t,e){if(!t)return;var i=BX.util.trim(t.value),s=t.title+"...",o="bxph-photo-active";if(e){if(i==""||i==s){t.value=s;BX.removeClass(t,o)}else{BX.addClass(t,o)}this.bArrowControllEnabled=true}else{if(i==""||i==s){t.value="";BX.addClass(t,o);t.focus()}this.bArrowControllEnabled=false}},SaveOption:function(t,e){BX.userOptions.save("photogallery",this.id,t,e)},RunSlideShow:function(){if(this.slideShowStatus!="play")this.PlaySlideShow(false,this.currentIndex==this.itemsCount-1);else this.StopSlideShow();return false},InitSlideShow:function(){this.bSlideShowInited=true;this.slideShowSpeed=parseInt(this.userSettings.slide_show_speed);if(!this.slideShowSpeed||this.slideShowSpeed<1||this.slideShowSpeed>5)this.slideShowSpeed=3;this.pSlideShowSpeed={};var t=this.pSlideshowCont.appendChild(BX.create("SPAN",{props:{className:"photo-slideshow-speed"}}));var e,i=this;for(e=1;e<=5;e++){this.pSlideShowSpeed[e]=t.appendChild(BX.create("A",{props:{id:"bxph-slide-speed-"+e,className:e==this.slideShowSpeed?"photo-slideshow-speed-active":"",href:"javascript:void(0)"},html:e}));this.pSlideShowSpeed[e].onclick=function(){i.SetSlideShowSpeed(parseInt(this.id.substr("bxph-slide-speed-".length)))}}BX.addCustomEvent(this,"OnItemLoaded",BX.proxy(this.SlideShowItemOnload,this))},SetSlideShowSpeed:function(t){this.slideShowSpeed=t;var e,i=this;for(e=1;e<=5;e++)this.pSlideShowSpeed[e].className=e==this.slideShowSpeed?"photo-slideshow-speed-active":"";this.SaveOption("slide_show_speed",t)},PlaySlideShow:function(t,e){BX.addClass(this.pSlideshowCont,"photo-slideshow-active");if(!this.bSlideShowInited)this.InitSlideShow();var i=this;this.slideShowStatus="play";t=!!t;e=!!e;if(t){this.Next(!!e,true);if(this.currentIndex==this.itemsCount-1&&!e)this.StopSlideShow()}else{setTimeout(function(){if(i.slideShowStatus=="play")i.PlaySlideShow(true,!!e)},this.slideShowSpeed*1e3)}},StopSlideShow:function(){BX.removeClass(this.pSlideshowCont,"photo-slideshow-active");this.slideShowStatus="paused"},SlideShowItemOnload:function(t){if(this.slideShowStatus!="play")return;this.PlaySlideShow(false)},EditItemDescription:function(t){if(this.bShowEditControls){this.bArrowControllEnabled=false;this.bItemDescEdited=true;this.pAddDescLink.style.display="none";this.pEditDescCont.style.display="";this.pDescCont.style.display="none";var e=this.Items[this.currentIndex];this.pEditDescInp.value=e.description;BX.focus(this.pEditDescInp)}return BX.PreventDefault(t)},SaveItemDescription:function(t){i=this;if(!this.actionPostUrl&&t!==false)return setTimeout(function(){i.SaveItemDescription(false)},200);var e=this.Items[this.currentIndex];e._description=e.description;e.description=this.pEditDescInp.value;window.bxph_error=null;var i=this;BX.ajax.post(this.actionPostUrl||this.actionUrl,{UCID:this.uniqueId,photo_list_action:"save_description",sessid:BX.bitrix_sessid(),description:e.description,ELEMENT_ID:e.id},function(t){setTimeout(function(){if(window.bxph_error){alert(window.bxph_error);if(i.currentIndex==e.index)i.EditItemDescription();e.description=e._description}delete e._description},100)});this.CancelItemDescription(e)},CancelItemDescription:function(t){if(!t||t.nodeName||typeof t.description=="undefined")t=this.Items[this.currentIndex];this.bItemDescEdited=false;this.bArrowControllEnabled=true;if(t.description.length>0){if(this.bShowEditControls)this.pAddDescLink.style.display="none";this.pDescCont.style.display="";var e=t.description;e=BX.util.htmlspecialchars(e);e=e.replace(/\n|\r/gi,"<br>");this.pDesc.innerHTML=e}else{if(this.bShowEditControls)this.pAddDescLink.style.display="";this.pDescCont.style.display="none";this.pDesc.innerHTML=""}if(this.bShowEditControls)this.pEditDescCont.style.display="none"},_CleanItemsArray:function(){this.Items=[];this.ItemIndex={};this.currentIndex=0;this.LoadedPages={};if(this.oTopSlider)this.oTopSlider.CleanItems()},_RedisplayItemAfterItemsReloading:function(){if(this._currentItemId>0&&this.reloadItemsOnload){this.reloadItemsOnload=false;this._bFirstDisplay=true;this.DisplayItem(this._currentItemId);this._currentItemId=0;BX.removeCustomEvent(this,"OnBeforeItemsLoaded",BX.proxy(this._CleanItemsArray,this));BX.removeCustomEvent(this,"OnAfterItemsHandled",BX.proxy(this._RedisplayItemAfterItemsReloading,this));if(this.oTopSlider)this.oTopSlider.CheckCurrentShownItems()}},RotateItem:function(t){var e=this.Items[this.currentIndex];if(!e)return;if(!e.angle)e.angle=0;e.angle+=(t?-1:1)*90;if(e.angle<0)e.angle=360+e.angle;else if(e.angle==360)e.angle=0;if(!e.w)e.w=parseInt(this.pImage.offsetWidth);if(!e.h)e.h=parseInt(this.pImage.offsetHeight);if(e.angle==0||e.angle==180){this.pImage.style.marginTop="";this.pImage.style.marginLeft="";if(this.RotateCont){this.pImgCell.appendChild(this.pImage);this.RotateCont.parentNode.removeChild(this.RotateCont);this.RotateCont=null}}else{if(!this.RotateCont){this.RotateCont=this.pImage.parentNode.appendChild(BX.create("DIV",{props:{className:"photo-rotate-cont"}}));this.RotateInnerCont=this.RotateCont.appendChild(BX.create("DIV",{props:{className:"photo-rotate-cont-inner"}}));this.RotateInnerCont.appendChild(this.pImage);this.RotateInnerCont.style.overflow="hidden"}var i=Math.round((e.w-e.h)/2);if(e.w<e.h){if(!BX.browser.IsIE())this.pImage.style.marginTop=i+"px";else if(BX.browser.IsIE()&&BX.browser.IsDoctype())this.pImage.style.marginLeft=i*2+"px";i=0}else{if(BX.browser.IsIE()&&BX.browser.IsDoctype())this.RotateCont.style.paddingLeft=i+"px"}if(!BX.browser.IsIE())this.RotateCont.style.paddingTop=i+"px";this.RotateInnerCont.style.width=e.h+"px";this.RotateInnerCont.style.height=e.w-i+"px"}this.RotateImage(this.pImage,e.angle,true);if(!this.Rotated[e.id])this.Rotated[e.id]=true;this.AdjustControls()},SaveRotatedItems:function(t){if(t===true)return setTimeout(BX.proxy(this.SaveRotatedItems,this),1);for(var e in this.Rotated)if(this.Rotated)this.SaveRotationAngle(this.GetById(e));this.Rotated={}},CleanRotation:function(t,e){if(this.RotateInnerCont){this.pImage.style.marginTop="";this.pImage.style.marginLeft="";if(this.RotateCont){this.pImgCell.appendChild(this.pImage);this.RotateCont.parentNode.removeChild(this.RotateCont);this.RotateCont=null}if(e!==false)this.CheckImageSize(t);this.RotateImage(this.pImage,0,false)}},RotateImage:function(t,e,i){var s="";if(e!=0)s=BX.browser.IsIE9()?"photo-rotate-ie9-"+e:"photo-rotate-"+e;t.className=s},SaveRotationAngle:function(t){if(t.angle==0)return;t.saveRotationProcess=true;BX.showWait("photo_rotate");var e=t.angle;var i=this;window.bxphres=false;BX.ajax.get(this.actionUrl,{UCID:this.uniqueId,photo_list_action:"rotate",sessid:BX.bitrix_sessid(),ELEMENT_ID:t.id,angle:e,AJAX_CALL:"Y"},function(t){setTimeout(function(){i.CheckActionPostUrl();BX.closeWait("photo_rotate");if(window.bxph_error){alert(window.bxph_error)}else if(window.bxphres&&window.bxphres.Item){var t=i.GetById(window.bxphres.Item.id);t.saveRotationProcess=false;if(t.big_src)t.big_src=window.bxphres.Item.src;if(t.angle==e){t.src=window.bxphres.Item.src;t.width=window.bxphres.Item.w;t.height=window.bxphres.Item.h;delete t.h;delete t.w;delete t.angle;if(i.currentIndex==t.index){i.CleanRotation(t);i._bFirstDisplay=true;i.DisplayItem(t.id)}if(i.oTopSlider)i.oTopSlider.UpdateThumbnail(t.index)}}},100)})},EditItem:function(t){var e=this.Items[this.currentIndex];if(!e||!e.id)return;var i=this;var s=this.actionUrl+(this.actionUrl.indexOf("?")==-1?"?":"&")+"photo_list_action=edit&sessid="+BX.bitrix_sessid();s+="&ELEMENT_ID="+e.id;s+="&SECTION_ID="+e.album_id;s+="&AJAX_CALL=Y&UCID="+this.uniqueId;if(e.gallery_id)s+="&USER_ALIAS="+e.gallery_id;BX.WindowManager.setStartZIndex(3100);var o=new BX.CDialog({title:this.MESS.photoEditDialogTitle,content_url:s,buttons:[BX.CDialog.btnSave,BX.CDialog.btnCancel],width:600});o.Show();this.bArrowControllEnabled=false;this.bEscCloseEnabled=false;BX.addCustomEvent(o,"onWindowRegister",function(){o.adjustSizeEx();BX.focus(BX("bxph_title"));var t=window.oPhotoEditDialog.Get();if(t)t.style.zIndex=3101;if(window.oPhotoEditDialog.OVERLAY)window.oPhotoEditDialog.OVERLAY.style.zIndex=3097});BX.addCustomEvent(o,"onWindowUnRegister",function(){i.bArrowControllEnabled=true;i.bEscCloseEnabled=true});o.ClearButtons();o.SetButtons([new BX.CWindowButton({title:BX.message("JS_CORE_WINDOW_SAVE"),id:"savebtn",action:BX.proxy(this.CheckForm,this)}),o.btnCancel]);window.oPhotoEditDialog=o;return BX.PreventDefault(t)},CheckForm:function(){var _this=this;var form=document.forms["form_photo"];if(typeof form!="object")return false;var oData={AJAX_CALL:"Y"};for(var ii=0;ii<form.elements.length;ii++){if(form.elements[ii]&&form.elements[ii].name){if(form.elements[ii].type&&form.elements[ii].type=="checkbox"){if(form.elements[ii].checked==true)oData[form.elements[ii].name]=form.elements[ii].value}else{oData[form.elements[ii].name]=form.elements[ii].value}}}BX.showWait("photo_window_edit");window.oPhotoEditDialogError=false;BX.ajax.post(form.action,oData,function(data){setTimeout(function(){BX.closeWait("photo_window_edit");result={};if(window.oPhotoEditDialogError!==false){var errorTr=BX("bxph_error_row");errorTr.style.display="";errorTr.cells[0].innerHTML=window.oPhotoEditDialogError;window.oPhotoEditDialog.adjustSizeEx()}else{top.result=false;try{data=BX.util.trim(data);var res="",indBegin=data.indexOf("<!--BX_PHOTO_EDIT_RES-->"),indEnd=data.indexOf("<!--BX_PHOTO_EDIT_RES_END-->");if(indBegin!=-1&&~indEnd!=-1)res=data.substr(indBegin+"<!--BX_PHOTO_EDIT_RES-->".length,indEnd-indBegin-"<!--BX_PHOTO_EDIT_RES-->".length);else res=data;eval("top.result = "+res+";")}catch(e){var errorTr=BX("bxph_error_row");if(errorTr){errorTr.style.display="";errorTr.cells[0].innerHTML=_this.MESS.unknownError}window.oPhotoEditDialog.adjustSizeEx()}if(top.result){_this.EditItemCallBack(top.result);window.oPhotoEditDialog.Close()}}},200)})},EditItemCallBack:function(t){var e=this.Items[this.currentIndex];e.tags=t.TAGS||"";e.description=t._DESCRIPTION||"";e.date=t.DATE_STR||t.DATE;e.tags_array=t.TAGS_LIST||[];if(t.SECTION_ID&&parseInt(t.SECTION_ID)!==parseInt(e.album_id))this.DropAndRecalc(e);else this.DisplayItemDetails(e)},DeleteItem:function(t){var e=this.Items[this.currentIndex];if(!confirm(this.MESS.delItemConfirm))return;window.bxph_error=null;var i=this;BX.ajax.get(this.actionUrl,{UCID:this.uniqueId,photo_list_action:"delete",sessid:BX.bitrix_sessid(),ELEMENT_ID:e.id,AJAX_CALL:"Y"},function(t){setTimeout(function(){i.CheckActionPostUrl();if(window.bxph_error)alert(window.bxph_error);else i.DropAndRecalc(e)},100)});return BX.PreventDefault(t)},ActivateItem:function(t){var e=this.Items[this.currentIndex];e.active="Y";this.DisplayItemDetails(e);window.bxph_error=null;var i=this;BX.ajax.get(this.actionUrl,{UCID:this.uniqueId,photo_list_action:"activate",sessid:BX.bitrix_sessid(),ELEMENT_ID:e.id},function(t){setTimeout(function(){i.CheckActionPostUrl()},100)});return BX.PreventDefault(t)},DropAndRecalc:function(t){if(this.itemsCount<=1){this.ClosePopup();setTimeout(function(){window.location=window.location},100)}if(t.index==0)this.Next();else if(this.itemsCount>1)this.Previous();var e=[];var i={};var s=0;for(var o in this.Items){if(this.Items[o].index!=t.index){s=this.Items[o].index;if(this.Items[o].index>t.index)s--;this.Items[o].index=s;e[s]=this.Items[o];i[this.Items[o].id]=s}}this.Items=e;this.ItemIndex=i;this.itemsCount--;if(this.itemsCount==0){this.ClosePopup();setTimeout(function(){window.location=window.location},100)}if(this.oTopSlider)this.oTopSlider.RecalcItems();this.topPager.count.innerHTML=this.itemsCount},ChangeMode:function(t,e){if(t!="auto"&&t!="fixed")t=this.Mode=="auto"?"fixed":"auto";if(t=="auto"){BX.addClass(this.pMinimizeBut,"photo-minimize-screen-but");this.pBigPhoto.innerHTML=this.MESS.smallPhoto;this.pBigPhoto.title=this.pMinimizeBut.title=this.MESS.smallPhoto}else{BX.removeClass(this.pMinimizeBut,"photo-minimize-screen-but");this.pBigPhoto.innerHTML=this.MESS.bigPhoto;this.pBigPhoto.title=this.pMinimizeBut.title=this.MESS.bigPhoto;this.pPopupFooter.style.width=this.fixedSize+"px"}this.Mode=t;this.CheckImageSize();if(e!==false)this.SaveOption("view_mode",this.Mode)},CheckFullModeDisplay:function(t){if(!t)t=this.Items[this.currentIndex];if(!t)return;if(t.width<=this.fixedSize&&t.height<=this.windowInnerSize.innerHeight-100){this.pBigPhoto.style.display="none";BX.addClass(this.pMinimizeBut,"photo-minimize-disabled");this.pMinimizeBut.title=this.MESS.bigPhotoDisabled}else{this.pBigPhoto.style.display="";BX.removeClass(this.pMinimizeBut,"photo-minimize-disabled")}},CheckImageSize:function(t){if(!t)t=this.Items[this.currentIndex];if(!t)return;var e=this.windowInnerSize.innerWidth-30;var i=this.windowInnerSize.innerHeight-100;if(this.Mode=="fixed"&&this.fixedSize<e)e=this.fixedSize;var s=this.FitInto(t.width,t.height,e,i);if(s.w==t.width&&s.h==t.height){this.pImage.style.width="";this.pImage.style.height=""}else{this.pImage.style.width=s.w+"px";this.pImage.style.height=s.h+"px"}if(this.Mode=="auto"){this.pPopupFooter.style.width=this.fixedSize+"px";setTimeout(BX.proxy(this.AdjustControls,this),1)}},FitInto:function(t,e,i,s){var o=t/e;if(t>i){t=i;e=t/o}if(e>s){e=s;t=e*o}if(t>i){t=i;e=t/o}if(!t||isNaN(t))t=0;if(!e||isNaN(e))e=0;return{w:Math.round(t),h:Math.round(e)}},SetTheme:function(t,e){if(t!=="dark"&&t!=="light")this.theme=this.theme=="dark"?"light":"dark";else this.theme=t;if(this.theme=="dark"){if(this.pThemeLink)this.pThemeLink.innerHTML='<i></i><span class="photo-dark-theme-link-text">'+this.MESS.LightBG+"</span>";BX.addClass(this.pFixedOverlay,"photo-dark-theme")}else{if(this.pThemeLink)this.pThemeLink.innerHTML='<i></i><span class="photo-dark-theme-link-text">'+this.MESS.DarkBG+"</span>";BX.removeClass(this.pFixedOverlay,"photo-dark-theme")}if(this.useComments&&this.commentsType=="blog")this.SetThemeCSSForLHE();if(e!==false)this.SaveOption("theme",this.theme)},SetThemeCSSForLHE:function(){var t=window.oBlogComLHE;if(!t)return setTimeout(BX.proxy(this.SetThemeCSSForLHE,this,400));var e="/*BXPH-CSS-START*/"+"body,body *{background-color: #464646!important; color: #FFFFFF;}\n"+"body blockquote.bx-quote {border: 1px solid #C0C0C0!important; background-color: #FFF4CA!important; color: #373737!important;}\n"+"/*BXPH-CSS-END*/";var i=t.systemCSS.replace(/\/\*BXPH-CSS-START\*\/(\s|\S)*\/\*BXPH-CSS-END\*\//gi,"");if(this.theme=="dark")t.systemCSS=i+"\n"+e;else t.systemCSS=i;t.SetEditorContent(t.GetContent())},ShowSource:function(t){var e=this.Items[this.currentIndex],i=e.description||"",s=e.big_src||e.src,o=screen.availWidth,n=screen.availHeight,r=false;if(document.all)r=window.open("","","height=SrcHeight,width=SrcWidth,top=0,left=0,scrollbars=yes,fullscreen=yes");else r=window.open("",s,"width=SrcWidth,height=SrcHeight,menubar=no,status=no,location=no,scrollbars=yes,fullscreen=yes,directories=no,resizable=yes");r.document.write("<html><head>"+"<script>function SetBackGround(div){if (div)document.body.style.backgroundColor = div.style.backgroundColor;}</script>"+"<title>"+i+"</title>"+"<style>table div{width:18px; height:18px;}</style>"+'</head><body style="background-color:#000000;">'+'<table width="100%" height="96%" cellspacing="0" cellpadding="0" border="0">'+'<tr><td align="right">'+'<table cellspacing="2" cellpadding="0" border="0" align="center">'+'<tr><td><div onmouseover="SetBackGround(this);" style="width:18px; height:18px; background-color:#FFFFFF;"></div></td></tr>'+'<tr><td><div onmouseover="SetBackGround(this);" style="background-color:#E5E5E5;"></div></td></tr>'+'<tr><td><div onmouseover="SetBackGround(this);" style="background-color:#CCCCCC;"></div></td></tr>'+'<tr><td><div onmouseover="SetBackGround(this);" style="background-color:#B3B3B3;"></div></td></tr>'+'<tr><td><div onmouseover="SetBackGround(this);" style="background-color:#999999;"></div></td></tr>'+'<tr><td><div onmouseover="SetBackGround(this);" style="background-color:#808080;"></div></td></tr>'+'<tr><td><div onmouseover="SetBackGround(this);" style="background-color:#666666;"></div></td></tr>'+'<tr><td><div onmouseover="SetBackGround(this);" style="background-color:#4D4D4D;"></div></td></tr>'+'<tr><td><div onmouseover="SetBackGround(this);" style="background-color:#333333;"></div></td></tr>'+'<tr><td><div onmouseover="SetBackGround(this);" style="background-color:#1A1A1A;"></div></td></tr>'+'<tr><td><div onmouseover="SetBackGround(this);" style="background-color:#000000;"></div></td></tr>'+"</table>"+"</td>"+'<td align="center"><img border="0" title="'+this.MESS.clickToClose+'" style="cursor:pointer; cursor:hand;" onclick="window.close();" src="'+s+'"></td></tr>'+"</table></body></html>");return BX.PreventDefault(t)},OnAfterCurrentItemsLoaded:function(){BX.closeWait("photo_load_items");if(this.currentItem>0&&this.ItemIndex[this.currentItem])this.OpenPopup(this.currentItem);BX.removeCustomEvent(this,"OnAfterItemsLoaded",BX.proxy(this.OnAfterCurrentItemsLoaded,this))},OnMoreItemsLoaded:function(t){if(t)this.HandleItems(t);this.AttachThumbnailsEvents()},AttachThumbnailsEvents:function(){var t=this,e=this.pElementsCont.getElementsByTagName("a"),i,s=e.length;for(i=0;i<s;i++)if(e[i].id&&e[i].id.match(/photo\_(\d+)/gi))e[i].onclick=function(e){t.OpenPopup(parseInt(this.id.substr("photo_".length)));return BX.PreventDefault(e)}},OnItemShowed:function(t){var e=t.bShowed?"N":"Y";var i=this.useRatings?"Y":"N";if(this.useRatings&&typeof t.rating!="undefined"){this.pRatingCont.innerHTML=t.rating;i="N"}if(i=="Y")this.pRatingCont.innerHTML="";if(i=="Y"||!t.bShowed){var s=this;BX.ajax.get(this.responderUrl,{sessid:BX.bitrix_sessid(),ELEMENT_ID:t.id,AUTHOR_ID:t.author_id,sigh:this.sign,checkParams:this.checkParams,reqParams:this.reqParams,increaseCounter:e,getRaiting:i,UCID:this.uniqueId,AJAX_CALL:"Y"},function(o){setTimeout(function(){if(e=="Y")t.shows++;if(i=="Y"){var n="",r=o.indexOf("<!--BX_PHOTO_RATING-->"),h=o.indexOf("<!--BX_PHOTO_RATING_END-->");if(r!==-1&&h!==-1)n=o.substr(r+"<!--BX_PHOTO_RATING-->".length,h-r-"<!--BX_PHOTO_RATING-->".length);else n=o;s.pRatingCont.innerHTML=n;if(!s.cacheRaitingReq)t.rating=n}},100)});t.bShowed=true}},OnResize:function(){if(!BX.browser.IsDoctype()&&BX.browser.IsIE()){this.windowInnerSize=BX.GetWindowInnerSize(document);var t=document.body.offsetHeight>this.windowInnerSize.innerHeight?18:0;this.pFixedOverlay.style.width=this.windowInnerSize.innerWidth+t+"px";this.pFixedOverlay.style.height=this.windowInnerSize.innerHeight+"px"}this.AdjustControls()},PreloadImages:function(t){if(this.reloadItemsOnload||!t)return;if(!this.pPreloadImagesCont){this.pPreloadImagesCont=document.body.appendChild(BX.create("DIV",{props:{className:"bxph-preload-cont"}}));this.arLoadedImg={};this.ImgQueue={}}this.PreloadPhoto(t,1);this.PreloadPhoto(t,2);this.PreloadPhoto(t,-1);this.PreloadPhoto(t,-2)},PreloadPhoto:function(t,e){if(typeof e=="undefined")e=1;var i=(parseInt(t.index)||0)+e;if(this.Items&&this.Items[i]){var s=this.Items[i].big_src||this.Items[i].src;if(!this.arLoadedImg[s]){this.ImgQueue[s]=true;this.arLoadedImg[s]=true;if(this.ImageLoadingState!="loading")this.PreloadAgent()}}},PreloadAgent:function(t){var e=this,i;if(t&&this.ImgQueue[t]){this.srcIndex[t]=true;this.ImageLoadingState="wait";if(this.clearStateTimeout){clearTimeout(this.clearStateTimeout);this.clearStateTimeout=null}}var s=false;for(i in this.ImgQueue){if(this.ImgQueue[i]){s=true;var o=this.pPreloadImagesCont.appendChild(BX.create("IMG",{props:{src:i,title:i}}));this.ImageLoadingState="loading";e.ImgQueue[i]=null;delete e.ImgQueue[i];o.onerror=o.onload=function(){e.PreloadAgent(this.title)};if(this.clearStateTimeout){clearTimeout(this.clearStateTimeout);this.clearStateTimeout=null}this.clearStateTimeout=setInterval(function(){e.ImageLoadingState="wait";e.PreloadAgent()},5e3);break}}if(!s){this.ImageLoadingState="wait";if(this.clearStateTimeout){clearTimeout(this.clearStateTimeout);this.clearStateTimeout=null}}},CheckActionPostUrl:function(){if(!window["bxph_action_url_"+this.uniqueId]||this.actionPostUrl)return;if(top.oBXPhotoList&&top.oBXPhotoList[this.uniqueId])top.oBXPhotoList[this.uniqueId].actionPostUrl=window["bxph_action_url_"+this.uniqueId];this.actionPostUrl=window["bxph_action_url_"+this.uniqueId]}};function BXTopSlider(t){this.thumbSize=40;this.thumbContSize=48;this.pTopSliderBut=t.pTopSliderBut;this.pScrollCont=t.pScrollCont;this.pScroller=t.pScroller;this.pObj=t;this.pWnd=t.pSlider;this.pSliderCont=t.pSliderCont;this.itemsIndex={};this.itemsCount=t.itemsCount;this.startItemIndex=t.currentIndex;this.uniqueId=t.uniqueId;this.carretWidth=22;this.pTopSliderBut.onclick=BX.proxy(this.Show,this);this.bOpened=false;this.Init()}BXTopSlider.prototype={Init:function(){this.extraSize=30;this.currentIndex=this.startItemIndex;this.AdjustScroller();this.BuildItems();this.HandleItems(this.pObj.Items);this.pScroller.onmousedown=BX.proxy(this.StartMoveCarret,this);this.pWnd.onmousedown=BX.proxy(this.StartMoveSlider,this);this.pScrollCont.onmousedown=BX.proxy(this.ScrollerClick,this);if(this.pSliderCont.addEventListener)this.pSliderCont.addEventListener("DOMMouseScroll",BX.proxy(this.OnMouseWheel,this),false);BX.bind(this.pSliderCont,"mousewheel",BX.proxy(this.OnMouseWheel,this));if(this.pObj.userSettings.show_top_slider=="Y")this.Show(true,false,true)},StartMoveSlider:function(t){if(this.bNotEnoughItems)return;this.ClearIntervals();if(!t)t=window.event;this.bMoveSlider=true;this.bSliderMoved=false;this.pSliderContPos=BX.pos(this.pSliderCont);this.wndSize=BX.GetWindowScrollPos();this.startX=t.clientX+this.wndSize.scrollLeft;this.startLeft=parseInt(this.pWnd.style.left)||0;this.minLeft=this.pSliderContPos.width-this.pObj.itemsCount*this.thumbContSize;var e=this;this.x0=this.x1=this.x2=parseInt(this.pWnd.style.left)||0;this.time0=(new Date).getTime();this.zeroSpeedCount=0;this.time=10;if(!this.bOpened)this.Show(true);this.measureSpeedInt=setInterval(BX.proxy(this.MeasureSpeed,this),this.time);BX.bind(document,"mousemove",BX.proxy(this.MoveSlider,this));BX.bind(document,"mouseup",BX.proxy(this.StopMoveSlider,this))},MeasureSpeed:function(){this.x1=this.x2;this.x2=parseInt(this.pWnd.style.left);var t=this.x2-this.x1;if(t==0)this.zeroSpeedCount++;else this.zeroSpeedCount=0;if(!this.bMoveSlider){clearInterval(this.measureSpeedInt);this.time1=(new Date).getTime();var e=(this.x2-this.x0)/(this.time1-this.time0);e=e*this.time*1.2;this.t=1;this.startV=e;this.v=e;var i=this,s=.3,s=this.v>0?-s:s;if(Math.abs(e)>0&&this.zeroSpeedCount<50){this.stoppieInterval=setInterval(function(){var t=++i.t;var e=i.v+s*t;var o=i.secondX+i.v*t+s*t*t/2;o=Math.round(o*10)/10;if(i.startV>0&&e<=0||i.startV<0&&e>=0)return clearInterval(i.stoppieInterval);if(o>i.extraSize){o=i.extraSize;t=100}if(o<i.minLeft-i.extraSize){o=i.minLeft-i.extraSize;t=100}i.pWnd.style.left=o+"px";i.CheckCurrentShownItems();i.AdjustCarret(o);if(t>50){i.PullBack();clearInterval(i.stoppieInterval)}},this.time)}}},PullBack:function(){var t=parseInt(this.pWnd.style.left)||0,e=this.time,i=t>0?-1:1,s=this,o=1;if(this.bMoveSlider||t<=0&&t>=this.minLeft)return;if(this.pullBackInterval)clearInterval(this.pullBackInterval);this.pullBackInterval=setInterval(function(){var t=parseInt(s.pWnd.style.left);t+=o*i;if(i>0&&t>s.minLeft)t=s.minLeft;else if(i<0&&t<0)t=0;s.pWnd.style.left=t+"px";if(t==s.minLeft||t==0)clearInterval(s.pullBackInterval);o++},e)},MoveSlider:function(t){if(this.bNotEnoughItems)return;this.bSliderMoved=true;if(this.bMoveSlider){if(!t)t=window.event;var e=parseInt(t.clientX)+parseInt(this.wndSize.scrollLeft);var i=e-this.startX;var s=this.startLeft+i;if(s>this.extraSize)s=this.extraSize;if(s<this.minLeft-this.extraSize)s=this.minLeft-this.extraSize;if(!this.firstTime||!this.firstX){this.firstTime=(new Date).getTime();this.firstX=s}else{this.firstTime=this.secondTime;this.secondTime=(new Date).getTime();this.firstX=this.secondX;this.secondX=s}this.pWnd.style.left=s+"px";this.AdjustCarret(s);this.CheckCurrentShownItems()}},StopMoveSlider:function(){this.bMoveSlider=false;if(this.measureSpeedInt)this.MeasureSpeed();BX.unbind(document,"mousemove",BX.proxy(this.MoveSlider,this));BX.unbind(document,"mouseup",BX.proxy(this.StopMoveSlider,this));this.PullBack()},StartMoveCarret:function(){if(!this.bOpened)this.Show(true);if(this.bNotEnoughItems)return;this.ClearIntervals();this.bScroll=true;this.pScrollContPos=BX.pos(this.pScrollCont);this.wndSize=BX.GetWindowScrollPos();BX.addClass(this.pScroller,"photo-scroll-wheel-active");BX.bind(document,"mousemove",BX.proxy(this.MoveCarret,this));BX.bind(document,"mouseup",BX.proxy(this.StopMoveCarret,this))},MoveCarret:function(t){if(this.bScroll&&!this.bNotEnoughItems){if(!t)t=window.event;var e=t.clientX+this.wndSize.scrollLeft-this.pScrollContPos.left;this.SetCarret(e)}},StopMoveCarret:function(){this.bScroll=false;BX.removeClass(this.pScroller,"photo-scroll-wheel-active");BX.unbind(document,"mousemove",BX.proxy(this.MoveCarret,this));BX.unbind(document,"mouseup",BX.proxy(this.StopMoveCarret,this))},AdjustScroller:function(){if(this.pObj.itemsCount>0){var t=parseInt(this.pSliderCont.parentNode.offsetWidth);this.pSliderContPos=BX.pos(this.pSliderCont);this.scrollerWidth=parseInt(this.pScrollCont.offsetWidth);this.deltaWidth=this.pObj.itemsCount*this.thumbContSize-parseInt(this.pSliderCont.parentNode.offsetWidth);this.scrollRatio=this.deltaWidth/this.scrollerWidth;this.minLeft=t-this.pObj.itemsCount*this.thumbContSize;this.bNotEnoughItems=this.pObj.itemsCount<t/this.thumbContSize;this.pScrollContPos=BX.pos(this.pScrollCont);this.pWnd.style.width=this.bNotEnoughItems?"100%":""}},ScrollerClick:function(t){if(!this.bNotEnoughItems){if(!t)t=window.event;this.StartMoveCarret(t);this.SetCarret(t.clientX+this.wndSize.scrollLeft-this.pScrollContPos.left)}},SetCarret:function(t){if(t<0||this.bNotEnoughItems)t=0;var e;if(t>=this.pScrollContPos.width-this.carretWidth){t=this.pScrollContPos.width-this.carretWidth;e=Math.round(this.pScrollContPos.width*this.scrollRatio*10)/10}else{e=Math.round(t*this.scrollRatio*10)/10}e=-e;this.AdjustCarret(e);this.pWnd.style.left=e+"px";this.CheckCurrentShownItems()},AdjustCarret:function(t){if(this.bNotEnoughItems){this.pScroller.style.display="none";return}else{this.pScroller.style.display=""}if(typeof t=="undefined")t=parseInt(this.pWnd.style.left)||0;if(t>0)t=0;if(t<this.minLeft)t=this.minLeft;var e=Math.abs(Math.round(10*t/this.scrollRatio)/10);if(e>this.pScrollContPos.width-this.carretWidth)e=this.pScrollContPos.width-this.carretWidth;this.pScroller.style.left=e+"px"},ClearIntervals:function(){if(this.pullBackInterval)clearInterval(this.pullBackInterval);if(this.measureSpeedInt)clearInterval(this.measureSpeedInt);if(this.stoppieInterval)clearInterval(this.stoppieInterval)},HandleItems:function(t){for(i in t){Item=t[i];if(Item.id&&this.itemsIndex[Item.index]){if(typeof Item.thumb_src=="undefined"){Item.thumb_src=Item.src;Item.thumb_height=Item.height;Item.thumb_width=Item.width}if(Item.thumb_src&&Item.thumb_src!=undefined){this.itemsIndex[Item.index].pImg.src=Item.thumb_src;BX.removeClass(this.itemsIndex[Item.index].pLink,"photo-wait");this.AdjustThumb(this.itemsIndex[Item.index].pImg,Item.thumb_width,Item.thumb_height)}}}},RecalcItems:function(){if(this.itemsCount==this.pObj.itemsCount+1){this.itemsCount=this.pObj.itemsCount;this.pWnd.removeChild(this.itemsIndex[this.itemsCount].pLink);this.itemsIndex[this.itemsCount]=null;delete this.itemsIndex[this.itemsCount];this.HandleItems(this.pObj.Items)}},BuildItems:function(){var t,e=this,i,s,o;for(t=0;t<this.pObj.itemsCount;t++){i=this.pWnd.appendChild(BX.create("A",{props:{id:"bxphoto_t_"+t,className:"photo-preview photo-wait",href:"javascript: void(0)"}}));o=i.appendChild(BX.create("DIV",{props:{className:"photo-preview-inner"},style:{width:this.thumbSize+"px",height:this.thumbSize+"px"}}));s=o.appendChild(BX.create("IMG",{props:{src:"/bitrix/images/1.gif"},style:{width:this.thumbSize+"px",height:this.thumbSize+"px"}}));this.itemsIndex[t]={pLink:i,pImg:s};i.onclick=function(){if(!e.bSliderMoved)e.pObj.ShowItem(parseInt(this.id.substr("bxphoto_t_".length)),false,false,true)};this.pObj.SetUnselectable([i,i.firstChild])}},CleanItems:function(){for(i=0;i<this.pObj.itemsCount;i++)BX.addClass(this.itemsIndex[i].pLink,"photo-wait")},OnMouseWheel:function(t){if(this.bNotEnoughItems)return BX.PreventDefault(t);if(!t)t=window.event;var e=0;if(t.wheelDelta)e=t.wheelDelta/120;else if(t.detail)e=-t.detail/3;var i=parseInt(this.pWnd.style.left)||0,s=i+e*this.thumbContSize*1;s=Math.round(s*10)/10;if(s>this.extraSize)s=this.extraSize;if(s<this.minLeft-this.extraSize)s=this.minLeft-this.extraSize;this.pWnd.style.left=s+"px";this.CheckCurrentShownItems();

this.AdjustCarret(s);if(this.mouseWheelTimeout)clearTimeout(this.mouseWheelTimeout);this.mouseWheelTimeout=setTimeout(BX.proxy(this.PullBack,this),100);return BX.PreventDefault(t)},CheckCurrentShownItems:function(){if(this.pObj.reloadItemsOnload||!this.pObj.itemsPageSize)return;var t=parseInt(this.pWnd.style.left)||0,e=-Math.round(t/this.thumbContSize);if(e<1)e=1;if(!this.pSliderContPos)this.pSliderContPos=BX.pos(this.pSliderCont);var i=Math.round(e+this.pSliderContPos.width/this.thumbContSize);if(i>this.pObj.itemsCount)i=this.pObj.itemsCount;var s,o=Math.ceil(e/this.pObj.itemsPageSize),n=Math.ceil(i/this.pObj.itemsPageSize);for(s=o;s<=n;s++)this.pObj.LoadPage(s)},Show:function(t,e,i){if(t!==true&&t!==false)t=!this.bOpened;i=i===true;if(BX.browser.IsIE()&&!BX.browser.IsIE9())i=true;if(t){if(i){this.pSliderCont.style.display="block";this.pObj.pPopupTop.style.marginBottom=this.thumbContSize+"px"}BX.addClass(this.pTopSliderBut,"photo-slider-button-active");this.AdjustScroller()}else{if(i)this.pObj.pPopupTop.style.marginBottom="";this.pSliderCont.style.display="none";BX.removeClass(this.pTopSliderBut,"photo-slider-button-active")}this.bOpened=t;if(!i){if(this.showInt)clearInterval(this.showInt);var s=this,o=5,n=1,r=parseInt(this.pObj.pPopupTop.style.marginBottom)||0,h=false;this.showInt=setInterval(function(){if(t){r+=o*n;if(r>=s.thumbContSize){r=s.thumbContSize;h=true}}else{r-=o*n;if(r<=0){r=0;h=true}}s.pObj.pPopupTop.style.marginBottom=r+"px";if(h){if(t)s.pSliderCont.style.display="block";clearInterval(s.showInt)}n++},40)}if(e!==false)this.pObj.SaveOption("show_top_slider",this.bOpened?"Y":"N");this.CheckCurrentShownItems()},SelectItem:function(t){if(!this.itemsIndex[t.index])return;var e=0;this.AdjustScroller();if(this.bNotEnoughItems){this.pWnd.style.left="0px"}else{e=parseInt(this.pWnd.style.left)||0;var i=-Math.round(e/this.thumbContSize),s=Math.round(i+this.pSliderContPos.width/this.thumbContSize)-1;if(t.index<i||t.index>s){if(t.index<i)e=-parseInt(t.index)*this.thumbContSize;else e=this.pSliderContPos.width-(parseInt(t.index)+1)*this.thumbContSize;if(e>0)e=0;if(e<this.minLeft)e=this.minLeft;this.pWnd.style.left=e+"px"}}this.AdjustCarret(e);if(typeof this.selectedIndex!="undefined"&&this.itemsIndex[this.selectedIndex].pLink)BX.removeClass(this.itemsIndex[this.selectedIndex].pLink,"photo-preview-selected");BX.addClass(this.itemsIndex[t.index].pLink,"photo-preview-selected");this.selectedIndex=t.index},UpdateThumbnail:function(t){var e=this.itemsIndex[t];if(e){var i=this.pObj.Items[t];if(typeof i.thumb_src=="undefined"){i.thumb_src=i.src;i.thumb_height=i.height;i.thumb_width=i.width}if(i.thumb_src&&i.thumb_src!=undefined){e.pImg.src=i.thumb_src;this.AdjustThumb(e.pImg,i.thumb_width,i.thumb_height)}BX.removeClass(e.pLink,"photo-wait")}},AdjustThumb:function(t,e,i){if(!e||!i)return;var s=e/i;if(s>1){t.style.height=this.thumbSize+"px";t.style.width=Math.round(this.thumbSize*s)+"px";t.style.left=Math.round((this.thumbSize-this.thumbSize*s)/2)+"px";t.style.top=0}else{t.style.width=this.thumbSize+"px";t.style.height=Math.round(this.thumbSize/s)+"px";t.style.top=Math.round((this.thumbSize-this.thumbSize/s)/2)+"px";t.style.left=0}}};window.BXPhotoList=function(t){this.actionUrl=t.actionUrl;this.navName=t.navName;this.currentPage=parseInt(t.currentPage);this.pageCount=parseInt(t.pageCount);this.uniqueId=t.uniqueId;if(t.morePhotoNav=="Y"){this.pMorePhotosLink=BX("photo-more-photo-link-"+this.uniqueId);this.pMorePhotosCont=BX("photo-more-photo-link-cont-"+this.uniqueId);this.pMorePhotosLink.onclick=BX.proxy(this.LoadMorePhotos,this)}this.pElementsCont=t.pElementsCont;this.initDragSorting=t.initDragSorting=="Y";this.canModerate=!!t.canModerate;this.maxDelta=10;this.thumbSize=parseInt(t.thumbSize);this.thumbHeight=this.thumbWidth=this.thumbSize+8;this.oItems=[];this.oItemIndex={};this.HandleItems(t.items);if(this.initDragSorting){this.pContPos=BX.pos(this.pElementsCont);var e=this.pElementsCont.parentNode.offsetWidth;if(!e||e<0)e=this.pContPos.width;if(!this.matrixX)this.matrixX=Math.floor(e/this.thumbWidth);this.InitSort()}};window.BXPhotoList.prototype={HandleItems:function(t){for(var e in t){t[e].index=parseInt(t[e].index);this.oItems[t[e].index]=t[e];this.oItemIndex[t[e].id]=t[e].index}if(t[e].active!="Y"&&this.canModerate){}},LoadMorePhotos:function(){var t={UCID:this.uniqueId,sessid:BX.bitrix_sessid(),return_array:"Y",get_elements_html:"Y"};t[this.navName]=++this.currentPage;if(this.currentPage>=this.pageCount)this.pMorePhotosCont.style.display="none";BX.addClass(this.pMorePhotosCont,"photo-show-more-wait");var e=this;window.bxphres=false;BX.ajax.get(this.actionUrl,t,function(t){setTimeout(function(){e.CheckActionPostUrl();e.HandleItems(window.bxphres.items);BX.removeClass(e.pMorePhotosCont,"photo-show-more-wait");e.pElementsCont.innerHTML+=window.bxphres.elementsHTML;e.currentPage=parseInt(window.bxphres.currentPage);if(e.initDragSorting)e.InitSort();BX.onCustomEvent(window,"onMoreItemsLoaded",[window.bxphres.items])},100)});return false},ShowLoadPhotoWait:function(t){},InitSort:function(){var t=this,e,i,s=0,o=this.pElementsCont.getElementsByTagName("a");this.pElementsCont.style.width=this.thumbWidth*this.matrixX+8+"px";this.Items=[];this.ItemsIndex={};this.sortMatrix={};this.curItemsCount=0;this.time=30;this.maxSortValue=0;this.sortFieldStep=5;for(e=0;e<o.length;e++){if(!o[e].id||!o[e].id.match(/photo\_(\d+)/gi)||!this.oItems[s])continue;i=parseInt(o[e].id.substr("photo_".length));o[e].onmousedown=function(e){t.StartDragItem(e,parseInt(this.id.substr("photo_".length)));return false};this.Items[s]={id:i,pWnd:o[e].parentNode,sort:s,origSort:s,curSortField:parseInt(this.oItems[s].sort),sortField:(s+1)*this.sortFieldStep};this.ItemsIndex[i]=s;this.sortMatrix[i]=s;this.curItemsCount++;s++;if(this.maxSortValue<parseInt(this.oItems[e].sort))this.maxSortValue=parseInt(this.oItems[e].sort)}},StartDragItem:function(t,e){if(!t)t=window.event;this.bSorting=true;this.wndSize=BX.GetWindowScrollPos();this.startX=t.clientX;this.startY=t.clientY;this.movedItemId=e;this.movedItem=this.GetItemById(e);this.movedItem.curSortIndex=false;this.pItemPos=BX.pos(this.movedItem.pWnd);var i=t.clientX+this.wndSize.scrollLeft-this.pContPos.left;var s=t.clientY+this.wndSize.scrollTop-this.pContPos.top;var o=t.clientX+this.wndSize.scrollLeft;var n=t.clientY+this.wndSize.scrollTop;this.deltaMovedX=o-this.pItemPos.left;this.deltaMovedY=n-this.pItemPos.top;BX.bind(document,"mousemove",BX.proxy(this.DragItem,this));BX.bind(document,"mouseup",BX.proxy(this.StopDragItem,this));if(this.SaveOrderTimeout)clearTimeout(this.SaveOrderTimeout)},DragItem:function(t){if(this.bSorting){if(!t)t=window.event;if(!this.bDragItem&&(Math.abs(t.clientX-this.startX)>this.maxDelta||Math.abs(t.clientY-this.startY)>this.maxDelta)){this.bDragItem=true;this.bWasJustDragged=true;this.movedItem.oldParrent=this.movedItem.pWnd.parentNode;BX.addClass(this.movedItem.pWnd,"photo-item-cont-drag");document.body.appendChild(this.movedItem.pWnd)}if(this.bDragItem){var e=t.clientX+this.wndSize.scrollLeft;var i=t.clientY+this.wndSize.scrollTop;var s=e-this.pContPos.left;var o=i-this.pContPos.top;this.movedItem.pWnd.style.left=e-this.deltaMovedX+"px";this.movedItem.pWnd.style.top=i-this.deltaMovedY+"px";var n=Math.ceil(s/this.thumbWidth);var r=Math.ceil(o/this.thumbHeight);if(n<0)n=0;if(r<0)r=0;var h=(r-1)*this.matrixX+n-1;if(h>this.curItemsCount-1)h=this.curItemsCount-1;this.PutItemToNewPlace(this.movedItemId,h)}return BX.PreventDefault(t)}},StopDragItem:function(t){if(this.bDragItem){if(!t)t=window.event;BX.removeClass(this.movedItem.pWnd,"photo-item-cont-drag");var e,i=this.pElementsCont.childNodes.length,s=0,o;if(this.pNewEmptyPlace.parentNode)this.pNewEmptyPlace.parentNode.removeChild(this.pNewEmptyPlace);if(this.pNewEmptyPlace2.parentNode)this.pNewEmptyPlace2.parentNode.removeChild(this.pNewEmptyPlace2);for(e=0;e<i;e++){o=this.pElementsCont.childNodes[e];if(!BX.hasClass(o,"photo-item-cont"))continue;if(this.movedItem.curSortIndex==this.curItemsCount-1&&s==this.movedItem.curSortIndex-1){this.pElementsCont.appendChild(this.movedItem.pWnd);break}if(s==this.movedItem.curSortIndex){this.pElementsCont.insertBefore(this.movedItem.pWnd,o);break}s++}this.SaveSortingOrder()}this.bSorting=false;this.bDragItem=false;BX.unbind(document,"mousemove",BX.proxy(this.DragItem,this));BX.unbind(document,"mouseup",BX.proxy(this.StopDragItem,this));_this=this;setTimeout(function(){_this.bWasJustDragged=false},100);if(Math.abs(t.clientX-this.startX)>this.maxDelta||Math.abs(t.clientY-this.startY)>this.maxDelta)return BX.PreventDefault(t)},SaveSortingOrder:function(){if(this.SaveOrderTimeout)clearTimeout(this.SaveOrderTimeout);BX.closeWait("photo_save_sort_items");BX.showWait("photo_save_sort_items");this.SaveOrderTimeout=setTimeout(BX.proxy(this.SaveSortingOrderNow,this),2e3)},SaveSortingOrderNow:function(){var t,e=this.pElementsCont.childNodes.length,i,s=0,o,n;var r={UCID:this.uniqueId,sessid:BX.bitrix_sessid(),photo_list_action:"save_sort_order",pio:{}};for(t=0;t<e;t++){i=this.pElementsCont.childNodes[t];if(i.id&&i.id.match(/photo_cont_(\d+)/gi)){o=parseInt(i.id.substr("photo_cont_".length));n=this.GetItemById(o);n.sortField=(s+1)*this.sortFieldStep;if(n.curSortField!=n.sortField)r.pio[o]=n.sortField;n.curSortField=n.sortField;s++}}BX.ajax.get(this.actionUrl,r,function(t){BX.closeWait("photo_save_sort_items")})},PutItemToNewPlace:function(t,e){var i=this.GetItemById(t);if(i.curSortIndex===e)return;i.curSortIndex=e;var s,o=this.pElementsCont.childNodes.length,n=0,r;for(s=0;s<o;s++){r=this.pElementsCont.childNodes[s];if(!BX.hasClass(r,"photo-item-cont"))continue;if(e==this.curItemsCount-1&&n==e-1){this.pElementsCont.appendChild(this.ShowNewEmptyPlace());break}if(n==e){this.pElementsCont.insertBefore(this.ShowNewEmptyPlace(),r);break}n++}},GetItemById:function(t){if(typeof this.ItemsIndex[t]!="undefined"&&this.Items[this.ItemsIndex[t]])return this.Items[this.ItemsIndex[t]];return false},ShowNewEmptyPlace:function(){this.bFirstEmptyPlace=!this.bFirstEmptyPlace;if(!this.pNewEmptyPlace)this.pNewEmptyPlace=BX.create("DIV",{props:{className:"photo-new-empty-place"},style:{width:"0px",height:this.thumbHeight+"px"}});if(!this.pNewEmptyPlace2)this.pNewEmptyPlace2=BX.create("DIV",{props:{className:"photo-new-empty-place svd"},style:{width:"0px",height:this.thumbHeight+"px"}});if(this.showNewEmpty)clearInterval(this.showNewEmpty);if(this.hideNewEmpty)clearInterval(this.hideNewEmpty);var t=this.bFirstEmptyPlace?this.pNewEmptyPlace:this.pNewEmptyPlace2,e=this.bFirstEmptyPlace?this.pNewEmptyPlace2:this.pNewEmptyPlace,i=Math.round(this.thumbWidth*10/5)/10,s=0,o=this,n=this.thumbWidth,r=false;bClear1=false;w=0,w1=e.parentNode?parseInt(e.style.width)||parseInt(e.offsetWidth):0;if(!e.parentNode){t.style.width=n+"px";r=bClear1=true}this.showNewEmpty=setInterval(function(){if(!r){w+=1*i;if(w>=n){w=n;r=true}t.style.width=w+"px"}if(!bClear1){w1-=1*i;if(w1<=0){w1=0;if(e.parentNode)e.parentNode.removeChild(e);bClear1=true}e.style.width=w1+"px"}if(r&&bClear1)clearInterval(o.showNewEmpty);s++},this.time);return t},DeleteItem:function(t){},ActivateItem:function(t){},CheckActionPostUrl:function(){if(!window["bxph_action_url_"+this.uniqueId]||this.actionPostUrl)return;if(top.oBXPhotoSlider&&top.oBXPhotoSlider[this.uniqueId])top.oBXPhotoSlider[this.uniqueId].actionPostUrl=window["bxph_action_url_"+this.uniqueId];this.actionPostUrl=window["bxph_action_url_"+this.uniqueId]}}})(window);
/* End */
;
; /* Start:"a:4:{s:4:"full";s:84:"/bitrix/components/bitrix/iblock.vote/templates/ajax_photo/script1.js?14815250601521";s:6:"source";s:69:"/bitrix/components/bitrix/iblock.vote/templates/ajax_photo/script1.js";s:3:"min";s:0:"";s:3:"map";s:0:"";}"*/
var voteScript = {
	trace_vote: function(div, flag)
	{
		var my_div = div;
		while (true)
		{
			if (my_div && my_div.nodeType == 1)
			{
				if (flag)
				{
					if(!my_div.saved_className)
						my_div.saved_className = my_div.className;
					BX.addClass(my_div, 'photo-rating-star-select');
				}
				else
				{
					if(my_div.saved_className && my_div.className != my_div.saved_className)
						my_div.className = my_div.saved_className;
				}
			}

			if (!my_div || !my_div.previousSibling)
				break;
			my_div = my_div.previousSibling;
		}
	},

	do_vote: function(div, parent_id, arParams)
	{
		var pVoteCont = BX('bx-photo-rating-cont');
		var counter = 1;
		BX.addClass(pVoteCont, 'photo-rating-wait');
		pVoteCont.innerHTML = '...';
		var loadingInterval = setInterval(
			function()
			{
				var html = '.';
				if (counter == 2)
				{
					html = '..';
				}
				else if (counter == 3)
				{
					html = '...';
					counter = 0;
				}
				pVoteCont.innerHTML = html;
				counter++;
			},
			300
		);
		var r = div.id.match(/^vote_(\d+)_(\d+)$/);

		arParams.vote = 'Y';
		arParams.vote_id = r[1];
		arParams.rating = r[2];

		BX.ajax.post(
			'/bitrix/components/bitrix/iblock.vote/component.php',
			arParams,
			function (data)
			{
				if (loadingInterval)
				{
					clearInterval(loadingInterval);
					loadingInterval = null;
				}
				BX.removeClass(pVoteCont, 'photo-rating-wait');
				pVoteCont.innerHTML = data;
			}
		);
	}
}
/* End */
;; /* /bitrix/components/bitrix/photogallery/templates/.default/script.js?14815250646333*/
; /* /bitrix/components/bitrix/photogallery.section.list/templates/.default/script.js?14815250647685*/
; /* /bitrix/components/bitrix/photogallery.detail.list.ex/templates/.default/script.min.js?148152506375605*/
; /* /bitrix/components/bitrix/iblock.vote/templates/ajax_photo/script1.js?14815250601521*/

//# sourceMappingURL=page_8b3c7678d8a63f4a46e1f17517e178b6.map.js