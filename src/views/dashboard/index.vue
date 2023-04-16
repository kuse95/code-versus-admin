<template>
  <div class="dashboard">
    <div class="box">
        <img class="running" src="@/assets/running.gif" />
        <p class="tips">生命不息，战斗不止!</p>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.dashboard {
  .box {
    padding: 24px 24px 2px;
    background-color: #fff;
    border-radius: 2px;
    margin-bottom: 12px;
  }
  .running{
    display: block;
    margin: 0 auto;
  }
  .tips{
    margin: 12px 0 24px;
    text-align: center;
  }
}
</style>
