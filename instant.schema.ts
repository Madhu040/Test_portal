// Docs: https://www.instantdb.com/docs/modeling-data

import { i } from "@instantdb/core";

const _schema = i.schema({
  entities: {
    $users: i.entity({
      email: i.string().unique().indexed(),
      name: i.string().optional(),
      avatar: i.string().optional(),
      plan: i.string().optional(), // free, pro, enterprise
      createdAt: i.date().optional(),
    }),
    projects: i.entity({
      title: i.string(),
      description: i.string().optional(),
      prompt: i.string(),
      model: i.string(), // gpt5, claude, qwen, kimi
      platforms: i.json(), // ['iOS', 'Android', 'Web']
      features: i.json(), // array of selected features
      style: i.string(), // modern, minimal, etc.
      status: i.string(), // draft, generating, completed, failed
      createdAt: i.date(),
      updatedAt: i.date(),
    }),
    generations: i.entity({
      code: i.json(), // generated files structure
      preview: i.string().optional(), // preview URL
      generatedAt: i.date(),
      duration: i.number().optional(), // seconds
      status: i.string(), // pending, generating, completed, failed
    }),
    analytics: i.entity({
      eventType: i.string().indexed(), // login, logout, project_created, generation_started, etc.
      metadata: i.json(),
      timestamp: i.date().indexed(),
    }),
  },
  links: {
    userProjects: {
      forward: {
        on: "projects",
        has: "one",
        label: "user",
      },
      reverse: {
        on: "$users",
        has: "many",
        label: "projects",
      },
    },
    projectGenerations: {
      forward: {
        on: "generations",
        has: "one",
        label: "project",
      },
      reverse: {
        on: "projects",
        has: "many",
        label: "generations",
      },
    },
    generationUser: {
      forward: {
        on: "generations",
        has: "one",
        label: "user",
      },
      reverse: {
        on: "$users",
        has: "many",
        label: "generations",
      },
    },
    userAnalytics: {
      forward: {
        on: "analytics",
        has: "one",
        label: "user",
      },
      reverse: {
        on: "$users",
        has: "many",
        label: "analytics",
      },
    },
  },
  rooms: {},
});

// This helps TypeScript display nicer intellisense
type _AppSchema = typeof _schema;
interface AppSchema extends _AppSchema {}
const schema: AppSchema = _schema;

export type { AppSchema };
export default schema;
