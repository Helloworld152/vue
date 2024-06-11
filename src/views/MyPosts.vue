<template>
    <div>
        <h1>我的帖子</h1>
        <el-divider></el-divider>
        <div class="post-button-container">
            <el-button type="primary" size="medium" @click="addPost">发帖</el-button>
        </div>
        <el-row :gutter="20">
            <el-col :span="40" v-for="post in posts" :key="post.id">
                <el-card shadow="hover" style="margin-bottom: 20px; min-width: 800px">
                    <div slot="header" class="post-title">
                        <span>{{ post.title }}</span>
                    </div>
                    <div>{{ post.content }}</div>
                    <div slot="footer">
                        <span>Author: {{ post.author.username }}</span>
                    </div>
                    <div class="card-footer">
                        <span>发布于: {{ post.create_time }}</span>
                        <el-button type="danger" @click="deletePost(post.id)" size="mini">删除帖子</el-button>
                    </div>
                </el-card>
            </el-col>
        </el-row>
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
        this.fetchUserPosts();
    },
    methods: {
        fetchUserPosts() {
            // 使用 Axios 或其他方式从后端获取帖子数据
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    'Authorization': `Token ${token}`
                },
            }
            axios.get('http://localhost:8000/api/myposts/', config)
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
        },
        deletePost(postID) {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    'Authorization': `Token ${token}`
                },
            }
            axios.delete(`http://localhost:8000/api/posts/${postID}/`, config)
                .then(response => {
                    this.$message.success('删除成功');
                    this.fetchUserPosts();
                })
                .catch(error => {
                    console.error('Error deleting post:', error);
                    this.$message.error('删除失败');
                });
        },
        addPost() {
            this.$router.push('/addpost');
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

 .card-footer {
     display: flex;
     justify-content: space-between;
     align-items: center;
 }

.post-button-container {
    margin-bottom: 20px;
    display: flex;
    justify-content: flex-end;
}

.post-title {
    font-size: 25px; /* 设置标题字体大小 */
    color: #333; /* 设置标题字体颜色 */
    font-weight: bold; /* 设置标题加粗 */
    margin-bottom: 10px; /* 设置标题与内容之间的间距 */
}
</style>