var fs = require('fs');
var casper = require("casper").create({
    clientScripts: [
        './includes/jquery.js'
    ],
    pageSettings: {
        loadImages:  false,        // The WebPage instance used by Casper will
        loadPlugins: false         // use these settings
    }
}); 

casper.start('http://weibo.com/login.php'); 

casper.wait(2000, function() {
    this.echo('start');
}); 

casper.waitForSelector(".W_login_form", function(){ 
    this.fillSelectors('.W_login_form', { 
        'input[name="username"]': '15915580129', 
        'input[name="password"]': '15915580129xjj', 
    }, false); 
    this.click(".W_login_form .login_btn a"); 
}); 

casper.wait(5000, function() {});

casper.thenOpen('http://weibo.com/jlsgat?profile_ftype=1&is_all=1&is_search=1&key_word=304');

casper.wait(10000, function() {
    casper.evaluate(function() {
        $('body').scrollTop(5000);
    });
});

casper.wait(5000, function() {});

casper.then(function() {
    this.echo(this.getCurrentUrl() + '\n');
    this.echo('时间,转发量,评论数,点赞数,微博内容\n');
    var str = casper.evaluate(function(){
        var result = '';
        $('#Pl_Official_MyProfileFeed__24 > div > div').each(function(index, element){    
            result += $(this).find('div.WB_feed_detail.clearfix > div.WB_detail > div.WB_from.S_txt2 > a:nth-child(1)').text() + ',' +
                      $(this).find('div.WB_feed_handle > div > ul > li:nth-child(2) > a > span > span > span > em:nth-child(2)').text() + ',' +
                      $(this).find('div.WB_feed_handle > div > ul > li:nth-child(3) > a > span > span > span > em:nth-child(2)').text() + ',' +
                      $(this).find('div.WB_feed_handle > div > ul > li:nth-child(4) > a > span > span > span > em:nth-child(2)').text() + ',' +
                      $(this).find('div.WB_feed_detail.clearfix > div.WB_detail > div.WB_text.W_f14').text() + '\n';
        });
        return result;
    });
    this.echo(str);
});


// casper.wait(5000, function(){ 
//     this.echo(this.getCurrentUrl()); 
//     var v1 = 123;
//     var v2 = 456
//     casper.thenOpen('http://localhost:3000', {
//         method: 'post',
//         data: {
//             'hhh': v1,
//             'xxx': v2
//         }
//     });
// }); 

casper.run(); 