/**
 * PromptResponse type from MCP SDK representing a prompt response.
 * Contains description and messages for the prompt result.
 */
export type PromptResponse = {
  description: string;
  messages: Array<{
    content: {
      text: string;
      type: 'text';
    };
    role: 'user' | 'assistant';
  }>;
};
