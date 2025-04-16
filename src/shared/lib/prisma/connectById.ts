export function connectById(id: number) {
    return {
        connect: {
            id,
        },
    };
}

export function connectByIds(ids: number[]) {
    return {
        connect: ids.map((id) => ({ id })),
    };
}
