
// $(window).on('load',function () {
//         // InitWechatJSSDK();
// })
function wxShareConfig(val) {
var baseLink = ''
  if (val) {
    baseLink = 'https://cdn.indata3.com/yarnexpo/share.html?tel=' + val
  }
  return baseLink
}
function InitWechatJSSDK(val) {
    var baseLinkUrl = wxShareConfig(val)
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
                wx.onMenuShareAppMessage({
                    title:'大湾区国际纺织纱线博览会', // 分享标题
                    desc: 'Grrater Bay Area International Trade Fair for Fibres and Yarns', // 分享描述
                    link: baseLinkUrl, //location.href	 分享链接
                    imgUrl:'https://cdn.indata3.com/yarnexpo/image/sharelogo.png',
                    type: '', // 分享类型,music、video或link，不填默认为link
                    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                    success: function () {
                        //alert("share ok!"); http://cdn.indata3.com/images/img/20180628/1530192197_60.jpeg
                    },
                    cancel: function () {
                        // 用户取消分享后执行的回调函数
                        //alert("share cancel!");
                    }
                });
                wx.onMenuShareTimeline({
                    title: '大湾区国际纺织纱线博览会', // 分享标题
                    link: baseLinkUrl, // 分享链接
                    imgUrl: 'https://cdn.indata3.com/yarnexpo/image/sharelogo.png', // 分享图标
                    success: function () {
                        // 用户确认分享后执行的回调函数
                    },
                    cancel: function () {
                        // 用户取消分享后执行的回调函数
                    }
                });

                wx.hideAllNonBaseMenuItem();
                wx.showMenuItems({
                    menuList: ["menuItem:share:timeline", "menuItem:favorite", "menuItem:share:appMessage"] // 要显示的菜单项，所有menu项见附录3
                });
            });
        }
    });
};
