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
        handleRegister() {
            axios.post('http://localhost:8000/api/register/',{
                username: this.loginForm.username,
                password: this.loginForm.password
            }).then(response =>{
                console.log(response.data);
                this.$message.success('注册成功');
                this.$router.push('/login');
            }).catch(error => {
                console.error(error);
                this.$message.error('注册失败');
            });
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
                <el-button type="primary" @click="handleRegister">注册</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<style scoped>

</style>