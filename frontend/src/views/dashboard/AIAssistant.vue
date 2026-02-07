<template>
  
  <div class="chat-container">
    <div class="chat-header">
      <div class="ai-avatar">🤖</div>
      <div class="ai-info">
        <h3>Kinom AI</h3>
        <span class="status">Online</span>
      </div>
    </div>

    <div class="chat-body">
    
      <!-- <iframe
        src="https://interfaces.zapier.com/embed/chatbot/cmlb7tlim003c13va76w7yxte"
        allow="clipboard-write *">
      </iframe> -->
      
    </div>

    <div class="chat-footer">
      Powered by Kinom AI • Secure & Private
    </div>
  </div>
</template>
<style scoped>
    .chat-container {
      width:100%;
      height: 100%;
      background: #0b1220;
      border-radius: 16px;
      display: flex;
      flex-direction: column;
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6);
      overflow: hidden;
    }

    /* Header */
    .chat-header {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 14px 16px;
      background: #303f83;
      border-bottom: 1px solid #1e293b;
    }

    .ai-avatar {
      width: 40px;
      height: 40px;
      background: #1e293b;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
    }

    .ai-info h3 {
      margin: 0;
      color: #e5e7eb;
      font-size: 16px;
    }

    .status {
      font-size: 12px;
      color: #22c55e;
    }

    /* Chat Body */
    .chat-body {
      flex: 1;
      background: #f6f8fd;
    }

    .chat-body iframe {
      width: 100%;
      height: 100%;
      border: none;
    }

    /* Footer */
    .chat-footer {
      padding: 8px;
      text-align: center;
      font-size: 12px;
      color: #94a3b8;
      background: #303f83;
      border-top: 1px solid #1e293b;
    }

    /* Responsive */
    @media (max-width: 480px) {
      .chat-container {
        width: 100%;
        height: 100vh;
        border-radius: 0;
      }
    }
</style>
