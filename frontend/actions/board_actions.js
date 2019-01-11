export const PLACE_PIECE = 'PLACE_PIECE';

export const placePiece = (stone, pos) => ({
  type: PLACE_PIECE,
  stone,
  pos
});
