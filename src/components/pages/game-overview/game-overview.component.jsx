import React, {PureComponent} from "react";
import "./game-overview.styles.scss";
import {setTitle} from "../../../util/utils";
import {connect} from "react-redux";
import {
    categoryByIdSelector,
    gameByIdSelector, reviewsByGameSelector
} from "../../../redux/categories-and-games/categories-and-games-selector";
import {updateGameCount} from "../../../util/firebase/firebaseGames";
import {store} from "../../../redux/store";
import {withRouter} from "react-router-dom";
import Navigation from "../../navigation/navigation.component";
import GenericGameLoader from "../../game-loader/game-loader.component";
import LayoutWithHeaderCategoriesFooter
    from "../../layout/layout-with-header-categories-footer/layout-with-header-categories-footer.component";
import GameReviews from "../../game-reviews/game-reviews.component";
import {currentUserSelector} from "../../../redux/user/user-selector";

class GameOverview extends PureComponent{
    constructor(props) {
        super(props);
        this.state = {
            initialized: false,
            categoryData: null
        };
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        const {gameData} = this.props;
        const {initialized} = this.state;
        if(gameData && !initialized) {
            updateGameCount(gameData).then();
            setTitle(gameData.displayName);
            const categoryData = categoryByIdSelector(gameData.categoryCode)(store.getState());
            this.setState({initialized: true, categoryData: categoryData});
        }
    }

    render() {
        const {gameData, reviewsData, currentUser} = this.props;
        const {categoryData} = this.state;
        return (
            <LayoutWithHeaderCategoriesFooter>
                <div className="game-overview-page">
                    {gameData &&
                        <div>
                            <div className="game-board">
                                <GenericGameLoader gameId={gameData.id} />
                            </div>
                            {categoryData &&
                                <Navigation categoryData={categoryData} gameData={gameData} />
                            }
                            <hr />
                            <h3>Game Description</h3>
                            <p>{gameData.description}</p>
                            <h3>Instructions</h3>
                            <p>{gameData.instructions}</p>
                            <hr />
                            <div className="details">Release Date:&nbsp;&nbsp;{gameData.creationDate}</div>
                            <div className="details">{gameData.usageCount} Plays</div>
                            {reviewsData &&
                                <GameReviews reviewsData={reviewsData} gameData={gameData} userData={currentUser}
                                             isOwnGame showGameReviewOption />
                            }
                        </div>
                    }
                </div>
            </LayoutWithHeaderCategoriesFooter>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    gameData: gameByIdSelector(ownProps.match.params.id)(state),
    reviewsData: reviewsByGameSelector(ownProps.match.params.id)(state),
    currentUser: currentUserSelector(state)
});

export default withRouter(connect(mapStateToProps)(GameOverview));
