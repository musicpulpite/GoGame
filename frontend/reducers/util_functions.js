export const violatesKo = (prevBoard, newBoard) => {
  if (prevBoard === null) return false;
  let violated = true;

  Object.keys(prevBoard).forEach((pos) => {
    if (prevBoard[pos].stone !== newBoard[pos].stone) {
      violated = false;
    }
  });

  return violated;
};
