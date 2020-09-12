import React from "react";
import "./game-review.styles.scss";
import {allUsersSelector} from "../../redux/user/user-selector";
import avatars from "../../data/avatars";
import {createStructuredSelector} from "reselect";
import {connect} from "react-redux";
import {allGamesSelector} from "../../redux/categories-and-games/categories-and-games-selector";
import {gameLink, userLink} from "../../util/navigationUtils";
import like from "../../assets/like.png";
import dislike from "../../assets/dislike.png";

function GameReview({users, games, reviewData, showGameName}) {
    const {gameId, userId, reviewDate, review, liked} = reviewData;
    const gameData = games.filter(game => game.id === gameId)[0];
    const userData = users.filter(user => user.id === userId)[0];
    const selectedAvatar = avatars.filter(item => item.id === (userData || {}).avatarId)[0];
    const {username} = (userData || {});
    const gameLinkUrl = gameLink(gameData);
    const userLinkUrl = userLink((userData || {}));
    return (
        <div className="review-component">
            {selectedAvatar &&
                <div className="user-image">
                    <img src={selectedAvatar.url} alt={selectedAvatar.id}/>
                </div>
            }
            <div>
                <div className="review-user-row">
                    <div>
                        <a className="review-username" href={userLinkUrl}>
                            {username}
                        </a>
                    </div>
                    <div className="likes">
                        <img src={liked ? like : dislike} alt="like status" />
                    </div>
                </div>
                <div className="review-details">
                    <div className="review-details-review-date">{reviewDate}</div>
                    {showGameName &&
                        <div className="review-details-game-name">
                            <div className="review-details-in">in</div>
                            <a className="review-details-game-name-title" href={gameLinkUrl}>
                                {gameData.displayName}
                            </a>
                        </div>
                    }
                </div>
                <div className="review">{review}</div>
            </div>
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    users: allUsersSelector,
    games: allGamesSelector
});

export default connect(mapStateToProps)(GameReview);
