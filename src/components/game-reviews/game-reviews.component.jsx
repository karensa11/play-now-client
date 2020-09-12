import React, {Component} from "react";
import "./game-reviews.scss";
import GameReview from "../game-review/game-review.component";
import FormInput from "../common/form-input/form-input.component";
import CustomButton from "../common/custom-button/custom-button.component";
import {addReview} from "../../util/firebase/firebaseGames";
const dateFormat = require("dateformat");

export default class GameReviews extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            review: "",
            liked: true,
            reviewValidationMessage: null
        }
    }
    reviewTextChanged = (name, value) => {
        this.setState({review: value, reviewValidationMessage: null})
    };
    submitReview = async () => {
        const {review, liked} = this.state;
        if (review.trim() === "") {
            this.setState({reviewValidationMessage: "please fill review"});
            return;
        }
        const {gameData, userData} = this.props;
        try {
            await addReview({
                gameId: gameData.id,
                userId: userData.id,
                liked: liked,
                review: review,
                reviewDate: dateFormat(new Date(), "yyyy-mm-dd")
            });
            alert("add review success");
        } catch (err) {
            alert("add review failed");
        }
        this.setState({review: "", like: true});
    };
    setLike = () => {
        this.setState({liked: true});
    };
    setDisLike = () => {
        this.setState({liked: false});
    };
    render()
    {
        const {reviewsData, isOwnUser, isOwnGame, showGameReviewOption} = this.props;
        const {liked, reviewValidationMessage} = this.state;
        return (
            <div className="game-reviews">
                <hr/>
                <div className="reviews-title"><span>{isOwnUser ? "MY " : ""}</span>GAME REVIEWS</div>
                {showGameReviewOption &&
                    <div className="review-game">
                        <FormInput validationMessage={reviewValidationMessage}
                                   handleChange={this.reviewTextChanged} name="review" />
                        <div className="review-buttons-container">
                            <div className="review-buttons">
                                <CustomButton onClick={this.setLike} style={{
                                    backgroundColor: liked ? "green" : "black",
                                    color: liked ? "black" : "white",
                                    border: "3px solid #050"
                                }}>Like</CustomButton>
                                <CustomButton onClick={this.setDisLike} style={{
                                    backgroundColor: !liked ? "red" : "black",
                                    color: !liked ? "black" : "white",
                                    border: "3px solid #500"
                                }}>Don't Like</CustomButton>
                            </div>
                        </div>
                        <div className="review-submit">
                            <CustomButton onClick={this.submitReview}
                                style={{backgroundColor: "#304", border: "1px solid #609"}}>
                                Submit
                            </CustomButton>
                        </div>
                    </div>
                }
                {reviewsData.map(reviewData => (
                    <GameReview key={reviewData.id} reviewData={reviewData} showGameName={!isOwnGame}/>
                ))}
            </div>
        )
    }
}
