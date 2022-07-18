import Home from "../components/Home.vue";
import Books from "../components/Books.vue";
import Catalogs from "../components/catalogs/Catalog.vue";
import CatalogFolder from "../components/catalogs/CatalogFolder.vue";

const routes = [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
        path: "/books",
        name: "books",
        component: Books,
      },
    {
        path: "/catalogs",
        name: "catalogs",
        component: Catalogs
    },
    {
        path: "/catalogs/:catalogId",
        name: "catalog_folder",
        component: CatalogFolder,
        props: true
    },
  ];

  export default routes;
