<template>
    <div class="computer-container">
        <!-- 导航栏 -->
        <el-aside width="200px" class="computer-aside">
            <el-menu :default-active="activeMenu" @select="handleMenuSelect">
                <el-menu-item index="game">游戏</el-menu-item>
                <el-menu-item index="discussion">讨论</el-menu-item>
                <el-menu-item index="userinfo">我的</el-menu-item>
            </el-menu>
        </el-aside>
        <!-- 内容区域 -->
        <el-main class="computer-main">
            <router-view></router-view>
        </el-main>
    </div>
</template>

<script>
export default {
    data() {
        return {
            activeMenu: 'game' // 默认选中的菜单项
        };
    },
    methods: {
        handleMenuSelect(index) {
            // 当选择导航栏菜单时更新选中状态
            this.activeMenu = index;
            // 根据选择的菜单项跳转到对应的路由
            this.$router.push({ path: '/' + index });
        }
    }
};
</script>

<style scoped>
.computer-container {
    display: flex;
    height: 100vh;
}

.computer-aside {
    background-color: #f0f2f5;
    border-right: 1px solid #e4e7ed;
}

.computer-main {
    flex: 1;
    padding: 20px;
}
</style>