var page = require('webpage').create(),
    testindex = 0,
    loadInProgress = false;

page.onLoadStarted = function() {
    loadInProgress = true;
     console.log("load started");
};

page.onLoadFinished = function() {
    loadInProgress = false;
      console.log("load finished");
};

var steps = [
    function() {
      //Load Login Page
      page.open("https://passport.weibo.cn/signin/login?entry=mweibo&res=wel&wm=3349&r=http%3A%2F%2Fm.weibo.cn%2F");
    //   page.render('login-page.png');
    },
    // function() {
    //     page.evaluate(function(obj) {
    //         // var form = document.getElementById("miniLogin");
    //         // form.elements["miniLogin_username"].value = '用户名';
    //         // form.elements["miniLogin_pwd"].value = '密码';
    //         // form.elements['message_LOGIN_IMMEDIATELY'].click();

    //         // document.getElementById('loginName').value = '15915580129';
    //         // document.getElementById('loginPassword').value = '15915580129xjj';
    //         // document.getElementById('loginAction').click();
    //         return document.title;
    //     });
    //     loadInProgress = true;
    // },
    function() {
        page.render('login-succ.png');
    }
];

var interval = setInterval(function() {
    if (!loadInProgress && typeof steps[testindex] == "function") {
        steps[testindex]();
        testindex++;
    }
    if (typeof steps[testindex] != "function") {
        phantom.exit();
    }
}, 60);