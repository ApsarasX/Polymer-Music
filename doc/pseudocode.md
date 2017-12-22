## 一. 主入口
```
user opens the application(用户进入软件)
if not logined(如果没有登录)
    pop up a modal frame, let user select to login or register or cancel(显示模态弹窗让用户选择登录或者注册或者取消)
    if user clicks the login button(如果用户点击登录按钮)
        enter into login page(进入登录页)
    else if user clicks the register button(如果用户点击注册按钮)
        enter into register page(进入注册页)
    else if user clicks the cancel button(如果用户点击取消按钮)
        hidden the modal frame(隐藏这个模态弹窗)
if user clicks user-center(如果用户点击用户中心)
    display the user-center(显示用户中心)
if user clicks the first tab - recommend(如果用户点击第一个Tab-推荐)
    enter the recommend page(进入推荐页)
if user clicks the seconed tab - singer(如果用户点击第二个Tab-歌手)
    enter the singer page(进入歌手页)
if user clicks the third tab - rank(如果用户点击第三个Tab-排行榜)
    enter the rank page(进入排行榜页)
if user clicks the fourth tab - mine(如果用户点击第四个Tab-我的)
    enter the mine page(进入我的页)
if user clicks the fifth tab - search(如果用户点击第五个个Tab-搜索)
    enter the search page(进入搜索页)
```

## 二. 主要页面
1. Recommend Page(推荐页)
    ```
    request data to the server(向服务器请求数据)
    display banners(展示轮播图)
    display recommend song sheets(展示推荐歌单)
    if user clicks a banner(如果用户点击一个轮播图)
        enter into an external page(进入轮播图指向的外部网页)
    if user clicks a song sheet(如果用户点击一个歌单)(如果用户点击一个歌单)
        enter into music-list page including all of the songs belong to the song sheet(进入一个包含所有属于这个歌单的歌曲的音乐列表页)
    ```
2. Singer Page(歌手页)
    ```
    request data to the server(向服务器请求数据)
    display a list of all the singers(展示歌手列表)
    if user clicks a singer(如果用户点击一个歌手)
        enter into a music-list page including all the songs of the singer(进入一个包含所有属于这个歌手的歌曲的音乐列表页)
    ```
3. Rank Page(排行榜页)
    ```
    request data to the server(向服务器请求数据)
    display a list of all ranking lists(展示排行榜列表)
    if user clicks an item of ranking list:(如果用户点击排行榜的一个榜单)
        enter into a music-list page including all the songs of the ranking lists(进入一个包含所有属于这个榜单的歌曲的音乐列表页)
    ```
4. Mine Page(我的页)
    ```
    request data to the server(向服务器请求数据)
    display a list of songs collected by user(展示用户收藏的歌曲)
    display a list of song sheets collected by user(展示用户收藏的歌单)
    display a list of songs user has ever heard(展示用户听过的歌曲)
    if user clicks a song or music(如果用户点击一首歌)
        enter into player page(进入播放页)
    if user clicks a song sheet(如果用户点击一个歌单)
        enter into music-list page including all of the songs belong to the song sheet(进入一个包含所有属于这个歌单的歌曲的音乐列表页)
    ```
5. Search Page(搜索页)
    ```
    if user has input keyword(如果用户输入了关键词)
        display a list of songs relevant to the keyword(展示所有相关歌曲)
        if user clicks a song or music(如果用户点击一首歌)
            enter into player page(进入播放页)
    ```
6. Login Page(登录页)
    ```
    prompt user to input username and password(提示用户输入用户名和密码)
    if the username and password input by user are correct(如果输入正确)
        save user's infomation and let user login into application(登录到软件)
    ```
7. Register Page(注册页)
    ```
    prompt user to input mobile number(提示用户输入手机号)
    if user clicks the button to get verification code(如果用户点击获取验证码的按钮)
        send a verification code to user's mobile(向用户发送验证码)
        if the Verification code input by user is correct(如果验证码正确)
            prompt user to input initial username and password(提示用户输入初始用户名和密码)
            send username and password input by user to server and save them(将用户名和密码发送给服务器并保存)
            prompt user to input initial ncikname and select source of music(提示用户输入初始昵称并选择音乐来源)
            if user has completed all steps correctly(如果成功完成所有步骤)
                save user's infomation and let user login into application(登录到软件)
    ```
## 三. 子页面和高复用组件
1. Music-List Page(音乐/歌曲列表页)
    ```
    receive parameters when user enter this page(接收进入页面携带的参数)
    request data to the server(向服务器请求数据)
    if user clicks a song or music(如果用户点击一首歌)
        enter into player page(进入播放页)
    if user clicks the button labelled '随机播放全部'
        start to play all of music randomly(随机播放歌曲)
    if user clicks the button labelled '收藏歌单’
        collect the song sheet(收藏歌单)
    ```
2. Player Page(播放页)
    ```
    receive parameters when user enter this page(接收进入页面携带的参数)
    get music file and image from server(从服务器获得音乐数据)
    start to paly music(开始播放音乐)
    display the lyric of the song(显示歌词)
    ```
