<template>
  <div class="AI">
    <div class="main">
      <!-- 结果展示区域 -->
      <div v-if="result" class="result-container">
        <div class="user-message">
          <i class="el-icon-user"></i>
          <span>{{ textarea }}</span>
        </div>
        <div class="ai-response">{{ result }}</div>
      </div>

      <!-- 输入区域 -->
      <div class="input-container">
        <div class="title">有什么可以帮忙的？</div>
        <div class="input-wrapper">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入您的问题..."
            v-model="textarea"
            class="custom-textarea"
          ></el-input>
          <el-button
            @click="handleClick"
            class="send-button"
            :loading="isLoading"
            icon="el-icon-caret-top"
            circle
          ></el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AI',
  data() {
    return {
      textarea: '',
      result: '',
      isLoading: false,
    };
  },
  methods: {
    async handleClick() {
      if (!this.textarea.trim()) return;
      this.isLoading = true;
      this.result = '';
      await this.fetchStreamWithProgress(this.textarea);
      this.isLoading = false;
    },
    async fetchStreamWithProgress(textarea) {
      const response = await fetch('https://api.deepseek.com/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer sk-fcf6e65d04034eac954df8361c3f2d18',
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: [
            { role: 'system', content: 'You are a helpful assistant.' },
            { role: 'user', content: textarea },
          ],
          stream: true,
        }),
      });
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let done = false;

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunk = decoder.decode(value, { stream: true });
        const cleanData = chunk.replace(/^data: /, '');
        const jsonChunks = cleanData.split('data:').filter(Boolean);

        for (const jsonChunk of jsonChunks) {
          try {
            const json = JSON.parse(jsonChunk);
            const content = json.choices[0]?.delta?.content || '';
            this.result += content;
          } catch (error) {
            console.error('解析 JSON 出错:', error);
          }
        }
      }
    },
  },
};
</script>

<style scoped lang="scss">
.AI {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #667eea, #764ba2); // 更高级的渐变色
  animation: gradientAnimation 10s ease infinite; // 背景渐变动画
  padding: 20px;

  .main {
    width: 100%;
    max-width: 720px;
    text-align: center;
    background: rgba(255, 255, 255, 0.9); // 半透明背景
    border-radius: 20px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2); // 更强的阴影
    padding: 30px;
    backdrop-filter: blur(10px); // 毛玻璃效果
    animation: fadeIn 0.5s ease; // 淡入动画

    .result-container {
      text-align: left;
      margin-bottom: 20px;

      .user-message {
        display: flex;
        align-items: center;
        font-size: 16px;
        color: #333;
        margin-bottom: 10px;
        padding: 10px;
        background: linear-gradient(135deg, #f5f7fa, #e6e9ef); // 用户消息背景
        border-radius: 10px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

        i {
          margin-right: 10px;
          color: #409eff;
        }
      }

      .ai-response {
        font-size: 14px;
        color: #444;
        background: linear-gradient(135deg, #ffffff, #f9f9f9); // AI 回复背景
        padding: 15px;
        border-radius: 10px;
        line-height: 1.6;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      }
    }

    .input-container {
      .title {
        font-size: 24px;
        font-weight: 900;
        color: #333;
        margin-bottom: 20px;
      }

      .input-wrapper {
        position: relative;

        .custom-textarea {
          ::v-deep .el-textarea__inner {
            border-radius: 15px;
            border: 1px solid #ddd;
            padding-right: 60px;
            resize: none;
            transition: border-color 0.3s, box-shadow 0.3s;

            &:focus {
              border-color: #409eff;
              box-shadow: 0 0 8px rgba(64, 158, 255, 0.5); // 聚焦效果
            }
          }
        }

        .send-button {
          position: absolute;
          right: 10px;
          bottom: 10px;
          background: #409eff;
          color: white;
          border: none;
          transition: background 0.3s, transform 0.3s;

          &:hover {
            background: #66b1ff;
            transform: scale(1.1); // 悬浮放大效果
          }

          &:active {
            transform: scale(0.9); // 点击缩小效果
          }
        }
      }
    }
  }
}

// 背景渐变动画
@keyframes gradientAnimation {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

// 淡入动画
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
