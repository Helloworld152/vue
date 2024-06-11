<template>
    <div class="computer-container">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item index="1">游戏商店</el-menu-item>
            <el-menu-item index="2">关于</el-menu-item>
            <el-menu-item index="3">服务</el-menu-item>
            <el-menu-item index="4">我的</el-menu-item>
        </el-menu>
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
}

.computer-aside {
    background-color: #f0f2f5;
    border-right: 1px solid #e4e7ed;
}

.el-menu-demo {
    background-color: #545c64;
    color: #fff;
}

.computer-main {
    flex: 1;
    padding: 20px;
}
</style>