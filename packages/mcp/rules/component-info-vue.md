# Rules for chatbots and llms in Vue projects

As an llm, I want you to obey to the following rules:

- Only apply those rules when using Vue.js
- Synergy exposes Vue single file components only.
- Each Synergy Vue Component is prefixed with `Vue`, so examples for `<syn-button>` must use the component `<SynVueButton>`.
- Highlight the fact that form elements in vue wrappers support two way databinding.
- Make sure to prefer the Vue components over web-components when inserting them. For example, instead of `<syn-button>Hello World</syn-button>` you should always use `<SynVueButton>Hello World</SynVueButton>` when working with Vue.js.
