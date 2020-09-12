import React from "react";
import "./user-overview.styles.scss";
import {connect} from "react-redux";
import LayoutWithHeaderCategoriesFooter
    from "../../layout/layout-with-header-categories-footer/layout-with-header-categories-footer.component";
import {createStructuredSelector} from "reselect";
import {allUsersSelector} from "../../../redux/user/user-selector";
import BasicAccountDetails from "../../account/basic-account-details/basic-acount-details.component";
import {reviewsByUserSelector} from "../../../redux/categories-and-games/categories-and-games-selector";
import {store} from "../../../redux/store";
import GameReviews from "../../game-reviews/game-reviews.component";

function UserOverview({match, allUsers}) {
    const userData = allUsers.filter(user =>
        user.username === match.params.username)[0] || {};
    const reviewsData = reviewsByUserSelector(userData.id)(store.getState());
    return (
        <LayoutWithHeaderCategoriesFooter>
            <div className="user-overview-page">
                {userData && userData.username &&
                    <BasicAccountDetails userToDisplay={userData}/>
                }
                {reviewsData &&
                    <GameReviews reviewsData={reviewsData} />
                }
            </div>
        </LayoutWithHeaderCategoriesFooter>
    )
}

const mapStateToProps = createStructuredSelector({
    allUsers: allUsersSelector
});

export default connect(mapStateToProps)(UserOverview);
