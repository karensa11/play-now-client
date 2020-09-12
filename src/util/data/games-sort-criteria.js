import {calculateLikesRate} from "../utils";

export default [
    {
        code: "latest",
        displayName: "Latest",
        sortFunc: (item1, item2) => item2.creationDate < item1.creationDate ? -1 : 1
    },
    {
        code: "popularity",
        displayName: "Popularity",
        sortFunc: (item1, item2) => item2.usageCount < item1.usageCount ? -1 : 1
    },
    {
        code: "rating",
        displayName: "Rating",
        sortFunc: (item1, item2) => {
            const likesRate1 = calculateLikesRate(item1);
            const likesRate2 = calculateLikesRate(item2);
            return likesRate1 < likesRate2 ? -1 : 1
        }
    }
]
