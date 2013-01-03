<?php
// Setting the Content-Type header with charset
header('Content-Type: text/html; charset=utf-8');
?>
<script type="text/javascript">
	var mySettings = {};
	mySettings.path = "<?php echo $_SESSION['abs_url']; ?>";
	mySettings = {
		debug:false,
		profileUrl:mySettings.path + "profile",
		ajaxLoginUrl:mySettings.path + "user/actions/login.php",
		logoutUrl:mySettings.path + "user/actions/logout.php",
		viewProfileUrl:mySettings.path + "profile/actions/view_profile.php",
		editProfileUrl:mySettings.path + "profile/actions/edit_profile.php",	
		loadPictureUrl:mySettings.path + "profile/actions/load_picture.php",
		loadUsersItemUrl:mySettings.path + "profile/actions/load_users_item.php",
		loadThumbUrl:mySettings.path + "profile/actions/load_thumbnail.php",		
		updateMapUrl:mySettings.path + "map/updateMap.php",
		updateTopListUrl:mySettings.path + "map/updateTopList.php",
		flatUrl:mySettings.path + "flats",
		isFollowedUrl:mySettings.path + "user/isfollowed.php",
		followUrl:mySettings.path + "user/follow.php",
		followingUrl:mySettings.path + "user/following/index.php",
		followersUrl:mySettings.path + "user/followers/index.php",
		viewInboxUrl:mySettings.path + "message/view_inbox.php",
		viewSentUrl:mySettings.path + "message/view_sent.php",
		sendMessageUrl:mySettings.path + "message/send_message.php",
		getMessageUrl:mySettings.path + "message/get_message.php",
		markAsReadUrl:mySettings.path + "message/mark_as_read.php",
		markAsUnreadUrl:mySettings.path + "message/mark_as_unread.php",
		toLookUpUrl:mySettings.path + "message/to_lookup.php",
		addItemUrl:mySettings.path + "map/addItem/add_item.php",
		editItemUrl:mySettings.path + "map/addItem/edit_item.php",
		deleteItemUrl:mySettings.path + "map/addItem/delete_item.php",
		uploadsPath:mySettings.path + "uploads",
		loadItemUrl:mySettings.path + "item/loadItem.php",	
		loadItemsUrl:mySettings.path + "item/loadItems.php",
		loadNewsUrl:mySettings.path + "news/loadNews.php",	
		tooltipOffsetX:-623,
		tooltipOffsetY:138
	};
</script>