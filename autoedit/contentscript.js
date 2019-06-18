function timer(ms) {
    return new Promise(res => setTimeout(res, ms));
}


async function postEdit(formhash, pagelist) {
    var posturl = "https://www.hi-pda.com/forum/post.php?action=edit&extra=&editsubmit=yes";
    for (i = 0; i < pagelist.length; i++) {
        var regex = /pid=(\d+)&amp;ptid=(\d+)/
        var afterre = regex.exec(pagelist[i]);
        var pid = afterre[1]
        var tid = afterre[2]
        payload = "message=hpautoedit%C5%FA%C1%BF%B1%E0%BC%AD&pid=" + pid + "&formhash=" + formhash + "&tid=" + tid + '&subject=%C5%FA%C1%BF%B1%E0%BC%AD'
        console.log(i+1 +'/' + pagelist.length)
        await $.post(posturl, payload)
        // $.ajax({
        //     type: 'POST',
        //     url: posturl,
        //     data: payload,
        //     async:false
        //   });
        // var result = await fetch(posturl, {
        //     method: 'post',
        //     body: payload,
        //     credentials: 'include' 
        // });
        // var ttt = await result.text();
        // // console.log(ttt);
        await timer(350)
    }
}

function ajaxget(urladdr) {
    return $.get(urladdr);
};



async function editall() {
    var nextPagebutton = document.querySelector('#wrap > div.main > div > div.threadlist.datalist > div > div > a.next');
    var maxPageAnchor = nextPagebutton.previousSibling;
    var maxPageNum = parseInt(maxPageAnchor.text, 10);

    var formhash = document.querySelector('#umenu > a:nth-child(8)').href.split('formhash=')[1]

    console.log('开始批量修改...');

    for (page = 1; page < maxPageNum + 1; page++) {

        var url = "https://www.hi-pda.com/forum/my.php?item=posts&page=" + page;
        var res = await fetch(url);
        var rawhtml = await res.text();
        // console.log(rawhtml);
        var reg = /pid=(\d+)&amp;ptid=(\d+)/g
        var fulllist = rawhtml.match(reg)

        var halflist = []

        for (i = 0; i < fulllist.length; i += 2) {
            halflist.push(fulllist[i]);
        }

        console.log(halflist.length)

        console.log('修改第' + page + '/' + maxPageNum + '页')
        await postEdit(formhash, halflist);

    }



}
