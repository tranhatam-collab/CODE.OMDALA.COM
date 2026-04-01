export type PromptId =
  | 'plan-default'
  | 'review-default'
  | 'chat-default'
  | 'summarize-default'
  | 'docs-generate'
  | 'release-notes'
  | 'test-gen-default'
  | 'patch-explain'
  | 'commit-draft';

export interface PromptTemplate {
  id: PromptId;
  task: string;
  name: { vi: string; en: string };
  template: string;
  version: string;
  variables: string[];
}

export const PROMPTS: PromptTemplate[] = [
  {
    id: 'plan-default',
    task: 'plan',
    name: { vi: 'Lập kế hoạch mặc định', en: 'Default Plan' },
    template:
      'Analyze the following project context and create a detailed implementation plan:\n\nProject: {{projectName}}\nFiles: {{files}}\nUser request: {{userMessage}}\n\nProvide a step-by-step plan with file-level changes.',
    version: '1.0.0',
    variables: ['projectName', 'files', 'userMessage'],
  },
  {
    id: 'review-default',
    task: 'review',
    name: { vi: 'Review code mặc định', en: 'Default Code Review' },
    template:
      'Review the following code changes:\n\nDiff: {{diff}}\nProject: {{projectName}}\n\nProvide feedback on: correctness, security, performance, readability, and best practices.',
    version: '1.0.0',
    variables: ['diff', 'projectName'],
  },
  {
    id: 'chat-default',
    task: 'chat',
    name: { vi: 'Chat repo mặc định', en: 'Default Repo Chat' },
    template:
      'You are an AI coding assistant working on the project "{{projectName}}". Answer the following question based on the project context:\n\n{{userMessage}}',
    version: '1.0.0',
    variables: ['projectName', 'userMessage'],
  },
  {
    id: 'summarize-default',
    task: 'summarize',
    name: { vi: 'Tóm tắt mặc định', en: 'Default Summary' },
    template: 'Summarize the following content concisely:\n\n{{content}}',
    version: '1.0.0',
    variables: ['content'],
  },
  {
    id: 'docs-generate',
    task: 'docs',
    name: { vi: 'Tạo tài liệu', en: 'Generate Documentation' },
    template:
      'Generate documentation for the following code:\n\n{{code}}\n\nInclude: purpose, parameters, return value, examples.',
    version: '1.0.0',
    variables: ['code'],
  },
  {
    id: 'release-notes',
    task: 'release',
    name: { vi: 'Ghi chú phát hành', en: 'Release Notes' },
    template:
      'Generate release notes from the following commits:\n\n{{commits}}\n\nGroup by: Features, Fixes, Improvements.',
    version: '1.0.0',
    variables: ['commits'],
  },
  {
    id: 'test-gen-default',
    task: 'test-gen',
    name: { vi: 'Tạo test mặc định', en: 'Default Test Generation' },
    template:
      'Generate test cases for the following code:\n\n{{code}}\n\nInclude: unit tests, edge cases, and error handling.',
    version: '1.0.0',
    variables: ['code'],
  },
  {
    id: 'patch-explain',
    task: 'patch-explain',
    name: { vi: 'Giải thích patch', en: 'Patch Explanation' },
    template:
      'Explain the following diff in plain language:\n\n{{diff}}\n\nDescribe: what changed, why it matters, and any risks.',
    version: '1.0.0',
    variables: ['diff'],
  },
  {
    id: 'commit-draft',
    task: 'commit-draft',
    name: { vi: 'Soạn commit', en: 'Commit Message Draft' },
    template:
      'Generate a conventional commit message for the following changes:\n\n{{diff}}\n\nFormat: type(scope): description\n\nBody: explain what and why.',
    version: '1.0.0',
    variables: ['diff'],
  },
];

export function getPrompt(id: PromptId): PromptTemplate | undefined {
  return PROMPTS.find((p) => p.id === id);
}

export function getPromptsByTask(task: string): PromptTemplate[] {
  return PROMPTS.filter((p) => p.task === task);
}

export function renderPrompt(prompt: PromptTemplate, variables: Record<string, string>): string {
  let result = prompt.template;
  for (const [key, value] of Object.entries(variables)) {
    result = result.replace(new RegExp(`\\{\\{${key}\\}\\}`, 'g'), value);
  }
  return result;
}
