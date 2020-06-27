let id = 0;

export const generateNewId = (): Number => {
    id = id + 1;
    return Number(id); // making sure that we wont send the reference
};
