import PropTypes from "prop-types";
import React, { useEffect, Suspense, lazy } from "react";
import ScrollToTop from "./helpers/scroll-top";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { ToastProvider } from "react-toast-notifications";
import { multilanguage, loadLanguages } from "redux-multilanguage";
import { connect } from "react-redux";
import { BreadcrumbsProvider } from "react-breadcrumbs-dynamic";



import './app.css';
import { useInitConfig } from "./data/configuration/utils";
// home pages
const HomeFashion = lazy(() => import("./pages/home/HomeFashion"));
const HomeFashionTwo = lazy(() => import("./pages/home/HomeFashionTwo"));
const HomeFashionThree = lazy(() => import("./pages/home/HomeFashionThree"));
const HomeFashionFour = lazy(() => import("./pages/home/HomeFashionFour"));
const HomeFashionFive = lazy(() => import("./pages/home/HomeFashionFive"));
const HomeFashionSix = lazy(() => import("./pages/home/HomeFashionSix"));
const HomeFashionSeven = lazy(() => import("./pages/home/HomeFashionSeven"));
const HomeFashionEight = lazy(() => import("./pages/home/HomeFashionEight"));

// shop pages
const ShopGridStandard = lazy(() => import("./pages/shop/ShopGridStandard"));
const ShopGridFilter = lazy(() => import("./pages/shop/ShopGridFilter"));
const ShopGridTwoColumn = lazy(() => import("./pages/shop/ShopGridTwoColumn"));
const ShopGridNoSidebar = lazy(() => import("./pages/shop/ShopGridNoSidebar"));
const ShopGridFullWidth = lazy(() => import("./pages/shop/ShopGridFullWidth"));
const ShopGridRightSidebar = lazy(() =>
  import("./pages/shop/ShopGridRightSidebar")
);
const ShopListStandard = lazy(() => import("./pages/shop/ShopListStandard"));
const ShopListFullWidth = lazy(() => import("./pages/shop/ShopListFullWidth"));
const ShopListTwoColumn = lazy(() => import("./pages/shop/ShopListTwoColumn"));

// product pages
const Product = lazy(() => import("./pages/shop-product/Product"));
const ProductTabLeft = lazy(() =>
  import("./pages/shop-product/ProductTabLeft")
);
const ProductTabRight = lazy(() =>
  import("./pages/shop-product/ProductTabRight")
);
const ProductSticky = lazy(() => import("./pages/shop-product/ProductSticky"));
const ProductSlider = lazy(() => import("./pages/shop-product/ProductSlider"));
const ProductFixedImage = lazy(() =>
  import("./pages/shop-product/ProductFixedImage")
);

// blog pages
const BlogStandard = lazy(() => import("./pages/blog/BlogStandard"));
const BlogNoSidebar = lazy(() => import("./pages/blog/BlogNoSidebar"));
const BlogRightSidebar = lazy(() => import("./pages/blog/BlogRightSidebar"));
const BlogDetailsStandard = lazy(() =>
  import("./pages/blog/BlogDetailsStandard")
);

// other pages
const ControlPanel = lazy(() => import("./pages/other/Config"));
const About = lazy(() => import("./pages/other/About"));
const Contact = lazy(() => import("./pages/other/Contact"));
const MyAccount = lazy(() => import("./pages/other/MyAccount"));
const LoginRegister = lazy(() => import("./pages/other/LoginRegister"));

const Cart = lazy(() => import("./pages/other/Cart"));
const Wishlist = lazy(() => import("./pages/other/Wishlist"));
const Compare = lazy(() => import("./pages/other/Compare"));
const Checkout = lazy(() => import("./pages/other/Checkout"));

const NotFound = lazy(() => import("./pages/other/NotFound"));

const homeVariations = {
  1: HomeFashion,
  2: HomeFashionTwo,
  3: HomeFashionThree,
  4: HomeFashionFour,
  5: HomeFashionFive,
  6: HomeFashionSix,
  7: HomeFashionSeven,
  8: HomeFashionEight,
}

