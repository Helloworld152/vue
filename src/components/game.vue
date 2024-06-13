<template>
    <el-card>
        <div slot="header" class="clearfix">
            <span>{{ game.title }}</span>
        </div>
        <div>
            <img :src="game.icon" alt="Image" class="custom-image">
            <p>游玩时间：{{ game.hours }}</p>
            <!-- 其他内容 -->
        </div>
    </el-card>
</template>

<script>
export default {
    name: 'GameCard',
    props: {
        game: {
            type: Object,
            required: true
        }
    }
};
</script>

<style scoped>
.game-card {
    border: 1px solid #ebebeb;
    border-radius: 10px;
    padding: 10px;
    margin: 10px 0;
    display: flex;
    align-items: center;
}

.game-icon {
    width: 100%;
    border-radius: 10px;
}

.game-details {
    padding-left: 10px;
}

.game-title {
    font-size: 18px;
    font-weight: bold;
}

.game-trophies {
    display: flex;
    align-items: center;
    margin: 5px 0;
}

.trophy {
    margin-right: 5px;
}

.platinum {
    background-color: #e5e4e2;
}

.gold {
    background-color: #ffd700;
}

.silver {
    background-color: #c0c0c0;
}

.bronze {
    background-color: #cd7f32;
}

.game-last-played {
    color: #999;
    font-size: 14px;
    margin: 5px 0;
}

.game-progress {
    margin: 10px 0;
}

.game-hours {
    font-size: 16px;
    font-weight: bold;
    color: #ff4d4f;
}
.custom-image{
    width: 200px;
    height: auto;
}
</style>