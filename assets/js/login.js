$(function(){
    // 点击“去注册账号”的链接
    $('#link_reg').on('click',function(){
        $('.login-box').hide()
        $('.reg-box').show()
    })


    //点击“去登陆”的链接
    $('#link_login').on('click',function(){
        $('.login-box').show()
        $('.reg-box').hide()
    })
    

    //从layui中获取form对象
    let form = layui.form
    //通过form.verify()函数自定义校验规则
    form.verify({
        //自定义了一个 pwd的校验规则
        pwd:[
    /^[\S]{6,12}$/
    ,'密码必须6到12位，且不能出现空格'
  ],
  //校验两次密码是否一致的规则
  repwd:function(value){
    //通过形参拿到的是确认密码框中的内容，还需要拿到密码框中的内容
    //然后进行一次等于的判断，如果判断失败，则提示一个错误信息
    let pwd = $('.reg-box [name=password]').val()
    if(pwd!== value){
        return'两次密码不一致'
    }
  }
    })

    //监听注册表单的提交事件
    $('#form_reg').on('submit',function(e){
        // 1.阻止默认行为
        e.preventDefault()
        // console.log('1')
        // $.post('http://api-breakingnews-web.itheima.net/api/reguser',{username:$('#form_reg [name=username]').val(),password:$('#form_reg [name=password]').val()},function(res){
        //     console.log(res)
        // })
        // 发起ajax的post请求
        $.post('/api/reguser',
        {username:$('#form_reg [name=username]').val(),password:$('#form_reg [name=password]').val()},function(res){
            if(res.status!==0){
                // return console.log(res.message)

                 //从layui中获取layer对象
                let layer = layui.layer
                return layer.msg(res.message)

            }
            // console.log('注册成功！')
            layer.msg('注册成功，请登录！')
            // 模拟人的点击行为，注册成功后自动跳转登录界面
            $('#link_login').click()

        })

    })


    // 监听登录表单的提交事件
    $('#form_login').submit(function(e){
        //阻止默认行为
        e.preventDefault()
        $.ajax({
            url:'/api/login',
            method:'POST',
            // 快速获取表单中的数据
            data:$(this).serialize(),
            success:function(res){
                if (res.status!==0) {
                    return layer.msg('登陆失败！')
                    
                }
                layer.msg('登录成功！')
                console.log(res.token)
                //将登陆成功得到的token字符串存储到localStorage中
                localStorage.setItem('token',res.token)
                //跳转到后台首页
                location.href = '/index.html'
            }
//Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ODczLCJ1c2VybmFtZSI6ImRodyIsInBhc3N3b3JkIjoiIiwibmlja25hbWUiOiIiLCJlbWFpbCI6IiIsInVzZXJfcGljIjoiIiwiaWF0IjoxNjYzNDE1Mjg3LCJleHAiOjE2NjM0NTEyODd9.7lMuZD9TojE9wZL7iRQfSMium3YbN4HrnoWLz5GLUK0

        })
    })
})