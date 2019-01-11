import {merge} from 'lodash';
class positionData {
  constructor(stone, pos) {
    this.stone = stone;
    this.pos = pos;
    this.groupSize = 0;
    this.groupLiberties = this.initializeGroupLiberties();
    this.parentPiece = this;
  }

  rootPiece() {
    let piece = this;
    while(piece.parentPiece !== piece) {
      piece = piece.parentPiece;
    }

    return piece;
  }

  connectPiece(otherPiece) {
    // for efficiency, we append the smaller group to the larger group
    // this is an attempt to keep the group tree representations 'flatter'
    if (otherPiece.rootPiece().groupSize >= this.rootPiece().groupSize) {
      // update groupSize
      otherPiece.rootPiece().groupSize += this.rootPiece().groupSize;
      // merge liberty hashes
      otherPiece.rootPiece().groupLiberties =
        merge(this.groupLiberties, otherPiece.rootPiece().groupLiberties);
      // finally append group trees, connecting them together
      this.rootPiece().parentPiece = otherPiece.rootPiece();
    } else {
      // update groupSize
      this.rootPiece().groupSize += otherPiece.rootPiece().groupSize;
      // merge liberty hashes
      this.rootPiece().groupLiberties = 
        merge(this.groupLiberties, otherPiece.rootPiece().groupLiberties);
      // finally append group trees, connecting them together
      otherPiece.rootPiece().parentPiece = this.rootPiece();
    }
  }

  adjacentPositions() {
    const adjacent = [];
    const i = parseInt(this.pos[0]);
    const j = parseInt(this.pos[1]);

    if (i > 0) adjacent.push(`${i - 1}${j}`);
    if (i < 8) adjacent.push(`${i + 1}${j}`);
    if (j > 0) adjacent.push(`${i}${j - 1}`);
    if (j < 8) adjacent.push(`${i}${j + 1}`);

    return adjacent;
  }

  initializeGroupLiberties() {
    const liberties = {};
    const i = parseInt(this.pos[0]);
    const j = parseInt(this.pos[1]);

    if (i > 0) liberties[`${i - 1}${j}`] = true;
    if (i < 8) liberties[`${i + 1}${j}`] = true;
    if (j > 0) liberties[`${i}${j - 1}`] = true;
    if (j < 8) liberties[`${i}${j + 1}`] = true;

    return liberties;
  }

}

export default positionData;
