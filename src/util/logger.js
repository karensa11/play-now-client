export function logError(operationDescription, err) {
    console.log("failed to do operation {0}, failure", operationDescription, err.message);
}
