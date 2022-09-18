//每次调用$.get()或$.post()或$.ajax()时，
//会先调用ajaxPrefilter这个函数
//在这个函数中，我们会拿到ajax配置的对象
$.ajaxPrefilter(function(options){

    //在发起ajax请求之前，统一拼凑请求的根路径
    options.url='http://api-breakingnews-web.itheima.net'
    +options.url
    console.log(options.url);

})