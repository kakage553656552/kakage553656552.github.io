<template>
  <div class="chat-container">
    <!-- 聊天记录区域 -->
    <div class="chat-history">
      <div v-for="(message, index) in messages" :key="index" class="message-container">
        <div :class="['message', message.role]">
          <div class="avatar">
            <i v-if="message.role === 'user'" class="el-icon-user"></i>
            <i v-else class="el-icon-chat-dot-round"></i>
          </div>
          <div class="content">{{ message.content }}</div>
        </div>
      </div>
      <div v-if="isLoading" class="loading-indicator">
        <i class="el-icon-loading"></i> AI 正在思考...
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
    };
  },
  methods: {
    async sendMessage() {
      if (!this.inputText.trim()) return; // 如果输入为空，直接返回
      this.isLoading = true;

      // 添加用户消息到聊天记录
      this.messages.push({ role: 'user', content: this.inputText });

      // 清空输入框
      const userMessage = this.inputText;
      this.inputText = '';

      // 模拟 AI 回复
      await this.fetchAIResponse(userMessage);

      this.isLoading = false;
    },
    async fetchAIResponse(userMessage) {
      // 模拟流式响应
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
            { role: 'user', content: userMessage },
          ],
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
  },
};
</script>

<style scoped lang="scss">
.chat-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: linear-gradient(135deg, #667eea, #764ba2);
  padding: 20px;
  box-sizing: border-box;

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
          background: #409eff;
          border-radius: 50%;
          color: white;
          margin-right: 10px;
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
            background: #409eff;
            color: white;
          }
        }

        &.assistant {
          .content {
            background: #f0f0f0;
            color: #333;
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
          border-color: #409eff;
          box-shadow: 0 0 8px rgba(64, 158, 255, 0.5);
        }
      }
    }

    .send-button {
      background: #409eff;
      color: white;
      border: none;
      transition: background 0.3s, transform 0.3s;

      &:hover {
        background: #66b1ff;
        transform: scale(1.1);
      }

      &:active {
        transform: scale(0.9);
      }
    }
  }
}
</style>

