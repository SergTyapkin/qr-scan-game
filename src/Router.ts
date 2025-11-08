import { createRouter, createWebHistory, Router, NavigationGuardNext } from 'vue-router';

// Components:
import Page404 from '~/views/Page404.vue';
import routes from '~/routes';
import { RouteRecordRaw } from 'vue-router';
import PageSelectBranch from '~/views/PageSelectBranch.vue';
import PageScanQR from '~/views/PageScanQR.vue';
import { QRS } from '~/constants';

type MyRoute = RouteRecordRaw & {
  path: keyof typeof routes,
  meta?: {
    noLoginRequired?: boolean
    loginRequired?: boolean
  }
}

export default function createVueRouter(): Router {
  const routesList: MyRoute[] = [
    { path: '/', name: 'default', component: PageSelectBranch },

    { path: '/scan', name: 'scan', component: PageScanQR },

    { path: '/:pathMatch(.*)*', name: 'page404', component: Page404 },
  ];

  const Router = createRouter({
    history: createWebHistory(),
    routes: routesList,
  });

  Router.beforeEach(async (to, _, next: NavigationGuardNext) => {
    const notLoginedRedirect = {
      name: 'default',
    };

    if (to.path !== '/' && to.path !== '') {
      const selectedBranch = localStorage.getItem('branch');
      console.log(selectedBranch);
      if (selectedBranch === null || !QRS[selectedBranch]) {
        next(notLoginedRedirect);
        return;
      }
    }

    next();
  });

  Router.beforeResolve(async () => {
    if (window?.onbeforeunload) {
      if (confirm('Изменения не сохранены. Вы уверены, что хотите покинуть страницу?')) {
        window.onbeforeunload = null;
      } else {
        return false;
      }
    }
  });

  return Router;
}