const shopVariations = {
  1: ShopGridStandard,
  2: ShopGridFilter,
  3: ShopGridTwoColumn,
  4: ShopGridNoSidebar,
  5: ShopGridFullWidth,
  6: ShopGridRightSidebar,
  7: ShopListStandard,
  8: ShopListFullWidth,
  9: ShopListTwoColumn,
}

const productVariations = {
  1: Product,
  2: ProductTabLeft,
  3: ProductTabRight,
  4: ProductSticky,
  5: ProductSlider,
  6: ProductFixedImage
}

const blogVariations = {
  1: BlogStandard,
  2: BlogNoSidebar,
  3: BlogRightSidebar,
  4: BlogDetailsStandard,
}

const App = (props) => {
  const initConfig = useInitConfig();
  const activeConfig = initConfig.find(el => el.isActive);
  const HomeComponent = homeVariations[activeConfig.variations.home];
  const ShopComponent = shopVariations[activeConfig.variations.shop];
  const ProductComponent = productVariations[activeConfig.variations.product];
  const BlogComponent = blogVariations[activeConfig.variations.blog];

  useEffect(()=> {

    console.log(activeConfig);
    const root = document.documentElement.style;
    root.setProperty('--main-font', activeConfig.fontName);

    const googleLink = document.createElement('link');
    googleLink.rel = 'stylesheet';
    googleLink.href = activeConfig.fontUrl;
    document.body.insertBefore(googleLink, document.body.firstChild);

  }, [activeConfig]);

  useEffect(() => {
    props.dispatch(
      loadLanguages({
        languages: {
          en: require("./translations/english.json"),
          fn: require("./translations/french.json"),
          de: require("./translations/germany.json")
        }
      })
    );
  });

  return (
    <ToastProvider placement="bottom-left">
      <BreadcrumbsProvider>
        <Router>
          <ScrollToTop>
            <Suspense
              fallback={
                <div className="flone-preloader-wrapper">
                  <div className="flone-preloader">
                    <span></span>
                    <span></span>
                  </div>
                </div>
              }
            >
              <div className="admin-link">
                <Link to={process.env.PUBLIC_URL + "/admin"}>Admin panel</Link>
              </div>
              <Switch>
                <Route
                  exact
                  path={process.env.PUBLIC_URL + "/"}
                  component={HomeComponent}
                />

                <Route
                  path={process.env.PUBLIC_URL + "/admin"}
                  component={ControlPanel}
                />

                <Route
                  path={process.env.PUBLIC_URL + "/shop"}
                  component={ShopComponent}
                />

                {/* Shop product pages */}
                <Route
                  path={process.env.PUBLIC_URL + "/product/:id"}
                  render={(routeProps) => (
                    <ProductComponent {...routeProps} key={routeProps.match.params.id} />
                  )}
                />

                {/* Blog pages */}
                <Route
                  path={process.env.PUBLIC_URL + "/blog"}
                  component={BlogComponent}
                />

                {/* Other pages */}
                <Route
                  path={process.env.PUBLIC_URL + "/about"}
                  component={About}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/contact"}
                  component={Contact}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/my-account"}
                  component={MyAccount}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/login-register"}
                  component={LoginRegister}
                />

                <Route
                  path={process.env.PUBLIC_URL + "/cart"}
                  component={Cart}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/wishlist"}
                  component={Wishlist}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/compare"}
                  component={Compare}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/checkout"}
                  component={Checkout}
                />

                <Route
                  path={process.env.PUBLIC_URL + "/not-found"}
                  component={NotFound}
                />

                <Route exact component={NotFound} />
              </Switch>
            </Suspense>
          </ScrollToTop>
        </Router>
      </BreadcrumbsProvider>
    </ToastProvider>
  );
};

App.propTypes = {
  dispatch: PropTypes.func
};

export default connect()(multilanguage(App));
