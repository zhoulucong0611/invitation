
$(function () {
   console.log('执行页面')
   InitWechatJSSDK();
})
function InitWechatJSSDK() {
    var url = window.location.href;
    $.ajax({
        type: "POST",
        url: "https://cdn.indata3.com/wechat/wxSign.php" ,
        data:{
            url:url
        },
        success: function (data) {
            var data = JSON.parse(data);
            wx.config({
                debug: false,
                appId: data.appId,
                timestamp: data.timestamp,
                nonceStr: data.nonceStr,
                signature: data.signature,
                jsApiList: [
                    'checkJsApi',
                    'hideMenuItems',
                    'showMenuItems',
                    'hideAllNonBaseMenuItem',
					'onMenuShareAppMessage',
                    'onMenuShareTimeline',
                    'onMenuShareQQ',              
                    'scanQRCode',
                    'startSearchBeacons',
                    'stopSearchBeacons',
                    'onSearchBeacons',
                ]
            });
            wx.ready(function () {
                console.log('信息验证成功')
                wx.hideAllNonBaseMenuItem();
                wx.showMenuItems({
                    menuList: ["menuItem:share:timeline", "menuItem:favorite", "menuItem:share:appMessage"] // 要显示的菜单项，所有menu项见附录3
                });
            });
        }
    });
};
