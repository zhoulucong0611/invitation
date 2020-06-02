
$(window).on('reday',function () {
   InitWechatJSSDK();
})
function InitWechatJSSDK() {
    var url = window.location.href;
    // var data = {"appId":"wx19a6518b60fbdf06","nonceStr":"pZ2iL2OSMl6jI1Pj","timestamp":1591000057,"url":"http:\/\/cdn.indata3.com\/wechat\/wxSign.php","signature":"ce34190f3798f7c2b07d9bc2c1c82fcf507123ce","rawString":"jsapi_ticket=sM4AOVdWfPE4DxkXGEs8VG9z8TkOGp5HQj1w1CmVUMwQoDRy6V-22TLf1EfIrHhH81v2cUMOrpDb6hmeTwmqqg&noncestr=pZ2iL2OSMl6jI1Pj&timestamp=1591000057&url=http:\/\/cdn.indata3.com\/wechat\/wxSign.php"}
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
