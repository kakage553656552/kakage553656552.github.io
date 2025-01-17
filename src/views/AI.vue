<template>
  <div class="chat-container" :style="{ background: themeColor }">
    <!-- 主题颜色选择器 -->
    <div class="theme-picker">
      <el-color-picker v-model="themeColor" @change="updateTheme" show-alpha></el-color-picker>
    </div>

    <!-- 聊天记录区域 -->
    <div class="chat-history">
      <div v-for="(message, index) in messages" :key="index" class="message-container">
        <div :class="['message', message.role]">
          <!-- 用户消息：头像在右侧 -->
          <div v-if="message.role === 'user'" class="content">{{ message.content }}</div>
          <div v-if="message.role === 'user'" class="avatar">
            <i class="el-icon-user"></i>
          </div>

          <!-- AI 消息：头像在左侧 -->
          <div v-if="message.role === 'assistant'" class="avatar">
            <i class="el-icon-chat-dot-round"></i>
          </div>
          <div v-if="message.role === 'assistant'" class="content">{{ message.content }}</div>
        </div>
      </div>
      <div v-if="isLoading" class="loading-indicator">
        <i class="el-icon-loading"></i> 卡卡正在思考...
      </div>
    </div>

    <!-- 输入区域 -->
    <div class="input-area">
      <el-input
        type="textarea"
        :rows="3"
        placeholder="请输入您的问题..."
        v-model="inputText"
        @keyup.enter.native="sendMessage"
        class="input-box"
      ></el-input>
      <el-button
        @click="sendMessage"
        class="send-button"
        :loading="isLoading"
        icon="el-icon-s-promotion"
        circle
      ></el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChatPage',
  data() {
    return {
      inputText: '', // 用户输入的内容
      messages: [], // 聊天记录
      isLoading: false, // 是否正在加载
      themeColor: '#409EFF', // 默认主题颜色
    };
  },
  mounted() {
    // 从 localStorage 加载保存的主题颜色
    const savedColor = localStorage.getItem('themeColor');
    if (savedColor) {
      this.themeColor = savedColor;
    }

    // 组件加载时发送问候语
    this.sendGreeting();
  },
  methods: {
    // 发送问候语
    sendGreeting() {
      this.messages.push({
        role: 'assistant',
        content: '您好！我是 AI 助手卡卡，有什么可以帮您的吗？',
      });
    },
    async sendMessage() {
      if (!this.inputText.trim()) return; // 如果输入为空，直接返回
      this.isLoading = true;

      // 添加用户消息到聊天记录
      this.messages.push({ role: 'user', content: this.inputText });

      // 清空输入框
      const userMessage = this.inputText;
      this.inputText = '';

      // 发送消息并获取 AI 回复
      await this.fetchAIResponse();

      this.isLoading = false;
    },
    async fetchAIResponse() {
      // 构造 API 请求的消息列表
      const apiMessages = this.messages.map((msg) => ({
        role: msg.role,
        content: msg.content,
      }));

      // 模拟流式响应
      const response = await fetch('https://api.deepseek.com/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer sk-fcf6e65d04034eac954df8361c3f2d18',
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: apiMessages, // 发送完整的聊天记录
          stream: true,
        }),
      });

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let done = false;
      let aiResponse = '';

      // 添加 AI 消息占位符
      this.messages.push({ role: 'assistant', content: '' });

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
            aiResponse += content;

            // 更新最后一条消息的内容
            this.messages[this.messages.length - 1].content = aiResponse;

            // 滚动到底部
            this.$nextTick(() => {
              const chatHistory = this.$el.querySelector('.chat-history');
              chatHistory.scrollTop = chatHistory.scrollHeight;
            });
          } catch (error) {
            console.error('解析 JSON 出错:', error);
          }
        }
      }
    },
    // 更新主题颜色
    updateTheme(color) {
      this.themeColor = color;
      localStorage.setItem('themeColor', color); // 保存到 localStorage
    },
  },
};
</script>

<style scoped lang="scss">
.chat-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 20px;
  box-sizing: border-box;
  max-width: 800px; // 限制整体宽度
  margin: 0 auto; // 居中显示
  transition: background 0.3s ease; // 背景颜色过渡效果

  .theme-picker {
    position: absolute;
    top: 20px;
    right: 20px;
    z-index: 10;
  }

  .chat-history {
    flex: 1;
    overflow-y: auto;
    padding: 20px;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 15px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;

    .message-container {
      margin-bottom: 15px;

      .message {
        display: flex;
        align-items: flex-start;

        .avatar {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: v-bind(themeColor); // 动态应用主题颜色
          border-radius: 50%;
          color: white;
          margin-left: 10px; // 用户头像在右侧
          margin-right: 0; // 取消右侧间距
          flex-shrink: 0;
        }

        .content {
          padding: 10px 15px;
          border-radius: 10px;
          max-width: 70%;
          word-wrap: break-word;
        }

        &.user {
          justify-content: flex-end;

          .content {
            background: v-bind(themeColor); // 动态应用主题颜色
            color: white;
            margin-right: 10px; // 用户消息内容与头像的间距
          }
        }

        &.assistant {
          .content {
            background: #f0f0f0;
            color: #333;
            margin-left: 10px; // AI 消息内容与头像的间距
          }
        }
      }
    }

    .loading-indicator {
      text-align: center;
      color: #666;
      font-size: 14px;
      padding: 10px;
    }
  }

  .input-area {
    display: flex;
    align-items: center;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 15px;
    padding: 10px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);

    .input-box {
      flex: 1;
      margin-right: 10px;

      ::v-deep .el-textarea__inner {
        border-radius: 10px;
        border: 1px solid #ddd;
        resize: none;
        transition: border-color 0.3s, box-shadow 0.3s;

        &:focus {
          border-color: v-bind(themeColor); // 动态应用主题颜色
          box-shadow: 0 0 8px v-bind(themeColor); // 动态应用主题颜色
        }
      }
    }

    .send-button {
      background: v-bind(themeColor); // 动态应用主题颜色
      color: white;
      border: none;
      transition: background 0.3s, transform 0.3s;

      &:hover {
        background: v-bind(themeColor); // 保持主题颜色
        transform: scale(1.1);
      }

      &:active {
        transform: scale(0.9);
      }
    }
  }
}
</style>
