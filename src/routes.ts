export default {
  // Other pages
  '/': false, // root is always false

  // Pages
  '/scan': true,

  // Page 404
  '/:pathMatch(.*)*': false,
};
