import React from "react";
import "./layout-with-header-categories-footer.styles.scss";
import Footer from "../footer/footer.component";
import CategoriesStripe from "../categories-stripe/categories-stripe.component";
import AllCategoriesSelection from "../all-categories-selection/all-categories-selection.component";
import Header from "../header/header.component";

export default function LayoutWithHeaderCategoriesFooter({children}) {
    return (
        <div className="layout-with-header-categories-footer-component">
            <Header/>
            <div className="categories-header">
                <CategoriesStripe/>
                <AllCategoriesSelection />
            </div>
            <div className="main-section">
                {children}
            </div>
            <Footer />
        </div>
    )
}
