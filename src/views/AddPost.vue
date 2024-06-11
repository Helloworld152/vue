<template>
    <div class="create-post-container">
        <h1 class="create-post-title">发帖子</h1>
        <el-row>
            <el-col :span="24">
                <el-form ref="postForm" :model="postForm">
                    <el-form-item label="标题" prop="title">
                        <el-input v-model="postForm.title"></el-input>
                    </el-form-item>
                    <el-form-item label="内容" prop="content">
                        <el-input type="textarea" v-model="postForm.content"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm">Submit</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            postForm: {
                title: '',
                content: ''
            }
        };
    },
    methods: {
        submitForm() {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    'Authorization': `Token ${token}`
                },
            }
            axios.post('http://localhost:8000/api/newpost/', {
                title: this.postForm.title,
                content: this.postForm.content
            }, config).then(response => {
                alert('Add Post successful!');
                this.$router.push('/myposts');
            })
                .catch(error => {
                    console.error('Error fetching posts:', error);
                });// 发送帖子数据到后端保存
            // 这里可以使用 Axios 或其他方式发送 POST 请求到后端 API
            console.log('Posting data:', this.postForm);
        }
    }
};
</script>

<style scoped>
.create-post-container {
    width: 1000px;
    margin: 0 auto;
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.create-post-title {
    font-size: 24px;
    margin-bottom: 20px;
}

.submit-button {
    margin-top: 20px;
}
</style>