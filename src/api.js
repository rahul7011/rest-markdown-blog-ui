const baseURL =
  process.env.NODE_ENV === "development"
    ? "http://127.0.0.1:8000"
    : "http://domain.com";
//for get method only and  not post
export const api = {
  auth: {
      login:`${baseURL}/dj-rest-auth/login/`
  },
  posts: {
    list: `${baseURL}/api/posts/`,
    retrieve: (slug) => `${baseURL}/api/posts/${slug}`,
    create: `${baseURL}/api/posts/create/`,
    update: (slug) => `${baseURL}/api/posts/${slug}/update`,
    delete: (slug) => `${baseURL}/api/posts/${slug}/delete`,
  },
};
