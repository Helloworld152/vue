<template>
    <div>
        <h1>用户信息</h1>
        <el-text >用户名：{{ userInfo.username }}</el-text>
        <el-text>用户id：{{ userInfo.id }}</el-text>
        <el-text>Steam 用户名：{{ userInfo.steamUserName || '未绑定' }}</el-text>
        <div v-if="!userInfo.steamUserName">
            <el-form :model="form" label-width="200px">
                <el-form-item label="绑定Steam 用户名">
                    <el-input v-model="form.steamUserName"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="bindSteamUserName">绑定</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div v-else>
            <el-button type="primary" @click="unbindSteam">解绑</el-button>
            <div>
                <el-table :data="games" width="100%">
                    <el-table-column label="Image" width="100">
                        <template #default="{ row }">
                            <img :src="getImageURL(row.appid, row.img_icon_url)" alt="Game Image" width:100px object-fit: cover>
                        </template>
                    </el-table-column>
                    <el-table-column v-if="showAppID" prop="appid" label="appid" width="100"></el-table-column>
                    <el-table-column v-if="showName" prop="name" label="游戏名称" width="400"></el-table-column>
                    <el-table-column v-if="showHoursPlayed" prop="playtime_forever" label="游戏时长" width="100" sortable></el-table-column>
                </el-table>
            </div>

        </div>
    </div>
</template>

<script>
import axios from "axios";
import GameCard from '../components/game.vue';

export default {
    data() {
        return {
            userInfo: {},
            form: {
                steamUserName: ''
            },
            games: [],
            showAppID: true,
            showName: true,
            showHoursPlayed: true
        };
    },
    created() {
        this.fetchUserInfo();
        if (this.userInfo.steamUserName) {
            this.getSteamGameInfo()
        }
    },
    methods: {
        fetchUserInfo() {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    'Authorization': `Token ${token}`
                }
            }
            axios.get('http://localhost:8000/api/userinfo/', config)
                .then(response => {
                    console.log(response.data);
                    this.userInfo = response.data;
                }).catch(error => {
                // 获取用户信息失败，可以根据错误信息进行处理
                console.error(error);
            });
        },
        bindSteamUserName() {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    'Authorization': `Token ${token}`
                },
            }
            axios.post('http://localhost:8000/api/bindsteam/', {
                steamUserName: this.form.steamUserName
            }, config).then(response => {
                console.log(response.data);
                alert('Bind Steam successful!');
                this.fetchUserInfo();
                this.getSteamGameInfo();
                this.form.steamUserName = '';
            }).catch(error => {
                console.error(error);
                alert('Bind Steam failed!');
            })
        },
        unbindSteam() {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    'Authorization': `Token ${token}`
                },
            }
            axios.get('http://localhost:8000/api/unbindsteam/', config).then(response => {
                console.log(response.data);
                alert('Unbind Steam successful!');
                this.fetchUserInfo();
                this.games = [];
                this.form.steamUserName = '';
            }).catch(error => {
                console.error(error);
                alert('Bind Steam failed!');
            })
        },
        getSteamGameInfo() {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    'Authorization': `Token ${token}`
                }
            }
            axios.get('http://localhost:8000/api/steamgameinfo/', config)
                .then(response => {
                    console.log(response.data);
                    this.games = response.data;
                }).catch(error => {
                // 获取用户信息失败，可以根据错误信息进行处理
                console.error(error);
            });
        },
        getImageURL(appid, url) {
            return `http://media.steampowered.com/steamcommunity/public/images/apps/${appid}/${url}.jpg`;
        },
    },
    mounted() {
        this.fetchUserInfo();
        this.getSteamGameInfo();
    }
};
</script>

<style scoped>
/* 你可以在这里添加自定义样式 */
</style>