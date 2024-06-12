<template>
    <span>
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
                    <el-collapse>
                        <el-collapse-item>
                            <span>{{ post.content }}</span>
                        </el-collapse-item>
                    </el-collapse>
                    <div slot="footer">
                        <span>Author: {{ post.author_username }}</span>
                    </div>
                    <div class="card-footer">
                        <span>发布于: {{ post.create_time }}</span>
                    </div>
                    <div class="post-button">
                        <el-button type="primary" @click="toggleComments(post)" size="mini">评论</el-button>
                        <el-button type="primary" @click="deletePost(post.id)" size="mini">编辑帖子</el-button>
                        <el-button type="danger" @click="deletePost(post.id)" size="mini">删除帖子</el-button>
                    </div>
                    <div v-if="post.showComments">
                        <el-divider></el-divider>
                        <div v-for="comment in post.comments" :key="comment.id" class="comment">
                            <p><strong>{{ comment.author_username }}</strong> ({{ comment.create_time }}):</p>
                            <div class="comment-container">
                                <p>{{ comment.content }}</p>
                                <el-button @click="deleteComment(post, comment)" size="mini" class="comment-button" plain>删除</el-button>
                            </div>
                            <el-divider></el-divider>
                        </div>

                        <el-form :model="post.newComment" class="comment-form">
                            <el-form-item>
                                <el-input type="textarea" v-model="post.newComment.text" placeholder="添加评论..."></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="addComment(post)">提交评论</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </span>
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
                            showContent: false,
                            showComments: false,
                            comments: [],
                            newComment: { text: '' }
                        };
                    });
                })
                .catch(error => {
                    console.error('Error fetching posts:', error);
                });
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
        },
        addComment(post) {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    'Authorization': `Token ${token}`
                },
            }
            axios.post(`http://localhost:8000/api/posts/${post.id}/comments/`, {
                content: post.newComment.text
            }, config)
                .then(response => {
                    post.comments.push(response.data);
                    post.newComment.text = '';
                    this.$message.success('评论成功');
                    // this.loadComments(post);
                })
                .catch(error => {
                    console.error('Error submitting comment:', error);
                    this.$message.error('评论失败');
                });
        },
        toggleContent(post) {
            post.showContent = !post.showContent;
        },
        toggleComments(post) {
            post.showComments = !post.showComments;
            this.loadComments(post);
        },
        loadComments(post) {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    'Authorization': `Token ${token}`
                },
            }
            axios.get(`http://localhost:8000/api/posts/${post.id}/comments/`, config)
                .then(response => {
                    post.comments = response.data;
                })
                .catch(error => {
                    console.error('Error loading comments:', error);
                });
        },
        deleteComment(post, comment) {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    'Authorization': `Token ${token}`
                },
            }
            axios.delete(`http://localhost:8000/api/comments/${comment.id}/`, config)
                .then(response => {
                    this.$message.success('删除成功');
                    post.comments = post.comments.filter(c => c.id !== comment.id);
                })
                .catch(error => {
                    console.error('Error deleting post:', error);
                    this.$message.error('删除失败');
                });
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

 .post-button {
     display: flex;
     align-items: center;
     margin-top: 10px;
     justify-content: flex-end;
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

.comment-button {
    margin-left: 10px;
    border: none;
}

.comment-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>