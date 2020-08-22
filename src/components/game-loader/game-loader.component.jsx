import React, {Suspense} from "react";

export default function GenericGameLoader({gameId})
{
    const GameComponent = React.lazy(() => import(`../../games/${gameId}/Game.js`));
    return (
        <div>
            <Suspense fallback={<div>Loading...</div>}>
                <GameComponent />
            </Suspense>
        </div>
    )
};
