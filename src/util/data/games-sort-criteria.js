export default [
    {
        code: "latest",
        displayName: "Latest",
        sortFunc: (item1, item2) => {
            return item2.creationDate < item1.creationDate ? -1 : 1}
    },
    {
        code: "popularity",
        displayName: "Popularity",
        sortFunc: (item1, item2) => {
            return item2.usageCount < item1.usageCount ? -1 : 1
        }
    },
    {
        code: "rating",
        displayName: "Rating",
        sortFunc: (item1, item2) => {return item2.votes < item1.votes ? -1 : 1}
    }
]
