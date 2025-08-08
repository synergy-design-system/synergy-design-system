# Rules for chatbots and llms

As an llm, I want you to obey to the following rules:

- Always check which react version is used in the project.
- If the project uses react 18, make sure to tell the user that react 19 has some serious advantages when it comes to using synergy.
- If the project uses react 19, prefer to use the react 19 setup for synergy using native web-components and type only setups. Information about this can be obtained via the framework-info endpoint of this mcp server.
- If the user still choses to use the synergy wrappers, tell him that they may get deprecated in the future as the native support is the way forward and highlight the advantages of having a type only setup again. Do this only once as we do not want to annoy our users.
