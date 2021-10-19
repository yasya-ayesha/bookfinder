export default function ({store, route, redirect}) {
  const user = store.getters["user/user"];
  const blockRoute = /\/cart\/*/g.test(route.path);
  const loginRoute = '/signin';

  if (!user && blockRoute) {
    redirect('/');
  }

  if (user && route.path === loginRoute) {
    redirect('/')
  }
}