<template>
    <div>
        <h1>Post List</h1>
<!--        <el-scrollbar class="scroll-container">-->
            <el-row :gutter="20">
                <el-col :span="40" v-for="post in posts" :key="post.id">
                    <el-card shadow="hover" style="margin-bottom: 20px;">
                        <div slot="header">
                            <span>{{ post.title }}</span>
                        </div>
                        <div>{{ post.content }}</div>
                        <div slot="footer">
                            <span>Author: {{ post.author.username }}</span>
                        </div>
                        <div>
                            <span>发布于: {{ post.create_time }}</span>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
<!--        </el-scrollbar>-->
    </div>
</template>

<script>
import axios from 'axios';
import { format } from 'date-fns';

export default {
    data() {
        return {
            posts: []
        };
    },
    created() {
        this.fetchPosts();
    },
    methods: {
        fetchPosts() {
            // 使用 Axios 或其他方式从后端获取帖子数据
            axios.get('http://localhost:8000/api/allposts/')
                .then(response => {
                    this.posts = response.data.map(post => {
                        return {
                            ...post,
                            create_time: this.formateDate(post.create_time)
                        };
                    });
                })
                .catch(error => {
                    console.error('Error fetching posts:', error);
                });
        },
        formateDate(dateString) {
            return format(new Date(dateString), 'yyyy-MM-dd HH:mm');
        }
    }
};
</script>

<style scoped>
/* 设置容器的高度和宽度 */
.scroll-container {
    height: 100vh; /* 设置容器的高度 */
    width: 80vw; /* 设置容器的宽度 */
    overflow-y: scroll; /* 使容器具有垂直滚动条 */
    border: 1px solid #ccc; /* 添加边框 */
}
</style>