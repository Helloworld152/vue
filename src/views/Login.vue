<script>
import axios from "axios";

export default {
    data() {
        return {
            loginForm: {
                username: '',
                password: ''
            }
        };
    },
    methods: {
        handleLogin() {
            axios.post('http://localhost:8000/api/login/',{
                username: this.loginForm.username,
                password: this.loginForm.password
            }).then(response => {
                console.log(response.data);
                const token = response.data.token;
                localStorage.setItem('token', token);
                // 处理登录成功的逻辑，比如跳转页面或者显示成功提示
                alert('登录成功！');
                this.$router.push('/userinfo');
            }).catch(error => {
                console.error(error);
                // 处理登录失败的逻辑，比如显示错误提示
                alert('登录失败，请检查用户名和密码！');
            })
        }
    }
}
</script>

<template>
    <div class="login-container">
        <el-form ref="loginForm" :model="loginForm" label-width="80px" class="login-form">
            <el-form-item label="用户名" prop="username">
                <el-input v-model="loginForm.username" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="loginForm.password" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleLogin">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<style scoped>

</style>