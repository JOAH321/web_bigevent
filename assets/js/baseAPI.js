//每次调用$.get()或$.post()或$.ajax()时，
//会先调用ajaxPrefilter这个函数
//在这个函数中，我们会拿到ajax配置的对象
$.ajaxPrefilter(function(options){

    //在发起ajax请求之前，统一拼凑请求的根路径
    options.url='http://api-breakingnews-web.itheima.net'
    +options.url
    

    //统一为有权限的接口，设置headers请求头
    if(options.url.indexOf('/my/')!==-1){
        options.headers = {
         Authorization:localStorage.getItem('token')||''
            
     }
    }


    //全局统一挂载complete回调函数
    //无论成功还是失败，最终都会调用complete函数
    options.complete = function(res){
         if(res.responseJSON.status===1&&res.responseJSON.
                message==='身份认证失败！'){
                    //1.强制清空token
                    localStorage.removeItem('token')

                    //2.强制跳转到登录界面
                    location.href='/login.html'
                }

        

    }
  

})

//